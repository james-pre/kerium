// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { DEntry } from './dentry.js';
import type { Mount } from './mount.js';

export interface Path {
	mnt: Mount;
	dentry: DEntry;
}
