// Type-level smoke test for the public "@nextworks/blocks-core/server" entry.
// This file is meant to be compiled by TypeScript in CI to ensure exports stay stable.

import { AppProviders } from "@nextworks/blocks-core/server";

// Basic type assertion: AppProviders should be callable (it's a React Server Component).
// We don't execute it; this is purely for typechecking.
AppProviders;
