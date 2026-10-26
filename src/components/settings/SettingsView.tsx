import React from 'react';
import { Database, ShieldCheck, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
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
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
              BAOS Core v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-500">
            System configuration, data schema readiness, and institutional parameters for Brainy Stars Academic OS.
          </p>
        </div>
      </div>

      {/* Configurable Parameters Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-navy-950 border-b border-slate-100 pb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-600" />
          <span>Active Institutional Environment Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white"
            >
              <option value="2025-2026">2025 – 2026</option>
              <option value="2026-2027">2026 – 2027 (Active)</option>
              <option value="2027-2028">2027 – 2028 (Next)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructional Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value as 'Term 1' | 'Term 2')}
              className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white"
            >
              <option value="Term 1">Term 1 (Jun – Oct)</option>
              <option value="Term 2">Term 2 (Nov – Mar)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">System Audit Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Campus Scope</label>
            <select
              value={currentBranch}
              onChange={(e) => setCurrentBranch(e.target.value as BranchCode | 'ALL')}
              className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-bold bg-slate-50 focus:bg-white"
            >
              <option value="ALL">All Campuses ({branches.length})</option>
              {branches.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cloud Firestore & Firebase Staging */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-teal-950">
              Cloud Firestore & Firebase Auth Architecture Prepared
            </h3>
            <p className="text-xs text-teal-900/80">
              All domain types, validation guards, and security scopes are staged for future Cloud Firestore integration without live billable connections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/teachers</span>
            <span className="text-[10px] text-slate-500">Master faculty directory & grade-bracket boundaries</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/attendance</span>
            <span className="text-[10px] text-slate-500">Biometric daily logs & leave approvals</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/substitutions</span>
            <span className="text-[10px] text-slate-500">Rule-based allocation queue & priority matches</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/daily_reports</span>
            <span className="text-[10px] text-slate-500">Established 10-section end-of-day reports (DAR)</span>
          </div>
        </div>
      </div>

      {/* Cost & Data Protection Safeguards */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-navy-950 text-sm border-b border-slate-100 pb-2">
          Cost & Data Protection Audit Status
        </h3>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Ongoing Cost:</strong> Zero paid APIs, no Cloud billing accounts provisioned, zero Gemini billing calls.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Data Privacy & PII Protection:</strong> Zero authentic student or staff personal data. All sample records are fictional.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Git Safety:</strong> All secrets, credential keys, and local environment variables excluded via <code>.gitignore</code>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
