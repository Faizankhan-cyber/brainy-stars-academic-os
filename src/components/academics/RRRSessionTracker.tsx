import React, { useState } from 'react';
import {
  Repeat,
  Plus,
  CheckCircle2,
  Calendar,
  Users,
  Target,
  BarChart2,
  Sparkles,
} from 'lucide-react';
import { RRRSession, BranchCode } from '../../types/baos';
import { SAMPLE_RRR_SESSIONS } from '../../data/baosSampleData';

interface RRRSessionTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const RRRSessionTracker: React.FC<RRRSessionTrackerProps> = ({
  currentBranch,
}) => {
  const [sessions, setSessions] = useState<RRRSession[]>(SAMPLE_RRR_SESSIONS);

  const filteredSessions = sessions.filter((s) => {
    return currentBranch === 'ALL' || s.branch === currentBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">
            RRR (Remedial, Revision & Retention) Tracker
          </h2>
          <p className="text-xs text-slate-500">
            Brainy Stars' 3-Tier systematic learning loop ensuring deep mastery and cognitive consolidation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            3-Tier Cognitive Loop
          </span>
        </div>
      </div>

      {/* 3 Tier Explanation Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
            Tier 1: Remedial (R1)
          </span>
          <h3 className="font-bold text-rose-950 text-sm mt-1">Foundational Gap Recovery</h3>
          <p className="text-xs text-rose-900/80 mt-1">
            Hands-on Montessori apparatus re-presentation for students below 60% concept mastery.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Tier 2: Revision (R2)
          </span>
          <h3 className="font-bold text-amber-950 text-sm mt-1">Spaced Practice & Retrieval</h3>
          <p className="text-xs text-amber-900/80 mt-1">
            Whole-class interactive retrieval games, flashcards, and concept mind-mapping.
          </p>
        </div>

        <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
            Tier 3: Retention & Mastery (R3)
          </span>
          <h3 className="font-bold text-teal-950 text-sm mt-1">Application & Long-term Retention</h3>
          <p className="text-xs text-teal-900/80 mt-1">
            Real-world project links, cross-disciplinary inquiry, and peer mentoring presentations.
          </p>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="space-y-3">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      session.tier.startsWith('Remedial')
                        ? 'bg-rose-100 text-rose-800'
                        : session.tier.startsWith('Revision')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {session.tier}
                  </span>
                  <span className="font-bold text-navy-950 text-sm">
                    {session.grade} &bull; {session.subject}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                    Campus: {session.branch}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">Focus: {session.conceptFocus}</p>
              </div>

              <div className="flex items-center gap-3">
                {session.masteryAttainmentRate > 0 && (
                  <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <span>Mastery: {session.masteryAttainmentRate}%</span>
                  </div>
                )}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    session.status === 'Completed'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {session.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
              <span>
                Lead Guide: <strong className="text-slate-700">{session.leadTeacher}</strong> &bull; Cohort: {session.studentCount} Students
              </span>
              <span>
                Conducted On: <strong className="text-slate-700">{session.date}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
