// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { BUG } from '../bad.js';
import { Errno as E } from '../error.js';
import { map_id } from '../namespaces.js';
import { current, in_group_p } from '../task.js';
import type { Dentry } from './dentry.js';
import { map_inode_gid, map_inode_uid, nop_mnt_idmap, type MountIDMap } from './idmapping.js';
import type { Inode } from './inode.js';
import { SuperblockFlag } from './super.js';

export const enum ACLType {
	Access = 0x8000,
	Default = 0x4000,
}

export const enum ACLTag {
	UserObj = 0x01,
	User = 0x02,
	GroupObj = 0x04,
	Group = 0x08,
	Mask = 0x10,
	Other = 0x20,

	/**
	 * @internal @hidden
	 */
	_None = 0x00,
}

export const ACL_DONT_CACHE = -3;

/**
 * @todo [share]
 */
export interface ACLEntry {
	tag: ACLTag;
	perm: number;
	id: number;
}

/**
 * @todo [share]
 */
export interface ACL {
	entries: ACLEntry[];
}

export function is_posix_acl(inode: Readonly<Inode>): boolean {
	return !!(inode.sb.flags & SuperblockFlag.PosixACL);
}

export function is_uncached_acl(acl: ACL): boolean {
	// We can't introspect into cache and stuff.
	return false;
}

async function __get_acl(idmap: MountIDMap, dentry: Dentry | null, inode: Inode, type: ACLType): Promise<ACL | null> {
	const acl = acl_by_type(inode, type);
	if (!is_uncached_acl(acl)) return acl;

	if (!is_posix_acl(inode)) return null;

	if (dentry && inode.op.get_acl) return await inode.op.get_acl(idmap, dentry, type);
	else if (inode.op.get_inode_acl) return await inode.op.get_inode_acl(inode, type, false);
	else {
		//set_cached_acl(inode, type, null);
		return null;
	}
}

export function get_inode_acl(inode: Inode, type: ACLType): Promise<ACL | null> {
	return __get_acl(nop_mnt_idmap, null, inode, type);
}

function acl_by_type(inode: Readonly<Inode>, type: ACLType): ACL {
	switch (type) {
		case ACLType.Access:
			return inode.acl;
		case ACLType.Default:
			return inode.default_acl;
		default:
			BUG();
	}
}

export function get_cached_acl_rcu(inode: Readonly<Inode>, type: ACLType): ACL | null {
	const acl = acl_by_type(inode, type);

	return acl;
}

export function check_posix_acl_permission(idmap: MountIDMap, inode: Inode, acl: ACL, want: number) {
	let found = false,
		i = 0,
		pa: ACLEntry;

	const __check = () => {
		if ((pa.perm & want) != want) throw E.EACCES;
	};

	const __mask = () => {
		for (const mask of acl.entries.slice(i)) {
			if (mask.tag != ACLTag.Mask) continue;
			if ((pa.perm & mask.perm & want) != want) throw E.EACCES;
		}
	};

	const { user_ns: ns } = inode.sb;

	for (i = 0; i < acl.entries.length; i++) {
		pa = acl.entries[i];
		switch (pa.tag) {
			case ACLTag.UserObj:
				if (map_inode_uid(idmap, inode) == current.cred.fsuid) __check();
				break;
			case ACLTag.User:
				if (map_id(pa.id, ns.uid_map, idmap.uid_map) == current.cred.fsuid) __check();
				break;
			case ACLTag.GroupObj:
				if (in_group_p(map_inode_gid(idmap, inode))) {
					found = true;
					if ((pa.perm & want) == want) __mask();
				}
				break;
			case ACLTag.Group:
				if (in_group_p(map_id(pa.id, ns.gid_map, idmap.gid_map))) {
					found = true;
					if ((pa.perm & want) == want) __mask();
				}
				break;
			case ACLTag.Mask:
				break;
			case ACLTag.Other:
				if (found) throw E.EACCES;
				else __check();
				break;
			default:
				throw E.EIO;
		}
	}
}
