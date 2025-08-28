// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { BUG_ON } from '../bad.js';
import { Errno as E } from '../error.js';
import { lock } from '../lock.js';
import { define_syscall } from '../syscalls.js';
import { current } from '../task.js';
import { DentryFlags, type Dentry } from './dentry.js';
import { map_inode_uid, type MountIDMap } from './idmapping.js';
import { type Inode } from './inode.js';
import type { VFSMount } from './mount.js';
import { check_inode_permission, May } from './permissions.js';

export interface Path {
	mnt: VFSMount | null;
	dentry: Dentry | null;
}

/* path walk mode */
export enum Lookup {
	/**  follow links at the end */
	Follow = 1 << 0,
	/**  require a directory */
	Directory = 1 << 1,
	/**  force terminal automount */
	AutoMount = 1 << 2,
	/**  accept empty path [user_... only] */
	Empty = 1 << 3,
	/**  Linkat request with empty path. */
	LinkatEmpty = 1 << 4,
	/**  follow mounts in the starting point */
	Down = 1 << 5,
	/**  follow mounts in the end */
	MountPoint = 1 << 6,
	/**  tell ->d_revalidate() to trust no cache */
	Reval = 1 << 7,
	/**  RCU pathwalk mode; semi-internal */
	RCU = 1 << 8,
	/**  Only do cached lookup */
	Cached = 1 << 9,
	/**  Looking up final parent in path */
	Parent = 1 << 10,
	// 5 spare bits for pathwalk

	// These tell filesystem methods that we are dealing with the final component...
	/**  ... in open */
	Open = 1 << 16,
	/**  ... in object creation */
	Create = 1 << 17,
	/**  ... in target must not exist */
	Excl = 1 << 18,
	/**  ... in destination of rename() */
	RenameTarget = 1 << 19,
	// 4 spare bits for intent

	// Scoping flags for lookup.
	/**  No symlink crossing. */
	NoSymlinks = 1 << 24,
	/**  No nd_jump_link() crossing. */
	NoMagicLinks = 1 << 25,
	/**  No mountpoint crossing. */
	NoXDev = 1 << 26,
	/**  No escaping from starting point. */
	Beneath = 1 << 27,
	/**  Treat dirfd as fs root. */
	InRoot = 1 << 28,
}

export type PathWalkLastType = 'norm' | 'root' | '.' | '..';

export interface PathWalkSavedLink {
	link: Path;
	name: string;
	seq: number;
}

/**
 * Analogous to `nameidata` in Linux.
 *
 * @privateRemarks
 * Thread-local?
 * AFAIK linux keeps a single `nameidata` per `task_struct`.
 */
export interface PathWalk {
	path: Path;
	root: Path;
	/** path.dentry.inode */
	inode: Inode;
	last: string;
	last_type: PathWalkLastType;
	flags: number;
	state: number;
	depth: number;

	links: PathWalkSavedLink[];

	/** VFS uid */
	dir_uid?: number;
	dir_mode?: number;

	m_seq: number;
}

const PW_Root_Preset = 1;
const PW_Root_Grabbed = 2;
const PW_Jumped = 4;

function drop_links(pw: PathWalk): void {
	for (let i = pw.depth; i; i--) {
		const last = pw.links[i - 1];
	}
}

function leave_rcu(pw: PathWalk): void {
	pw.flags &= ~Lookup.RCU;
}

function __legitimize_path(path: Path, seq: number, m_seq: number): boolean {
	const res = 0; // __legitimize_mnt(path.mnt, m_seq);
	if (res) {
		if (res > 0) path.mnt = null;
		path.dentry = null;
		return false;
	}

	if (/* !lockref_get_not_dead(path.dentry.d_lockref) */ false) {
		path.dentry = null;
		return false;
	}

	return true; // return !read_seqcount_retry(path.dentry.seq, seq);
}

function legitimize_path(pw: PathWalk, path: Path, seq?: number): boolean {
	return __legitimize_path(path, seq!, pw.m_seq);
}

