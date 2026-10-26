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
      case 'home':
        return <HomeDashboard onNavigate={setActiveNav} />;
      case 'operations-teachers':
        return <TeacherMasterDatabase />;
      case 'operations-attendance':
        return <TeacherAttendanceView />;
      case 'operations-timetable':
        return <TimetableManagement currentBranch={currentBranch} />;
      case 'operations-substitution':
        return <SubstitutionEngine />;
      case 'operations-daily-report':
        return <DailyAcademicReportView />;
      case 'operations-branch':
        return <BranchOperationsView currentBranch={currentBranch} />;
      case 'coaching-observations':
        return <ClassroomObservationTracker currentBranch={currentBranch} />;
      case 'coaching-plans':
        return <TeacherCoachingPlans currentBranch={currentBranch} />;
      case 'coaching-performance':
        return <TeacherPerformanceView currentBranch={currentBranch} />;
      case 'coaching-academy':
        return <TeacherTrainingAcademy />;
      case 'academics-progress':
        return <AcademicProgressTracker currentBranch={currentBranch} />;
      case 'academics-assessments':
        return <AssessmentManagement currentBranch={currentBranch} />;
      case 'academics-syllabus':
        return <SyllabusCompletionTracker currentBranch={currentBranch} />;
      case 'academics-interventions':
        return <StudentInterventionTracker currentBranch={currentBranch} />;
      case 'academics-grade9':
        return <Grade9SupportSessions currentBranch={currentBranch} />;
      case 'academics-grade10':
        return <Grade10SupportSessions currentBranch={currentBranch} />;
      case 'academics-rrr':
        return <RRRSessionTracker currentBranch={currentBranch} />;
      case 'parents-ptm':
        return <PTMTracker currentBranch={currentBranch} />;
      case 'parents-communication':
        return <ParentCommunicationLog currentBranch={currentBranch} />;
      case 'parents-concerns':
        return <ParentConcernTracker currentBranch={currentBranch} />;
      case 'leadership-executive':
        return <ExecutiveDashboard currentBranch={currentBranch} />;
      case 'leadership-branch':
        return <BranchPerformance currentBranch={currentBranch} />;
      case 'leadership-review':
        return <AcademicReview currentBranch={currentBranch} />;
      case 'leadership-actions':
        return <PendingActionsFollowUp currentBranch={currentBranch} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeDashboard onNavigate={setActiveNav} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Sidebar
        activeNav={activeNav}
        onNavigate={(nav) => {
          setActiveNav(nav);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
        <Header
          activeNav={activeNav}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 xl:p-7 max-w-none w-full">
          {renderActiveView()}
        </main>

        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <p>
              &copy; {new Date().getFullYear()} <strong>Brainy Stars Holistic Montessori</strong>, Bangalore. All Rights Reserved.
            </p>
            <p className="text-[11px] text-teal-800 font-medium">
              Academic Operating System (BAOS) &bull; AY {academicYear} &bull; Montessori &bull; CBSE &bull; NEP 2020 &bull; Values Integrated
            </p>
          </div>
        </footer>
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
