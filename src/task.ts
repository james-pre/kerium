// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import type { Credentials } from './credentials.js';
import type { Handle } from './fs/handle.js';
import type { Path } from './fs/path.js';
import type { Lock } from './lock.js';
import type { Sig } from './signal.js';

/*
 * Per process flags
 */
export enum TaskFlag {
	/** I'm a virtual CPU */
	VCPU = 0x00000001,
	/** I am an IDLE thread */
	IDLE = 0x00000002,
	/** Getting shut down */
	EXITING = 0x00000004,
	/** Coredumps should ignore this task */
	POSTCOREDUMP = 0x00000008,
	/** Task is an IO worker */
	IO_WORKER = 0x00000010,
	/** I'm a workqueue worker */
	WQ_WORKER = 0x00000020,
	/** Forked but didn't exec */
	FORKNOEXEC = 0x00000040,
	/** Process policy on mce errors */
	MCE_PROCESS = 0x00000080,
	/** Used super-user privileges */
	SUPERPRIV = 0x00000100,
	/** Dumped core */
	DUMPCORE = 0x00000200,
	/** Killed by a signal */
	SIGNALED = 0x00000400,
	/** Allocating memory to free memory. See memalloc_noreclaim_save() */
	MEMALLOC = 0x00000800,
	/** set_user() noticed that RLIMIT_NPROC was exceeded */
	NPROC_EXCEEDED = 0x00001000,
	/** If unset the fpu must be initialized before use */
	USED_MATH = 0x00002000,
	/** Kernel thread cloned from userspace thread */
	USER_WORKER = 0x00004000,
	/** This thread should not be frozen */
	NOFREEZE = 0x00008000,
	/** I am kcompactd */
	KCOMPACTD = 0x00010000,
	/** I am kswapd */
	KSWAPD = 0x00020000,
	/** All allocations inherit GFP_NOFS. See memalloc_nfs_save() */
	MEMALLOC_NOFS = 0x00040000,
	/** All allocations inherit GFP_NOIO. See memalloc_noio_save() */
	MEMALLOC_NOIO = 0x00080000,
	/** Throttle writes only against the bdi I write to,I am cleaning dirty pages from some other bdi. */
	LOCAL_THROTTLE = 0x00100000,
	/** I am a kernel thread */
	KTHREAD = 0x00200000,
	/** Randomize virtual address space */
	RANDOMIZE = 0x00400000,
	__HOLE__00800000 = 0x00800000,
	__HOLE__01000000 = 0x01000000,
	__HOLE__02000000 = 0x02000000,
	/** Userland is not allowed to meddle with cpus_mask */
	NO_SETAFFINITY = 0x04000000,
	/** Early kill for mce process policy */
	MCE_EARLY = 0x08000000,
	/** Allocations constrained to zones which allow long term pinning. See memalloc_pin_save() */
	MEMALLOC_PIN = 0x10000000,
	/** plug has ts that needs updating */
	BLOCK_TS = 0x20000000,
	__HOLE__40000000 = 0x40000000,
	/** This thread called freeze_processes() and should not be frozen */
	SUSPEND_TASK = 0x80000000,
}

/**
 * @todo finish implementing
 * @todo [share]
 */
export interface Task {
	flags: number;
	exit_state: number;
	exit_code: number;
	exit_signal: Sig;
	pid: number;
	tgid: number;
	real_parent: Task;
	parent: Task;
	children: Task[];
	readonly real_cred: Credentials;
	readonly cred: Credentials;
	fs: {
		_lock: Lock;
		root: Path;
		pwd: Path;
	};
	files: {
		_lock: Lock;
		next_fd: number;
		fd: Handle[];
	};
}

/**
 * The current task running on this thread.
 *
 * This variable is not shared between threads!
 */
export let current: Task;

export function in_group_p(id: number) {
	const { cred } = current;

	return id == cred.fsgid || cred.groups.includes(id);
}
