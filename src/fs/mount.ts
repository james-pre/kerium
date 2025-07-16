// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { DEntry } from './dentry.js';
import type { MountIDMap } from './idmapping.js';
import type { Superblock } from './super.js';

/**
 * @see Linux include/linux/mount.h `vfsmount`
 */
export interface Mount {
	root: DEntry;
	sb: Superblock;
	flags: number;
	/**
	 * @todo look into `idmap`s more
	 */
	idMap: MountIDMap;
}
