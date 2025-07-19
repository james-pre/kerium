// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { current } from '../task.js';
import type { Path } from './path.js';

/**
 * @todo [share] (maybe? these might likely be thread-local)
 */
export interface Handle {
	readonly flags: number;
	readonly path: Path;
	readonly fd?: number;
}

export function get_handle(path: Path, flags: number): Handle {
	const handle = Object.freeze({
		task: current,
		flags,
		path,
	});

	return handle;
}
