export type NavItemId =
  | 'home'
  // Operations
  | 'operations-teachers'
  | 'operations-attendance'
  | 'operations-timetable'
  | 'operations-substitution'
  | 'operations-daily-report'
  | 'operations-branch'
  // Coaching
  | 'coaching-observations'
  | 'coaching-plans'
  | 'coaching-performance'
  | 'coaching-academy'
  // Academics
  | 'academics-progress'
  | 'academics-assessments'
  | 'academics-syllabus'
  | 'academics-interventions'
  | 'academics-grade9'
  | 'academics-grade10'
  | 'academics-rrr'
  // Parents
  | 'parents-ptm'
  | 'parents-communication'
  | 'parents-concerns'
  // Leadership
  | 'leadership-executive'
  | 'leadership-branch'
  | 'leadership-review'
  | 'leadership-actions'
  // Settings
  | 'settings';

export type BranchCode = 'JAY' | 'HBR' | 'KOR' | 'HUB';

export interface Branch {
  code: BranchCode;
  name: string;
  location: string;
  studentCount: number;
  facultyCount: number;
  principal: string;
}

/* ================== OPERATIONS ================== */

export type TeacherGradeBracket =
  | 'Mother Teacher (Grades 1-2)'
  | 'Grades 3-5'
  | 'Grades 6-10'
  | 'Montessori Pre-Primary';

export interface Teacher {
  id: string;
  code: string;
  name: string;
  branch: BranchCode;
  designation: string;
  department: 'Montessori Primary' | 'CBSE Primary' | 'Middle School' | 'Secondary School' | 'Islamic & Value Studies';
  qualification: string;
  experienceYears: number;
  gradeBracket: TeacherGradeBracket;
  assignedClasses: string[];
  subjects: string[];
  approvedSubstituteSubjects: string[];
  timetableSchedule: Record<number, string | null>; // period 1..6: class name or null if free
  weeklyPeriods: number;
  contactNumber: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Probation' | 'Inactive';
  joinDate: string;
  coachingStage: 'Developing' | 'Proficient' | 'Master Guide';
  employeeType?: 'Teaching' | 'Non-teaching';
  role?: string;
  maxWeeklyPeriods?: number;
  workingDays?: string[];
  timetableStatus?: 'Pending' | 'Draft' | 'Ready';
  academicYear?: string;
  weeklyTimetable?: Array<{ day: string; period: number; grade: string; section: string; subject: string }>;
  inactiveDate?: string;
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  teacherName: string;
  branch: BranchCode;
  date: string;
  status: 'Present' | 'Absent' | 'On Duty' | 'Late' | 'Half Day' | 'Approved Leave';
  checkIn?: string;
  checkOut?: string;
  leaveType?: 'Casual Leave' | 'Sick Leave' | 'Academic Training' | 'Emergency';
  remarks?: string;
}

export interface SubstitutionRuleEvaluation {
  teacherId: string;
  teacherName: string;
  isEligible: boolean;
  matchTier: 'Subject Specialist (Priority 1)' | 'Approved Subject Substitute (Priority 2)' | 'General Eligible Substitute (Priority 3)' | 'Ineligible';
  disqualificationReason?: string;
  isFreePeriod: boolean;
  attendanceStatus: 'Present' | 'Absent' | 'On Duty' | 'Late' | 'Half Day' | 'Approved Leave';
}

export interface SubstitutionRequest {
  id: string;
  date: string;
  absentTeacherId: string;
  absentTeacherName: string;
  branch: BranchCode;
  period: number;
  timing: string;
  grade: string; // e.g. "Grade 4", "Grade 7", "Grade 1"
  section: string;
  gradeBracket: 'Grades 1-2' | 'Grades 3-5' | 'Grades 6-10';
  subject: string;
  assignedSubstituteTeacherId?: string;
  assignedSubstituteTeacherName?: string;
  assignedRuleTier?: string;
  status: 'Assigned' | 'Pending Allocation' | 'Free Period Approved';
  priority: 'Urgent' | 'Normal';
  evaluations: SubstitutionRuleEvaluation[];
}

export interface DailyAcademicReport {
  id: string;
  branch: BranchCode;
  date: string;
  academicYear: string;
  term: string;
  submittedBy: string;
  submissionTime: string;
  status: 'Verified' | 'Pending Review' | 'Flagged';

  // Section 1: Attendance
  attendanceSummary: {
    studentEnrolled: number;
    studentPresent: number;
    studentAttendancePercent: number;
    facultyTotal: number;
    facultyPresent: number;
    facultyAttendancePercent: number;
  };

  // Section 2: Events & Celebrations
  eventsAndCelebrations: string;

  // Section 3: RRR Sessions
  rrrSessionsSummary: {
    tier: string;
    grade: string;
    subject: string;
    concept: string;
    studentCount: number;
  }[];

  // Section 4: Classroom Observations
  classroomObservationsSummary: {
    teacherName: string;
    grade: string;
    subject: string;
    overallRating: string;
  }[];

  // Section 5: Grade 9 and 10 Support Sessions
  grade9And10SupportSummary: {
    grade: string;
    subject: string;
    topic: string;
    mentor: string;
    attended: number;
  }[];

  // Section 6: Syllabus Completion
  syllabusCompletionHighlights: {
    grade: string;
    subject: string;
    chapter: string;
    status: string;
  }[];

  // Section 7: Teacher Discussion & DDR Verification
  teacherDiscussionAndDDR: {
    ddrVerified: boolean;
    verificationNotes: string;
  };

  // Section 8: Branch Visits
  branchVisits: string;

  // Section 9: Additional Work & Infrastructure
  additionalWork: string;

