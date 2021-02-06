A library of commands, configuration, and configuration files that I commonly reuse as starting points for new projects.

Some of my own personal preferences are reflected here:

- Using Typescript with Babel compilation.
- Using [Microbundle](https://www.npmjs.com/package/microbundle) (Rollup) to build web libraries.
- Using CSS-in-JS instead of SASS/SCSS modules.
- Using [core-js](https://www.npmjs.com/package/core-js) global polyfills.
- Using a slightly broader than default set of supported browsers.

# Licenses

[SPDX license](https://spdx.org/licenses/) values which can be set in a `package.json` file `license` field. Remember to also include the license text in the `LICENSE` file at the repo root. See also [tl;drLegal](https://tldrlegal.com) for simple explanations of license rights and restrictions.

- [Unlicense](licenses/Unlicense.txt)
  - **Name:** The Unlicense
  - **Summary:** This code is completely unencumbered. It's as if it had no creator, simply appearing from thin air.
  - **Use:** For very simple utilities which everyone rewrites all the time.
- [ISC](licenses/ISC.txt)
  - **Name:** ISC License
  - **Summary:** Do whatever you want with this code, but keep the copyright and don't hold me liable.
  - **Use:** For bigger frameworks/solutions.
- [CC-BY-NC-4.0](licenses/CC-BY-NC-4.0.txt)
  - **Name:** Creative Commons Attribution-NonCommercial 4.0 International
  - **Summary:** Still open source... But, you can't make money from it. And, you have to give me credit, state any changes you make, and keep the copyright.
  - **Use:** For proprietary open source.
- [UNLICENSED](licenses/UNLICENSED.txt)
  - **Name:** ~~It's not a license, so it has no name.~~
  - **Summary:** All rights reserved.
  - **Use:** For closed source.

# Tools

Config files and dependencies for build tools.

> Some of the config files are "parameterized" using the `package.json` file [config](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#config) object. This does require that you invoke the tool using an `npm run` or `npm exec` command, which will expose those config values as environment variables.

## Common

Dependencies:

```bash
npm i -D \
  cross-env \
  del-cli
```

## Prettier

Config: [.prettierrc.js](.prettierrc.js)

Dependencies:

```bash
npm i -D prettier
```

## ESLint

Config: [.eslintrc.js](.eslintrc.js)

Dependencies:

```bash
npm i -D \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser eslint \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-react
```

## Babel

Config: [babel.config.js](babel.config.js), [.browserslistrc](.browserslistrc)

Parameters (`package.json`):

```json
{
  "config": {
    "babel": {
      "corejs": "3.8"
    }
  }
}
```

Dependencies:

```bash
npm i -D \
  @babel/cli \
  @babel/core \
  @babel/preset-env \
  @babel/preset-react \
  @babel/preset-typescript \
  core-js \
  regenerator-runtime
```

## Typescript

Config: [tsconfig.json](tsconfig.json)

> The `rootDir` and `outDir` values in a `tsconfig.json` file are relative _to the config file._ If you extend this config (or any config) instead of copying it, you will need to override those values in the final config, or your input/output paths will be buried in your `node_modules` directory.

Dependencies:

```bash
npm i -D typescript
```



## Jest

Config: [jest.config.js](jest.config.js)

Dependencies:

```bash
npm i -D \
  @types/jest \
  babel-jest \
  jest
```

## Webpack

Config: [webpack.config.js](webpack.config.js), [public](public)

Parameters (`package.json`):

```json
{
  "config": {
    "webpack": {
      "publicPath": "/",
      "devServerPort": 3000
    }
  }
}
```

Dependencies:

```bash
npm i -D \
  babel-loader \
  compression-webpack-plugin \
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

## Microbundle

Dependencies:

```bash
npm i -D microbundle
```

# Scripts

Entries for the `package.json` file `scripts` object.

## Common

```json
{
  "scripts": {
    "clean": "del-cli lib dist coverage",
    "test": "del-cli coverage && tsc && eslint . && jest --passWithNoTests"
  }
}
```

## Library (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && tsc --noEmit false --emitDeclarationOnly && babel src --out-dir lib --extensions .ts,.tsx --source-maps"
  }
}
```

## Library (Microbundle for React)

```json
{
  "scripts": {
    "build": "del-cli lib && microbundle --jsx React --jsxFragment React.Fragment"
  }
}
```

## CLI

```json
{
  "scripts": {
    "prestart": "npm run build",
    "start": "node lib/index.js"
  }
}
```

## Bundle (Webpack)

```json
{
  "scripts": {
    "build": "del-cli dist && webpack --mode=production",
    "start": "webpack serve"
  }
}
```
