# BSAOS implementation log

## 2026-10-26 — Validation baseline and branch-code contract

### Changes
- Added a validation-only GitHub Actions workflow for unit tests, TypeScript checking, and the production build. It does not deploy, connect to Neon, or run SQL.
- Added Vitest and a first regression suite for branch-code normalization.
- Added `normalizeBranchCode` for import/API boundaries. It normalizes known branch codes, maps legacy `BNR` to canonical `JAY`, and rejects unknown values rather than assigning them to a default branch.

### Verification status
- Baseline TypeScript/build workflow passed at commit `6558bf50c0b5e4d7eaedc112bc381c44e481c84f` before the new tests were added.
- The new workflow's status has not yet been confirmed for the latest commit. Do not treat the new test suite as green until its CI run is complete.
- Local Node.js/npm verification is unavailable in the remote shell because `npm` is not installed.
- No database SQL was executed. No live Google Sheets/Drive data was accessed. No deployment or service provisioning was performed.

### Next controlled stage
1. Confirm CI passes with the new tests and add a lockfile so CI dependency resolution is reproducible.
2. Add regression tests for substitution and Daily Academic Report validation before changing existing operational behavior.
3. Design the PostgreSQL schema/migrations as reviewed files only; do not execute them against Neon without separate approval.
4. Implement a server API and authentication boundary before moving module state out of the browser.
