// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
import { panic as __panic } from '@endo/panic';

/**
 * Halt ASAP.
 *
 * @todo Replace this with `Reflect.panic`
 * @see https://github.com/tc39/proposal-oom-fails-fast
 */
export function panic(message: string): never {
	// no cleanup work for now.

	__panic(new Error(message));
}
