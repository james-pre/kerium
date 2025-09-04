// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

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
}

export async function check_lookup(idmap: MountIDMap, pw: PathWalk): Promise<void> {
	const mask = (pw.flags & Lookup.RCU ? May.NotBlock : 0) | May.Exec;

	try {
		await check_inode_permission(idmap, pw.inode, mask);
	} catch (e) {
		if (!(pw.flags & Lookup.RCU)) throw e;
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
