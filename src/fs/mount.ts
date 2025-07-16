// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { Dentry } from './dentry.js';
import type { MountIDMap } from './idmapping.js';
import type { Superblock } from './super.js';

/**
 * @see Linux include/linux/mount.h `vfsmount`
 */
export interface VFSMount {
	root: Dentry;
	sb: Superblock;
	flags: number;
	/**
	 * @todo look into `idmap`s more
	 */
	idMap: MountIDMap;
}

/**
 * @todo
 */
export interface Mountpoint {
	dentry: Dentry;
	count: number;
}

/**
 * @todo
 */
export interface Mount {
	parent: Mount;
	point: Dentry;
	mnt: VFSMount;
	mp: Mountpoint;
	id: number;
}
