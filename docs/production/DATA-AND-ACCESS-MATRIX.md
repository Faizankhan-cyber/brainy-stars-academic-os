# BSAOS Data and Access Matrix

This is a proposed authorization contract. It is not a substitute for enforced server-side checks or final owner approval.

| Role | Intended scope | Default permissions | Restrictions |
|---|---|---|---|
| Academic In-Charge | Assigned branch(es), with explicit all-branch grant only if approved | Manage daily operations, review reports, view academic/leadership summaries | First account bootstrapped out of band; no public self-registration |
| Branch Academic Lead | Explicit branch grants | Manage branch operations and review branch reports | Must not read other branches without a grant |
| Teacher | Explicit branch grant and assigned responsibilities | Submit own permitted reports; view permitted timetable and own coaching/training information | No staff master administration, broad parent records, or cross-branch access by default |
| Director / Academic Director | Explicitly granted branches or approved all-branch scope | Read executive summaries and approve assigned leadership actions | Access to identifiable student/parent details must be separately justified |
| System Administrator | Technical operations only | Manage deployment and schema operations | Technical role does not automatically grant routine access to student/parent content |
| Auditor (optional) | Explicit scope and period | Read approved audit/report data | Read-only, time-bounded, no mutation |

## Server authorization requirements

- Resolve identity from a verified server session; never trust a role, branch, or user ID supplied in the request body.
- Check permission and branch grant on every request and in the query predicate/transaction, not only in React components.
- `ALL` is an explicit authorization grant, not a branch code and not a default.
- Normalize `BNR` to canonical `JAY` at trusted import/API boundaries; do not create a second canonical branch.
- Fail closed for unknown roles, missing grants, malformed identifiers, and unavailable authorization data.
- Use negative tests proving one branch cannot read or mutate another branch's records, including direct object-ID requests and export endpoints.
- Log denied access with request ID, actor ID when known, action, and resource type; avoid logging raw student/parent content.

## Sensitive-data handling

Student identifiers, parent contact details, teacher contact details, attendance, intervention notes, concerns, and free-text communication summaries are sensitive. Collect only fields required for an operational purpose. Keep real records out of client-side demo bundles, test fixtures, logs, public repositories, and preview deployments.
