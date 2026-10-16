# Brainy Stars Academic Operating System (BAOS)

An institutional Academic Operating System built for **Brainy Stars Holistic Montessori**, Bangalore. BAOS integrates day-to-day campus operations, Montessori 3-period cycles, teacher coaching, CBSE academic oversight, parent communication, and leadership governance into a single responsive platform.

---

## 🏛️ System Architecture & Scope

BAOS is engineered with a modular React 18 + TypeScript architecture backed by a unified in-memory context store (`SchoolContext`), ensuring complete mathematical consistency across all dashboards, rosters, and operational logs.

```
/
├── index.html                   # Entry point with SEO meta & fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependency manifests & scripts
├── tsconfig.json                # TypeScript bundler configuration
├── tailwind.config.js           # Navy, white, and teal design system
├── .env.example                 # Future environment variable template
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Core app router & layout orchestrator
│   ├── index.css                # Global Tailwind directives & typography
│   ├── context/
│   │   └── SchoolContext.tsx    # Single source of truth & state management
│   ├── types/
│   │   ├── baos.ts              # Core domain models (Teachers, DAR, Observations, etc.)
│   │   └── index.ts             # Supporting scholastic & assessment interfaces
│   ├── data/
│   │   ├── baosSampleData.ts    # Central fictional demonstration dataset
│   │   └── mockData.ts          # Sample scholastic marks & rubrics
│   └── components/
│       ├── Header.tsx           # Top navigation bar, campus switcher, user profile
│       ├── Sidebar.tsx          # Collapsible 7-section navigation
│       ├── dashboard/
│       │   └── HomeDashboard.tsx            # Mathematically consistent KPI cards
│       ├── operations/
│       │   ├── TeacherMasterDatabase.tsx    # Central faculty directory with grade brackets
│       │   ├── TeacherAttendanceView.tsx    # Live attendance registry & roll-call toggle
│       │   ├── TimetableManagement.tsx      # Weekly timetable & period matrix
│       │   ├── SubstitutionEngine.tsx       # Rule-based substitution engine (5 rules)
│       │   ├── DailyAcademicReportView.tsx  # Full 10-section end-of-day DAR report
│       │   └── BranchOperationsView.tsx     # Campus operational comparison
│       ├── coaching/
│       │   ├── ClassroomObservationTracker.tsx # 5-domain observation walkthroughs
│       │   ├── TeacherCoachingPlans.tsx        # SMART goals & action milestones
│       │   ├── TeacherPerformanceView.tsx      # Comprehensive faculty scorecards
│       │   └── TeacherTrainingAcademy.tsx      # CPD modules & certification tracks
│       ├── academics/
│       │   ├── AcademicProgressTracker.tsx     # Integrated CBSE + Montessori progress
│       │   ├── AssessmentManagement.tsx        # Exam cycles & holistic report cards
│       │   ├── SyllabusCompletionTracker.tsx   # Curriculum pacing & chapter velocity
│       │   ├── StudentInterventionTracker.tsx  # Individualized learning support
│       │   ├── Grade9SupportSessions.tsx       # Class 9 CBSE foundational clinics
│       │   ├── Grade10SupportSessions.tsx      # Class 10 Board exam acceleration
│       │   └── RRRSessionTracker.tsx           # Remedial, Revision & Retention loops
│       ├── parents/
│       │   ├── PTMTracker.tsx                  # Conference booking & parent feedback
│       │   ├── ParentCommunicationLog.tsx      # Home-school touchpoint documentation
│       │   └── ParentConcernTracker.tsx        # SLA-governed grievance redressal
│       ├── leadership/
│       │   ├── ExecutiveDashboard.tsx          # Council-level strategic KPIs
│       │   ├── BranchPerformance.tsx           # Multi-campus benchmarking matrix
│       │   ├── AcademicReview.tsx              # Curriculum compliance & targets
│       │   └── PendingActionsFollowUp.tsx      # Actionable institutional directives
│       └── settings/
│           └── SettingsView.tsx                # System parameters & DB schemas
```

---

## ⚖️ Substitution Rules Specification

The substitution engine implements 5 strict institutional constraints:

1. **Mother Teacher Shield:** Grade 1 and Grade 2 mother teachers must **never** be assigned as substitutes to maintain continuous emotional anchoring for early primary learners.
2. **Grades 3–5 Isolation:** Grades 3–5 faculty may substitute **only within Grades 3–5**.
3. **Grades 6–10 Isolation:** Grades 6–10 faculty may substitute **only within Grades 6–10**.
4. **Hierarchical Match Priority:**
   - **Priority 1 (Subject Specialist):** Available teacher who already teaches the required subject in that grade band.
   - **Priority 2 (Approved Substitute):** Available teacher certified/approved to substitute for that subject.
   - **Priority 3 (General Substitute):** Any available eligible faculty within the grade band.
5. **Availability & Double-Booking Safeguard:** Checks daily gate attendance (disqualifies absent teachers) and verifies period vacancy against the teacher's weekly timetable.

---

## 📋 Established Daily Academic Report (DAR) Structure

The Daily Academic Report implements the standardized end-of-day campus reporting protocol across 10 sections:

1. **Attendance Summary:** Student enrolled vs present, student attendance %, faculty rostered vs present, faculty attendance %.
2. **Events and Celebrations:** Morning assemblies, Montessori circle observations, celebrations.
3. **RRR Sessions:** Remedial (R1), Revision (R2), and Retention (R3) sessions conducted today.
4. **Classroom Observations:** Walkthroughs conducted with 5-domain scores.
5. **Grade 9 & Grade 10 Support Sessions:** CBSE secondary support clinics and attendance.
6. **Syllabus Completion:** Chapter milestones and pacing velocity.
7. **Teacher Discussion & DDR Verification:** Daily Diary Report (DDR) inspection by Head of School.
8. **Branch Visits:** Supervisory walkthroughs and central academic inspections.
9. **Additional Work:** Facility maintenance, safety audits, and special administrative tasks.
10. **Closing Message:** Formal institutional closing: *"Jazakallahu Khairan."*

---

## 🚀 Running the Application

### Development
```bash
npm install
npm run dev
```
Listens on `http://0.0.0.0:3000`.

### Type Check & Compilation Verification
```bash
npm run lint    # Runs tsc --noEmit
npm run build   # Compiles production bundle
```

---

## 🔒 Security & Data Privacy Notice
- **Zero Real PII:** All records, teacher profiles, student names, and phone numbers are fictional demonstration entities.
- **No External Secrets:** No API keys, credentials, or private cloud storage buckets are bundled.
- **Zero Ongoing Cost:** No billable cloud services or paid APIs enabled.
