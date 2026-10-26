# BSAOS Feature Implementation Plan

**Primary user:** Arshiya Tabasum, Academic In-Charge, Brainy Stars School.
**Design direction:** UI is allowed to evolve. Improve readability, increase text sizes, reorganise navigation and sections when that improves the academic workflow, and preserve a coherent Brainy Stars visual identity. Avoid arbitrary visual changes that do not improve usability.
**Current release state:** Demo application. The PostgreSQL schema draft has not been applied to a shared database. Browser persistence is useful for demonstrations but is not a production database or secure storage for real student/staff records.
**Budget/safety:** Do not start paid services/trials, configure secrets, migrate live data, or deploy production changes without explicit approval. No credentials or real school records in Git.

## Delivery sequence

### Phase 1 — Demo-state resilience
- Persist editable demo state across refreshes in the current browser.
- Version storage keys and handle malformed data/storage failures.
- Test serialization, fallback behaviour and storage failures.
- Keep demo records visibly marked; browser storage is not production storage.

### Phase 2 — Production data foundation
- Review and test the existing PostgreSQL schema on a disposable database.
- Add server-side authentication for one explicitly authorised account; disable public sign-up and enforce authorisation on every server read/write.
- Establish backups, restore rehearsal, migration and audit procedures.
- No shared database migration, secret configuration, paid service, production deployment or live-data import without explicit approval.

### Phase 3 — Core operations
- Teacher Master Database: validated create/edit/archive, branch and subject assignments, duplicate prevention, import/export.
- Teacher attendance: date- and branch-scoped attendance, bulk marking, correction history and absence-to-substitution handoff.
- Daily Academic Report: import a consolidated teacher-report TXT file, parse and validate records, flag missing/contradictory entries for review, generate a management summary and export it.
- Substitution engine: recommend eligible available teachers, explain rule checks, flag conflicts and require approval.

### Phase 4 — Academic improvement
- Syllabus tracker and planned-vs-completed reporting.
- Assessment results, student interventions and follow-up history.
- Classroom observations, teacher coaching plans, training sessions and completion tracking.
- Grade 9/10 support and revision-session tracking.

### Phase 5 — Leadership reporting and integrations
- Derive KPIs from verified records rather than hard-coded sample values.
- Daily/weekly/monthly reports, PDF/CSV export, review-before-share workflow and overdue action views.
- Google Drive/Sheets integrations through already connected, supported tools.
- WhatsApp intake remains a manual uploaded text file unless an approved, supported integration is available; do not assume personal WhatsApp group access or automated sending.

## Acceptance gates
- UI can change to improve readability and workflows; test changes at desktop and mobile widths.
- Tests, typecheck and production build must pass before calling a change verified.
- No credentials or real school records committed to Git.
- No production migration or deployment until access control, backup and restore are verified.
- Reports identify source date, branch scope and review status; parsing issues are surfaced rather than silently discarded.
- Clearly distinguish demo-mode functionality from production-ready shared storage and integrations.
