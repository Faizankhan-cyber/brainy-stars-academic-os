import {
  Branch,
  Teacher,
  TeacherAttendance,
  SubstitutionRequest,
  DailyAcademicReport,
  ClassroomObservation,
  CoachingPlan,
  TrainingAcademySession,
  SyllabusProgress,
  StudentIntervention,
  SupportSession,
  RRRSession,
  PTMRecord,
  ParentCommunication,
  ParentConcern,
  LeadershipActionItem,
  SubstitutionRuleEvaluation,
} from '../types/baos';

export const BRANCHES: Branch[] = [
  { code: 'JAY', name: 'BNR (Jayanagar) Branch', location: '4th Block, Jayanagar, Bengaluru', studentCount: 420, facultyCount: 3, principal: 'Mrs. Shabana Parveen (M.Ed, AMI Diploma)' },
  { code: 'KOR', name: 'Kormangala Branch (KMR)', location: '5th Block, Koramangala, Bengaluru', studentCount: 185, facultyCount: 3, principal: 'Sr. Fatima Zahra (Montessori Master Coach)' },
];

/* 
 * Demo faculty records for the two retained campuses:
 * - 3 per campus
 * - Clear Grade Brackets:
 *   - 'Mother Teacher (Grades 1-2)' -> STRICTLY BARRED FROM SUBSTITUTION
 *   - 'Grades 3-5' -> ONLY SUBSTITUTES IN 3-5
 *   - 'Grades 6-10' -> ONLY SUBSTITUTES IN 6-10
 */
