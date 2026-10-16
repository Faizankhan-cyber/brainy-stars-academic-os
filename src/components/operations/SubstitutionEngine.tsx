import React, { useState } from 'react';
import {
  Shuffle,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Search,
  Building,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { SubstitutionRequest, BranchCode } from '../../types/baos';
import { SAMPLE_SUBSTITUTIONS, SAMPLE_TEACHERS } from '../../data/baosSampleData';

interface SubstitutionEngineProps {
  currentBranch: BranchCode | 'ALL';
}

export const SubstitutionEngine: React.FC<SubstitutionEngineProps> = ({
  currentBranch,
}) => {
  const [requests, setRequests] = useState<SubstitutionRequest[]>(SAMPLE_SUBSTITUTIONS);
  const [allocatingRequest, setAllocatingRequest] = useState<SubstitutionRequest | null>(null);
  const [selectedSubstitute, setSelectedSubstitute] = useState('');

  const filteredRequests = requests.filter((r) => {
    return currentBranch === 'ALL' || r.branch === currentBranch;
  });

  const handleAssignSubstitute = (requestId: string) => {
    if (!selectedSubstitute) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              assignedSubstituteTeacherName: selectedSubstitute,
              status: 'Assigned',
            }
          : r
      )
    );
    setAllocatingRequest(null);
    setSelectedSubstitute('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Smart Substitution Engine</h2>
          <p className="text-xs text-slate-500">
            Intelligent substitution routing matching absent teacher periods with available guides and free periods.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>AI Free-Period Algorithmic Matcher</span>
          </span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Requests Today</span>
          <p className="text-2xl font-black text-navy-950 mt-1">{filteredRequests.length}</p>
          <span className="text-[10px] text-slate-400">Triggered from gate attendance</span>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <span className="text-xs font-semibold text-amber-800">Pending Assignment</span>
          <p className="text-2xl font-black text-amber-700 mt-1">
            {filteredRequests.filter((r) => r.status === 'Pending Allocation').length}
          </p>
          <span className="text-[10px] text-amber-700 font-medium">Requires supervisor action</span>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <span className="text-xs font-semibold text-emerald-800">Assigned & Confirmed</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {filteredRequests.filter((r) => r.status === 'Assigned').length}
          </p>
          <span className="text-[10px] text-emerald-700 font-medium">Substitutes briefed</span>
        </div>
      </div>

      {/* Substitution Requests Grid */}
      <div className="space-y-3">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border p-4 shadow-sm transition ${
              req.status === 'Pending Allocation'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    req.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {req.priority}
                </span>
                <span className="rounded bg-navy-100 text-navy-900 px-2 py-0.5 text-[10px] font-bold">
                  Period {req.period} ({req.timing})
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  Campus: {req.branch}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {req.grade} &bull; Section {req.section}
                </span>
              </div>

              <div className="text-xs text-slate-700">
                <span className="text-slate-500 font-medium">Absent Teacher: </span>
                <strong className="text-rose-700">{req.absentTeacherName}</strong>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500 font-medium">Subject: </span>
                <strong>{req.subject}</strong>
              </div>

              {req.status === 'Assigned' ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Assigned Substitute: {req.assignedSubstituteTeacherName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[11px] text-amber-800 font-medium pt-1">
                  <span className="font-semibold text-amber-900">Suggested Free Guides:</span>
                  {req.suggestedFreeTeachers.map((sug, i) => (
                    <span key={i} className="rounded bg-white border border-amber-200 px-2 py-0.5 shadow-2xs">
                      {sug}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
              {req.status === 'Pending Allocation' ? (
                <button
                  onClick={() => {
                    setAllocatingRequest(req);
                    setSelectedSubstitute(req.suggestedFreeTeachers[0] || '');
                  }}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition flex items-center gap-1.5"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Assign Substitute</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAllocatingRequest(req);
                    setSelectedSubstitute(req.assignedSubstituteTeacherName || '');
                  }}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reassign
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {allocatingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setAllocatingRequest(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-navy-950 mb-1">Assign Substitute Guide</h3>
            <p className="text-xs text-slate-500 mb-4">
              Period {allocatingRequest.period} &bull; {allocatingRequest.grade} {allocatingRequest.section} ({allocatingRequest.subject})
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Select Free Faculty / Substitute Teacher
                </label>
                <select
                  value={selectedSubstitute}
                  onChange={(e) => setSelectedSubstitute(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">-- Choose faculty member --</option>
                  {SAMPLE_TEACHERS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.department} - Campus {t.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-lg bg-teal-50 p-3 text-[11px] text-teal-800 border border-teal-100">
                <strong>System Check:</strong> The selected teacher has zero conflicting periods during {allocatingRequest.timing}.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAllocatingRequest(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAssignSubstitute(allocatingRequest.id)}
                  disabled={!selectedSubstitute}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 disabled:opacity-50"
                >
                  Confirm Allocation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
