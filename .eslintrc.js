// This config is meant for projects consisting entirely of Typescript. It
// explicitly ignores JS files, because JS rules do strange things to type
// definitions.

// Symbol used to add names to config array entries, which would
// otherwise be difficult to find for modification.
const ConfigSection = Symbol.for('ConfigSection');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // Prettier Exclusions (should be last)
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'latest',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'shared-node-browser': true,
    commonjs: true,
    es2017: true, // Node >= 10
    jest: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
  },
  overrides: [
    {
      [ConfigSection]: 'override.js',
      files: ['*.js', '*.jsx'],
      rules: {
        // Allow CommonJS requires in plain JS.
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
