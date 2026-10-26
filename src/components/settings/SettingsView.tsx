import React from 'react';
import {
  Settings,
  Database,
  ShieldCheck,
  Building,
  Key,
  Server,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { BranchCode } from '../../types/baos';

export const SettingsView: React.FC = () => {
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
  } = useSchool();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">System Settings & Architecture</h2>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200">
              DEMO v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Demonstration parameters and an illustrative view of planned production architecture.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-navy-950 border-b border-slate-100 pb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-600" />
          <span>Demo Environment Parameters</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
            <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white">
              <option value="2025-2026">2025 – 2026</option>
              <option value="2026-2027">2026 – 2027</option>
              <option value="2027-2028">2027 – 2028</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructional Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value as 'Term 1' | 'Term 2')} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white">
              <option value="Term 1">Term 1 (Jun – Oct)</option>
              <option value="Term 2">Term 2 (Nov – Mar)</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Demo Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white" />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Campus Scope</label>
            <select value={currentBranch} onChange={(e) => setCurrentBranch(e.target.value as BranchCode | 'ALL')} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white">
              <option value="ALL">All Campuses ({branches.length})</option>
              {branches.map((b) => <option key={b.code} value={b.code}>{b.name} ({b.code})</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs"><Database className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-bold text-amber-950">Backend integration is not connected</h3>
            <p className="text-xs text-amber-950/90">
              The cards below are planning placeholders only. This application does not currently connect to PostgreSQL/Neon, Firestore, Firebase Auth, or a server API. No database schema, authentication, or security rules are being applied by this screen.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="rounded-xl bg-white p-3 border border-amber-200"><span className="font-mono text-[11px] font-bold text-amber-900 block">Teacher records</span><span className="text-[10px] text-slate-600">Demo data in browser memory</span></div>
          <div className="rounded-xl bg-white p-3 border border-amber-200"><span className="font-mono text-[11px] font-bold text-amber-900 block">Attendance</span><span className="text-[10px] text-slate-600">No biometric or live attendance feed</span></div>
          <div className="rounded-xl bg-white p-3 border border-amber-200"><span className="font-mono text-[11px] font-bold text-amber-900 block">Substitutions</span><span className="text-[10px] text-slate-600">Demo rule evaluator only</span></div>
          <div className="rounded-xl bg-white p-3 border border-amber-200"><span className="font-mono text-[11px] font-bold text-amber-900 block">Daily reports</span><span className="text-[10px] text-slate-600">Temporary, non-persistent reports</span></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-navy-950 text-sm border-b border-slate-100 pb-2">Demo Data & Security Notes</h3>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" /><span><strong>Fictional records:</strong> Sample records are intended for demonstrations and must not be treated as official school data.</span></div>
          <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" /><span><strong>Do not enter real personal information:</strong> Authentication and role-based access are not implemented in this demo.</span></div>
          <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" /><span><strong>Refresh resets edits:</strong> Application state is held in React memory and is not durably saved.</span></div>
          <div className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" /><span><strong>Production gate:</strong> Database migrations, authentication, branch-level authorization, audit logs, backups, and restore testing require implementation and verification before real-data transfer.</span></div>
        </div>
      </div>
    </div>
  );
};
