// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import type { Credentials } from './credentials.js';
import type { File } from './fs/file.js';
import type { Path } from './fs/path.js';
import type { Lock } from './lock.js';
import type { Sig } from './signal.js';

/**
 * @todo
 */
export interface Files {
	_lock: Lock;
	next_fd: number;
	fd: File[];
}

/**
 * @todo
 */
export interface Task {
	flags: number;
	exit_state: number;
	exit_code: number;
	exit_signal: Sig;
	pid: number;
	tgid: number;
	real_parent: Task;
	parent: Task;
	children: Task[];
	readonly real_cred: Credentials;
	readonly cred: Credentials;
	fs: {
		_lock: Lock;
		root: Path;
		pwd: Path;
	};
	files: Files;
}
