# BSAOS implementation log

## 2026-10-26 — Baseline validation gate

### Change
- Added `.github/workflows/ci.yml` to run the existing TypeScript check (`npm run lint`) and production build (`npm run build`) on pushes to `main` and pull requests targeting `main`.
- The workflow is validation-only: it does not deploy, access school data, connect to Neon, or run SQL.

### Why this is first
The repository currently has no test runner or lockfile, and the remote review environment used for reconciliation does not have Node.js/npm installed. A GitHub-hosted CI runner gives us an independent baseline signal before changing runtime architecture.

### Verification status
- Workflow committed; its first GitHub Actions run must complete before the baseline can be considered green.
- Local TypeScript/build verification was not possible in the available remote shell because `npm` is not installed.
- No database SQL was executed. No live Google Sheets/Drive data was accessed. No deployment or service provisioning was performed.

### Next controlled stage
1. Confirm the CI run and fix any existing baseline failures.
2. Add a repeatable unit-test setup and domain regression tests.
3. Design the PostgreSQL schema/migrations as reviewed files only; do not execute them against Neon without separate approval.
4. Implement a server API and authentication boundary before moving module state out of the browser.
