// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
/*
	Copyright (c) 2025 James Prevett
 
	This file include declarations for APIs that are usually available in any JS host.
	These APIs aren't standardized, so TypeScript doesn't include them by default.
	We avoid include DOM types or @types/node since they add a bunch of stuff we don't want (like making a global `Buffer` class available).
*/

declare global {
	const performance: {
		now(): number;
	};

	const console: Record<'error' | 'warn' | 'info' | 'debug' | 'log', (...message: any[]) => void>;

	interface ErrorConstructor {
		captureStackTrace?(targetObject: object, constructorOpt?: Function): void;
	}
}
