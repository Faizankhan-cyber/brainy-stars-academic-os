# BSAOS Production Readiness Plan

**Status: not production-ready.** The deployed React application is a demo. This plan is the release contract; checkboxes require evidence before they can be marked complete. The application must remain demo-only until the release gates below pass.

## Non-negotiable operating constraints

- Keep `JAY` canonical; accept legacy `BNR` only at import boundaries and normalize it to `JAY`.
- Disable public sign-up. Initial access is limited to the explicitly authorized Academic In-Charge; every additional person requires an explicit role and branch scope.
- Enforce authorization on the server for every read and write. UI filters are not security controls.
- Never commit credentials, `.env` files, real school records, or production exports.
- No migration against Neon, live-data import, paid service/trial, or production deployment without the owner's explicit approval for that action.
- Production must have tested backups and a restore rehearsal before real student, parent, or staff data is introduced.

## Workstreams and acceptance criteria

### 1. Build integrity and dependency management

- [ ] Generate and commit `package-lock.json` using a supported Node/npm runtime.
- [ ] CI uses `npm ci`, then unit tests, type-check, production build, and security/dependency review.
- [ ] Run CI on the exact release commit and retain passing run links.
- [ ] Review and resolve dependency audit findings; document any accepted exceptions.
- [ ] Add browser-level smoke tests for the critical user journeys.

### 2. Server-side architecture

- [ ] Add typed server endpoints for domain operations; the browser must not connect directly to PostgreSQL.
- [ ] Validate request bodies, parameters, identifiers, dates, enum values, and numeric ranges on the server.
- [ ] Use parameterized SQL, bounded queries, transactions for multi-record changes, and safe error responses.
- [ ] Add request IDs, structured redacted logs, health/readiness checks, and sensible request size/time limits.
- [ ] Confirm CORS, security headers, cache policy, and rate limiting for authentication and write endpoints.

### 3. Identity and access control

- [ ] Implement verified email magic-link authentication with expiring, single-use, hashed tokens; generic responses must not reveal whether an email is registered.
- [ ] Use secure, HTTP-only, SameSite cookies; rotate sessions and provide logout/revocation.
- [ ] Keep public sign-up disabled; bootstrap the first Academic In-Charge through a controlled one-time process.
- [ ] Implement role permissions and branch-level grants in server code and database constraints/queries.
- [ ] Protect against CSRF, brute-force attempts, replay, open redirects, session fixation, and account enumeration.
- [ ] Store no auth secrets or privileged database credentials in `VITE_*` variables.
- [ ] Confirm a mail-delivery method and configure its secrets only in the deployment environment; no provider has been provisioned as part of this plan.

### 4. Database and migrations

- [ ] Review the proposed schema against every existing screen, report field, and operational rule.
- [ ] Test all migrations from an empty disposable PostgreSQL database and test a second run/idempotency strategy.
- [ ] Add constraints, indexes, foreign keys, uniqueness rules, timestamps, and explicit delete/retention behaviour.
- [ ] Apply migrations to Neon only after a separately authorized operation, using a least-privilege migration identity.
- [ ] Verify connection pooling, TLS, timeouts, transaction boundaries, and least-privilege runtime roles.
- [ ] Preserve the distinction between a drafted migration and a migration actually applied to the target database.

### 5. Module-by-module persistence and correctness

Each module must use server APIs and have create/read/update/delete authorization tests, validation tests, branch-isolation tests, and audit coverage where appropriate.

- [ ] Branches and academic-year configuration
- [ ] Teacher master data and status history
- [ ] Daily teacher attendance
- [ ] Timetables and timetable versioning
- [ ] Substitution evaluation, assignment, override, and conflict prevention
- [ ] Daily Academic Reports (DAR), review status, and submission audit trail
- [ ] Classroom observations, coaching plans, and teacher performance
- [ ] Teacher Training Academy sessions and enrolment
- [ ] Academic progress, assessments, syllabus completion, and interventions
- [ ] Grade 9/10 support and RRR sessions
- [ ] PTM records, parent communications, and parent concerns
- [ ] Leadership actions, approvals, due dates, and follow-up
- [ ] Dashboards derived from authorized persisted records rather than independent demo counters
- [ ] Export/import, preview, duplicate detection, validation summary, and rollback

### 6. Data protection, audit, and recovery

- [ ] Define data classification, access matrix, retention, deletion, and incident response.
- [ ] Minimize student and parent personal data; restrict free-text fields that could contain sensitive details.
- [ ] Audit sensitive reads/writes and administrative actions without logging secrets or unnecessary personal data.
- [ ] Configure encrypted automated backups with retention, independent storage, and access separation.
- [ ] Complete a full restore rehearsal into an isolated database; record recovery time and data-loss point.
- [ ] Test recovery from accidental import, bad migration, credential rotation, and compromised account.

### 7. Deployment and operational readiness

- [ ] Confirm Vercel production/preview separation, environment variable scope, branch protection, and deployment permissions.
- [ ] Keep previews free of real data and use isolated demo/staging resources.
- [ ] Validate security headers, error pages, monitoring, alerts, uptime, and incident ownership.
- [ ] Run production smoke tests after the approved release; verify rollback to the last known-good deployment.
- [ ] Confirm budget/plan limits and approve any cost-bearing service before enabling it.

### 8. Data-transfer readiness

- [ ] Agree on a data dictionary, authoritative source per field, branch mappings, ID strategy, and data owners.
- [ ] Build a dry-run importer that never writes during preview and reports row-level errors.
- [ ] Test duplicates, missing values, invalid branches, historical records, encoding, date/time zones, and rollback on fictional data.
- [ ] Reconcile counts and key totals against source files before and after an approved import.
- [ ] Obtain explicit approval for the real-data transfer and retain an import manifest and reconciliation report.

## Release decision

The release is blocked until all critical items are complete, CI passes on the release commit, auth/authorization tests pass, the migration is verified against an isolated PostgreSQL database, the production target schema is explicitly approved/applied, backups are restored successfully in an isolated target, and a deployment smoke test passes. A successful Vercel deployment alone is not evidence of application production readiness.

## Current verified boundary

The React app currently uses in-memory sample state. The production schema is not confirmed applied to Neon. Authentication, persistent APIs, real-data import, and verified recovery are not yet complete. Keep the DEMO MODE notice until the release decision above is satisfied.
