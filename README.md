# Brainy Stars Academic Operating System (BAOS)

An institutional Academic Operating System built for **Brainy Stars Holistic Montessori**, Bangalore. BAOS integrates day-to-day campus operations, Montessori 3-period cycles, teacher coaching, CBSE academic oversight, parent communication, and leadership governance into a single responsive platform.

---

## 🏛️ System Architecture

BAOS is engineered with a modular, component-based React and TypeScript architecture designed for clean extensibility, zero ongoing hosting overhead, and future integration with Firebase Authentication and Cloud Firestore.

```
/
├── index.html                   # Entry point with SEO meta & fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependency manifests & scripts
├── tsconfig.json                # TypeScript bundler configuration
├── tailwind.config.js           # Navy, white, and teal design system
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Core app router & layout orchestrator
│   ├── index.css                # Global Tailwind directives & typography
│   ├── types/
│   │   ├── baos.ts              # Core domain models (Teachers, DAR, Observations, etc.)
│   │   └── index.ts             # Supporting scholastic & assessment interfaces
│   ├── data/
│   │   ├── baosSampleData.ts    # Fictional demonstration dataset for 4 campuses
│   │   └── mockData.ts          # Sample scholastic marks & rubrics
│   └── components/
│       ├── Header.tsx           # Top navigation bar, campus switcher, user profile
│       ├── Sidebar.tsx          # Collapsible 7-section navigation
│       ├── dashboard/
│       │   └── HomeDashboard.tsx            # KPI cards, recent activity, pending items
│       ├── operations/
│       │   ├── TeacherMasterDatabase.tsx    # Central faculty directory & profiles
│       │   ├── TeacherAttendanceView.tsx    # Real-time attendance & roll-call toggle
│       │   ├── TimetableManagement.tsx      # Weekly timetable & period matrix
│       │   ├── SubstitutionEngine.tsx       # Smart free-period matching & allocation
│       │   ├── DailyAcademicReportView.tsx  # Daily Academic Report (DAR) submission
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

## 🚀 Getting Started

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Installation & Development
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🎨 Design System & Palette

- **Navy (`#0c1b33` / `#1e3a5f`)**: Primary sidebar, typography, badges, and institutional anchors.
- **Teal (`#0d9488` / `#14b8a6`)**: Active navigation accents, primary action buttons, and success indicators.
- **Neutral White / Slate (`#f8fafc` / `#ffffff`)**: Crisp card surfaces and uncluttered contrast.
- **Accents**: Amber for pending review states, Rose for absent faculty / urgent tickets, and Emerald for verified operations.

---

## 🔒 Security & Privacy Notice
- **Zero Real PII:** All records, teacher profiles, student names, and phone numbers are fictional demonstration entities.
- **No External Secrets:** No API keys, credentials, or private cloud storage buckets are bundled.
- **Prepared for Firebase:** Ready for subsequent Firebase Authentication and Cloud Firestore rules when provisioned.
