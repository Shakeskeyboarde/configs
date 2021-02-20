# Dependencies

Dependencies with install commands and associated config files.

_Some of the config files are "parameterized" using the `package.json` file [config](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#config) object. This does require that you invoke the tool using an `npm run` or `npm exec` command, which will expose those config values as environment variables._

## Prerequisites

You should already have Git, NPM, and VSCode installed. But, they still have per-project config files.

- [.gitignore](.gitignore)
- [.npmignore](.npmignore)
- [.vscode](.vscode)

## Scripting

The following dependencies are commonly used in `package.json` file `scripts` entries, and should be installed in most projects.

```bash
npm i -D \
  cross-env \
  del-cli
```

## Prettier

```bash
npm i -D \
  @types/prettier \
  prettier
```

- [.prettierrc.js](.prettierrc.js)

## ESLint

```bash
npm i -D \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-react
```

- [.eslintrc.js](.eslintrc.js)
  - You can add `node: true` or `browser: true` to the `env` object if you intend to support only Node.js or only

## Babel

```bash
npm i -D \
  @babel/cli \
  @babel/core \
  @babel/plugin-proposal-class-properties \
  @babel/plugin-proposal-object-rest-spread \
  @babel/preset-env \
  @babel/preset-react \
  @babel/preset-typescript
```

- [babel.config.js](babel.config.js)

### CoreJS

Optionally install polyfills as **normal** (non-dev) dependencies.

Generally, these _should_ be installed for web libraries and SPA projects, but _not_ for NodeJS libraries and CLI projects. NodeJS API support is better determined by including the correct version of the `@types/node` package.

```bash
npm i \
  core-js \
  regenerator-runtime
```

## Typescript

```bash
npm i -D \
  # You can change the Node.js types version to the lowest version you
  # plan to support in your project.
  @types/node@^12 \
  typescript
```

- [tsconfig.json](tsconfig.json)
  - The `rootDir`, `outDir`, and `include` values in a `tsconfig.json` file are relative _to the config file._ If you extend this config (or any config) instead of copying it, you will need to override those values in the final config, or your input/output paths will be buried in your `node_modules` directory.

## Jest

```bash
npm i -D \
  @types/jest \
  babel-jest \
  jest
```

- [__mocks__](__mocks__)
- [jest.config.js](jest.config.js)
- [jest.setup.js](jest.setup.js)

## Webpack

```bash
npm i -D \
  babel-loader \
  compression-webpack-plugin \
  copy-webpack-plugin \
  css-loader \
  file-loader \
  html-webpack-plugin \
  style-loader \
  url-loader \
  webpack \
  webpack-bundle-analyzer \
  webpack-cli \
  webpack-dev-server
```

- [public](public)
- [webpack.config.js](webpack.config.js)
  - See also the [package.json](README_PACKAGE.md#webpack) simplified options that are used in this Webpack config.

## Microbundle

```bash
npm i -D microbundle
```