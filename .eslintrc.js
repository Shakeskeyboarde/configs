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
    // Node >= 12
    //
    // This can be changed to 2021 if this is a web project which uses core-js
    // (ie. Webpack or Microbundle).
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'shared-node-browser': true,
    commonjs: true,
    // Node >= 12
    //
    // Node 12 actually supports es2019, but there isn't an es2019 option.
    //
    // This can be replaced with the es2021 environment if this is a web
    // project which uses core-js (ie. Webpack or Microbundle).
    es2017: true,
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
