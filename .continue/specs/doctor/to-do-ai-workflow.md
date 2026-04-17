# Doctor To-Do AI Workflow

## Recommended order

1. `doctor-project-sanity-spec.md`
2. `doctor-router-patchability.md`
3. `doctor-project-root-writability-spec.md`
4. `doctor-blocks-tailwind-spec.md`
5. `doctor-blocks-typescript-spec.md`
6. `doctor-blocks-app-providers-shim-spec.md`
7. `doctor-blocks-manifest-kit-source-spec.md`
8. `doctor-blocks-destination-collisions-core-spec.md`
9. `doctor-blocks-destination-collisions-templates-spec.md`
10. `doctor-installed-state-recorded-kits-spec.md`
11. `doctor-installed-state-blocks-files-spec.md`
12. `doctor-output-human-readable-spec.md`
13. `doctor-output-recommendation-spec.md`
14. `doctor-output-json-spec.md`
15. `doctor-exit-codes-spec.md`

## Why this order

- Start with core blocking diagnostics in `doctor.ts`.
- Finish patchability and writability checks before presentation work.
- Add prerequisites before collision checks so install-readiness is covered first.
- Add installed-state checks before final output shaping so those results can be included cleanly.
- Do human-readable output before JSON and exit codes so presentation and status structure settle first.
