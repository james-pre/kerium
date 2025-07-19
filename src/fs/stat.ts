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

export enum ModeFlag {
	FileType = 0xf000,
	Socket = 0xc000,
	Link = 0xa000,
	Reg = 0x8000,
	Block = 0x6000,
	Dir = 0x4000,
	Char = 0x2000,
	FIFO = 0x1000,
	SetUid = 0o4000,
	SetGid = 0o2000,
	Sticky = 0o1000,

	// Permissions
	U_RWX = 0o700,
	U_R = 0o400,
	U_W = 0o200,
	U_X = 0o100,
	G_RWX = 0o70,
	G_R = 0o40,
	G_W = 0o20,
	G_X = 0o10,
	O_RWX = 0o7,
	O_R = 0o4,
	O_W = 0o2,
	O_X = 0o1,

	// More perm. combos
	UGO_R = U_R | G_R | O_R,
	UGO_W = U_W | G_W | O_W,
	UGO_X = U_X | G_X | O_X,
	UGO_RWX = U_RWX | G_RWX | O_RWX,
}

export function mode_is(mode: number, flag: ModeFlag): boolean {
	return (flag & ModeFlag.FileType ? ModeFlag.FileType : flag) == flag;
}

export const S_isSock = (mode: number): boolean => mode_is(mode, ModeFlag.Socket);
export const S_isLink = (mode: number): boolean => mode_is(mode, ModeFlag.Link);
export const S_isReg = (mode: number): boolean => mode_is(mode, ModeFlag.Reg);
export const S_isBlock = (mode: number): boolean => mode_is(mode, ModeFlag.Block);
export const S_isDir = (mode: number): boolean => mode_is(mode, ModeFlag.Dir);
export const S_isChar = (mode: number): boolean => mode_is(mode, ModeFlag.Char);
export const S_isFIFO = (mode: number): boolean => mode_is(mode, ModeFlag.FIFO);
