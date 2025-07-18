// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
/**
 * Copyright (c) 2025 James Prevett
 *
 * @see https://www.kernel.org/doc/html/latest/locking/index.html
 */

import type { Task } from './task.js';

// Placeholder.
interface _raw_lock {}

/**
 * @todo
 * @todo Convert to a shared struct and use shared `Mutex`es (see https://github.com/tc39/proposal-structs)
 */
export interface Lock {
	wait: _raw_lock;
	waiters: any[];
	owner: Task;
}

/**
 * Basically a no-op until we get language support for `Mutex` and shared structs.
 * We could also try to implement this ourself but that is a lot of work,
 * and it is coming to the language anyway.
 * For now, just focus on other parts of the kernel.
 */
export function lock(value: { _lock: Lock }): Disposable {
	function __unlock() {}

	return Object.assign(__unlock, {
		[Symbol.dispose]: __unlock,
	});
}
