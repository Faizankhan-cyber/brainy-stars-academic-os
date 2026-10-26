import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { readDemoValue, writeDemoValue } from '../lib/demoPersistence';
import {
  BranchCode,
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
} from '../types/baos';
import {
  BRANCHES,
  INITIAL_TEACHERS,
  INITIAL_TEACHER_ATTENDANCE,
  INITIAL_SUBSTITUTIONS,
  INITIAL_DAILY_REPORTS,
  INITIAL_OBSERVATIONS,
  INITIAL_COACHING_PLANS,
  INITIAL_TRAINING_ACADEMY,
  INITIAL_SYLLABUS_PROGRESS,
  INITIAL_STUDENT_INTERVENTIONS,
  INITIAL_SUPPORT_SESSIONS,
  INITIAL_RRR_SESSIONS,
  INITIAL_PTM_RECORDS,
  INITIAL_PARENT_COMMUNICATIONS,
  INITIAL_PARENT_CONCERNS,
  INITIAL_ACTION_ITEMS,
  INITIAL_RECENT_ACTIVITIES,
  computeEvaluationsForRequest,
} from '../data/baosSampleData';

interface SchoolContextType {
  // Configuration
  academicYear: string;
  setAcademicYear: (year: string) => void;
  term: 'Term 1' | 'Term 2';
  setTerm: (term: 'Term 1' | 'Term 2') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  currentBranch: BranchCode | 'ALL';
  setCurrentBranch: (branch: BranchCode | 'ALL') => void;

  // Datasets
  branches: Branch[];
  teachers: Teacher[];
  teacherAttendance: TeacherAttendance[];
  substitutionRequests: SubstitutionRequest[];
  dailyAcademicReports: DailyAcademicReport[];
  classroomObservations: ClassroomObservation[];
  coachingPlans: CoachingPlan[];
  trainingAcademySessions: TrainingAcademySession[];
  syllabusProgress: SyllabusProgress[];
  studentInterventions: StudentIntervention[];
  supportSessions: SupportSession[];
  rrrSessions: RRRSession[];
  ptmRecords: PTMRecord[];
  parentCommunications: ParentCommunication[];
  parentConcerns: ParentConcern[];
  leadershipActionItems: LeadershipActionItem[];
  recentActivities: typeof INITIAL_RECENT_ACTIVITIES;

  // Actions
  addTeacher: (teacher: Teacher) => void;
  updateTeacherAttendance: (recordId: string, status: TeacherAttendance['status']) => void;
  markAllTeachersPresent: () => void;
  assignSubstitute: (requestId: string, teacherId: string, teacherName: string, ruleTier: string) => void;
  submitDAR: (dar: DailyAcademicReport) => void;
  addObservation: (obs: ClassroomObservation) => void;
  addCoachingPlan: (plan: CoachingPlan) => void;
  addIntervention: (intervention: StudentIntervention) => void;
  resolveParentConcern: (ticketId: string, resolution: string) => void;
  toggleLeadershipAction: (actionId: string) => void;
  addLeadershipAction: (action: LeadershipActionItem) => void;
  addParentCommunication: (comm: ParentCommunication) => void;
}

