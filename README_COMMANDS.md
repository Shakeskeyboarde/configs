# Commands

Special case commands that are a little uncommon, but super useful.

## Git

Rewrite the last commit with missed files or additional code changes.

```bash
git add . && git commit --amend --no-edit
```

Remove all git ignored files (build output AND node_modules).

```bash
git clean -fdX
```

Same as the above, AND hard reset changes (AKA re-clone).

```bash
git clean -fdx
```

Pull with conflicts auto-resolved in favor of the remote.

```bash
git pull -X theirs
```
