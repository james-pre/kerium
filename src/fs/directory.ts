// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { define_syscall } from '../syscalls.js';
import { current } from '../task.js';
import type { Dentry } from './dentry.js';
import type { Handle } from './handle.js';

async function _mkdir_at(at: Dentry, path: string, mode: number): Promise<void> {
	/*
	
	lock(task stuff)

	check_permissions(task)

	actually_create()

	
	
	*/
}

define_syscall<'mkdir'>(function mkdir(path: string, mode: number): Promise<void> {
	return _mkdir_at(current.fs.pwd.dentry!, path, mode);
});

define_syscall<'mkdir_at'>(function mkdir_at(dir: Handle, path: string, mode: number): Promise<void> {
	const at = dir.path.dentry!;
	return _mkdir_at(at, path, mode);
});

define_syscall<'rmdir'>(async function rmdir(path: string): Promise<void> {
	return;
});
