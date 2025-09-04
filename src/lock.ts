// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
/**
 * Copyright (c) 2025 James Prevett
 *
 * @see https://www.kernel.org/doc/html/latest/locking/index.html
 */

import { Errno } from './error.js';
import type { Task } from './task.js';

declare class __UnlockToken {
	constructor();
	get locked(): boolean;
	unlock(): boolean;
	[Symbol.dispose](): undefined;
}

declare class __Mutex {
	constructor();
	static lock(mutex: __Mutex, unlockToken?: __UnlockToken): __UnlockToken;
	static lockIfAvailable(mutex: __Mutex, timeout: Number, unlockToken?: __UnlockToken): __UnlockToken | null;
	static UnlockToken: typeof __UnlockToken;
}

declare global {
	interface Atomics {
		Mutex: typeof __Mutex;
	}
}

/**
 * @todo
 * @todo Convert to a shared struct and use shared `Mutex`es (see https://github.com/tc39/proposal-structs)
 */
export interface Lock {
	mutex: __Mutex;
	waiters: any[];
	owner: Task;
}

/**
 * Basically a no-op until we get language support for `Mutex` and shared structs.
 * We could also try to implement this ourself but that is a lot of work,
 * and it is coming to the language anyway.
 * For now, just focus on other parts of the kernel.
 */
export async function lock(value: { _lock: Lock }): Promise<__UnlockToken> {
	const mutex = value._lock.mutex;
	const token = Atomics.Mutex.lockIfAvailable(mutex, 500);
	if (token == null) throw Errno.EBUSY;
	return token;
}
