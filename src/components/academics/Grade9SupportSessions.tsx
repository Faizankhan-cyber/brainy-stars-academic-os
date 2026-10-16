import React, { useState } from 'react';
import {
  BookMarked,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  MapPin,
  Plus,
} from 'lucide-react';
import { SupportSession, BranchCode } from '../../types/baos';
import { SAMPLE_SUPPORT_SESSIONS } from '../../data/baosSampleData';

interface Grade9SupportSessionsProps {
  currentBranch: BranchCode | 'ALL';
}

export const Grade9SupportSessions: React.FC<Grade9SupportSessionsProps> = ({
  currentBranch,
}) => {
  const [sessions, setSessions] = useState<SupportSession[]>(
    SAMPLE_SUPPORT_SESSIONS.filter((s) => s.grade === 'Grade 9')
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Grade 9 Support Sessions</h2>
          <p className="text-xs text-slate-500">
            Dedicated secondary foundational clinics bridging middle school concepts with CBSE Class 9 rigor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            CBSE Secondary Bridge Clinic
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-0.5 text-xs font-bold text-teal-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Class 9 Academic Acceleration Program</span>
        </div>
        <h3 className="text-base font-bold text-white">Foundational Reinforcement in Mathematics & Sciences</h3>
        <p className="text-xs text-slate-300 max-w-2xl">
          Weekly after-school tutorials strengthening algebraic manipulation, coordinate geometry, and science conceptual problem-solving.
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-950 text-sm">{session.subject}</span>
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    {session.targetGroup}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                    Campus: {session.branch}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Core Topic: <strong>{session.topic}</strong>
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  session.status === 'Completed'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {session.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-teal-600" />
                <span>{session.scheduledTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                <span>Attended: <strong>{session.attendedCount}</strong> / {session.registeredCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Venue: {session.venue}</span>
              </div>
              <div className="text-right sm:text-left">
                <span>Mentor: <strong>{session.mentorTeacher}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
