# Changesets

Hello! This repository uses [changesets](https://github.com/changesets/changesets) to manage versions and changelogs for `vite-plugin-json5`.

## For contributors

When your PR includes a user-facing change, add a changeset:

```console
$ pnpm changeset
```

Follow the prompts (usually `patch`, `minor`, or `major` for `vite-plugin-json5`), commit the generated file under `.changeset/`, and include it in your PR.

## Release flow

1. PRs with changesets land on `dev`.
2. The release workflow opens or updates a **Version Packages** PR that bumps versions and updates `CHANGELOG.md`.
3. Merging that PR publishes `vite-plugin-json5` to npm and creates a GitHub Release.
