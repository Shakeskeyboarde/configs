# Cheatsheet: Typescript (and React) From Scratch

Everything needed to setup a new Typescript library, CLI (command line interface), service, or SPA (single page app), from scratch. Shorten project bootstrapping time to a few minutes, without using a [tool chain](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains). This keeps your projects flexible, transparent, and future proof.

- [Checklist](README_CHECKLIST.md)
- [Package](README_PACKAGE.md)
- [License](README_LICENSE.md)
- [Tools](README_TOOLS.md)
- [Commands](README_COMMANDS.md)

---

## Prerequisites

- [GitHub CLI](https://cli.github.com)
- [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/current/) (v12 or higher)

## Recommendations

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

## Terms

- **Library** - A project that is published to NPM, to be used as a dependency in another project.
- **CLI** - A library that can be run as a command line executable.
- **Service** - A CLI which starts an HTTP listener when executed, and runs until terminated.
- **SPA** - A single page application (AKA: UI, web bundle, or web app), which is compiled into a browser compatible bundle and served over HTTP as static content.
