import { Capability as Cap, capable_inode_id } from '../capability.js';
import { Errno as E } from '../error.js';
import { lock } from '../lock.js';
import { current, in_group_p } from '../task.js';
import {
	ACLType,
	check_posix_acl_permission,
	get_cached_acl_rcu,
	get_inode_acl,
	is_posix_acl,
	is_uncached_acl,
	type ACL,
} from './acl.js';
import { has_unmapped_id, map_inode_gid, map_inode_uid, type MountIDMap } from './idmapping.js';
import { InodeFlag, InodeOp as IOP, type Inode } from './inode.js';
import { mode_is, ModeFlag as S } from './stat.js';
import { SuperblockFlag as SB, type Superblock } from './super.js';

export enum May {
	Exec = 1,
	Write = 1 << 1,
	Read = 1 << 2,
	Append = 1 << 3,
	Access = 1 << 4,
	Open = 1 << 5,
	Chdir = 1 << 6,
	/** called from RCU mode, don't block */
	NotBlock = 1 << 7,
}

export async function check_acl(idmap: MountIDMap, inode: Inode, mask: number) {
	let acl: ACL | null;

	if (mask & May.NotBlock) {
		acl = get_cached_acl_rcu(inode, ACLType.Access);
		if (!acl) throw E.EAGAIN;

		if (is_uncached_acl(acl)) throw E.ECHILD;

		check_posix_acl_permission(idmap, inode, acl, mask);
	}

	acl = await get_inode_acl(inode, ACLType.Access);
}

export async function check_acl_permission(idmap: MountIDMap, inode: Inode, mask: number) {
	let mode = inode.mode;

	if (!(((mask & 7) * S.UGO_X) & ~mode)) {
		if (!inode.acl) return 0;
		if (!is_posix_acl(inode)) return 0;
	}

	if (map_inode_uid(idmap, inode) == current.cred.fsuid) {
		mask &= 7;
		mode >>= 6;
		if (mask & ~mode) throw E.EACCES;
	}

	if (is_posix_acl(inode) && mode & S.G_RWX) {
		try {
			await check_acl(idmap, inode, mask);
		} catch (e) {
			if (e != E.EAGAIN) throw e;
		}
	}

	mask &= 7;

	if (mask & (mode ^ (mode >> 3)) && in_group_p(map_inode_gid(idmap, inode))) {
		mode >>= 3;
	}

	if (mask & ~mode) throw E.EACCES;

	// check capabilities
}

/**
 * @todo Add more checks
 */
export async function check_generic_permission(idmap: MountIDMap, inode: Inode, mask: number) {
	try {
		await check_acl_permission(idmap, inode, mask);
	} catch (e) {
		if (e != E.EACCES) throw e;
	}

	if (
		mode_is(inode.mode, S.Dir)
		&& capable_inode_id(idmap, inode, mask & May.Write ? Cap.DAC_OVERRIDE : Cap.DAC_READ_SEARCH)
	) {
		return;
	}

	mask &= May.Read | May.Write | May.Exec;

	if (mask == May.Read && capable_inode_id(idmap, inode, Cap.DAC_READ_SEARCH)) return;

	if ((!(mask & May.Exec) || inode.mode & S.UGO_X) && capable_inode_id(idmap, inode, Cap.DAC_OVERRIDE)) return 0;

	throw E.EACCES;
}

export function check_sb_permission(sb: Superblock, inode: Inode, mask: number) {
	if (!(mask & May.Write)) return;

	const type: S = inode.mode & S.FileType;
	if (sb.flags & SB.Readonly && (type == S.Reg || type == S.Dir || type == S.Link)) throw E.EROFS;
}

export async function check_inode_permission(idmap: MountIDMap, inode: Inode, mask: number) {
	check_sb_permission(inode.sb, inode, mask);

	if (mask & May.Write) {
		if (inode.flags & InodeFlag.Immutable) throw E.EPERM;

		if (has_unmapped_id(idmap, inode)) throw E.EACCES;
	}

	if (inode.opflags & IOP.FastPerm) return await check_generic_permission(idmap, inode, mask);
	if (inode.op.permission) return await inode.op.permission(idmap, inode, mask);

	using _ = await lock(inode);
	inode.opflags |= IOP.FastPerm;
}