export const INITIAL_TEACHERS: Teacher[] = ([
  // JAYANAGAR CAMPUS (3 Teachers)
  {
    id: 'tch-jay-01',
    code: 'BST-JAY-01',
    name: 'Sr. Maryam Siddiqui',
    branch: 'JAY',
    designation: 'Grade 1 Mother Teacher & Primary Guide',
    department: 'Montessori Primary',
    qualification: 'AMI Primary Diploma, B.Ed.',
    experienceYears: 6,
    gradeBracket: 'Mother Teacher (Grades 1-2)',
    assignedClasses: ['Grade 1 A'],
    subjects: ['Foundational Phonics', 'Practical Life', 'Early Math'],
    approvedSubstituteSubjects: ['Art & Craft'],
    timetableSchedule: { 1: 'Grade 1A Phonics', 2: 'Grade 1A Math', 3: null, 4: 'Grade 1A Sensorial', 5: null, 6: 'Grade 1A Adab' },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11001',
    email: 'maryam.s@brainystars.internal',
    status: 'Active',
    joinDate: '2020-06-01',
    coachingStage: 'Proficient',
  },
  {
    id: 'tch-jay-02',
    code: 'BST-JAY-02',
    name: 'Ustadh Imran Siddique',
    branch: 'JAY',
    designation: 'Senior Science & EVS Lead (Grades 3-5)',
    department: 'CBSE Primary',
    qualification: 'M.Sc. Botany, B.Ed. (CBSE Certified)',
    experienceYears: 7,
    gradeBracket: 'Grades 3-5',
    assignedClasses: ['Grade 4 A', 'Grade 5 A'],
    subjects: ['General Science', 'EVS', 'Experiential Experiments'],
    approvedSubstituteSubjects: ['Mathematics (Grades 3-5)', 'Social Studies'],
    timetableSchedule: { 1: null, 2: 'Grade 5A Science', 3: null, 4: 'Grade 4A EVS', 5: null, 6: null },
    weeklyPeriods: 22,
    contactNumber: '+91 98450 11002',
    email: 'imran.s@brainystars.internal',
    status: 'Active',
    joinDate: '2019-06-01',
    coachingStage: 'Master Guide',
  },
  {
    id: 'tch-jay-03',
    code: 'BST-JAY-03',
    name: 'Muallim Qasim Nadwi',
    branch: 'JAY',
    designation: 'Quranic Sciences & Arabic Faculty (Grades 6-10)',
    department: 'Islamic & Value Studies',
    qualification: 'Fazil Nadwa, M.A. Arabic',
    experienceYears: 10,
    gradeBracket: 'Grades 6-10',
    assignedClasses: ['Grade 6 A', 'Grade 8 A', 'Grade 9'],
    subjects: ['Tajweed & Quranic Arabic', 'Islamic Studies', 'Adab & Ethics'],
    approvedSubstituteSubjects: ['Social Science (Indian History)', 'Value Education'],
    timetableSchedule: { 1: 'Grade 8A Tajweed', 2: null, 3: null, 4: 'Grade 6A Arabic', 5: null, 6: 'Grade 9 Ethics' },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11003',
    email: 'qasim.n@brainystars.internal',
    status: 'Active',
    joinDate: '2017-08-01',
    coachingStage: 'Master Guide',
  },

  // HBR LAYOUT CAMPUS (3 Teachers)
  {
    id: 'tch-hbr-01',
    code: 'BST-HBR-01',
    name: 'Sr. Ayesha Begum',
    branch: 'HBR',
    designation: 'Grade 2 Mother Teacher',
    department: 'Montessori Primary',
    qualification: 'AMI Primary Diploma',
    experienceYears: 5,
    gradeBracket: 'Mother Teacher (Grades 1-2)',
    assignedClasses: ['Grade 2 A'],
    subjects: ['Literacy', 'Numeracy', 'Sensorial Culture'],
    approvedSubstituteSubjects: ['Early Language'],
    timetableSchedule: { 1: 'Grade 2A Math', 2: 'Grade 2A English', 3: null, 4: null, 5: 'Grade 2A Sensorial', 6: null },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11004',
    email: 'ayesha.b@brainystars.internal',
    status: 'Active',
    joinDate: '2021-06-01',
    coachingStage: 'Developing',
  },
  {
    id: 'tch-hbr-02',
    code: 'BST-HBR-02',
    name: 'Mrs. Shabana Parveen',
    branch: 'HBR',
    designation: 'CBSE Mathematics Educator (Grades 3-5)',
    department: 'CBSE Primary',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experienceYears: 8,
    gradeBracket: 'Grades 3-5',
    assignedClasses: ['Grade 3 A', 'Grade 5 A'],
    subjects: ['Mathematics (Grades 3-5)', 'Mental Arithmetic'],
    approvedSubstituteSubjects: ['General Science', 'Computer Basics'],
    timetableSchedule: { 1: 'Grade 3A Math', 2: null, 3: null, 4: 'Grade 5A Math', 5: null, 6: null },
    weeklyPeriods: 22,
    contactNumber: '+91 98450 11005',
    email: 'shabana.p@brainystars.internal',
    status: 'Active',
    joinDate: '2018-05-10',
    coachingStage: 'Proficient',
  },
  {
    id: 'tch-hbr-03',
    code: 'BST-HBR-03',
    name: 'Er. Suhaib Akhtar',
    branch: 'HBR',
    designation: 'Secondary Mathematics & Physics Faculty (Grades 6-10)',
    department: 'Secondary School',
    qualification: 'B.Tech, B.Ed. Mathematics',
    experienceYears: 7,
    gradeBracket: 'Grades 6-10',
    assignedClasses: ['Grade 9', 'Grade 10'],
    subjects: ['CBSE Mathematics (Grades 6-10)', 'Physics Clinic'],
    approvedSubstituteSubjects: ['Computer Science', 'General Science (Grades 6-10)'],
    timetableSchedule: { 1: null, 2: null, 3: 'Grade 10 Math Drill', 4: null, 5: 'Grade 9 Math', 6: null },
    weeklyPeriods: 26,
    contactNumber: '+91 98450 11006',
    email: 'suhaib.a@brainystars.internal',
    status: 'Active',
    joinDate: '2019-11-01',
    coachingStage: 'Proficient',
  },

  // KORAMANGALA CAMPUS (3 Teachers)
  {
    id: 'tch-kor-01',
    code: 'BST-KOR-01',
    name: 'Sr. Rehana Banu',
    branch: 'KOR',
    designation: 'Grade 1 Mother Teacher',
    department: 'Montessori Primary',
    qualification: 'AMI Primary Diploma',
    experienceYears: 4,
    gradeBracket: 'Mother Teacher (Grades 1-2)',
    assignedClasses: ['Grade 1 B'],
    subjects: ['Primary Reading', 'Sensorial Exercises'],
    approvedSubstituteSubjects: ['Calligraphy'],
    timetableSchedule: { 1: 'Grade 1B Work Cycle', 2: 'Grade 1B Math', 3: null, 4: null, 5: null, 6: null },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11007',
    email: 'rehana.b@brainystars.internal',
    status: 'Active',
    joinDate: '2022-06-01',
    coachingStage: 'Developing',
  },
  {
    id: 'tch-kor-02',
    code: 'BST-KOR-02',
    name: 'Sr. Fatima Zahra',
    branch: 'KOR',
    designation: 'Montessori Primary Lead & Math Specialist (Grades 3-5)',
    department: 'CBSE Primary',
    qualification: 'AMI Primary Diploma, M.A. Child Psychology',
    experienceYears: 11,
    gradeBracket: 'Grades 3-5',
    assignedClasses: ['Grade 3 B', 'Grade 4 B'],
    subjects: ['Montessori Mathematics (Grades 3-5)', 'Language Arts'],
    approvedSubstituteSubjects: ['Environmental Studies', 'Creative Writing'],
    timetableSchedule: { 1: null, 2: null, 3: null, 4: 'Grade 3B Math', 5: null, 6: null },
    weeklyPeriods: 20,
    contactNumber: '+91 98450 11008',
    email: 'fatima.z@brainystars.internal',
    status: 'Active',
    joinDate: '2016-06-01',
    coachingStage: 'Master Guide',
  },
  {
    id: 'tch-kor-03',
    code: 'BST-KOR-03',
    name: 'Sensei Farhan Ahmed',
    branch: 'KOR',
    designation: 'Physical Education & Karate Instructor (Grades 6-10)',
    department: 'Secondary School',
    qualification: 'B.P.Ed., 3rd Dan Black Belt',
    experienceYears: 9,
    gradeBracket: 'Grades 6-10',
    assignedClasses: ['Grade 6 B', 'Grade 7 B', 'Grade 8 B'],
    subjects: ['Physical Education', 'Karate & Postural Alignment'],
    approvedSubstituteSubjects: ['General Activity Supervisor (Grades 6-10)'],
    timetableSchedule: { 1: null, 2: null, 3: 'Grade 7B Karate', 4: null, 5: null, 6: null },
    weeklyPeriods: 18,
    contactNumber: '+91 98450 11009',
    email: 'farhan.a@brainystars.internal',
    status: 'Active',
    joinDate: '2018-07-01',
    coachingStage: 'Proficient',
  },

  // HUBBALLI CAMPUS (3 Teachers)
  {
    id: 'tch-hub-01',
    code: 'BST-HUB-01',
    name: 'Sr. Khadija Patel',
    branch: 'HUB',
    designation: 'Grade 2 Mother Teacher',
    department: 'Montessori Primary',
    qualification: 'B.A., Montessori Primary Diploma',
    experienceYears: 5,
    gradeBracket: 'Mother Teacher (Grades 1-2)',
    assignedClasses: ['Grade 2 H'],
    subjects: ['Integrated Primary Curriculum', 'Language'],
    approvedSubstituteSubjects: ['Art'],
    timetableSchedule: { 1: 'Grade 2H Circle Time', 2: 'Grade 2H Reading', 3: null, 4: null, 5: null, 6: null },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11010',
    email: 'khadija.p@brainystars.internal',
    status: 'Active',
    joinDate: '2021-08-01',
    coachingStage: 'Developing',
  },
  {
    id: 'tch-hub-02',
    code: 'BST-HUB-02',
    name: 'Ustadh Farooq Abdullah',
    branch: 'HUB',
    designation: 'Primary Science & EVS Educator (Grades 3-5)',
    department: 'CBSE Primary',
    qualification: 'M.Sc. Chemistry, B.Ed.',
    experienceYears: 8,
    gradeBracket: 'Grades 3-5',
    assignedClasses: ['Grade 4 H', 'Grade 5 H'],
    subjects: ['General Science', 'Environmental Science (EVS)'],
    approvedSubstituteSubjects: ['Mathematics (Grades 3-5)'],
    timetableSchedule: { 1: null, 2: null, 3: 'Grade 5H Science', 4: null, 5: null, 6: null },
    weeklyPeriods: 22,
    contactNumber: '+91 98450 11011',
    email: 'farooq.a@brainystars.internal',
    status: 'Active',
    joinDate: '2019-06-01',
    coachingStage: 'Proficient',
  },
  {
    id: 'tch-hub-03',
    code: 'BST-HUB-03',
    name: 'Mr. Ramesh Kumar',
    branch: 'HUB',
    designation: 'Secondary Kannada & Social Science Faculty (Grades 6-10)',
    department: 'Middle School',
    qualification: 'M.A. Kannada Literature, B.Ed.',
    experienceYears: 10,
    gradeBracket: 'Grades 6-10',
    assignedClasses: ['Grade 6 H', 'Grade 8 H', 'Grade 9 H'],
    subjects: ['Kannada 2nd Language', 'Social Science (Grades 6-10)'],
    approvedSubstituteSubjects: ['Indian Heritage & Civics'],
    timetableSchedule: { 1: 'Grade 6H Kannada', 2: null, 3: null, 4: null, 5: 'Grade 8H Social', 6: null },
    weeklyPeriods: 24,
    contactNumber: '+91 98450 11012',
    email: 'ramesh.k@brainystars.internal',
    status: 'Active',
    joinDate: '2017-06-01',
    coachingStage: 'Master Guide',
  },
] as Teacher[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

/* 
 * 12 Teacher Attendance Records for Date 2026-10-16:
 * - 10 Present / On Duty
 * - 1 Late (Sr. Ayesha Begum at HBR)
 * - 1 Absent (Ustadh Imran Siddique at JAY - triggering substitution #1)
 * Total teachers = 12. Present/OnDuty/Late = 11. Attendance rate = (11/12)*100 = 91.7%
 */
export const INITIAL_TEACHER_ATTENDANCE: TeacherAttendance[] = ([
  { id: 'att-jay-01', teacherId: 'tch-jay-01', teacherName: 'Sr. Maryam Siddiqui', branch: 'JAY', date: '2026-10-16', status: 'Present', checkIn: '07:55 AM', checkOut: '03:45 PM' },
  { id: 'att-jay-02', teacherId: 'tch-jay-02', teacherName: 'Ustadh Imran Siddique', branch: 'JAY', date: '2026-10-16', status: 'Absent', leaveType: 'Sick Leave', remarks: 'Medical leave approved; triggered period 2 & 4 substitution requests.' },
  { id: 'att-jay-03', teacherId: 'tch-jay-03', teacherName: 'Muallim Qasim Nadwi', branch: 'JAY', date: '2026-10-16', status: 'Present', checkIn: '07:50 AM', checkOut: '03:30 PM' },

  { id: 'att-hbr-01', teacherId: 'tch-hbr-01', teacherName: 'Sr. Ayesha Begum', branch: 'HBR', date: '2026-10-16', status: 'Late', checkIn: '08:24 AM', checkOut: '03:40 PM', remarks: 'Traffic delay along Ring Road.' },
  { id: 'att-hbr-02', teacherId: 'tch-hbr-02', teacherName: 'Mrs. Shabana Parveen', branch: 'HBR', date: '2026-10-16', status: 'Present', checkIn: '08:02 AM', checkOut: '03:45 PM' },
  { id: 'att-hbr-03', teacherId: 'tch-hbr-03', teacherName: 'Er. Suhaib Akhtar', branch: 'HBR', date: '2026-10-16', status: 'Present', checkIn: '08:00 AM', checkOut: '04:15 PM' },

  { id: 'att-kor-01', teacherId: 'tch-kor-01', teacherName: 'Sr. Rehana Banu', branch: 'KOR', date: '2026-10-16', status: 'Present', checkIn: '08:05 AM', checkOut: '03:45 PM' },
  { id: 'att-kor-02', teacherId: 'tch-kor-02', teacherName: 'Sr. Fatima Zahra', branch: 'KOR', date: '2026-10-16', status: 'Present', checkIn: '07:48 AM', checkOut: '04:00 PM' },
  { id: 'att-kor-03', teacherId: 'tch-kor-03', teacherName: 'Sensei Farhan Ahmed', branch: 'KOR', date: '2026-10-16', status: 'On Duty', checkIn: '08:15 AM', remarks: 'Coaching inter-campus sports contingent.' },

  { id: 'att-hub-01', teacherId: 'tch-hub-01', teacherName: 'Sr. Khadija Patel', branch: 'HUB', date: '2026-10-16', status: 'Present', checkIn: '08:00 AM', checkOut: '03:30 PM' },
  { id: 'att-hub-02', teacherId: 'tch-hub-02', teacherName: 'Ustadh Farooq Abdullah', branch: 'HUB', date: '2026-10-16', status: 'Present', checkIn: '07:55 AM', checkOut: '04:00 PM' },
  { id: 'att-hub-03', teacherId: 'tch-hub-03', teacherName: 'Mr. Ramesh Kumar', branch: 'HUB', date: '2026-10-16', status: 'Present', checkIn: '08:10 AM', checkOut: '03:45 PM' },
] as TeacherAttendance[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

/**
 * RULE-BASED SUBSTITUTION ENGINE EVALUATION FUNCTION:
 * Evaluates a candidate teacher against a substitution request based on:
 * Rule 1: Grade 1 and Grade 2 mother teachers must not be assigned as substitutes.
 * Rule 2: Grades 3–5 teachers may substitute only within Grades 3–5.
 * Rule 3: Grades 6–10 teachers may substitute only within Grades 6–10.
 * Rule 4: Preference hierarchy:
 *         Priority 1: Available teacher who teaches the required subject
 *         Priority 2: Teacher approved to substitute for that subject
 *         Priority 3: General eligible substitute
 * Rule 5: Prevent double-booking (teacher must have period free) and respect teacher availability (not Absent).
 */
export function evaluateCandidateTeacher(
  teacher: Teacher,
  req: { period: number; gradeBracket: 'Grades 1-2' | 'Grades 3-5' | 'Grades 6-10'; subject: string; branch?: Teacher['branch']; date?: string },
  attendanceRecords: TeacherAttendance[]
): SubstitutionRuleEvaluation {
  // Check attendance
  const att = attendanceRecords.find((a) => a.teacherId === teacher.id && (!req.date || a.date === req.date));
  const attendanceStatus = att?.status || 'Present';
  const isPresent = attendanceStatus === 'Present' || attendanceStatus === 'Late';

  // Check period availability (double-booking check)
  const scheduledClass = teacher.timetableSchedule[req.period];
  const isFreePeriod = scheduledClass === null;

  // Active teaching staff and branch scope are hard constraints.
  if (teacher.status !== 'Active' || teacher.employeeType === 'Non-teaching') {
    return { teacherId: teacher.id, teacherName: teacher.name, isEligible: false, matchTier: 'Ineligible', disqualificationReason: 'Eligibility Conflict: Employee is inactive or not teaching staff.', isFreePeriod, attendanceStatus };
  }
  if (req.branch && teacher.branch !== req.branch) {
    return { teacherId: teacher.id, teacherName: teacher.name, isEligible: false, matchTier: 'Ineligible', disqualificationReason: 'Branch Conflict: Cross-branch substitution requires separate approval and is not eligible for normal allocation.', isFreePeriod, attendanceStatus };
  }

  // Rule 1: Mother teacher check
  if (teacher.gradeBracket === 'Mother Teacher (Grades 1-2)') {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: false,
      matchTier: 'Ineligible',
      disqualificationReason: 'Rule 1: Grade 1 & 2 Mother Teachers must not be assigned as substitutes.',
      isFreePeriod,
      attendanceStatus,
    };
  }

  // Attendance availability check
  if (!isPresent) {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: false,
      matchTier: 'Ineligible',
      disqualificationReason: 'Availability Conflict: Faculty member is marked Absent today.',
      isFreePeriod,
      attendanceStatus,
    };
  }

  // Double-booking check
  if (!isFreePeriod) {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: false,
      matchTier: 'Ineligible',
      disqualificationReason: `Double-Booking Conflict: Faculty is already teaching "${scheduledClass}" during Period ${req.period}.`,
      isFreePeriod: false,
      attendanceStatus,
    };
  }

  // Rule 2 & 3: Grade Bracket Compatibility
  if (req.gradeBracket === 'Grades 3-5' && teacher.gradeBracket !== 'Grades 3-5') {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: false,
      matchTier: 'Ineligible',
      disqualificationReason: `Rule 2: Teacher bracket (${teacher.gradeBracket}) cannot substitute in Grades 3–5.`,
      isFreePeriod: true,
      attendanceStatus,
    };
  }

  if (req.gradeBracket === 'Grades 6-10' && teacher.gradeBracket !== 'Grades 6-10') {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: false,
      matchTier: 'Ineligible',
      disqualificationReason: `Rule 3: Teacher bracket (${teacher.gradeBracket}) cannot substitute in Grades 6–10.`,
      isFreePeriod: true,
      attendanceStatus,
    };
  }

  // Rule 4: Match Preference Hierarchy
  const teachesSubject = teacher.subjects.some((s) =>
    s.toLowerCase().includes(req.subject.toLowerCase()) || req.subject.toLowerCase().includes(s.toLowerCase())
  );

  if (teachesSubject) {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: true,
      matchTier: 'Subject Specialist (Priority 1)',
      isFreePeriod: true,
      attendanceStatus,
    };
  }

  const approvedForSubject = teacher.approvedSubstituteSubjects.some((s) =>
    s.toLowerCase().includes(req.subject.toLowerCase()) || req.subject.toLowerCase().includes(s.toLowerCase())
  );

  if (approvedForSubject) {
    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      isEligible: true,
      matchTier: 'Approved Subject Substitute (Priority 2)',
      isFreePeriod: true,
      attendanceStatus,
    };
  }

  return {
    teacherId: teacher.id,
    teacherName: teacher.name,
    isEligible: true,
    matchTier: 'General Eligible Substitute (Priority 3)',
    isFreePeriod: true,
    attendanceStatus,
  };
}

