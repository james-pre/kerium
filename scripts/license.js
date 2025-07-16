#!/usr/bin/env node
// SPDX-License-Identifier: GPL-3.0-or-later WITH EXCEPTIONS
// Copyright (c) 2025 James Prevett

import { readdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseArgs, styleText } from 'node:util';

const {
	positionals: dirs,
	values: { license: expectedLicense, write, verbose, force },
} = parseArgs({
	allowPositionals: true,
	options: {
		license: { type: 'string', short: 'L' },
		write: { type: 'boolean', short: 'w', default: false },
		verbose: { type: 'boolean', short: 'v', default: false },
		force: { type: 'boolean', short: 'f', default: false },
	},
});

if (write && !expectedLicense) {
	console.error(styleText('red', 'You must specify a license to write with --license/-L'));
	process.exit(1);
}

const licenseSpec = /^\s*\/(?:\/|\*) SPDX-License-Identifier: (.+)/;

async function check_file(path, display) {
	const content = await readFile(path, 'utf-8');

	const match = licenseSpec.exec(content);

	if (!match) {
		console.error(styleText('red', 'Missing:'), display);
		return 'missing';
	}

	if (!expectedLicense) {
		if (verbose) console.log(styleText(['dim'], 'Found: ') + display);
		return 'with license';
	}

	const [, license] = match;

	if (license == expectedLicense) {
		if (verbose) console.log(styleText(['green', 'dim'], 'Correct: ') + display);
		return 'correct';
	}

	console.warn(styleText('yellow', 'Mismatch:'), display);
	return 'mismatched';
}

async function write_file(path, display) {
	const content = await readFile(path, 'utf-8');

	const match = licenseSpec.exec(content);

	if (!match) {
		await writeFile(path, `// SPDX-License-Identifier: ${expectedLicense}\n${content}`, 'utf-8');

		console.log('Added: ' + display);
		return 'added';
	}

	const [, license] = match;

	if (license == expectedLicense) {
		if (verbose) console.log(styleText(['green', 'dim'], 'Correct: ') + display);
		return 'correct';
	}

	process.stdout.write(styleText('yellow', 'Mismatch: ') + display);

	if (!force) {
		console.log(styleText('whiteBright', ' (skipped)'));
		return 'skipped';
	}

	await writeFile(path, content.replace(licenseSpec, `// SPDX-License-Identifier: ${expectedLicense}`), 'utf-8');
	console.log(styleText('whiteBright', ' (overwritten)'));
	return 'overwritten';
}

function check_dir(dir, display) {
	const entries = readdirSync(dir, { withFileTypes: true });

	const results = [];

	for (const entry of entries) {
		if (entry.isDirectory()) {
			results.push(...check_dir(join(dir, entry.name), join(display, entry.name)));
			continue;
		}

		if (!entry.isFile()) continue;

		const op = write ? write_file : check_file;
		results.push(op(join(dir, entry.name), join(display, entry.name)));
	}

	return results;
}

if (!dirs.length) dirs.push(join(import.meta.dirname, '../src'));

if (verbose) console.log('Checking:', dirs.join(', '));

const promises = [];

for (const dir of dirs) {
	promises.push(...check_dir(dir, relative(join(import.meta.dirname, '..'), dir)));
}

const styles = Object.assign(Object.create(null), {
	missing: 'red',
	'with license': 'white',
	correct: 'green',
	mismatched: 'yellow',
	skipped: 'white',
	added: 'cyan',
	overwritten: 'magenta',
});

try {
	const raw_results = await Promise.all(promises);
	const results = Object.create(null);
	for (const result of raw_results) {
		if (!(result in results)) results[result] = 0;
		results[result]++;
	}
	console.log(
		write ? 'Wrote' : 'Checked',
		styleText('blueBright', raw_results.length.toString()),
		'files:',
		Object.entries(results)
			.map(([key, value]) => `${key in styles ? styleText(styles[key], value.toString()) : value} ${key}`)
			.join(', ')
	);
} catch (error) {
	console.error(styleText('red', error.toString()));
	process.exit(1);
}
