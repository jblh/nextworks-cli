# sync-workflow-nextworks-version

Syncs the `NEXTWORKS_VERSION` value in the smoke-test GitHub workflows to match the version in `cli/package.json`.

## Files updated

- `.github/workflows/smoke-blocks.yml`
- `.github/workflows/smoke-blocks-full.yml`

## Usage

Run from the repo root:

```bash
node scripts/sync-workflow-nextworks-version.mjs
```

## Check mode

Use `--check` to verify whether the workflow files are already in sync.
This exits with a non-zero code if updates are needed.

```bash
node scripts/sync-workflow-nextworks-version.mjs --check
```

## Verbose mode

```bash
node scripts/sync-workflow-nextworks-version.mjs --verbose
```
