import React from 'react';
import {
  Crown,
  TrendingUp,
  Building2,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';
import { BRANCHES } from '../../data/baosSampleData';

interface ExecutiveDashboardProps {
  currentBranch: BranchCode | 'ALL';
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  currentBranch,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Executive Council Dashboard</h2>
          <p className="text-xs text-slate-500">
            Strategic governance and institutional oversight for Brainy Stars Academic Directorate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200 flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-teal-600" />
            <span>Academic Council &bull; AY 2026-27</span>
          </span>
        </div>
      </div>

      {/* Strategic Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Enrolled Scholars</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-black text-navy-950">1,105</p>
            <span className="text-[11px] font-bold text-emerald-600">+8.4% YoY</span>
          </div>
          <span className="text-[10px] text-slate-400">Across 4 Bangalore & Hubballi branches</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Faculty Retention & Mastery</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-black text-teal-700">94.2%</p>
            <span className="text-[11px] font-bold text-teal-800">AMI & CBSE Leads</span>
          </div>
          <span className="text-[10px] text-slate-400">Average tenure 4.6 years</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Curriculum Health Index</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-black text-navy-950">92.1%</p>
            <span className="text-[11px] font-bold text-emerald-600">On Track</span>
          </div>
          <span className="text-[10px] text-slate-400">Montessori Albums + CBSE Books</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Parent Partnership Index</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-black text-amber-600">4.8 / 5.0</p>
            <span className="text-[11px] font-bold text-amber-800">High Trust</span>
          </div>
          <span className="text-[10px] text-slate-400">From 240+ verified PTM surveys</span>
        </div>
      </div>

      {/* Strategic Initiatives & Campus Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-navy-950 text-sm">Strategic Directives & Council Goals</h3>
            <span className="text-[11px] font-bold text-teal-700">Q3 Targets</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between font-bold text-navy-950">
                <span>1. NEP 2020 Experiential Portfolio Certification</span>
                <span className="text-teal-700">80% Ready</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Implementation of student learning journals showcasing sensory science experiments and collaborative civic projects.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between font-bold text-navy-950">
                <span>2. Class 10 Board Exam Readiness Milestone</span>
                <span className="text-teal-700">On Schedule</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Bi-weekly exemplar problem clinics achieving 92% student attendance and zero syllabus lag.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between font-bold text-navy-950">
                <span>3. Hubballi Campus Montessori Lab Expansion</span>
                <span className="text-amber-700">In Progress</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Procurement of imported AMI-certified sensorial wooden prisms and botany cabinet sets.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-navy-950 text-sm">Branch Governance Health</h3>
            <span className="text-[11px] text-slate-400">All Campuses Operational</span>
          </div>

          <div className="space-y-3">
            {BRANCHES.map((b) => (
              <div
                key={b.code}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950">{b.name}</span>
                    <span className="rounded bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.2">
                      {b.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Principal: {b.principal}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-navy-950 text-sm">{b.studentCount}</span>
                  <span className="text-[10px] text-slate-500 block">Enrolled</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
