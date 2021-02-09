# Cheatsheet: Typescript (and React) From Scratch

Everything needed to setup a new Typescript library, CLI (command line interface), service, or SPA (single page app), from scratch. Shorten project bootstrapping time to a few minutes, without using a [tool chain](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains). This keeps your projects flexible, transparent, and future proof.

### Table of Contents

- [Checklist](#checklist)
- [Package](#package)
- [License](#license)
- [Configs](#configs)
- [Dependencies](#dependencies)
- [Commands](#commands)

### Prerequisites

- [GitHub CLI](https://cli.github.com)
- [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/current/) (v12 or higher)

### Recommendations

- Use [VSCode](https://code.visualstudio.com/download) and the following plugins:
  - [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
  - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- Use NPM v7 instead of Yarn.
- Use Typescript with Babel compilation and [core-js](https://www.npmjs.com/package/core-js) global polyfills.
- Use [Microbundle](https://www.npmjs.com/package/microbundle) (Rollup) to build web libraries.
- Use ESLint (and Prettier) instead of TSLint.
- Use CSS-in-JS instead of SASS/SCSS modules.
- Use React instead of Preact.

### Terms

- **Library** - A project that is published to NPM, to be used as a dependency in another project.
- **CLI** - A library that can be run as a command line executable.
- **Service** - A CLI which starts an HTTP listener when executed, and runs until terminated.
- **SPA** - A single page application (AKA: UI, web bundle, or web app), which is compiled into a browser compatible bundle and served over HTTP as static content.

&nbsp;

## Checklist

1. Create and clone a new GitHub repo.
   - **Command:** `gh repo create --public "name"`
2. Create the `package.json` file.
   - **Command:** `npm init`
     - If this is an SPA, set "private" to `true`.
   - Add appropriate [entry points](#entry-points) (eg. "main", "bin", etc.)
   - Add appropriate [scripts](#scripts) (eg. "test", "build", etc.)
   - Copy in the matching [license](#license) to the `LICENSE` file.
3. Copy in common [configs](#configs).
4. Install dev [dependencies](#dependencies).
   - Always...
     - [Scripting](#scripting)
     - [Prettier](#prettier)
     - [ESLint](#eslint)
     - [Babel](#babel)
     - [Typescript](#typescript)
     - [Jest](#jest)
   - Also, if this is an SPA...
     - [Webpack](#webpack)
   - Also, if this is a client-side (browser) library...
     - [Microbundle](#microbundle)
   - Copy in config files for the above dependencies.
   - Modify or add any project specific config.
5. Test the project config.
   - Create a `src/index.ts` (or `src/index.tsx` for Webpack) file which just contains `export {};`.
   - Run each `package.json` script to make sure they work.
6. Make an "Initial commit" and push it.
   - `git add . && git commit -m "Initial commit" && git push`

&nbsp;

## Package

Project configuration in your `package.json` file.

### Entry Points

Source and output paths.

#### For a CLI or service

```json
{
  "bin": "./lib/index.js"
}
```

#### For any library

```json
{
  "types": "./lib/index.d.ts",
  "main": "./lib/index.js"
}
```

#### For a browser library (Microbundle)

```json
{
  "source": "./src/index.ts",
  "module": "./lib/index.module.js",
  "exports": "./lib/index.modern.js",
  "unpkg": "./lib/index.umd.js"
}
```

### Scripts

Test, build, and run commands.

#### For any project

```json
{
  "scripts": {
    "clean": "del-cli lib dist coverage",
    "test": "del-cli coverage && tsc && eslint src && jest --passWithNoTests"
  }
}
```

#### For a CLI or service (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && tsc && babel src --out-dir lib --extensions .ts,.tsx --source-maps",
    "prestart": "npm run build",
    "start": "node lib/index.js",
    "prepack": "npm test && npm run build"
  }
}
```

#### For a Node.js library (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && tsc --noEmit false --emitDeclarationOnly && babel src --out-dir lib --extensions .ts,.tsx",
    "prepack": "npm test && npm run build"
  }
}
```

#### For a browser library (Microbundle)

```json
{
  "scripts": {
    "build": "del-cli lib && microbundle --jsx React.createElement --jsxFragment React.Fragment",
    "prepack": "npm test && npm run build"
  }
}
```

#### For an SPA (Webpack)

```json
{
  "scripts": {
    "build": "del-cli dist && webpack --mode=production",
    "start": "webpack serve"
  }
}
```

&nbsp;

## License

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

&nbsp;

## Configs

Config files for prerequisite and recommended tools.

- [.gitignore](.gitignore)
- [.npmignore](.npmignore)
- [.vscode](.vscode)

&nbsp;

## Dependencies

Dev dependency install commands and associated config files.

_Some of the config files are "parameterized" using the `package.json` file [config](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#config) object. This does require that you invoke the tool using an `npm run` or `npm exec` command, which will expose those config values as environment variables._

### Scripting

```bash
npm i -D \
  cross-env \
  del-cli
```

### Prettier

```bash
npm i -D \
  @types/prettier \
  prettier
```

- [.prettierrc.js](.prettierrc.js)

### ESLint

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
  - You can change the `parserOptions.ecmaVersion` option to `2021`, and the replace the `env.es2017` option with `env.es2021`, if using Webpack or Microbundle (ie. targeting the browser with `core-js` polyfills, instead of Node.js).

### Babel

```bash
npm i -D \
  @babel/cli \
  @babel/core \
  @babel/plugin-proposal-class-properties \
  @babel/plugin-proposal-object-rest-spread \
  @babel/preset-env \
  @babel/preset-react \
  @babel/preset-typescript \
  core-js \
  regenerator-runtime
```

- [babel.config.js](babel.config.js)
- [.browserslistrc](.browserslistrc)
- package.json _(optional)_
  ```json
  {
    "config": {
      "babel": {
        "corejs": "3.8"
      }
    }
  }
  ```
  - Only set the "corejs" option if the project is a web library or an SPA. Node libraries and CLIs should generally not use polyfills, because Node is sufficiently current enough not to need them, and enabling them complicates testing.

### Typescript

```bash
npm i -D typescript
```

- [tsconfig.json](tsconfig.json)
  - You can change the `target` option to `ESNext` if using Webpack or Microbundle (ie. targeting the browser with `core-js` polyfills, instead of Node.js).
  - The `rootDir` and `outDir` values in a `tsconfig.json` file are relative _to the config file._ If you extend this config (or any config) instead of copying it, you will need to override those values in the final config, or your input/output paths will be buried in your `node_modules` directory.


### Jest

```bash
npm i -D \
  @types/jest \
  babel-jest \
  jest
```

- [jest.config.js](jest.config.js)

### Webpack

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
- package.json _(optional)_
  ```json
  {
    "config": {
      "webpack": {
        "title": "My App",
        "description": "Built with Webpack",
        "color": "#ffffff",
        "publicPath": "/",
        "devServerPort": 3000
      }
    }
  }
  ```
  - Default config values are shown.

### Microbundle

```bash
npm i -D microbundle
```

&nbsp;

## Commands

Special case commands that are a little uncommon, but super useful.

```bash
# Rewrite the last commit with missed files or additional code changes.
git add . && git commit --amend --no-edit

# Remove all git ignored files (build output AND node_modules).
git clean -fdX

# Same as the above, AND hard reset changes (AKA re-clone).
git clean -fdx

# Pull with conflicts auto-resolved in favor of the remote.
git pull -X theirs
```
