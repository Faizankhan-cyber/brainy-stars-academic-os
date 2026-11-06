# Phase 5 — Stabilisation and Operational Readiness

Phase 5 is the final **planned** delivery phase. It is complete only when the acceptance gates below are evidenced; opening a PR or passing a build alone does not mean BSAOS is ready for school-wide operations.

## Current release constraints

- Demo persistence uses browser storage under the `bsaos:demo:v1:` key prefix. Browser-local data is scoped to that browser/profile and is not shared across staff or devices.
- Do not enter real student/staff sensitive data into demo mode. Do not represent browser-local records as a central source of truth.
- Current GitHub CI includes unit tests, deployment configuration validation, TypeScript checking, production build, and a PostgreSQL migration smoke test against a disposable CI database. The migration smoke test does not authorise a production migration.
- No paid service, new vendor, production deploy, live database migration, or destructive data operation is approved by this phase document.

## Acceptance gates

### A. Automated quality gates

- [ ] `npm test` passes on the final candidate commit.
- [ ] `npm run lint` passes with no TypeScript errors.
- [ ] `npm run build` succeeds.
- [ ] `npm run validate:config` succeeds.
- [ ] The disposable PostgreSQL migration smoke test succeeds; it must not target production.
- [ ] All required CI checks are green on the candidate PR commit. Vercel preview/deployment failures are investigated, not ignored.

### B. Data and demo-mode safety

- [ ] Demo persistence tests cover round-trip, namespace isolation, malformed JSON, incompatible value shapes, and storage read/write failures.
- [ ] UI clearly distinguishes demo/local data from shared/production data.
- [ ] No claim of multi-user synchronisation is made while records remain browser-local.
- [ ] Before production use, an approved shared database, authentication, branch-scoped authorisation, backup/restore plan, and audit strategy must be implemented and verified separately.

### C. Academic operations regression walkthrough

Use synthetic/demo data only. Record the candidate commit and outcome for each walkthrough.

- [ ] Teacher attendance: create/update a record, reload, confirm the intended persistence scope, and check branch/date filtering.
- [ ] Substitution: reject absent/on-duty teachers, occupied periods, incompatible grade brackets, and invalid candidates; accept a qualified available candidate.
- [ ] Timetable: verify period conflicts and preserve the original timetable when a candidate change is rejected.
- [ ] Daily academic report: verify required fields, date/branch scope, missing-report state, and copied summary accuracy.
- [ ] Syllabus progress: verify delayed/incomplete indicators against source records and avoid double-counting.
- [ ] Classroom observation/coaching: create a follow-up and confirm its status/count is reflected consistently.
- [ ] Leadership brief: compare each displayed number and alert to underlying records; confirm empty states are understandable.
- [ ] Navigation: every Phase 4 shortcut opens the intended existing module without losing selected context unexpectedly.

### D. Release and rollback

- [ ] Review all open phase PRs and their CI results; do not assume draft PRs are merged or included in the deployed site.
- [ ] Confirm the target deployment environment, environment variables, access boundaries, and owner-approved release window.
- [ ] Document rollback steps and identify the last known-good deployment.
- [ ] Obtain explicit approval before merging release changes or deploying to production.

## Known blockers / non-goals

- Browser-local demo persistence is not a shared operational database.
- WhatsApp personal-group ingestion and automated sending are not provided by this phase; access must use an approved, supported integration and be validated separately.
- A successful CI run proves the checks that ran, not that every real-world school workflow is accepted. Complete the manual walkthroughs with school stakeholders before sign-off.

## Sign-off record

- Candidate commit: _fill in after CI is green_
- Automated checks: _pending_
- Operational walkthrough owner/date: _pending_
- Open blockers: _pending_
- Release approver/date: _pending_
- Production deployment authorised: **No — requires explicit approval**
