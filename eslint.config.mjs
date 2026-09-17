import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
	// migrated from .eslintignore
	{ ignores: ["node_modules/", "main.js"] },
	js.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
			globals: { ...globals.node },
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			// tsc already checks undefined names for TS (replaces the old
			// plugin:@typescript-eslint/eslint-recommended override)
			"no-undef": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
			"@typescript-eslint/ban-ts-comment": "off",
			"no-prototype-builtins": "off",
			"@typescript-eslint/no-empty-function": "off",
		},
	},
];
