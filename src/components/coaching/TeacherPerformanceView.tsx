import React, { useState } from 'react';
import {
  Award,
  Search,
  Filter,
  TrendingUp,
  Star,
  CheckCircle,
  Calendar,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Teacher, BranchCode } from '../../types/baos';
import { SAMPLE_TEACHERS } from '../../data/baosSampleData';

interface TeacherPerformanceViewProps {
  currentBranch: BranchCode | 'ALL';
}

export const TeacherPerformanceView: React.FC<TeacherPerformanceViewProps> = ({
  currentBranch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = SAMPLE_TEACHERS.filter((t) => {
    const matchesBranch = currentBranch === 'ALL' || t.branch === currentBranch;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Teacher Performance & Follow-up</h2>
          <p className="text-xs text-slate-500">
            Holistic faculty evaluations combining observation rubrics, student learning milestones, and peer collaboration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Formative Review Cycle Q1
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter faculty member by name or subject..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Performance Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeachers.map((teacher, idx) => {
          // Sample realistic ratings based on their coachingStage
          const score =
            teacher.coachingStage === 'Master Guide'
              ? '4.9'
              : teacher.coachingStage === 'Proficient'
              ? '4.6'
              : '4.2';

          const attendanceReliability = '98.5%';
          const studentGainRate = teacher.coachingStage === 'Master Guide' ? '96%' : '91%';

          return (
            <div
              key={teacher.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-teal-400 transition"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-navy-950 text-sm">{teacher.name}</h3>
                    <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900 font-mono">
                      {teacher.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{teacher.designation}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      teacher.coachingStage === 'Master Guide'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {teacher.coachingStage}
                  </span>
                  <div className="flex items-center justify-end gap-1 mt-1 text-xs font-bold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    <span>{score} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Performance Pillars */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Observation Score
                  </span>
                  <strong className="text-navy-950 text-sm mt-0.5 block">{score} / 5.0</strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Class Attendance
                  </span>
                  <strong className="text-emerald-700 text-sm mt-0.5 block">
                    {attendanceReliability}
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Student Mastery
                  </span>
                  <strong className="text-teal-700 text-sm mt-0.5 block">{studentGainRate}</strong>
                </div>
              </div>

              {/* Active Follow-up note */}
              <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 text-slate-700 space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">
                  Quarterly Follow-up Status
                </span>
                <p>
                  {teacher.coachingStage === 'Master Guide'
                    ? 'Faculty nominated as mentor for upcoming AMI normalization cohort.'
                    : 'Targeting higher HOTS questioning techniques in science/math labs.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
