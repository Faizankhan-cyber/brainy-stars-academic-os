import React from 'react';
import {
  Building,
  Users,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Phone,
  Bus,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';
import { BRANCHES } from '../../data/baosSampleData';

interface BranchOperationsViewProps {
  currentBranch: BranchCode | 'ALL';
}

export const BranchOperationsView: React.FC<BranchOperationsViewProps> = ({
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
          <h2 className="text-lg font-bold text-navy-900">Branch Operations & Campuses</h2>
          <p className="text-xs text-slate-500">
            Multi-campus governance across Bengaluru and Hubballi centers under Brainy Stars Holistic Montessori.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            4 Operational Campuses
          </span>
        </div>
      </div>

      {/* Campus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div
            key={branch.code}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-teal-300 font-bold text-base shadow-sm">
                  {branch.code}
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950">{branch.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    {branch.location}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Students</span>
                <p className="text-lg font-black text-navy-950 mt-1">{branch.studentCount}</p>
                <span className="text-[10px] text-teal-700 font-medium">Enrolled 2026</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Faculty</span>
                <p className="text-lg font-black text-navy-950 mt-1">{branch.facultyCount}</p>
                <span className="text-[10px] text-slate-500">Guides & Teachers</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Classrooms</span>
                <p className="text-lg font-black text-navy-950 mt-1">
                  {Math.round(branch.studentCount / 22)}
                </p>
                <span className="text-[10px] text-slate-500">Montessori Labs</span>
              </div>
            </div>

            {/* Principal / Campus Head */}
            <div className="rounded-xl bg-navy-50/60 p-3.5 text-xs border border-navy-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-navy-700">Campus Principal / Head</span>
                <p className="font-bold text-navy-950 mt-0.5">{branch.principal}</p>
              </div>
              <ShieldCheck className="h-5 w-5 text-teal-700" />
            </div>

            {/* Operational features checklist */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                <span>Montessori Prepared Environments: 100% Normalized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                <span>GPS-enabled School Bus Transport Fleet active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                <span>Quarterly Safety & Fire Compliance Certified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
