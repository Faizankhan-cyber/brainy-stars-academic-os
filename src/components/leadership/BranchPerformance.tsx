import React from 'react';
import {
  BarChart3,
  Building,
  CheckCircle2,
  TrendingUp,
  Star,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';
import { BRANCHES } from '../../data/baosSampleData';

interface BranchPerformanceProps {
  currentBranch: BranchCode | 'ALL';
}

export const BranchPerformance: React.FC<BranchPerformanceProps> = ({
  currentBranch,
}) => {
  const filteredBranches =
    currentBranch === 'ALL'
      ? BRANCHES
      : BRANCHES.filter((b) => b.code === currentBranch);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Branch Performance Matrix</h2>
          <p className="text-xs text-slate-500">
            Comparative analysis of academic delivery, attendance reliability, and Montessori environment quality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Multi-Campus Benchmarking
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Campus Name</th>
                <th className="py-3 px-4">Student Enrollment</th>
                <th className="py-3 px-4">Faculty Count</th>
                <th className="py-3 px-4">Avg Student Attendance</th>
                <th className="py-3 px-4">Montessori Normalization</th>
                <th className="py-3 px-4">PTM Parent Satisfaction</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBranches.map((b) => (
                <tr key={b.code} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-navy-950">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-navy-900 text-teal-300 px-2 py-0.5 font-mono text-[10px]">
                        {b.code}
                      </span>
                      <span>{b.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {b.studentCount}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{b.facultyCount}</td>
                  <td className="py-3.5 px-4 font-semibold text-teal-700">96.8%</td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                      Grade A (95%)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-700">4.8 / 5.0</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="rounded-full bg-teal-100 text-teal-800 px-2.5 py-0.5 text-[10px] font-bold">
                      Optimal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
