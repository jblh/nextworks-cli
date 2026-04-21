# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the preferred workflow for feature/fix work in this repo:

1. **Document** - Document the feature in @context/current-feature.md.
2. **Branch** - Use a feature/fix branch when appropriate for your workflow.
3. **Implement** - Implement the feature/fix described in @context/current-feature.md.
4. **Verify** - Run the relevant checks for the affected area. Usually this means `npm run build`; for changes that affect CLI install behavior, manifests, copied kit files, or router patching, also run a relevant `nextworks add blocks --dry-run` check. This may include commands like `nextworks add blocks --sections --templates --dry-run` when validating that install path.

5. **Sync** - If applicable, keep package source, copied kit files, manifests, docs, and `CHANGELOG.md` aligned.
6. **Iterate** - Iterate and change things if needed.
7. **Commit** - Only after the relevant checks pass and the change is in a good state.
8. **Merge** - Merge to main.
9. **Delete Branch** - Delete the branch after merge, if you are using branch-based workflow.
10. **Review** - Review AI-generated code periodically and on demand.
11. **Close out** - Mark as completed in @context/current-feature.md and add to history.

## Branching

Preferred workflow: create a new branch for each feature/fix when working in git branches. Name branches like **feature/[feature]** or **fix/[fix]**. Ask before deleting a branch after merge.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (feat:, fix:, chore:, etc.)
- Keep commits focused (one feature/fix per commit)

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Repo-Specific Reminders

When making changes, check whether the work also requires updates to:

- `cli/src/**` CLI logic
- `cli/kits/blocks/**` copied kit files
- `packages/blocks-core/**`, `packages/blocks-sections/**`, or `packages/blocks-templates/**`
- `cli_manifests/blocks_manifest.json`
- `docs/**`, `README.md`, or `cli/README.md`
- `CHANGELOG.md`

Also consider whether the change affects:

- App Router vs Pages Router behavior
- hybrid router installs
- package-manager-specific behavior (`npm`, `pnpm`, `yarn`)
- install tracking in `.nextworks/config.json`
- local install verification, smoke tests, or CI expectations

## Code Review

Review AI-generated code periodically, especially for:

- Install safety (overwrites, destructive file edits, rollback clarity)
- Router-specific logic (App Router, Pages Router, hybrid behavior)
- Idempotency of patching/file operations
- Manifest / copied-kit / package-source / docs consistency
- Logic errors and edge cases
- Patterns (matches existing codebase?)
