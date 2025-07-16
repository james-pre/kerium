// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
/*
Copyright (c) 2025 James Prevett

Extracts syscalls from the Linux kernel and into a .d.ts file
*/
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { Worker } from 'node:worker_threads';
import { List } from 'utilium';

const {
	values: options,
	positionals: [kernelDir = '.'],
} = parseArgs({
	options: {
		output: { short: 'o', type: 'string' },
		'scan-all-files': { type: 'boolean', default: false },
		verbose: { short: 'w', type: 'boolean', default: false },
		header: { short: 'H', type: 'string' },
		footer: { short: 'F', type: 'string' },
	},
	allowPositionals: true,
});

const filePattern = /\.(c|h|cpp|cc|cxx)$/;

const excludedDirs = ['arch', 'Documentation', '.git'];

function findFiles(dir: string): string[] {
	const results: string[] = [];

	function recurse(current: string) {
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			// Skip unwanted directories
			if (excludedDirs.includes(entry.name)) continue;

			const fullPath = join(current, entry.name);
			if (entry.isDirectory()) {
				recurse(fullPath);
			} else if (
				entry.isFile() && options['scan-all-files'] ? filePattern.test(entry.name) : entry.name.endsWith('.c')
			) {
				results.push(fullPath);
			}
		}
	}
	recurse(dir);
	return results;
}

let files: string[];
try {
	files = findFiles(kernelDir);
} catch (e) {
	console.error('Error: Failed to resolve files' + (options.verbose ? ': ' + e : ''));
	process.exit(1);
}

// Distribute files among workers
const numWorkers = Math.min(cpus().length, files.length || 1);
const chunkSize = Math.ceil(files.length / numWorkers);
const fileChunks: string[][] = [];
for (let i = 0; i < files.length; i += chunkSize) {
	fileChunks.push(files.slice(i, i + chunkSize));
}

// Run workers and collect results

const functions: [string, string][] = [],
	structs = new List<string>(),
	enums = new List<string>(),
	types = new List<string>();

const workerPromises = fileChunks.map(chunk => {
	const { promise, resolve, reject } = Promise.withResolvers<void>();

	const worker = new Worker(new URL(import.meta.resolve('./linux-syscalls.worker.js')), {
		workerData: { files: chunk },
	});
	worker.on('message', result => {
		functions.push(...result.functions);
		structs.push(...result.structs);
		enums.push(...result.enums);
		types.push(...result.types);
		resolve();
	});
	worker.on('error', reject);

	return promise;
});

let contents = '';

const header = !options.header ? '' : readFileSync(options.header, 'utf-8');

contents += '\ntype Pointer<T> = T | T[];\n';

function header_has(kind: 'type' | 'struct' | 'enum', type: string): boolean {
	switch (kind) {
		case 'type':
			return new RegExp(`type ${type}\\s*=`).test(header);
		case 'struct':
			return new RegExp(`interface ${type}\\s*{`).test(header);
		case 'enum':
			return new RegExp(`const enum ${type}\\s*{`).test(header);
	}
}

contents += header;

await Promise.all(workerPromises);

for (const t of types) {
	if (header_has('type', t)) continue;
	contents += 'type ' + t + ' = unknown;\n';
}

for (const en of enums) {
	if (header_has('enum', en)) continue;
	contents += 'declare const enum ' + en + ' {}\n';
}

for (const struct of structs) {
	if (header_has('struct', struct)) continue;
	contents += 'interface ' + struct + ' {}\n';
}

for (const [fn, params] of functions) {
	contents += `declare function ${fn}(${params}): long;\n`;
}

if (options.footer) contents += readFileSync(options.footer, 'utf-8');

if (options.output) {
	writeFileSync(options.output, contents);
}
