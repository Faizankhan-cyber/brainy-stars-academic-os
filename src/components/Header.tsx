import React, { useState } from 'react';
import {
  Bell,
  Search,
  Building2,
  Menu,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { NavItemId, BranchCode } from '../types/baos';
import { useSchool } from '../context/SchoolContext';

interface HeaderProps {
  activeNav: NavItemId;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const PAGE_TITLES: Record<NavItemId, { section: string; title: string }> = {
  home: { section: 'Dashboard', title: 'Executive Overview' },
  'operations-teachers': { section: 'Operations', title: 'Teacher Master Database' },
  'operations-attendance': { section: 'Operations', title: 'Teacher Attendance Registry' },
  'operations-timetable': { section: 'Operations', title: 'Timetable & Class Allocation' },
  'operations-substitution': { section: 'Operations', title: 'Rule-Based Substitution Engine' },
  'operations-daily-report': { section: 'Operations', title: 'Daily Academic Report (DAR)' },
  'operations-branch': { section: 'Operations', title: 'Branch Operations & Campus Status' },
  'coaching-observations': { section: 'Coaching', title: 'Classroom Observation Tracker' },
  'coaching-plans': { section: 'Coaching', title: 'Teacher Coaching Plans (TCP)' },
  'coaching-performance': { section: 'Coaching', title: 'Teacher Performance & Follow-up' },
  'coaching-academy': { section: 'Coaching', title: 'Teacher Training Academy' },
  'academics-progress': { section: 'Academics', title: 'Academic Progress Tracker' },
  'academics-assessments': { section: 'Academics', title: 'Assessment & Exam Management' },
  'academics-syllabus': { section: 'Academics', title: 'Syllabus Completion Tracker' },
  'academics-interventions': { section: 'Academics', title: 'Student Intervention Tracker' },
  'academics-grade9': { section: 'Academics', title: 'Grade 9 CBSE Support Sessions' },
  'academics-grade10': { section: 'Academics', title: 'Grade 10 Board Support Sessions' },
  'academics-rrr': { section: 'Academics', title: 'RRR (Remedial, Revision & Retention) Tracker' },
  'parents-ptm': { section: 'Parents', title: 'Parent-Teacher Meeting (PTM) Tracker' },
  'parents-communication': { section: 'Parents', title: 'Parent Communication Log' },
  'parents-concerns': { section: 'Parents', title: 'Parent Concern & Follow-up Tracker' },
  'leadership-executive': { section: 'Leadership', title: 'Executive Council Dashboard' },
  'leadership-branch': { section: 'Leadership', title: 'Branch Performance Matrix' },
  'leadership-review': { section: 'Leadership', title: 'Academic Review & Strategic Targets' },
  'leadership-actions': { section: 'Leadership', title: 'Pending Actions & Critical Follow-ups' },
  settings: { section: 'System', title: 'System Settings & Architecture' },
};

export const Header: React.FC<HeaderProps> = ({
  activeNav,
  onToggleSidebar,
}) => {
  const {
    academicYear,
    setAcademicYear,
    term,
    setTerm,
    selectedDate,
    setSelectedDate,
    currentBranch,
    setCurrentBranch,
    branches,
    substitutionRequests,
    recentActivities,
  } = useSchool();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pageInfo = PAGE_TITLES[activeNav] || { section: 'BAOS', title: 'Academic System' };
  const pendingSubsCount = substitutionRequests.filter((s) => s.status === 'Pending Allocation').length;

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200 bg-white shadow-xs">
      {/* Top Primary Bar */}
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        {/* Left: Mobile hamburger + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none lg:hidden"
            title="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span>{pageInfo.section}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 font-normal">Brainy Stars Holistic Montessori</span>
            </div>
            <h1 className="text-lg font-bold text-navy-950 leading-tight">
              {pageInfo.title}
            </h1>
          </div>
        </div>

        {/* Center: Demonstration Data Pill Badge */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
          <Info className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>Fictional Demonstration Data &bull; Factual Prototype Evaluation</span>
        </div>

        {/* Right Controls: Campus, Date, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Configurable Campus Selector */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
            <Building2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <select
              value={currentBranch}
              onChange={(e) => setCurrentBranch(e.target.value as BranchCode | 'ALL')}
              className="bg-transparent font-semibold text-navy-900 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Campuses ({branches.length})</option>
              {branches.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>

          {/* Configurable Date Selector */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
            <Calendar className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-navy-950 font-semibold text-xs focus:outline-none cursor-pointer"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-navy-900 transition"
              title="Notifications & Live Activity"
            >
              <Bell className="h-5 w-5" />
              {pendingSubsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-xs text-navy-900 uppercase tracking-wider">
                    Recent Activity Feed ({recentActivities.length})
                  </span>
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                    Demonstration
                  </span>
                </div>
                <div className="divide-y divide-slate-100 text-xs max-h-72 overflow-y-auto">
                  {recentActivities.slice(0, 5).map((act) => (
                    <div key={act.id} className="py-2.5">
                      <p className="font-bold text-slate-800 leading-tight">{act.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{act.description}</p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-teal-700 font-medium">
                        <span>Campus: {act.branch}</span>
                        <span className="text-slate-400">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="mt-2 w-full rounded-lg bg-slate-50 py-1.5 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close Notifications
                </button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 font-bold text-xs text-teal-300 ring-2 ring-teal-500/30">
                BS
              </div>
              <div className="hidden text-left md:block">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-navy-900">Dr. Faizan Khan</p>
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                </div>
                <p className="text-[10px] text-slate-500">Academic Director</p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                <div className="border-b border-slate-100 pb-2 mb-2">
                  <p className="text-xs font-bold text-navy-900">Dr. Faizan Khan</p>
                  <p className="text-[11px] text-slate-500">faizan.khan@brainystars.org</p>
                  <span className="mt-1 inline-block rounded bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    Role: Academic Directorate
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="rounded p-2 bg-slate-50 text-[11px]">
                    <p className="font-semibold text-slate-700">Prototype Evaluation</p>
                    <p className="text-slate-500">
                      Zero credentials committed. Firebase Auth & Firestore schemas staged.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="mt-2 w-full rounded-lg border border-slate-200 py-1.5 text-center text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-bar: Academic Year & Term Configuration Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 md:px-6 py-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 text-[11px]">Academic Year:</span>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-navy-900 focus:outline-none"
            >
              <option value="2025-2026">2025 – 2026</option>
              <option value="2026-2027">2026 – 2027 (Active)</option>
              <option value="2027-2028">2027 – 2028 (Upcoming)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 text-[11px]">Instructional Term:</span>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value as 'Term 1' | 'Term 2')}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-navy-900 focus:outline-none"
            >
              <option value="Term 1">Term 1 (Jun – Oct)</option>
              <option value="Term 2">Term 2 (Nov – Mar)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            Current Scope: <strong>{currentBranch === 'ALL' ? 'All 4 Campuses' : currentBranch}</strong> &bull; Date: <strong>{selectedDate}</strong>
          </span>
        </div>
      </div>
    </header>
  );
};
