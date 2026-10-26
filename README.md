# Brainy Stars Academic Operating System (BSAOS)

BSAOS is an academic operations interface for Brainy Stars Holistic Montessori in Bengaluru. It brings branch operations, teacher attendance and substitutions, daily academic reporting, teacher coaching, academic progress, parent communication, and leadership review into one responsive React application.

- Live demo: https://bsaos.vercel.app/
- Repository: https://github.com/Faizankhan-cyber/brainy-stars-academic-os

> **Demo-only status:** The deployed site currently uses fictional demonstration records and browser-memory state. Changes reset on refresh. It is not connected to a production database, authentication provider, or live school records. Do not enter real student, parent, or staff information.

## Current architecture

- React 18, TypeScript, Vite, and Tailwind CSS.
- A central `SchoolContext` holds the demo datasets in React state.
- `src/data/baosSampleData.ts` contains fictional branch, teacher, attendance, substitution, and academic records.
- Branch import normalization is isolated in `src/lib/branches.ts`; legacy `BNR` normalizes to canonical `JAY`.
- Vitest covers branch normalization and substitution eligibility rules.
- GitHub Actions runs tests, TypeScript validation, and a Vite production build. Vercel is linked to the GitHub `main` branch.

## Modules

- **Operations:** Teacher directory, attendance, timetables, substitutions, daily academic reports, and branch operations.
- **Coaching:** Classroom observations, coaching plans, teacher performance, and the Teacher Training Academy.
- **Academics:** Academic progress, assessments, syllabus tracking, interventions, Grade 9/10 support, and remedial/revision/retention (RRR) sessions.
- **Parents:** PTM tracking, parent communication, and parent concerns.
- **Leadership:** Executive dashboard, branch performance, academic reviews, and action follow-up.
- **Settings:** Current application settings and schema-related interface.

## Substitution rules represented in the demo

1. Grade 1–2 mother teachers are not assigned as substitutes.
2. Grade 3–5 faculty are restricted to Grades 3–5.
3. Grade 6–10 faculty are restricted to Grades 6–10.
4. Candidate priority is subject specialist, approved subject substitute, then general eligible faculty.
5. The evaluator checks absence and whether the candidate is already scheduled in the requested period.

These rules are implemented in the demo evaluator and have unit tests. Production use still requires review of date-specific attendance, branch scope, timetable validity, and institutional exceptions.

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server listens on `http://localhost:3000`.

Validation commands:

```bash
npm test
npm run lint
npm run build
```

`npm run lint` runs `tsc --noEmit`; `npm run build` runs the TypeScript compiler and Vite production build.

## Production-readiness blockers

This repository is not yet ready for real data. Before importing real school records, the project needs:

- Reviewed PostgreSQL schema and migration files, followed by explicitly authorized migrations.
- Authenticated server-side APIs and role/branch-level authorization; public sign-up must remain disabled.
- Durable database-backed persistence, server-side input validation, and audit logging.
- Import mapping, validation, duplicate detection, preview, and rollback for real data.
- Verified backups and a tested restore procedure.
- End-to-end tests of key workflows and a production smoke test after an approved deployment.
- A confirmed data dictionary, branch mappings, access roles, and data ownership decisions.

## Safety boundaries used during development

- All app records remain fictional demo data until the owner supplies and approves the real-data transfer process.
- No Neon SQL or migration has been executed as part of the current development stage.
- No live Google Sheets or Drive records have been read or modified.
- No paid services, trials, billing, or DNS changes have been initiated.
- CI validates code but does not deploy or access a database. GitHub-to-Vercel integration may automatically deploy commits pushed to `main`.
