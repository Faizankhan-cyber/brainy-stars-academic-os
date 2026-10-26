# BSAOS Feature Implementation Plan

**Primary user:** Arshiya Tabasum, Academic In-Charge, Brainy Stars School.
**UI contract:** The approved reference-matched UI is frozen. Do not change layout, typography, colours, spacing, or navigation labels unless explicitly requested.
**Current release state:** Demo application. The PostgreSQL schema draft has not been applied to a shared database.

## Delivery sequence

### Phase 1 — Demo-state resilience
- Persist editable demonstration state across refreshes in the current browser.
- Namespace and version saved keys; handle malformed data and browser storage failures.
- Test serialization, fallback behaviour and storage failures.
- Browser storage is not a production database and must not be used for real student/staff records.

### Phase 2 — Production data foundation
- Review and test the existing PostgreSQL schema on a disposable database.
- Add server-side authentication for one explicitly authorized account: Arshiya Tabasum.
- Disable public sign-up and enforce authorization on every server read/write.
- Establish backups, restore rehearsal, migration and audit procedures.
- No shared database migration, secret configuration, paid service, production deployment or live-data import without explicit approval.

### Phase 3 — Operations
- Teacher Master Database: validated create/edit/archive, branch and subject assignments, duplicate prevention, import/export.
- Teacher Attendance: date- and branch-scoped attendance, bulk marking, absence-to-substitution handoff, corrections and audit trail.
- DAR: import a teacher-report .txt file, parse and validate records, show exceptions for review, generate an exportable management summary.
- Substitution engine: recommend eligible available teachers, explain rule checks, flag conflicts and require approval.

### Phase 4 — Academic improvement
- Syllabus tracker and assessment results with planned-vs-completed reporting.
- Classroom observations, coaching plans, follow-ups and interventions linked to teacher/class records.
- Leadership actions with owners, deadlines, status and overdue views.

### Phase 5 — Leadership reporting and automation
- Live KPIs derived from verified records rather than hard-coded sample values.
- Daily, weekly and monthly reports; PDF/CSV export; review-before-share workflow.
- Google Drive/Sheets integrations through already-connected tools where supported.
- WhatsApp intake remains a manual file import unless an approved supported integration is available.

## Acceptance gates
- Approved UI remains visually unchanged.
- Tests, typecheck and production build pass.
- No credentials or real school records committed to Git.
- No production migration or deployment until access control, backups and restore are verified.
- Reports show source date, branch scope and review status; parsing issues are never silently discarded.
