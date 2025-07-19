// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import type { UserNamespace } from '../namespaces.js';

/**
 * @todo [share]
 */
export interface Superblock {
	user_ns: UserNamespace;
	flags: number;
}

/*
 * sb.flags. Note that these mirror the equivalent MS flags where represented in both.
 */
export enum SuperblockFlag {
	/** Mount read-only */
	Readonly = 0,
	/** Ignore suid and sgid bits */
	NoSuid = 1,
	/** Disallow access to device special files */
	NoDev = 2,
	/** Disallow program execution */
	NoExec = 3,
	/** Writes are synced at once */
	Synchronous = 4,
	/** Allow mandatory locks on an FS */
	Mandlock = 6,
	/** Directory modifications are synchronous */
	DirSync = 7,
	/** Do not update access times. */
	NoAtime = 10,
	/** Do not update directory access times */
	NoDirAtime = 11,
	Silent = 15,
	/** Supports POSIX ACLs */
	PosixACL = 16,
	/** Use blk-crypto for encrypted files */
	InlineCrypt = 17,
	/** this is a kern_mount call */
	KernMount = 22,
	/** Update inode I_version field */
	I_Version = 23,
	/** Update the on-disk [acm]times lazily */
	Lazytime = 25,

	// These sb flags are internal to the kernel
	Dead = 21,
	Dying = 24,
	Force = 27,
	NoSec = 28,
	Born = 29,
	Active = 30,
	NoUser = 31,
}
