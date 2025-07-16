// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
export interface Stat {
	/** Device.  */
	dev: bigint;
	/** File serial number.  */
	ino: bigint;
	/** File mode.  */
	mode: number;
	/** Link count.  */
	nlink: number;
	/** User ID of the file's owner.  */
	uid: number;
	/** Group ID of the file's group. */
	gid: number;
	/** Device number, if device.  */
	rdev: bigint;
	/** Size of file, in bytes.  */
	size: bigint;
	/** Optimal block size for I/O.  */
	blksize: number;
	/** Number of 512B blocks allocated.  */
	blocks: bigint;
	/** Time of last access.  */
	atime: bigint;
	atime_nsec: bigint;
	/** Time of last modification.  */
	mtime: bigint;
	mtime_nsec: bigint;
	/** Time of last status change.  */
	ctime: bigint;
	ctime_nsec: bigint;
}
