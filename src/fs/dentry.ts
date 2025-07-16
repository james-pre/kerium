// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett
import type { Inode } from './inode.js';
import type { Superblock } from './super.js';

export interface DEntry {
	name: string;
	inode: Inode;
	parent: DEntry;
	children: DEntry[];
	superblock: Superblock;
}

export enum DentryFlags {}
