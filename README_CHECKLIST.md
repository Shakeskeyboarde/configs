# Checklist

1. Create and clone a new GitHub repo.
   - **Command:** `gh repo create --public "name"`
2. Create the `package.json` file.
   - **Command:** `npm init`
     - If this is an SPA, set "private" to `true`.
   - Add [entry points](README_PACKAGE.md#entry-points) (eg. "main", "bin", etc.)
   - Add [scripts](README_PACKAGE.md#scripts) (eg. "test", "build", etc.)
   - Add [config](README_PACKAGE.md#config) entries.
   - Add [browserslist](README_PACKAGE.md#browserslist) array.
3. Copy in the matching [license](README_LICENSE.md) to the `LICENSE` file.
4. Add dev [tools](README_TOOLS.md) and config files.
   - [Prerequisites](README_TOOLS.md#prerequisites)
   - [Scripting](README_TOOLS.md#scripting)
   - [Prettier](README_TOOLS.md#prettier)
   - [ESLint](README_TOOLS.md#eslint)
   - [Babel](README_TOOLS.md#babel)
   - [Typescript](README_TOOLS.md#typescript)
   - [Jest](README_TOOLS.md#jest)
   - Also, if this is an SPA...
     - [Webpack](README_TOOLS.md#webpack)
   - Also, if this is a client-side (browser) library...
     - [Microbundle](README_TOOLS.md#microbundle)
5. Test the project config.
   - Create a `src/index.ts` (or `src/index.tsx` for Webpack) file which just contains `export {};`.
   - Run each `package.json` script to make sure they work.
6. Make an "Initial commit" and push it.
   - `git add . && git commit -m "Initial commit" && git push`