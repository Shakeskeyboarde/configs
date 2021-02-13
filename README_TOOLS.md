# Tools

Tools, install commands, and associated config files.

_Some of the config files are "parameterized" using the `package.json` file [config](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#config) object. This does require that you invoke the tool using an `npm run` or `npm exec` command, which will expose those config values as environment variables._

## Prerequisites

Git, NPM, and VSCode should already be installed. But, there are per-project configuration files for them.

- [.gitignore](.gitignore)
- [.npmignore](.npmignore)
- [.vscode](.vscode)

## Scripting

```bash
npm i -D \
  # You can change the Node.js types version to the lowest version you
  # plan to support.
  @types/node@^12 \
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

# Install core-js as a DEV dependency for library projects.
npm i -D \
  core-js \
  regenerator-runtime

# Install core-js as a REGULAR dependency for CLI and SPA projects.
npm i \
  core-js \
  regenerator-runtime
```

- [babel.config.js](babel.config.js)
  - See also the [package.json](README_PACKAGE.md#babel) simplified options that are used in this Babel config.

## Typescript

```bash
npm i -D typescript
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