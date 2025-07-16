import type { DEntry } from './dentry.js';
import type { Mount } from './mount.js';

export interface Path {
	mnt: Mount;
	dentry: DEntry;
}
