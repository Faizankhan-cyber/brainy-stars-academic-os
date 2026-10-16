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

export interface Teacher {
  id: string;
  code: string;
  name: string;
  branch: BranchCode;
  designation: string; // e.g. "Senior Montessori Guide", "CBSE Science Lead", "Mathematics Faculty"
  department: 'Montessori Primary' | 'CBSE Primary' | 'Middle School' | 'Secondary School' | 'Islamic & Value Studies';
  qualification: string;
  experienceYears: number;
  assignedClasses: string[];
  subjects: string[];
  weeklyPeriods: number;
  contactNumber: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Probation';
  joinDate: string;
  coachingStage: 'Developing' | 'Proficient' | 'Master Guide';
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  teacherName: string;
  branch: BranchCode;
  date: string;
  status: 'Present' | 'Absent' | 'On Duty' | 'Late' | 'Half Day';
  checkIn?: string;
  checkOut?: string;
  leaveType?: 'Casual Leave' | 'Sick Leave' | 'Academic Training' | 'Emergency';
  remarks?: string;
}

export interface SubstitutionRequest {
  id: string;
  date: string;
  absentTeacherId: string;
  absentTeacherName: string;
  branch: BranchCode;
  period: number;
  timing: string;
  grade: string;
  section: string;
  subject: string;
  assignedSubstituteTeacherId?: string;
  assignedSubstituteTeacherName?: string;
  status: 'Assigned' | 'Pending Allocation' | 'Free Period Approved';
  priority: 'Urgent' | 'Normal';
  suggestedFreeTeachers: string[];
}

export interface DailyAcademicReport {
  id: string;
  branch: BranchCode;
  date: string;
  submittedBy: string;
  submissionTime: string;
  totalClassesScheduled: number;
  classesConducted: number;
  substitutionsHandled: number;
  montessoriWorkPeriodCompleted: boolean;
  quranicRecitationConducted: boolean;
  keyHighlights: string;
  operationalBottlenecks: string;
  principalRemarks?: string;
  status: 'Verified' | 'Pending Review' | 'Flagged';
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
  glows: string; // What went well
  grows: string; // Actionable areas for improvement
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
  targetSkill: string; // e.g. "Three-Period Lesson Execution", "NEP Inquiry Science", "Differentiated Math Support"
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
  lagOrLeadWeeks: number; // 0 = on track, -1 = 1 week behind, +1 = 1 week ahead
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
  id: string; // Remedial, Revision, Retention
  tier: 'Remedial (R1)' | 'Revision (R2)' | 'Retention & Mastery (R3)';
  grade: string;
  subject: string;
  branch: BranchCode;
  conceptFocus: string;
  leadTeacher: string;
  date: string;
  studentCount: number;
  masteryAttainmentRate: number; // e.g. 88%
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
  averageParentRating: number; // out of 5
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
