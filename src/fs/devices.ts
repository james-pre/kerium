// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { define_syscall } from '../syscalls.js';
import { current } from '../task.js';
import type { Dentry } from './dentry.js';
import type { Handle } from './handle.js';

/**
 * @todo
 */
async function _mknod_at(at: Dentry, path: string, mode: number, dev: number): Promise<void> {
	//
}

define_syscall<'mknod'>(function mknod(path: string, mode: number, dev: number): Promise<void> {
	return _mknod_at(current.fs.pwd.dentry!, path, mode, dev);
});

define_syscall<'mknod_at'>(async function mknod_at(
	dir: Handle,
	path: string,
	mode: number,
	dev: number
): Promise<void> {
	const dentry = dir.path.dentry!;
	return _mknod_at(dentry, path, mode, dev);
});