export function computeEvaluationsForRequest(
  req: { period: number; gradeBracket: 'Grades 1-2' | 'Grades 3-5' | 'Grades 6-10'; subject: string; branch?: Teacher['branch']; date?: string },
  teachers: Teacher[],
  attendanceRecords: TeacherAttendance[]
): SubstitutionRuleEvaluation[] {
  return teachers.map((t) => evaluateCandidateTeacher(t, req, attendanceRecords));
}

export const INITIAL_SUBSTITUTIONS: SubstitutionRequest[] = ([
  {
    id: 'sub-01',
    date: '2026-10-16',
    absentTeacherId: 'tch-jay-02',
    absentTeacherName: 'Ustadh Imran Siddique (Science)',
    branch: 'JAY',
    period: 2,
    timing: '09:15 AM - 10:00 AM',
    grade: 'Grade 5',
    section: 'A',
    gradeBracket: 'Grades 3-5',
    subject: 'General Science',
    status: 'Pending Allocation',
    priority: 'Urgent',
    evaluations: computeEvaluationsForRequest(
      { period: 2, gradeBracket: 'Grades 3-5', subject: 'General Science' },
      INITIAL_TEACHERS,
      INITIAL_TEACHER_ATTENDANCE
    ),
  },
  {
    id: 'sub-02',
    date: '2026-10-16',
    absentTeacherId: 'tch-jay-02',
    absentTeacherName: 'Ustadh Imran Siddique (Science)',
    branch: 'JAY',
    period: 4,
    timing: '11:05 AM - 11:50 AM',
    grade: 'Grade 4',
    section: 'A',
    gradeBracket: 'Grades 3-5',
    subject: 'EVS',
    status: 'Pending Allocation',
    priority: 'Normal',
    evaluations: computeEvaluationsForRequest(
      { period: 4, gradeBracket: 'Grades 3-5', subject: 'EVS' },
      INITIAL_TEACHERS,
      INITIAL_TEACHER_ATTENDANCE
    ),
  },
  {
    id: 'sub-03',
    date: '2026-10-16',
    absentTeacherId: 'tch-ext-01',
    absentTeacherName: 'Faculty On Duty Contingent',
    branch: 'KOR',
    period: 3,
    timing: '10:20 AM - 11:05 AM',
    grade: 'Grade 7',
    section: 'B',
    gradeBracket: 'Grades 6-10',
    subject: 'Physical Education',
    assignedSubstituteTeacherId: 'tch-jay-03',
    assignedSubstituteTeacherName: 'Muallim Qasim Nadwi',
    assignedRuleTier: 'General Eligible Substitute (Priority 3)',
    status: 'Assigned',
    priority: 'Normal',
    evaluations: computeEvaluationsForRequest(
      { period: 3, gradeBracket: 'Grades 6-10', subject: 'Physical Education' },
      INITIAL_TEACHERS,
      INITIAL_TEACHER_ATTENDANCE
    ),
  },
] as SubstitutionRequest[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_DAILY_REPORTS: DailyAcademicReport[] = ([
  {
    id: 'dar-01',
    branch: 'JAY',
    date: '2026-10-16',
    academicYear: '2026-2027',
    term: 'Term 1',
    submittedBy: 'Mrs. Shabana Parveen (Principal)',
    submissionTime: '04:15 PM',
    status: 'Verified',
    attendanceSummary: {
      studentEnrolled: 420,
      studentPresent: 406,
      studentAttendancePercent: 96.7,
      facultyTotal: 3,
      facultyPresent: 2,
      facultyAttendancePercent: 66.7,
    },
    eventsAndCelebrations: 'Morning Assembly with recitation of Surah Al-Ala. Inter-House science fair model display prepared in Discovery Lab.',
    rrrSessionsSummary: [
      { tier: 'Remedial (R1)', grade: 'Grade 4', subject: 'Mathematics', concept: 'Multiplication carrying rules', studentCount: 8 },
      { tier: 'Revision (R2)', grade: 'Grade 5', subject: 'Science', concept: 'Photosynthesis & stomata diagram', studentCount: 18 },
    ],
    classroomObservationsSummary: [
      { teacherName: 'Muallim Qasim Nadwi', grade: 'Grade 8 A', subject: 'Tajweed & Arabic', overallRating: 'Exceeds Standards' },
    ],
    grade9And10SupportSummary: [
      { grade: 'Grade 9', subject: 'Social Science', topic: 'Constitutional Design in India', mentor: 'Mrs. Shabana Parveen', attended: 16 },
    ],
    syllabusCompletionHighlights: [
      { grade: 'Grade 5', subject: 'Science', chapter: 'Chapter 5: Ecosystems & Living Organisms', status: 'On Track' },
      { grade: 'Grade 4', subject: 'EVS', chapter: 'Chapter 4: Plant Kingdoms', status: 'On Track' },
    ],
    teacherDiscussionAndDDR: {
      ddrVerified: true,
      verificationNotes: 'All 3 faculty submitted signed daily diary logs (DDR). Lesson diaries aligned with central pacing syllabus.',
    },
    branchVisits: 'Director of Academics visited from 10:00 AM to 12:30 PM; inspected Montessori Lab A and student learning journals.',
    additionalWork: 'East wing water filtration system filter cartridge replaced by maintenance staff at 1:30 PM.',
    closingMessage: 'Jazakallahu Khairan.',
    principalRemarks: 'Academic delivery maintained at optimal standard despite 1 faculty medical leave.',
  },
  {
    id: 'dar-02',
    branch: 'HBR',
    date: '2026-10-16',
    academicYear: '2026-2027',
    term: 'Term 1',
    submittedBy: 'Dr. Tariq Siddiqui (Principal)',
    submissionTime: '04:30 PM',
    status: 'Pending Review',
    attendanceSummary: {
      studentEnrolled: 290,
      studentPresent: 278,
      studentAttendancePercent: 95.9,
      facultyTotal: 3,
      facultyPresent: 3,
      facultyAttendancePercent: 100.0,
    },
    eventsAndCelebrations: 'Grade 2 Montessori Grace & Courtesy circle time sharing session conducted successfully.',
    rrrSessionsSummary: [
      { tier: 'Revision (R2)', grade: 'Grade 6', subject: 'Science', concept: 'Components of Food', studentCount: 22 },
    ],
    classroomObservationsSummary: [
      { teacherName: 'Er. Suhaib Akhtar', grade: 'Grade 10', subject: 'Mathematics', overallRating: 'Exceeds Standards' },
    ],
    grade9And10SupportSummary: [
      { grade: 'Grade 10', subject: 'CBSE Mathematics', topic: 'Quadratic Equations Board Exemplars', mentor: 'Er. Suhaib Akhtar', attended: 18 },
    ],
    syllabusCompletionHighlights: [
      { grade: 'Grade 10', subject: 'Mathematics', chapter: 'Chapter 9: Trigonometric Heights', status: 'On Track' },
    ],
    teacherDiscussionAndDDR: {
      ddrVerified: true,
      verificationNotes: 'DDR records reviewed. Grade 10 revision schedule cross-checked for upcoming board test series.',
    },
    branchVisits: 'CBSE Regional Inspector routine orientation call attended by Principal.',
    additionalWork: 'AV Hall projector HDMI wiring re-routed and tested.',
    closingMessage: 'Jazakallahu Khairan.',
  },
] as DailyAcademicReport[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_OBSERVATIONS: ClassroomObservation[] = ([
  {
    id: 'obs-01',
    teacherId: 'tch-jay-02',
    teacherName: 'Ustadh Imran Siddique',
    observerName: 'Mrs. Shabana Parveen',
    observerRole: 'Headmistress',
    branch: 'JAY',
    date: '2026-10-14',
    grade: 'Grade 5',
    subject: 'General Science',
    lessonTopic: 'Plant Stomata & Respiration through Optical Microscope',
    domainScores: { preparedEnvironment: 5, studentEngagement: 5, pedagogyAndInquiry: 4, valueIntegration: 5, timeManagement: 4 },
    glows: 'Exceptional hands-on microscope preparation. Students prepared onion peel slides independently.',
    grows: 'Allocate a crisp 5-minute wrap-up at the end for student journal synthesis.',
    overallRating: 'Exceeds Standards',
    nextFollowUpDate: '2026-11-12',
  },
  {
    id: 'obs-02',
    teacherId: 'tch-hbr-01',
    teacherName: 'Sr. Ayesha Begum',
    observerName: 'Sr. Fatima Zahra',
    observerRole: 'Montessori Coach',
    branch: 'HBR',
    date: '2026-10-12',
    grade: 'Grade 2 A',
    subject: 'Montessori Practical Life',
    lessonTopic: 'Dry Pouring & Table Sponging Routine',
    domainScores: { preparedEnvironment: 4, studentEngagement: 4, pedagogyAndInquiry: 3, valueIntegration: 4, timeManagement: 4 },
    glows: 'Calm, soothing voice modulation. Children felt secure in rhythmic tray work.',
    grows: 'Ensure 3-Period Lesson silence during naming period.',
    overallRating: 'Proficient',
    nextFollowUpDate: '2026-10-26',
  },
  {
    id: 'obs-03',
    teacherId: 'tch-hbr-03',
    teacherName: 'Er. Suhaib Akhtar',
    observerName: 'Dr. Tariq Siddiqui',
    observerRole: 'Academic Coordinator',
    branch: 'HBR',
    date: '2026-10-09',
    grade: 'Grade 10',
    subject: 'CBSE Mathematics',
    lessonTopic: 'Arithmetic Progressions & Real-World Word Problems',
    domainScores: { preparedEnvironment: 5, studentEngagement: 5, pedagogyAndInquiry: 5, valueIntegration: 4, timeManagement: 5 },
    glows: 'Superb pedagogical framing of AP formulas using step ladders and monthly savings scenarios.',
    grows: 'Provide color-coded board notes for visual learners.',
    overallRating: 'Exceeds Standards',
    nextFollowUpDate: '2026-11-05',
  },
] as ClassroomObservation[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_COACHING_PLANS: CoachingPlan[] = ([
  {
    id: 'cp-01',
    teacherId: 'tch-hbr-01',
    teacherName: 'Sr. Ayesha Begum',
    branch: 'HBR',
    coachName: 'Sr. Fatima Zahra',
    cycle: 'Q1 2026',
    targetSkill: 'Mastery of Three-Period Lesson Execution & Normalized Silence',
    smartGoal: 'Achieve 90% adherence to authentic Montessori 3-period lesson protocol across 4 consecutive classroom observation sessions.',
    actionSteps: [
      'Observe Sr. Fatima Zahra conducting Sensorial Binomial Cube presentation (Week 1)',
      'Record micro-teaching video demonstration of Sandpaper Letters naming cycle (Week 2)',
      'Incorporate structured 3-minute silence game at the start of work period (Week 3)',
      'Undergo peer observation with written self-rubric evaluation (Week 4)',
    ],
    resourcesProvided: [
      'AMI Primary Guideline Handbook (Vol. 2)',
      'Brainy Stars Video Lesson Archive #104',
      'Observation Checklist Rubric',
    ],
    startDate: '2026-09-15',
    reviewDate: '2026-10-30',
    progressPercent: 75,
    status: 'In Progress',
  },
] as CoachingPlan[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_TRAINING_ACADEMY: TrainingAcademySession[] = [
  {
    id: 'tra-01',
    title: 'The Prepared Environment: Principles of Montessori Holistic Normalization',
    moduleCategory: 'Montessori Philosophy',
    trainer: 'Sr. Fatima Zahra & International AMI Mentor',
    date: '2026-10-25',
    duration: '4 Hours (Saturday Workshop)',
    enrolledCount: 28,
    completedCount: 22,
    mode: 'In-Campus Workshop',
    status: 'Open for Enrollment',
  },
  {
    id: 'tra-02',
    title: 'NEP 2020 Experiential Rubrics & Authentic Student Portfolios',
    moduleCategory: 'CBSE Competency Based Education',
    trainer: 'Dr. Tariq Siddiqui',
    date: '2026-10-18',
    duration: '2.5 Hours',
    enrolledCount: 34,
    completedCount: 34,
    mode: 'Hybrid Session',
    status: 'Completed',
  },
];

export const INITIAL_SYLLABUS_PROGRESS: SyllabusProgress[] = ([
  {
    id: 'syl-01',
    grade: 'Grade 10',
    subject: 'CBSE Mathematics',
    branch: 'HBR',
    teacherName: 'Er. Suhaib Akhtar',
    totalChapters: 14,
    completedChapters: 9,
    plannedChaptersToDate: 9,
    lagOrLeadWeeks: 0,
    status: 'On Track',
    lastLessonLogged: 'Chapter 9: Some Applications of Trigonometry (Heights & Distances)',
  },
  {
    id: 'syl-02',
    grade: 'Grade 5',
    subject: 'Environmental Studies (EVS)',
    branch: 'JAY',
    teacherName: 'Ustadh Imran Siddique',
    totalChapters: 12,
    completedChapters: 8,
    plannedChaptersToDate: 8,
    lagOrLeadWeeks: 0,
    status: 'On Track',
    lastLessonLogged: 'Ecosystem Balance and Food Webs',
  },
] as SyllabusProgress[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_STUDENT_INTERVENTIONS: StudentIntervention[] = ([
  {
    id: 'int-01',
    studentName: 'Ibrahim Farooq',
    admissionNo: 'ADM/2026/0414',
    grade: 'Grade 5',
    branch: 'JAY',
    triggerCategory: 'Concept Deficit',
    subjectArea: 'Fractions & Decimal Conversions',
    assignedEducator: 'Ustadh Imran Siddique',
    strategySummary: 'Hands-on Montessori fraction insets and manipulatives before moving to numerical algorithms.',
    sessionFrequency: 'Tri-Weekly',
    targetReviewDate: '2026-10-31',
    outcomeStatus: 'Demonstrating Gains',
  },
  {
    id: 'int-02',
    studentName: 'Hamza Abdul Rahman',
    admissionNo: 'ADM/2026/0416',
    grade: 'Grade 1',
    branch: 'JAY',
    triggerCategory: 'Focus & Sensory Need',
    subjectArea: 'Fine Motor Pencil Grasp & Sensory Calming',
    assignedEducator: 'Sr. Maryam Siddiqui',
    strategySummary: 'Clay kneading, water eyedropper squeezing, and weighted lap pad during circle story time.',
    sessionFrequency: 'Daily 30m',
    targetReviewDate: '2026-11-15',
    outcomeStatus: 'Active Intervention',
  },
  {
    id: 'int-03',
    studentName: 'Zubair Bilal',
    admissionNo: 'ADM/2026/0488',
    grade: 'Grade 9',
    branch: 'HBR',
    triggerCategory: 'Language & Reading Barrier',
    subjectArea: 'English Comprehension & Text Parsing',
    assignedEducator: 'Mrs. Shabana Parveen',
    strategySummary: 'Graphic organizers, contextual glossaries, and daily 15-minute guided audio-read pairing.',
    sessionFrequency: 'Bi-Weekly',
    targetReviewDate: '2026-10-28',
    outcomeStatus: 'Active Intervention',
  },
] as StudentIntervention[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_SUPPORT_SESSIONS: SupportSession[] = ([
  {
    id: 'sup-01',
    grade: 'Grade 10',
    branch: 'HBR',
    subject: 'CBSE Mathematics',
    topic: 'Quadratic Equations & AP Board Question Drill',
    scheduledTime: '03:45 PM - 05:00 PM (Tues & Thurs)',
    mentorTeacher: 'Er. Suhaib Akhtar',
    targetGroup: 'Exam Exemplar Practice',
    registeredCount: 18,
    attendedCount: 17,
    status: 'Scheduled',
    venue: 'Academic Hall B',
  },
  {
    id: 'sup-02',
    grade: 'Grade 9',
    branch: 'JAY',
    subject: 'Social Science',
    topic: 'Lines and Angles Theorems & Proof Construction',
    scheduledTime: '03:45 PM - 04:45 PM (Mondays)',
    mentorTeacher: 'Mrs. Shabana Parveen',
    targetGroup: 'Foundation Reinforcement',
    registeredCount: 16,
    attendedCount: 15,
    status: 'Completed',
    venue: 'Room 401',
  },
] as SupportSession[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_RRR_SESSIONS: RRRSession[] = ([
  {
    id: 'rrr-01',
    tier: 'Remedial (R1)',
    grade: 'Grade 4',
    subject: 'Algebraic Expressions',
    branch: 'JAY',
    conceptFocus: 'Multiplying binomials and handling negative distribution sign rules',
    leadTeacher: 'Ustadh Imran Siddique',
    date: '2026-10-16',
    studentCount: 8,
    masteryAttainmentRate: 85,
    status: 'Completed',
  },
  {
    id: 'rrr-02',
    tier: 'Revision (R2)',
    grade: 'Grade 6',
    subject: 'Science',
    branch: 'HBR',
    conceptFocus: 'Components of Food, Nutrient Testing & Deficiency Diseases',
    leadTeacher: 'Er. Suhaib Akhtar',
    date: '2026-10-16',
    studentCount: 22,
    masteryAttainmentRate: 92,
    status: 'Completed',
  },
] as RRRSession[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_PTM_RECORDS: PTMRecord[] = ([
  {
    id: 'ptm-01',
    grade: 'Primary (Grades 1 to 5)',
    branch: 'JAY',
    meetingDate: '2026-10-24',
    scheduledSlots: 85,
    attendedSlots: 78,
    averageParentRating: 4.8,
    status: 'Scheduled',
    coordinator: 'Sr. Maryam Siddiqui',
    agenda: 'Term 1 Montessori Progress Portfolios, Sensorial Milestones & Social-Emotional Development',
  },
  {
    id: 'ptm-02',
    grade: 'Secondary (Grade 9 & 10)',
    branch: 'HBR',
    meetingDate: '2026-10-11',
    scheduledSlots: 45,
    attendedSlots: 44,
    averageParentRating: 4.9,
    status: 'Completed',
    coordinator: 'Dr. Tariq Siddiqui',
    agenda: 'Board Examination Roadmaps, Support Clinic Schedules & Holistic Stress Mitigation',
  },
] as PTMRecord[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_PARENT_COMMUNICATIONS: ParentCommunication[] = ([
  {
    id: 'pcom-01',
    date: '2026-10-16',
    studentName: 'Zayd Muhammad Khan',
    grade: 'Grade 3',
    branch: 'JAY',
    parentName: 'Muhammad Ayub Khan',
    type: 'Phone Consultation',
    subject: 'Commendation on Quran Recitation & Math Decanomial Presentation',
    summary: 'Informed parent of Zayd selection for the upcoming Inter-Campus Quranic recitation championship. Parent expressed gratitude.',
    initiatedBy: 'Muallim Qasim Nadwi',
  },
  {
    id: 'pcom-02',
    date: '2026-10-16',
    studentName: 'Ibrahim Farooq',
    grade: 'Grade 5',
    branch: 'JAY',
    parentName: 'Farooq Abdullah',
    type: 'In-Person Conference',
    subject: 'Discussion on Math Intervention & Home Practice Routine',
    summary: 'Reviewed fraction concepts and provided parent with printable home activity sheets.',
    initiatedBy: 'Ustadh Imran Siddique',
  },
] as ParentCommunication[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_PARENT_CONCERNS: ParentConcern[] = ([
  {
    id: 'pcon-01',
    ticketNo: 'TKT-2026-081',
    studentName: 'Mariam Fatima',
    grade: 'Grade 1',
    branch: 'JAY',
    parentName: 'Syed Rizwan Ahmed',
    contactNumber: '+91 97412 88990',
    loggedDate: '2026-10-14',
    category: 'Transport & Bus',
    description: 'Route #4 bus arrived 18 minutes late on Tuesday morning due to road work. Parent requested advance SMS notification.',
    assignedOfficer: 'Transport Supervisor Mr. Altaf',
    priority: 'Medium',
    status: 'Resolution Communicated',
    resolutionSummary: 'GPS route automated alert configured. Driver contacted parent to confirm updated window.',
    slaDaysRemaining: 1,
  },
  {
    id: 'pcon-02',
    ticketNo: 'TKT-2026-082',
    studentName: 'Bilal Mustafa',
    grade: 'Grade 4',
    branch: 'JAY',
    parentName: 'Mustafa Kamal',
    contactNumber: '+91 98451 99887',
    loggedDate: '2026-10-15',
    category: 'Meal & Diet',
    description: 'Inquired whether school hot lunch program accommodates specific nut-free preparation guidelines.',
    assignedOfficer: 'Health & Nutrition Coordinator',
    priority: 'High',
    status: 'Under Investigation',
    slaDaysRemaining: 2,
  },
] as ParentConcern[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_ACTION_ITEMS: LeadershipActionItem[] = ([
  {
    id: 'act-01',
    title: 'Finalize CBSE Affiliation Self-Audit Documentation for Hubballi Expansion',
    category: 'Regulatory & CBSE',
    branch: 'HUB',
    owner: 'Principal Ustadh Farooq Abdullah',
    dueDate: '2026-10-24',
    priority: 'Critical',
    status: 'In Progress',
  },
  {
    id: 'act-02',
    title: 'Approve Teacher Coaching Cycle Review for Pre-Primary Faculty',
    category: 'Faculty Staffing',
    branch: 'JAY',
    owner: 'Sr. Fatima Zahra (Lead Coach)',
    dueDate: '2026-10-20',
    priority: 'High',
    status: 'Pending Review',
  },
  {
    id: 'act-03',
    title: 'Install Dedicated UV Safety Enclosure for Chemistry Demonstration Area',
    category: 'Facility & Safety',
    branch: 'HBR',
    owner: 'Admin Facilities Officer',
    dueDate: '2026-10-22',
    priority: 'High',
    status: 'Awaiting Approval',
  },
  {
    id: 'act-04',
    title: 'Review Grade 10 Board Support Diagnostic Test Analytics',
    category: 'Curriculum Milestone',
    branch: 'HBR',
    owner: 'Dr. Tariq Siddiqui',
    dueDate: '2026-10-19',
    priority: 'Critical',
    status: 'In Progress',
  },
] as LeadershipActionItem[]).filter((item) => item.branch === 'JAY' || item.branch === 'KOR');

export const INITIAL_RECENT_ACTIVITIES = [
  {
    id: 'act-log-1',
    time: '12 mins ago',
    type: 'substitution',
    title: 'Substitution Request Triggered (Period 2 & 4)',
    description: 'Ustadh Imran Siddique reported sick leave at Jayanagar Main Campus.',
    branch: 'JAY',
  },
  {
    id: 'act-log-2',
    time: '45 mins ago',
    type: 'observation',
    title: 'Classroom Observation Completed',
    description: 'Mrs. Shabana Parveen completed Grade 5 Science observation with rating "Exceeds Standards".',
    branch: 'JAY',
  },
  {
    id: 'act-log-3',
    time: '1 hour ago',
    type: 'parent',
    title: 'Parent Concern Resolved (TKT-2026-081)',
    description: 'Transport Supervisor updated route 4 dispatch alerts for HBR Layout pickup.',
    branch: 'HBR',
  },
  {
    id: 'act-log-4',
    time: '3 hours ago',
    type: 'academics',
    title: 'Grade 10 Support Session Scheduled',
    description: 'Er. Suhaib Akhtar posted quadratic equations drill session for 18 registered students.',
    branch: 'HBR',
  },
  {
    id: 'act-log-5',
    time: 'Today',
    type: 'report',
    title: 'Daily Academic Reports Submitted',
    description: 'Jayanagar Campus verified end-of-day DAR.',
    branch: 'JAY',
  },
];

// Aliases for module consumers
export const SAMPLE_TEACHERS = INITIAL_TEACHERS;
export const SAMPLE_TEACHER_ATTENDANCE = INITIAL_TEACHER_ATTENDANCE;
export const SAMPLE_SUBSTITUTIONS = INITIAL_SUBSTITUTIONS;
export const SAMPLE_DAILY_REPORTS = INITIAL_DAILY_REPORTS;
export const SAMPLE_OBSERVATIONS = INITIAL_OBSERVATIONS;
export const SAMPLE_COACHING_PLANS = INITIAL_COACHING_PLANS;
export const SAMPLE_TRAINING_ACADEMY = INITIAL_TRAINING_ACADEMY;
export const SAMPLE_SYLLABUS_PROGRESS = INITIAL_SYLLABUS_PROGRESS;
export const SAMPLE_STUDENT_INTERVENTIONS = INITIAL_STUDENT_INTERVENTIONS;
export const SAMPLE_SUPPORT_SESSIONS = INITIAL_SUPPORT_SESSIONS;
export const SAMPLE_RRR_SESSIONS = INITIAL_RRR_SESSIONS;
export const SAMPLE_PTM_RECORDS = INITIAL_PTM_RECORDS;
export const SAMPLE_PARENT_COMMUNICATIONS = INITIAL_PARENT_COMMUNICATIONS;
export const SAMPLE_PARENT_CONCERNS = INITIAL_PARENT_CONCERNS;
export const SAMPLE_ACTION_ITEMS = INITIAL_ACTION_ITEMS;
export const SAMPLE_RECENT_ACTIVITIES = INITIAL_RECENT_ACTIVITIES;