function legitimize_links(pw: PathWalk): boolean {
	if (pw.flags & Lookup.Cached) {
		drop_links(pw);
		pw.depth = 0;
		return false;
	}

	for (let i = 0; i < pw.depth; i++) {
		const last = pw.links[i];
		if (!legitimize_path(pw, last.link, last.seq)) {
			drop_links(pw);
			pw.depth = i + 1;
			return false;
		}
	}

	return true;
}

function legitimize_root(pw: PathWalk): boolean {
	if (!pw.root.mnt || pw.state & PW_Root_Preset) return true;
	pw.state |= PW_Root_Grabbed;
	return legitimize_path(pw, pw.root);
}

function try_ref_walk(pw: PathWalk): boolean {
	const parent = pw.path.dentry!;

	BUG_ON(!(pw.flags & Lookup.RCU));

	using _ = { [Symbol.dispose]: () => leave_rcu(pw) };

	if (!legitimize_links(pw)) return false;
	if (!legitimize_path(pw, pw.path)) {
		pw.path.mnt = null;
		pw.path.dentry = null;
		return false;
	}
	if (!legitimize_root(pw)) return false;
	BUG_ON(pw.inode != parent.inode);
	return true;
}

export async function check_lookup(idmap: MountIDMap, pw: PathWalk): Promise<void> {
	const mask = (pw.flags & Lookup.RCU ? May.NotBlock : 0) | May.Exec;

	try {
		await check_inode_permission(idmap, pw.inode, mask);
	} catch (e) {
		if (!(pw.flags & Lookup.RCU)) throw e;
		if (!try_ref_walk(pw)) throw E.ECHILD;
		if (e != E.ECHILD) throw e;
		await check_inode_permission(idmap, pw.inode, May.Exec);
	}
}

enum Walk {
	None = 0,
	Trailing = 1,
	More = 2,
	NoFollow = 4,
}

function walk_component(pw: PathWalk, flags: Walk): string {
	// @todo
}

export async function path_walk(path: string, pw: PathWalk): Promise<Path> {
	pw.last_type = 'root';
	pw.flags |= Lookup.Parent;

	let component: string,
		depth = 0;

	while (path[0] === '/') path = path.slice(1);

	for (;;) {
		const idmap = pw.path.mnt!.idMap;
		await check_lookup(idmap, pw);

		pw.last = path;
		const slash_at = path.indexOf('/');
		if (slash_at === -1) {
			component = path;
			path = '';
		} else {
			let j = slash_at + 1;
			while (path.charCodeAt(j) === 47) j++;
			component = path.slice(0, slash_at);
			path = path.slice(j);
		}

		switch (component) {
			case '..':
				pw.last_type = '..';
				pw.state |= PW_Jumped;
				break;
			case '.':
				pw.last_type = '.';
				break;
			default: {
				pw.last_type = 'norm';
				pw.state &= ~PW_Jumped;

				const parent = pw.path.dentry;
				if (parent && parent.flags & DentryFlags.OP_HASH) parent.op.hash?.(parent, pw.last);
			}
		}

		let link: string;

		if (path) link = walk_component(pw, Walk.More);
		else {
			if (!depth) {
				pw.dir_uid = map_inode_uid(idmap, pw.inode);
				pw.dir_mode = pw.inode.mode;
				pw.flags &= ~Lookup.Parent;
				return pw.path;
			}
			path = pw.links[--depth].name;
			link = walk_component(pw, 0);
		}

		if (link) {
			pw.links[depth++].name = link;
			path = link;
		}

		if ((pw.path.dentry!.flags & DentryFlags.ENTRY_TYPE) != DentryFlags.DIRECTORY_TYPE) {
			if (pw.flags & Lookup.RCU) try_ref_walk(pw);
			else throw E.ENOTDIR;
		}

		// ... todo ...
	}
}

declare module '../syscalls.js' {
	interface Syscalls {
		get_cwd(): Promise<string>;
	}
}

define_syscall<'get_cwd'>(async function get_cwd(): Promise<string> {
	using _ = await lock(current.fs);
	/*
	if (is_unlinked(this.pwd.dentry)) throw ENOENT;
	return join(root, pwd);
	*/
	return '';
});

define_syscall<'chdir'>(function chdir(path: string): void {});
