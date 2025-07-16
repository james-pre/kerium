import shared from 'utilium/eslint';

export default [
	...shared(import.meta.dirname),
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-implied-eval': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-duplicate-enum-values': 'off',
			'@typescript-eslint/only-throw-error': 'off',
		},
	},
];
