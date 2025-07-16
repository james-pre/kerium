export interface Statsfs {
	type: bigint;
	bsize: bigint;
	blocks: bigint;
	bfree: bigint;
	bavail: bigint;
	files: bigint;
	ffree: bigint;
	fsid: bigint;
	namelen: bigint;
	frsize: bigint;
	flags: bigint;
}

/*
 * Definitions for the flags in Statsfs.
 *
 * Generally these flags are equivalent to the MS_ flags used in the mount API.
 * The exception is `VALID` which has the same value as MS_REMOUNT which doesn't make any sense for statfs.
 */
export enum statfs_flags {
	/** mount read-only  */
	RDONLY = 0x0001,
	/** ignore suid and sgid bits  */
	NOSUID = 0x0002,
	/** disallow access to device special files  */
	NODEV = 0x0004,
	/** disallow program execution  */
	NOEXEC = 0x0008,
	/** writes are synced at once  */
	SYNCHRONOUS = 0x0010,
	/** f_flags support is implemented  */
	VALID = 0x0020,
	/** allow mandatory locks on an FS  */
	MANDLOCK = 0x0040,
	/* 0x0080 used for ST_WRITE in glibc */
	/* 0x0100 used for ST_APPEND in glibc */
	/* 0x0200 used for ST_IMMUTABLE in glibc */
	/** do not update access times  */
	NOATIME = 0x0400,
	/** do not update directory access times  */
	NODIRATIME = 0x0800,
	/** update atime relative to mtime/ctime  */
	RELATIME = 0x1000,
	/** do not follow symlinks  */
	NOSYMFOLLOW = 0x2000,
}
