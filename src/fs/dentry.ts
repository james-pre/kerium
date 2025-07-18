// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { Lock } from '../lock.js';
import type { Inode } from './inode.js';
import type { Superblock } from './super.js';

export interface Dentry {
	_lock: Lock;
	readonly op: DentryOperations;
	flags: number;
	name: string;
	inode: Inode;
	parent: Dentry;
	children: Dentry[];
	superblock: Superblock;
}

/**
 * @todo
 */
export enum DentryFlags {
	OP_HASH = 1 << 0,
	OP_COMPARE = 1 << 1,
	OP_REVALIDATE = 1 << 2,
	OP_DELETE = 1 << 3,
	OP_PRUNE = 1 << 4,
	DISCONNECTED = 1 << 5,
	/** Recently used, don't discard. */
	REFERENCED = 1 << 6,
	/** Purge from memory on final dput() */
	DONTCACHE = 1 << 7,
	CANT_MOUNT = 1 << 8,
	GENOCIDE = 1 << 9,
	SHRINK_LIST = 1 << 10,
	OP_WEAK_REVALIDATE = 1 << 11,
	/*
	 * this dentry has been "silly renamed" and has to be deleted on the
	 * last dput()
	 */
	NFSFS_RENAMED = 1 << 12,
	/** Parent inode is watched by some fsnotify listener */
	FSNOTIFY_PARENT_WATCHED = 1 << 13,
	DENTRY_KILLED = 1 << 14,
	/** is a mountpoint */
	MOUNTED = 1 << 15,
	/** handle automount on this dir */
	NEED_AUTOMOUNT = 1 << 16,
	/** manage transit from this dirent */
	MANAGE_TRANSIT = 1 << 17,
	LRU_LIST = 1 << 18,
	/** bits 19..21 are for storing type: */
	ENTRY_TYPE = 7 << 19,
	/** Negative dentry */
	MISS_TYPE = 0 << 19,
	/** Whiteout dentry (stop pathwalk) */
	WHITEOUT_TYPE = 1 << 19,
	/** Normal directory */
	DIRECTORY_TYPE = 2 << 19,
	/** Lookupless directory (presumed automount) */
	AUTODIR_TYPE = 3 << 19,
	/** Regular file type */
	REGULAR_TYPE = 4 << 19,
	/** Other file type */
	SPECIAL_TYPE = 5 << 19,
	/** Symlink */
	SYMLINK_TYPE = 6 << 19,
	/** Encrypted name encoded without key */
	NOKEY_NAME = 1 << 22,
	OP_REAL = 1 << 23,
	/** being looked up (with parent locked shared) */
	PAR_LOOKUP = 1 << 24,
	DENTRY_CURSOR = 1 << 25,
	/** No RCU delay for freeing */
	NORCU = 1 << 26,
}

/**
 * @todo
 */
export interface DentryOperations {
	delete?(dir: Readonly<Dentry>): void;
	init?(dir: Dentry): void;
}