  // Section 10: Closing Message
  closingMessage: string; // "Jazakallahu Khairan."

  principalRemarks?: string;
}

/* ================== COACHING ================== */

export interface ClassroomObservation {
  id: string;
  teacherId: string;
  teacherName: string;
  observerName: string;
  observerRole: 'Academic Coordinator' | 'Montessori Coach' | 'Headmistress' | 'Director';
  branch: BranchCode;
  date: string;
  grade: string;
  subject: string;
  lessonTopic: string;
  domainScores: {
    preparedEnvironment: number; // 1-5
    studentEngagement: number; // 1-5
    pedagogyAndInquiry: number; // 1-5
    valueIntegration: number; // 1-5
    timeManagement: number; // 1-5
  };
  glows: string;
  grows: string;
  overallRating: 'Exceeds Standards' | 'Proficient' | 'Needs Coaching Support';
  nextFollowUpDate: string;
}

export interface CoachingPlan {
  id: string;
  teacherId: string;
  teacherName: string;
  branch: BranchCode;
  coachName: string;
  cycle: 'Q1 2026' | 'Q2 2026' | 'Q3 2026';
  targetSkill: string;
  smartGoal: string;
  actionSteps: string[];
  resourcesProvided: string[];
  startDate: string;
  reviewDate: string;
  progressPercent: number;
  status: 'In Progress' | 'Achieved' | 'Needs Extension';
}

export interface TrainingAcademySession {
  id: string;
  title: string;
  moduleCategory: 'Montessori Philosophy' | 'CBSE Competency Based Education' | 'Holistic Value Mentoring' | 'Classroom Technology';
  trainer: string;
  date: string;
  duration: string;
  enrolledCount: number;
  completedCount: number;
  mode: 'In-Campus Workshop' | 'Hybrid Session' | 'Certification Pathway';
  status: 'Upcoming' | 'Completed' | 'Open for Enrollment';
}

/* ================== ACADEMICS ================== */

export interface SyllabusProgress {
  id: string;
  grade: string;
  subject: string;
  branch: BranchCode;
  teacherName: string;
  totalChapters: number;
  completedChapters: number;
  plannedChaptersToDate: number;
  lagOrLeadWeeks: number;
  status: 'On Track' | 'Delayed' | 'Ahead of Schedule';
  lastLessonLogged: string;
}

export interface StudentIntervention {
  id: string;
  studentName: string;
  admissionNo: string;
  grade: string;
  branch: BranchCode;
  triggerCategory: 'Concept Deficit' | 'Language & Reading Barrier' | 'Attendance Lag' | 'Focus & Sensory Need';
  subjectArea: string;
  assignedEducator: string;
  strategySummary: string;
  sessionFrequency: 'Daily 30m' | 'Tri-Weekly' | 'Bi-Weekly';
  targetReviewDate: string;
  outcomeStatus: 'Active Intervention' | 'Demonstrating Gains' | 'Resolved / Exited';
}

export interface SupportSession {
  id: string;
  grade: 'Grade 9' | 'Grade 10';
  branch: BranchCode;
  subject: string;
  topic: string;
  scheduledTime: string;
  mentorTeacher: string;
  targetGroup: 'Foundation Reinforcement' | 'Exam Exemplar Practice' | 'Math Board Drill';
  registeredCount: number;
  attendedCount: number;
  status: 'Scheduled' | 'Completed' | 'Ongoing';
  venue: string;
}

export interface RRRSession {
  id: string;
  tier: 'Remedial (R1)' | 'Revision (R2)' | 'Retention & Mastery (R3)';
  grade: string;
  subject: string;
  branch: BranchCode;
  conceptFocus: string;
  leadTeacher: string;
  date: string;
  studentCount: number;
  masteryAttainmentRate: number;
  status: 'Completed' | 'Scheduled';
}

/* ================== PARENTS ================== */

export interface PTMRecord {
  id: string;
  grade: string;
  branch: BranchCode;
  meetingDate: string;
  scheduledSlots: number;
  attendedSlots: number;
  averageParentRating: number;
  status: 'Completed' | 'Scheduled';
  coordinator: string;
  agenda: string;
}

export interface ParentCommunication {
  id: string;
  date: string;
  studentName: string;
  grade: string;
  branch: BranchCode;
  parentName: string;
  type: 'Phone Consultation' | 'In-Person Conference' | 'Official Circular' | 'Counseling Sync';
  subject: string;
  summary: string;
  initiatedBy: string;
}

export interface ParentConcern {
  id: string;
  ticketNo: string;
  studentName: string;
  grade: string;
  branch: BranchCode;
  parentName: string;
  contactNumber: string;
  loggedDate: string;
  category: 'Academic Progress' | 'Transport & Bus' | 'Meal & Diet' | 'Peer Relations' | 'Montessori Methodology';
  description: string;
  assignedOfficer: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Under Investigation' | 'Resolution Communicated' | 'Closed';
  resolutionSummary?: string;
  slaDaysRemaining: number;
}

/* ================== LEADERSHIP ================== */

export interface LeadershipActionItem {
  id: string;
  title: string;
  category: 'Faculty Staffing' | 'Curriculum Milestone' | 'Facility & Safety' | 'Regulatory & CBSE' | 'Parent Escalation';
  branch: BranchCode;
  owner: string;
  dueDate: string;
  priority: 'Critical' | 'High' | 'Routine';
  status: 'Pending Review' | 'In Progress' | 'Awaiting Approval' | 'Closed';
}

export interface SystemConfiguration {
  academicYear: string;
  term: 'Term 1' | 'Term 2';
  selectedDate: string;
  selectedCampus: BranchCode | 'ALL';
}
