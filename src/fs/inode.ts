// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { Lock } from '../lock.js';
import type { ACL, ACLType } from './acl.js';
import type { Dentry } from './dentry.js';
import type { MountIDMap } from './idmapping.js';
import type { Superblock } from './super.js';

/**
 * Root inode
 * @hidden
 */
export const rootIno = 0;

/**
 * Inode flags
 * @see `S_*` in `include/linux/fs.h`
 */
export enum InodeFlag {
	/** Writes are synced at once */
	Sync = 1 << 0,
	/** Do not update access times */
	NoAtime = 1 << 1,
	/** Append-only file */
	Append = 1 << 2,
	/** Immutable file */
	Immutable = 1 << 3,
	/** removed, but still open directory */
	Dead = 1 << 4,
	/** Inode is not counted to quota */
	NoQuota = 1 << 5,
	/** Directory modifications are synchronous */
	Dirsync = 1 << 6,
	/** Do not update file c/mtime */
	NoCMtime = 1 << 7,
	/** Do not truncate: swapon got its bmaps */
	SwapFile = 1 << 8,
	/** Inode is fs-internal */
	Private = 1 << 9,
	/** Inode has an associated IMA struct */
	IMA = 1 << 10,
	/** Automount/referral quasi-directory */
	AutoMount = 1 << 11,
	/** no suid or xattr security attributes */
	NoSec = 1 << 12,
	/** Direct Access, avoiding the page cache */
	DAX = 1 << 13,
	/** Encrypted file (using fs/crypto/) */
	Encrypted = 1 << 14,
	/** Casefolded file */
	CaseFold = 1 << 15,
	/** Verity file (using fs/verity/) */
	Verity = 1 << 16,
	/** File is in use by the kernel (eg. fs/cachefiles) */
	KernelFile = 1 << 17,
}

/** User visible flags */
export const userVisibleFlags = 0x0003dfff;
/** User modifiable flags */
export const userModifiableFlags = 0x000380ff;

/**
 * @todo [share]
 */
export interface Inode {
	readonly op: InodeOperations;
	sb: Superblock;
	_lock: Lock;

	mode: number;
	opflags: number;
	uid: number;
	gid: number;
	flags: number;
	ino: bigint;
	nlink: number;
	rdev: number;
	size: bigint;
	atime_sec: bigint;
	mtime_sec: bigint;
	ctime_sec: bigint;
	atime_nsec: number;
	mtime_nsec: number;
	ctime_nsec: number;
	generation: number;
	blocks: number;
	/** @atomic */
	version: bigint;

	acl: ACL;
	default_acl: ACL;
}

export enum InodeOp {
	FastPerm = 1,
	Lookup = 1 << 1,
	NoFollow = 1 << 2,
	Xattr = 1 << 3,
	DefaultReadlink = 1 << 4,
	MGTime = 1 << 5,
	CachedLink = 1 << 6,
}

export interface InodeOperations {
	lookup(dir: Inode, _dentry: Dentry, flags: number): Promise<Dentry>;
	permission(idmap: MountIDMap, inode: Inode, mask: number): boolean | Promise<boolean>;
	get_inode_acl(inode: Inode, type: ACLType, cache: boolean): Promise<ACL>;
	get_acl(idmap: MountIDMap, dentry: Dentry, type: ACLType): Promise<ACL>;
	/**
	 * @todo finish this
	 */
}
