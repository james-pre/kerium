// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { map_id, type IDMap } from '../namespaces.js';
import type { Inode } from './inode.js';

/**
 * @todo [share]
 */
export interface MountIDMap {
	uid_map: IDMap;
	gid_map: IDMap;
}

export function map_inode_uid(idmap: MountIDMap, inode: Readonly<Inode>): number {
	return map_id(inode.uid, inode.sb.user_ns.uid_map, idmap.uid_map);
}

export function map_inode_gid(idmap: MountIDMap, inode: Readonly<Inode>): number {
	return map_id(inode.gid, inode.sb.user_ns.gid_map, idmap.gid_map);
}

export function has_unmapped_id(idmap: MountIDMap, inode: Inode): boolean {
	return map_inode_uid(idmap, inode) == -1 || map_inode_gid(idmap, inode) == -1;
}

export const nop_mnt_idmap: MountIDMap = {
	uid_map: { extents: [] },
	gid_map: { extents: [] },
};
