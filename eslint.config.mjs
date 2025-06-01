import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ignoredFolders = globalIgnores([
  './.next/*',
  './prisma/*',
  './node_modules/*',
  'src/generated/*',
]);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['src/**/*.{js,ts,jsx,tsx}', 'lib/**/*.{js,ts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      ...eslintConfigPrettier.rules, //
      'prettier/prettier': 'warn', //
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  ignoredFolders,
];

export default eslintConfig;
