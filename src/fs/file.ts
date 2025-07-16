import type { Credentials } from '../credentials.js';
import type { Lock } from '../lock.js';
import type { KModule } from '../module.js';
import type { Inode } from './inode.js';
import type { Path } from './path.js';

/**
 * @see Linux include/linux/fs.h `struct file`
 */
export interface File {
	lock: Lock;
	mode: number;
	inode: Inode;
	flags: number;
	readonly cred: Credentials;
	path: Path;
	position: bigint;
}

export interface FileOperations {
	owner: KModule;
	flags: number;
	seek?(file: File, offset: bigint, whence: number): Promise<void>;
	read?(file: File, buf: Uint8Array, offset: bigint, length: number): Promise<number>;
	write?(file: File, buf: Uint8Array, offset: bigint, length: number): Promise<number>;
	// this "fills in" the passed file
	open?(inode: Inode, mode: number, file: File): Promise<void>;
	read_iter?(): IterableIterator<Uint8Array>;
	// ...
	/**
	 * @todo finish this
	 */
}
