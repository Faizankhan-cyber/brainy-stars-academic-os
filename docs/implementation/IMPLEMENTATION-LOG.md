# BSAOS implementation log

## 2026-10-26 — validation and safety baseline

- Added a GitHub Actions CI workflow for tests, TypeScript validation, and Vite build; no deployment commands or database operations are included in CI.
- Added `normalizeBranchCode` for import/API boundaries. It trims and uppercases supported codes and maps legacy `BNR` to canonical `JAY`; unsupported values return `null`.
- Added Vitest and branch normalization regression coverage.
- Added substitution-engine regression tests for mother-teacher restrictions, absent faculty, double-booking, subject-specialist priority, and grade-bracket compatibility.
- Verified the GitHub Actions workflow is active and that the run for the prior implementation-log commit completed successfully. The new substitution test commit must complete CI before it is considered validated.

## Explicitly not done

- No Neon SQL was executed and no database migrations were applied.
- No live Google Sheets or Drive data was read or modified.
- No credentials or real school data were added; all application records remain demonstration data.
- No manual Vercel deployment, paid service, trial, billing, or DNS change was initiated.

## Current architecture limits

- The current React `SchoolContext` keeps records in browser memory; data changes are not persisted to a backend and will reset on refresh.
- Authentication/authorization, durable database persistence, production import validation, backups, and restore verification are not yet implemented in this repository.
- Production readiness requires a reviewed schema and migration plan, authenticated server-side access, role/branch-level authorization, input validation, auditability, and tested recovery procedures before real data is transferred.
