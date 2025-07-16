// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import type { Task } from './task.js';

// Placeholder.
interface _raw_lock {}

/**
 * @todo
 */
export interface Lock {
	wait: _raw_lock;
	waiters: any[];
	owner: Task;
}
