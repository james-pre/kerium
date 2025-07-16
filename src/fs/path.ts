// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import { Errno as E } from '../error.js';
import { define_syscall } from '../syscalls.js';
import type { Task } from '../task.js';
import type { Dentry } from './dentry.js';
import type { VFSMount } from './mount.js';

export interface Path {
	mnt: VFSMount;
	dentry: Dentry;
}

declare module '../syscalls.js' {
	interface Syscalls {
		get_cwd(): string;
	}
}

define_syscall<'get_cwd'>(function get_cwd(this: Task): string {
	/*
	using _ = lock(this.fs);
	 
	if (is_unlinked(this.pwd.dentry)) throw ENOENT;
	return join(root, pwd);
	*/
	return '';
});
