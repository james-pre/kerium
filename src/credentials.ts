// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

/**
 * Credentials used for various operations.
 * Similar to Linux's cred struct.
 * @see Linux include/linux/cred.h
 * @todo capabilities?
 */
export interface Credentials {
	uid: number;
	gid: number;
	suid: number;
	sgid: number;
	euid: number;
	egid: number;
	fsuid: number;
	fsgid: number;
	/**
	 * List of group IDs.
	 */
	groups: number[];
}

/**
 * Initialization for a set of credentials
 */
export interface CredentialsInit extends Partial<Credentials> {
	uid: number;
	gid: number;
}

/**
 */
export function createCredentials(source: CredentialsInit): Credentials {
	return {
		suid: source.uid,
		sgid: source.gid,
		euid: source.uid,
		egid: source.gid,
		fsuid: source.uid,
		fsgid: source.gid,
		groups: [],
		...source,
	};
}

/**
 * Returns true if the credentials can be used for an operation that requires root privileges.
 * @internal
 */
export function credentialsAllowRoot(cred?: Credentials): boolean {
	if (!cred) return false;
	return !cred.uid || !cred.gid || !cred.euid || !cred.egid || cred.groups.some(gid => !gid);
}
