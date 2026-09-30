# Changesets

This repository uses [changesets](https://github.com/changesets/changesets) to manage versions and changelogs for `vite-plugin-json5`.

## Branches

| Branch | Role |
| --- | --- |
| `dev` | Day-to-day development. Open feature PRs here. |
| `main` | Release branch. Publishing runs on every push here. |

## For contributors

When your PR includes a user-facing change, add a changeset:

```console
$ pnpm changeset
```

Follow the prompts (usually `patch`, `minor`, or `major` for `vite-plugin-json5`), commit the generated file under `.changeset/`, and include it in your PR targeting `dev`.

## Release flow

1. Land work (with changesets) on `dev`.
2. Open a PR from `dev` → `main` and merge it — or commit directly to `main`.
3. The release workflow runs on that push to `main` and opens or updates a **Version Packages** PR.
4. Merge the **Version Packages** PR to publish `vite-plugin-json5` to npm and create a GitHub Release.
