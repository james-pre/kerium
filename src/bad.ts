// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
import { emerg } from './log.js';
import { panic as __panic } from '@endo/panic';

/**
 * Halt ASAP.
 *
 * @todo Replace this with `Reflect.panic`
 * @see https://github.com/tc39/proposal-oom-fails-fast
 */
export function panic(message: string): never {
	// no cleanup work for now.
	// TODO: "bust" all currently held locks

	__panic(new Error(message));
}

export function BUG(): never {
	const stack = new Error().stack?.split('\n').slice(1).join('\n');
	emerg('BUG: failure' + stack);
	panic('BUG!');
}

export function BUG_ON(condition: unknown): asserts condition {
	if (condition) BUG();
}
