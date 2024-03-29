const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~env', './env.ts'],
          ['~', './src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-console': 2,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/explicit-function-return-type': [
      1,
      { allowExpressions: true },
    ],
    'arrow-body-style': 0,
    'comma-dangle': [2, 'only-multiline'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'import/extensions': 0,
    'import/imports-first': 2,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/order': 0,
    'import/no-default-export': 1,
    'import/prefer-default-export': 0,
    'react/display-name': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-vars': 2,
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/prop-types': 0,
    'react/state-in-constructor': [2, 'never'],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-else-return': 2,
    'simple-import-sort/sort': [
      2,
      {
        groups: [
          ['^\\u0000'],
          ['^react$', '^react-native$'],
          ['^@?\\w'],
          ['^~env$'],
          ['^[^.]'],
          ['^\\../'],
          ['^\\.'],
        ],
      },
    ],
    'sort-imports': 0,
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 0,
      },
    },
  ],
};
