import React, { useState } from 'react';
import {
  BookOpenCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
} from 'lucide-react';
import { SyllabusProgress, BranchCode } from '../../types/baos';
import { SAMPLE_SYLLABUS_PROGRESS } from '../../data/baosSampleData';

interface SyllabusCompletionTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const SyllabusCompletionTracker: React.FC<SyllabusCompletionTrackerProps> = ({
  currentBranch,
}) => {
  const [syllabusList, setSyllabusList] = useState<SyllabusProgress[]>(SAMPLE_SYLLABUS_PROGRESS);

  const filteredList = syllabusList.filter((item) => {
    return currentBranch === 'ALL' || item.branch === currentBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Syllabus Completion Tracker</h2>
          <p className="text-xs text-slate-500">
            Real-time curriculum velocity monitoring across Montessori albums and CBSE textbook chapters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Academic Term 1 Velocity Tracking
          </span>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="space-y-4">
        {filteredList.map((item) => {
          const percent = Math.round((item.completedChapters / item.totalChapters) * 100);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-teal-400 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950 text-sm">
                      {item.grade} &bull; {item.subject}
                    </span>
                    <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                      Campus: {item.branch}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Lead Educator: {item.teacherName}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      item.status === 'On Track'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Ahead of Schedule'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.status} ({item.lagOrLeadWeeks === 0 ? 'On Schedule' : `${item.lagOrLeadWeeks > 0 ? '+' : ''}${item.lagOrLeadWeeks} wks`})
                  </span>
                </div>
              </div>

              {/* Progress Bar & Chapter Counts */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>
                    Chapters Completed: <strong>{item.completedChapters}</strong> of {item.totalChapters}
                  </span>
                  <span className="font-bold text-teal-700">{percent}% Delivered</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'Delayed' ? 'bg-amber-500' : 'bg-teal-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 text-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                  Most Recently Logged Lesson Topic:
                </span>
                <p className="font-medium text-navy-950">{item.lastLessonLogged}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
