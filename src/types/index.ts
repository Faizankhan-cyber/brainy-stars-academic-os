export type Role = 'admin' | 'teacher' | 'parent';

export type Campus =
  | 'Bengaluru Main (Jayanagar)'
  | 'HBR Layout Campus'
  | 'Koramangala Branch'
  | 'Hubballi Campus';

export type GradeLevel =
  | 'Pre-KG'
  | 'LKG'
  | 'UKG'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8';

export interface Student {
  id: string;
  rollNumber: string;
  admissionNo: string;
  name: string;
  grade: GradeLevel;
  section: string;
  gender: 'Boy' | 'Girl';
  dob: string;
  bloodGroup: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  admissionDate: string;
  attendanceRate: number; // percentage
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  pendingAmount: number;
  photoUrl: string;
  montessoriStage?: 'Primary Phase 1' | 'Primary Phase 2' | 'Elementary Transition' | 'CBSE Primary' | 'Middle School';
  islamicStudiesLevel?: string;
  emergencyContact: string;
  medicalAlert?: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  section: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  curriculumType: 'Montessori' | 'CBSE' | 'Holistic-Values' | 'Islamic-Studies';
  weekNumber: number;
  term: 'Term 1' | 'Term 2';
  objectives: string[];
  materialsNeeded: string[];
  nepCompetency: string; // e.g. "Experiential Learning & Inquiry", "Moral Reasoning"
  status: 'Draft' | 'Approved' | 'Completed';
  teacherName: string;
  date: string;
}

export interface ScholasticMark {
  subject: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
}

export interface MontessoriMilestone {
  area: 'Practical Life' | 'Sensorial' | 'Mathematics' | 'Language' | 'Cultural';
  skill: string;
  status: 'Introduced' | 'Practicing' | 'Mastered';
}

export interface HolisticValueRubric {
  value: 'Truthfulness (Sidq)' | 'Empathy & Care (Rahmah)' | 'Respect & Courtesy (Adab)' | 'Gratitude (Shukr)' | 'Cleanliness & Purity (Taharah)' | 'Responsibility (Amanah)';
  score: 1 | 2 | 3 | 4 | 5; // 5 = Exemplary
  remark: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  term: 'Term 1' | 'Term 2' | 'Unit Assessment';
  academicYear: string;
  scholasticMarks: ScholasticMark[];
  montessoriMilestones?: MontessoriMilestone[];
  holisticValues: HolisticValueRubric[];
  islamicStudiesScore?: {
    surahHifz: string;
    recitationTajweed: 'Needs Practice' | 'Good' | 'Very Good' | 'Excellent';
    hadeethMemorized: number;
    adabScore: number; // out of 100
  };
  teacherRemarks: string;
  attendancePercent: number;
  generatedDate: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  feeType: 'Tuition Fee' | 'Montessori Materials & Kit' | 'Activity & Sports' | 'Transport' | 'Annual Development';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: string;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  startTime: string;
  endTime: string;
  grade: GradeLevel;
  section: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Holiday' | 'Montessori' | 'Exam' | 'Circular' | 'Parent-Teacher Meeting';
  date: string;
  targetAudience: 'All' | 'Parents' | 'Teachers' | 'Students';
  content: string;
  isPinned?: boolean;
  author: string;
}

export interface SurahTracker {
  id: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  currentSurah: string;
  ayahProgress: string;
  memorizationQuality: 'Excellent' | 'Good' | 'Needs Revision';
  lastTestedDate: string;
  verifiedBy: string;
}
