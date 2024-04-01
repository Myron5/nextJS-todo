const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '/tsconfig.json');

module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // project: './backend/tsconfig.json',
    project: dirPath,
    sourceType: 'module'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx']
    }
  ]
};
