# Initial PostgreSQL schema review notes

The file `db/migrations/0001_initial_schema.sql` is a draft source migration only. It has **not** been executed against Neon or another shared database. CI now applies it only to a disposable PostgreSQL 16 service container and checks core tables and canonical branch codes.

## Deliberate design choices

- Canonical branch codes are constrained to `JAY`, `HBR`, `KOR`, and `HUB`; `BNR` is intentionally not a stored branch.
- User branch grants are separate from UI branch selection; the server must check grants for every request.
- Authentication token values are represented by hashes, never plaintext token storage.
- Attendance, report totals, percentages, and workflow status have database-level checks where possible.
- The audit event table stores metadata and resource identifiers, not a copy of sensitive form content.
- Student and parent names/contact details are included only where current UI workflows need them; final data minimization and retention policy still require owner review.

## Required review before application

1. Compare each column and enum with the exact UI fields and institutional rules; do not silently coerce statuses or remove information.
2. Decide whether teacher, student, and parent identifiers should be globally unique or branch-scoped and map external IDs accordingly.
3. Confirm academic year and term semantics, school time zone, attendance rules, timetable period ranges, and weekend/holiday behaviour.
4. Add database constraints or exclusion constraints that prevent duplicate teacher/section timetable assignments; the draft currently indexes but does not fully enforce every timetable conflict rule.
5. Review whether a student entity/table is needed before student-linked features are migrated from their current display-name/external-ID representation.
6. Confirm role semantics and bootstrap strategy before inserting any real user.
7. CI must apply the migration on a disposable PostgreSQL instance; production schema application remains separately authorized.
8. Apply to Neon only after separate explicit authorization. Do not treat a successful commit as evidence that a migration was applied.

## Known gaps in this draft

- No students table or canonical parent/guardian entity yet; student references remain external identifiers pending source-data review.
- No timetable exclusion constraint yet; application transactions must prevent conflicting teacher assignments and a follow-up migration should add stronger constraints after validating schedule representation.
- Some UI-only composite fields are represented as JSONB until they are mapped and validated against the real form contracts.
- Automated `updated_at` triggers, retention/archival policy, backup automation, and migration runner are not included.
- This schema alone does not provide authentication, branch authorization, API persistence, or operational backups.
