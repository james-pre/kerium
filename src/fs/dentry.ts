// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { Inode } from './inode.js';
import type { Superblock } from './super.js';

export interface Dentry {
	readonly op: DentryOperations;
	name: string;
	inode: Inode;
	parent: Dentry;
	children: Dentry[];
	superblock: Superblock;
}

/**
 * @todo
 */
export enum DentryFlags {}

/**
 * @todo
 */
export interface DentryOperations {
	delete?(dir: Readonly<Dentry>): void;
	init?(dir: Dentry): void;
}
