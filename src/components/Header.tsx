import React, { useState } from 'react';
import {
  Bell,
  Search,
  School,
  ChevronDown,
  Building2,
  Menu,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { NavItemId, BranchCode } from '../types/baos';
import { BRANCHES } from '../data/baosSampleData';

interface HeaderProps {
  activeNav: NavItemId;
  currentBranch: BranchCode | 'ALL';
  onSelectBranch: (branch: BranchCode | 'ALL') => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const PAGE_TITLES: Record<NavItemId, { section: string; title: string }> = {
  home: { section: 'Dashboard', title: 'Executive Overview' },
  'operations-teachers': { section: 'Operations', title: 'Teacher Master Database' },
  'operations-attendance': { section: 'Operations', title: 'Teacher Attendance Registry' },
  'operations-timetable': { section: 'Operations', title: 'Timetable & Class Allocation' },
  'operations-substitution': { section: 'Operations', title: 'Smart Substitution Engine' },
  'operations-daily-report': { section: 'Operations', title: 'Daily Academic Reports (DAR)' },
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
  currentBranch,
  onSelectBranch,
  onToggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pageInfo = PAGE_TITLES[activeNav] || { section: 'BAOS', title: 'Academic System' };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-sm">
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
            <span className="text-slate-500 font-normal">Brainy Stars Montessori</span>
          </div>
          <h1 className="text-lg font-bold text-navy-900 leading-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Center: Demonstration Data Pill Badge */}
      <div className="hidden xl:flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
        <Info className="h-3.5 w-3.5 text-amber-600 shrink-0" />
        <span>Demonstration Data Mode — Fictional records for evaluation</span>
      </div>

      {/* Right Controls: Campus Selector, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Branch Filter dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
            <Building2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <select
              value={currentBranch}
              onChange={(e) => onSelectBranch(e.target.value as BranchCode | 'ALL')}
              className="bg-transparent pr-2 font-semibold text-navy-900 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Campuses (Bangalore & Hubballi)</option>
              {BRANCHES.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-navy-900 transition"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-xs text-navy-900 uppercase tracking-wider">
                  Operational Alerts (4)
                </span>
                <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                  Sample
                </span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5">
                  <p className="font-semibold text-slate-800">2 Substitution Requests Pending</p>
                  <p className="text-slate-500 text-[11px]">Period 4 Grade 2A & Period 5 Grade 4</p>
                  <span className="text-[10px] text-teal-600 font-medium">10 mins ago</span>
                </div>
                <div className="py-2.5">
                  <p className="font-semibold text-slate-800">Daily Academic Report Submitted</p>
                  <p className="text-slate-500 text-[11px]">Jayanagar Campus verified 36 sessions</p>
                  <span className="text-[10px] text-teal-600 font-medium">1 hour ago</span>
                </div>
                <div className="py-2.5">
                  <p className="font-semibold text-slate-800">Parent Concern Logged (High Priority)</p>
                  <p className="text-slate-500 text-[11px]">Nut-free diet verification request</p>
                  <span className="text-[10px] text-amber-600 font-medium">Yesterday</span>
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="mt-2 w-full rounded-lg bg-slate-50 py-1.5 text-center text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Close Drawer
              </button>
            </div>
          )}
        </div>

        {/* User Profile Placeholder */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-slate-100 transition"
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
                  Role: Super Academic Admin
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <div className="rounded p-2 bg-slate-50 text-[11px]">
                  <p className="font-semibold text-slate-700">Authentication State</p>
                  <p className="text-slate-500">
                    Prepared for Firebase Authentication & Firestore DB.
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
    </header>
  );
};
