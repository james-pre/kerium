// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

/**
 * @todo
 */
export class Lock {
	wait: raw_lock;
	waiters: __RBTree_Root;
	owner: _task_struct;
}
