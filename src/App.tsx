import React, { useState } from 'react';
import { NavItemId } from './types/baos';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// Views
import { HomeDashboard } from './components/dashboard/HomeDashboard';
// Operations
import { TeacherMasterDatabase } from './components/operations/TeacherMasterDatabase';
import { TeacherAttendanceView } from './components/operations/TeacherAttendanceView';
import { TimetableManagement } from './components/operations/TimetableManagement';
import { SubstitutionEngine } from './components/operations/SubstitutionEngine';
import { DailyAcademicReportView } from './components/operations/DailyAcademicReportView';
import { DailyOperationsHub } from './components/operations/DailyOperationsHub';
import { BranchOperationsView } from './components/operations/BranchOperationsView';
// Coaching
import { ClassroomObservationTracker } from './components/coaching/ClassroomObservationTracker';
import { TeacherCoachingPlans } from './components/coaching/TeacherCoachingPlans';
import { TeacherPerformanceView } from './components/coaching/TeacherPerformanceView';
import { TeacherTrainingAcademy } from './components/coaching/TeacherTrainingAcademy';
// Academics
import { AcademicProgressTracker } from './components/academics/AcademicProgressTracker';
import { AssessmentManagement } from './components/academics/AssessmentManagement';
import { SyllabusCompletionTracker } from './components/academics/SyllabusCompletionTracker';
import { StudentInterventionTracker } from './components/academics/StudentInterventionTracker';
import { Grade9SupportSessions } from './components/academics/Grade9SupportSessions';
import { Grade10SupportSessions } from './components/academics/Grade10SupportSessions';
import { RRRSessionTracker } from './components/academics/RRRSessionTracker';
// Parents
import { PTMTracker } from './components/parents/PTMTracker';
import { ParentCommunicationLog } from './components/parents/ParentCommunicationLog';
import { ParentConcernTracker } from './components/parents/ParentConcernTracker';
// Leadership
import { ExecutiveDashboard } from './components/leadership/ExecutiveDashboard';
import { BranchPerformance } from './components/leadership/BranchPerformance';
import { AcademicReview } from './components/leadership/AcademicReview';
import { PendingActionsFollowUp } from './components/leadership/PendingActionsFollowUp';
// Settings
import { SettingsView } from './components/settings/SettingsView';

const AppContent: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItemId>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentBranch, academicYear } = useSchool();

  const renderActiveView = () => {
    switch (activeNav) {
      case 'home': return <HomeDashboard onNavigate={setActiveNav} />;
      case 'operations-teachers': return <TeacherMasterDatabase />;
      case 'operations-attendance': return <TeacherAttendanceView />;
      case 'operations-timetable': return <TimetableManagement currentBranch={currentBranch} />;
      case 'operations-substitution': return <SubstitutionEngine />;
      case 'operations-daily-report': return <DailyAcademicReportView />;
      case 'operations-daily-ops': return <DailyOperationsHub onNavigate={setActiveNav} />;
      case 'operations-branch': return <BranchOperationsView currentBranch={currentBranch} />;
      case 'coaching-observations': return <ClassroomObservationTracker currentBranch={currentBranch} />;
      case 'coaching-plans': return <TeacherCoachingPlans currentBranch={currentBranch} />;
      case 'coaching-performance': return <TeacherPerformanceView currentBranch={currentBranch} />;
      case 'coaching-academy': return <TeacherTrainingAcademy />;
      case 'academics-progress': return <AcademicProgressTracker currentBranch={currentBranch} />;
      case 'academics-assessments': return <AssessmentManagement currentBranch={currentBranch} />;
      case 'academics-syllabus': return <SyllabusCompletionTracker currentBranch={currentBranch} />;
      case 'academics-interventions': return <StudentInterventionTracker currentBranch={currentBranch} />;
      case 'academics-grade9': return <Grade9SupportSessions currentBranch={currentBranch} />;
      case 'academics-grade10': return <Grade10SupportSessions currentBranch={currentBranch} />;
      case 'academics-rrr': return <RRRSessionTracker currentBranch={currentBranch} />;
      case 'parents-ptm': return <PTMTracker currentBranch={currentBranch} />;
      case 'parents-communication': return <ParentCommunicationLog currentBranch={currentBranch} />;
      case 'parents-concerns': return <ParentConcernTracker currentBranch={currentBranch} />;
      case 'leadership-executive': return <ExecutiveDashboard currentBranch={currentBranch} />;
      case 'leadership-branch': return <BranchPerformance currentBranch={currentBranch} />;
      case 'leadership-review': return <AcademicReview currentBranch={currentBranch} />;
      case 'leadership-actions': return <PendingActionsFollowUp currentBranch={currentBranch} />;
      case 'settings': return <SettingsView />;
      default: return <HomeDashboard onNavigate={setActiveNav} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-[#faf7fb] font-sans text-[#302a35]">
      <Sidebar
        activeNav={activeNav}
        onNavigate={(nav) => {
          setActiveNav(nav);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <div className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ${isSidebarOpen ? 'lg:ml-[285px]' : 'lg:ml-0'}`}>
        <Header
          activeNav={activeNav}
          onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="mx-[22px] mt-[14px] flex min-h-[36px] min-w-0 items-center gap-2 rounded-[7px] border border-[#f5d47b] bg-[#fff8e5] px-3 py-1.5 text-xs sm:text-sm text-[#8b4d00]">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#b66a12] text-[10px] font-bold">i</span>
          <span className="font-semibold">DEMO ENVIRONMENT</span><span className="text-[#c28b38]">·</span>
          <span>Sample data only. No live school records are connected.</span>
        </div>
        <main className="min-w-0 w-full max-w-none flex-1 overflow-x-hidden p-3 md:px-[22px] md:py-[15px]">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <SchoolProvider>
    <AppContent />
  </SchoolProvider>
);

export default App;
