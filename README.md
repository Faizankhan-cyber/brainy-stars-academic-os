# Brainy Stars Academic Operating System (BAOS)

BAOS is an Academic Operating System for **Brainy Stars Holistic Montessori** in Bangalore. It brings campus operations, Montessori three-period cycles, teacher coaching, CBSE academic oversight, parent communication, and leadership governance together in a responsive platform.

Repository: https://github.com/Faizankhan-cyber/brainy-stars-academic-os

## Architecture and scope

BAOS uses React 18 and TypeScript, with a unified in-memory `SchoolContext` for application state.

```text
/
├── index.html                   # Entry point, SEO metadata, and fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript bundler configuration
├── tailwind.config.js           # Navy, white, and teal design system
├── .env.example                 # Environment variable template
└── src/
    ├── main.tsx                  # React DOM mount point
    ├── App.tsx                   # App router and layout
    ├── index.css                 # Global Tailwind directives and typography
    ├── context/
    │   └── SchoolContext.tsx     # State management
    ├── types/
    │   ├── baos.ts               # Core domain models
    │   └── index.ts              # Supporting academic and assessment interfaces
    ├── data/
    │   ├── baosSampleData.ts     # Fictional demonstration dataset
    │   └── mockData.ts           # Sample marks and rubrics
    └── components/
        ├── Header.tsx            # Navigation, campus switcher, and user profile
        ├── Sidebar.tsx           # Collapsible seven-section navigation
        ├── dashboard/
        │   └── HomeDashboard.tsx
        ├── operations/
        │   ├── TeacherMasterDatabase.tsx
        │   ├── TeacherAttendanceView.tsx
        │   ├── TimetableManagement.tsx
        │   ├── SubstitutionEngine.tsx
        │   ├── DailyAcademicReportView.tsx
        │   └── BranchOperationsView.tsx
        ├── coaching/
        │   ├── ClassroomObservationTracker.tsx
        │   ├── TeacherCoachingPlans.tsx
        │   ├── TeacherPerformanceView.tsx
        │   └── TeacherTrainingAcademy.tsx
        ├── academics/
        │   ├── AcademicProgressTracker.tsx
        │   ├── AssessmentManagement.tsx
        │   ├── SyllabusCompletionTracker.tsx
        │   ├── StudentInterventionTracker.tsx
        │   ├── Grade9SupportSessions.tsx
        │   ├── Grade10SupportSessions.tsx
        │   └── RRRSessionTracker.tsx
        ├── parents/
        │   ├── PTMTracker.tsx
        │   ├── ParentCommunicationLog.tsx
        │   └── ParentConcernTracker.tsx
        ├── leadership/
        │   ├── ExecutiveDashboard.tsx
        │   ├── BranchPerformance.tsx
        │   ├── AcademicReview.tsx
        │   └── PendingActionsFollowUp.tsx
        └── settings/
            └── SettingsView.tsx
```

The application includes:

- **Operations:** Faculty directory and attendance, timetables, teacher substitutions, daily academic reports, and branch operations.
- **Coaching:** Classroom observations, teacher coaching plans and performance, and training and certification tracks.
- **Academics:** CBSE and Montessori progress, assessments, syllabus pacing, student interventions, Grade 9 and 10 support sessions, and remedial, revision, and retention (RRR) tracking.
- **Parents:** Parent-teacher meeting bookings, communication logs, and concern tracking.
- **Leadership:** Executive and branch performance dashboards, academic reviews, and pending-action follow-up.
- **Settings:** System parameters and database schemas.

## Substitution rules

The substitution engine applies five institutional constraints:

1. **Mother-teacher restriction:** Grade 1 and Grade 2 mother teachers are not assigned as substitutes.
2. **Grades 3–5 boundary:** Faculty in Grades 3–5 may substitute only within those grades.
3. **Grades 6–10 boundary:** Faculty in Grades 6–10 may substitute only within those grades.
4. **Match priority:**
   1. An available subject specialist who already teaches the required subject in that grade band.
   2. An available teacher approved to substitute for that subject.
   3. Any available, eligible faculty member in the grade band.
5. **Availability and double-booking checks:** The engine excludes teachers marked absent in daily gate attendance and checks period availability against each teacher’s weekly timetable.

## Daily Academic Report (DAR)

The end-of-day campus report has ten sections:

1. **Attendance summary:** Student enrollment and attendance, plus faculty roster and attendance.
2. **Events and celebrations:** Morning assemblies, Montessori circle observations, and celebrations.
3. **RRR sessions:** Remedial (R1), Revision (R2), and Retention (R3) sessions conducted that day.
4. **Classroom observations:** Walkthroughs and five-domain scores.
5. **Grade 9 and Grade 10 support sessions:** CBSE support clinics and attendance.
6. **Syllabus completion:** Chapter milestones and pacing velocity.
7. **Teacher discussion and DDR verification:** Daily Diary Report (DDR) inspection by the Head of School.
8. **Branch visits:** Supervisory walkthroughs and central academic inspections.
9. **Additional work:** Facility maintenance, safety audits, and special administrative tasks.
10. **Closing message:** *“Jazakallahu Khairan.”*

## Run the application

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The server listens on `http://0.0.0.0:3000`.

To run the TypeScript check and build:

```bash
npm run lint
npm run build
```

`npm run lint` runs `tsc --noEmit`; `npm run build` compiles the production bundle.

## Security and data privacy

- **Fictional demonstration data:** Teacher profiles, student names, phone numbers, and other records are fictional.
- **No external secrets:** The repository does not bundle API keys, credentials, or private cloud storage buckets.
- **No billable services:** No billable cloud services or paid APIs are enabled.

## License

No license is currently specified for this private repository.
