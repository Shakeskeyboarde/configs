# Checklist

1. Create the new repo
   - **Command:** `git init && gh repo create --public "name"`
2. Create the `package.json` file
   - **Command:** `npm init`
     - If this is an SPA, set "private" to `true`.
   - Add [entry points](README_PACKAGE.md#entry-points) (eg. "main", "bin", etc.)
   - Add [scripts](README_PACKAGE.md#scripts) (eg. "test", "build", etc.)
   - Add [config](README_PACKAGE.md#config) entries.
   - Add [browserslist](README_PACKAGE.md#browserslist) array.
3. Add [dependencies](README_DEPENDENCIES.md)
   - [Prerequisites](README_DEPENDENCIES.md#prerequisites)
   - [Scripting](README_DEPENDENCIES.md#scripting)
   - [Prettier](README_DEPENDENCIES.md#prettier)
   - [ESLint](README_DEPENDENCIES.md#eslint)
   - [Babel](README_DEPENDENCIES.md#babel)
   - [Typescript](README_DEPENDENCIES.md#typescript)
   - [Jest](README_DEPENDENCIES.md#jest)
   - Also, if this is an SPA...
     - [Webpack](README_DEPENDENCIES.md#webpack)
   - Also, if this is a client-side (browser) library...
     - [Microbundle](README_DEPENDENCIES.md#microbundle)
4. Create the [LICENSE](README_LICENSE.md) file
5. Create the [src](templates) directory
6. Create the `README.md` file
7. Create the "Initial commit"
   - **Command:** `git add . && git commit -m "Initial commit" && git push`
