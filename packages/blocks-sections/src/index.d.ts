// Entry-point type shim.
//
// For some TS configs (notably Next-oriented configs), the build may not emit
// dist/index.d.ts reliably even with `declaration: true`. This file ensures
// the package always has an entry .d.ts at runtime.
export * from "./components";
