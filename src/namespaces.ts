// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

/**
 * @todo [share]
 */
export interface IDMapExtent {
	first: number;
	lower_first: number;
	count: number;
}

/**
 * Map UIDs or GIDs from one range to another.
 * @todo consider
 * @todo [share]
 */
export interface IDMap {
	extents: IDMapExtent[];
}

export function map_id(id: number, from: IDMap, to: IDMap): number {
	/*
	if(to == nop_idmap) return id;
	if (idmap == invalid_idmap) return -1;
	if (is_initial_mapping(from)) return id;
	

	*/
	return id;
}

export function map_id_range(dir: 'up' | 'down', map: IDMap, id: number, count: number): number {
	const id2 = id + count - 1;

	for (const extent of map.extents) {
		const [first, off] = dir === 'up' ? [extent.lower_first, extent.first] : [extent.first, extent.lower_first];

		const last = first + extent.count - 1;
		if (id < first || id > last || id2 < first || id2 > last) continue;

		return id - first + off;
	}

	return -1;
}

export function map_id_up(map: IDMap, id: number): number {
	return map_id_range('up', map, id, 1);
}

export function map_id_down(map: IDMap, id: number): number {
	return map_id_range('down', map, id, 1);
}

/**
 * @todo [share]
 */
export interface UserNamespace {
	uid_map: IDMap;
	gid_map: IDMap;
}

export let current_user_ns: UserNamespace;
