import React, { useState } from 'react';
import {
  HeartHandshake,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { PTMRecord, BranchCode } from '../../types/baos';
import { SAMPLE_PTM_RECORDS } from '../../data/baosSampleData';

interface PTMTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const PTMTracker: React.FC<PTMTrackerProps> = ({
  currentBranch,
}) => {
  const [ptmList, setPtmList] = useState<PTMRecord[]>(SAMPLE_PTM_RECORDS);

  const filteredPTM = ptmList.filter((p) => {
    return currentBranch === 'ALL' || p.branch === currentBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Parent-Teacher Meeting (PTM) Tracker</h2>
          <p className="text-xs text-slate-500">
            Attendance rates, scheduling slots, and parent partnership feedback across conferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Parent-Teacher Partnership
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPTM.map((ptm) => {
          const turnoutPercent = Math.round((ptm.attendedSlots / ptm.scheduledSlots) * 100);

          return (
            <div
              key={ptm.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-teal-400 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-navy-950 text-sm">{ptm.grade}</h3>
                    <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                      Campus: {ptm.branch}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Meeting Date: <strong>{ptm.meetingDate}</strong> &bull; Lead Coordinator: {ptm.coordinator}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    <span>Parent Rating: {ptm.averageParentRating} / 5.0</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      ptm.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {ptm.status}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Conference Agenda & Deliberations
                </span>
                <p className="text-slate-800 leading-relaxed">{ptm.agenda}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Scheduled Slots</span>
                  <strong className="text-slate-800">{ptm.scheduledSlots} Parents Booked</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Attended Conferences</span>
                  <strong className="text-emerald-700">{ptm.attendedSlots} Conducted</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Turnout Engagement</span>
                  <strong className="text-teal-700">{turnoutPercent}% Verified</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
