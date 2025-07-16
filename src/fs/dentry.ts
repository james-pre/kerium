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