function usePersistedDemoState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = readDemoValue(window.localStorage, key, initialValue);
      // Keep legacy demo data from removed campuses out of the active two-branch workspace.
      if (Array.isArray(stored)) {
        return stored.filter((item) => !item || typeof item !== 'object' ||
          !('branch' in item) || ((item as { branch?: string }).branch !== 'HBR' && (item as { branch?: string }).branch !== 'HUB')) as T;
      }
      if (key === 'currentBranch' && (stored === 'HBR' || stored === 'HUB')) return 'ALL' as T;
      return stored;
    } catch { return initialValue; }
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { writeDemoValue(window.localStorage, key, state); }
    catch { /* Browser storage may be disabled; keep the current session usable. */ }
  }, [key, state]);
  return [state, setState] as const;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Configurable School Environment Parameters
  const [academicYear, setAcademicYear] = usePersistedDemoState<string>('academicYear', '2026-2027');
  const [term, setTerm] = usePersistedDemoState<'Term 1' | 'Term 2'>('term', 'Term 1');
  const [selectedDate, setSelectedDate] = usePersistedDemoState<string>('selectedDate', '2026-10-16');
  const [currentBranch, setCurrentBranch] = usePersistedDemoState<BranchCode | 'ALL'>('currentBranch', 'ALL');

  // 2. Central unified demonstration state
  const [branches] = useState<Branch[]>(BRANCHES);
  const [teachers, setTeachers] = usePersistedDemoState<Teacher[]>('teachers', INITIAL_TEACHERS);
  const [teacherAttendance, setTeacherAttendance] = usePersistedDemoState<TeacherAttendance[]>('teacherAttendance', INITIAL_TEACHER_ATTENDANCE);
  const [substitutionRequests, setSubstitutionRequests] = usePersistedDemoState<SubstitutionRequest[]>('substitutionRequests', INITIAL_SUBSTITUTIONS);
  const [dailyAcademicReports, setDailyAcademicReports] = usePersistedDemoState<DailyAcademicReport[]>('dailyAcademicReports', INITIAL_DAILY_REPORTS);
  const [classroomObservations, setClassroomObservations] = usePersistedDemoState<ClassroomObservation[]>('classroomObservations', INITIAL_OBSERVATIONS);
  const [coachingPlans, setCoachingPlans] = usePersistedDemoState<CoachingPlan[]>('coachingPlans', INITIAL_COACHING_PLANS);
  const [trainingAcademySessions, setTrainingAcademySessions] = usePersistedDemoState<TrainingAcademySession[]>('trainingAcademySessions', INITIAL_TRAINING_ACADEMY);
  const [syllabusProgress, setSyllabusProgress] = usePersistedDemoState<SyllabusProgress[]>('syllabusProgress', INITIAL_SYLLABUS_PROGRESS);
  const [studentInterventions, setStudentInterventions] = usePersistedDemoState<StudentIntervention[]>('studentInterventions', INITIAL_STUDENT_INTERVENTIONS);
  const [supportSessions, setSupportSessions] = usePersistedDemoState<SupportSession[]>('supportSessions', INITIAL_SUPPORT_SESSIONS);
  const [rrrSessions, setRRRSessions] = usePersistedDemoState<RRRSession[]>('rrrSessions', INITIAL_RRR_SESSIONS);
  const [ptmRecords, setPtmRecords] = usePersistedDemoState<PTMRecord[]>('ptmRecords', INITIAL_PTM_RECORDS);
  const [parentCommunications, setParentCommunications] = usePersistedDemoState<ParentCommunication[]>('parentCommunications', INITIAL_PARENT_COMMUNICATIONS);
  const [parentConcerns, setParentConcerns] = usePersistedDemoState<ParentConcern[]>('parentConcerns', INITIAL_PARENT_CONCERNS);
  const [leadershipActionItems, setLeadershipActionItems] = usePersistedDemoState<LeadershipActionItem[]>('leadershipActionItems', INITIAL_ACTION_ITEMS);
  const [recentActivities, setRecentActivities] = usePersistedDemoState('recentActivities', INITIAL_RECENT_ACTIVITIES);

  // Handlers
  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [teacher, ...prev]);
  };

  const updateTeacherAttendance = (recordId: string, status: TeacherAttendance['status']) => {
    setTeacherAttendance((prev) => {
      const updated = prev.map((item) => (item.id === recordId ? { ...item, status } : item));
      // Re-evaluate pending substitution requests based on updated attendance
      setSubstitutionRequests((prevReqs) =>
        prevReqs.map((req) => ({
          ...req,
          evaluations: computeEvaluationsForRequest(
            { period: req.period, gradeBracket: req.gradeBracket, subject: req.subject },
            teachers,
            updated
          ),
        }))
      );
      return updated;
    });
  };

  const markAllTeachersPresent = () => {
    setTeacherAttendance((prev) => {
      const updated = prev.map((item) => {
        if (currentBranch === 'ALL' || item.branch === currentBranch) {
          return { ...item, status: 'Present' as const, checkIn: '08:00 AM' };
        }
        return item;
      });
      // Re-evaluate pending substitutions
      setSubstitutionRequests((prevReqs) =>
        prevReqs.map((req) => ({
          ...req,
          evaluations: computeEvaluationsForRequest(
            { period: req.period, gradeBracket: req.gradeBracket, subject: req.subject },
            teachers,
            updated
          ),
        }))
      );
      return updated;
    });
  };

  const assignSubstitute = (requestId: string, teacherId: string, teacherName: string, ruleTier: string) => {
    setSubstitutionRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              assignedSubstituteTeacherId: teacherId,
              assignedSubstituteTeacherName: teacherName,
              assignedRuleTier: ruleTier,
              status: 'Assigned',
            }
          : r
      )
    );

    // Append to live activity log
    setRecentActivities((prev) => [
      {
        id: `act-log-${Date.now()}`,
        time: 'Just now',
        type: 'substitution',
        title: `Substitute Assigned: ${teacherName}`,
        description: `Rule verification passed (${ruleTier}). Assigned for Request #${requestId}.`,
        branch: currentBranch === 'ALL' ? 'JAY' : currentBranch,
      },
      ...prev,
    ]);
  };

  const submitDAR = (dar: DailyAcademicReport) => {
    setDailyAcademicReports((prev) => [dar, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-log-${Date.now()}`,
        time: 'Just now',
        type: 'report',
        title: `DAR Submitted & Verified for Campus ${dar.branch}`,
        description: `Verified attendance (${dar.attendanceSummary.studentAttendancePercent}%), DDR, and support sessions.`,
        branch: dar.branch,
      },
      ...prev,
    ]);
  };

  const addObservation = (obs: ClassroomObservation) => {
    setClassroomObservations((prev) => [obs, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-log-${Date.now()}`,
        time: 'Just now',
        type: 'observation',
        title: `Observation Logged: ${obs.teacherName}`,
        description: `Walkthrough completed in ${obs.grade} (${obs.subject}). Rating: ${obs.overallRating}.`,
        branch: obs.branch,
      },
      ...prev,
    ]);
  };

  const addCoachingPlan = (plan: CoachingPlan) => {
    setCoachingPlans((prev) => [plan, ...prev]);
  };

  const addIntervention = (intervention: StudentIntervention) => {
    setStudentInterventions((prev) => [intervention, ...prev]);
  };

  const resolveParentConcern = (ticketId: string, resolution: string) => {
    setParentConcerns((prev) =>
      prev.map((c) =>
        c.id === ticketId
          ? {
              ...c,
              status: 'Closed',
              resolutionSummary: resolution,
              slaDaysRemaining: 0,
            }
          : c
      )
    );
  };

  const toggleLeadershipAction = (actionId: string) => {
    setLeadershipActionItems((prev) =>
      prev.map((item) => {
        if (item.id === actionId) {
          const nextStatus: LeadershipActionItem['status'] =
            item.status === 'Closed' ? 'In Progress' : 'Closed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const addLeadershipAction = (action: LeadershipActionItem) => {
    setLeadershipActionItems((prev) => [action, ...prev]);
  };

  const addParentCommunication = (comm: ParentCommunication) => {
    setParentCommunications((prev) => [comm, ...prev]);
  };

  const value = useMemo(
    () => ({
      academicYear,
      setAcademicYear,
      term,
      setTerm,
      selectedDate,
      setSelectedDate,
      currentBranch,
      setCurrentBranch,
      branches,
      teachers,
      teacherAttendance,
      substitutionRequests,
      dailyAcademicReports,
      classroomObservations,
      coachingPlans,
      trainingAcademySessions,
      syllabusProgress,
      studentInterventions,
      supportSessions,
      rrrSessions,
      ptmRecords,
      parentCommunications,
      parentConcerns,
      leadershipActionItems,
      recentActivities,
      addTeacher,
      updateTeacherAttendance,
      markAllTeachersPresent,
      assignSubstitute,
      submitDAR,
      addObservation,
      addCoachingPlan,
      addIntervention,
      resolveParentConcern,
      toggleLeadershipAction,
      addLeadershipAction,
      addParentCommunication,
    }),
    [
      academicYear,
      term,
      selectedDate,
      currentBranch,
      branches,
      teachers,
      teacherAttendance,
      substitutionRequests,
      dailyAcademicReports,
      classroomObservations,
      coachingPlans,
      trainingAcademySessions,
      syllabusProgress,
      studentInterventions,
      supportSessions,
      rrrSessions,
      ptmRecords,
      parentCommunications,
      parentConcerns,
      leadershipActionItems,
      recentActivities,
    ]
  );

  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>;
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
