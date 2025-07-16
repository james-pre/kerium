// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

const _NSIG = 64;

export enum Sig {
	HUP = 1,
	INT = 2,
	QUIT = 3,
	ILL = 4,
	TRAP = 5,
	ABRT = 6,
	IOT = 6,
	BUS = 7,
	FPE = 8,
	KILL = 9,
	USR1 = 10,
	SEGV = 11,
	USR2 = 12,
	PIPE = 13,
	ALRM = 14,
	TERM = 15,
	STKFLT = 16,
	CHLD = 17,
	CONT = 18,
	STOP = 19,
	TSTP = 20,
	TTIN = 21,
	TTOU = 22,
	URG = 23,
	XCPU = 24,
	XFSZ = 25,
	VTALRM = 26,
	PROF = 27,
	WINCH = 28,
	IO = 29,
	POLL = IO,
	/*
#define SIGLOST		29
*/
	PWR = 30,
	SYS = 31,
	UNUSED = 31,
}

/* These should not be considered constants from userland.  */
const SIG_RT_MIN = 32;
const SIG_RT_MAX = _NSIG;
