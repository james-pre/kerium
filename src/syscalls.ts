// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { Errno as E, strerror, type Errno } from './error.js';
import { warn } from './log.js';
import type { Task } from './task.js';

export type Syscall = (this: Task, ...args: any[]) => any;

/**
 * Augment this when defining syscalls.
 */
export interface Syscalls extends Record<string, Syscall> {}

export const syscalls = Object.create(null) as Syscalls;

const expected_name = /[\w_]+/i;

export function define_syscall<const Name extends keyof Syscalls>(handler: Syscalls[Name]): void {
	if (!expected_name.test(handler.name)) warn('Syscall name is not a normal identifier: ' + handler.name);
	if (handler.name in syscalls) throw new Error('Syscall is already defined: ' + handler.name);
	Object.defineProperty(syscalls, handler.name, {
		value: handler,
		enumerable: true,
		writable: false,
		configurable: false,
	});
}

class SyscallError extends Error {
	readonly name = 'SyscallError';

	constructor(public readonly code: Errno) {
		const message = strerror(code);
		super(message);
		Error.captureStackTrace?.(this, do_syscall);
	}
}

export type { SyscallError };

export function do_syscall<const Name extends keyof Syscalls>(
	task: Task,
	name: Name,
	...args: Parameters<Syscalls[Name]>
): ReturnType<Syscalls[Name]> {
	const syscall = syscalls[name];
	if (!syscall) throw new SyscallError(E.ENOSYS);

	try {
		return syscall.apply(task, args);
	} catch (ex: unknown) {
		throw new SyscallError(ex as Errno);
	}
}
