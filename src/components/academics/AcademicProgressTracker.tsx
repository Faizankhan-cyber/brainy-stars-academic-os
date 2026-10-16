import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Filter,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';
import { INITIAL_STUDENTS, INITIAL_ASSESSMENTS } from '../../data/mockData';

interface AcademicProgressTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const AcademicProgressTracker: React.FC<AcademicProgressTrackerProps> = ({
  currentBranch,
}) => {
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = INITIAL_STUDENTS.filter((st) => {
    const matchesGrade = selectedGrade === 'ALL' || st.grade === selectedGrade;
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Academic Progress Tracker</h2>
          <p className="text-xs text-slate-500">
            Integrated evaluation combining CBSE scholastic standards, Montessori sensorial milestones, and character rubrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Term 1 Assessment Analytics
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name or roll number..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Grades (Pre-KG to Grade 8)</option>
            <option value="Pre-KG">Pre-KG</option>
            <option value="UKG">UKG</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
          </select>
        </div>
      </div>

      {/* Students Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.map((student) => {
          const assessment = INITIAL_ASSESSMENTS.find((a) => a.studentId === student.id);
          const scholasticAvg = assessment
            ? Math.round(
                assessment.scholasticMarks.reduce((acc, m) => acc + m.marksObtained, 0) /
                  assessment.scholasticMarks.length
              )
            : 92;

          return (
            <div
              key={student.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-teal-400 transition"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-teal-300 font-bold text-xs shrink-0">
                    {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm">{student.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {student.grade} &bull; Section {student.section} &bull; Roll: {student.rollNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded-full bg-teal-50 text-teal-800 font-bold px-2 py-0.5 text-[10px] border border-teal-200">
                    Scholastic: {scholasticAvg}%
                  </span>
                </div>
              </div>

              {/* Progress Milestones breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Attendance
                  </span>
                  <strong className="text-navy-950 text-sm mt-0.5 block">{student.attendanceRate}%</strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Montessori Stage
                  </span>
                  <strong className="text-teal-700 text-[11px] mt-0.5 block truncate">
                    {student.montessoriStage || 'Primary'}
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Islamic Studies
                  </span>
                  <strong className="text-emerald-700 text-[11px] mt-0.5 block truncate">
                    {student.islamicStudiesLevel || 'Level 1'}
                  </strong>
                </div>
              </div>

              {assessment && (
                <div className="space-y-1.5 text-xs">
                  <span className="font-semibold text-slate-600 text-[10px] uppercase">
                    Key Subject Grades:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.scholasticMarks.slice(0, 4).map((m, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 text-[11px] font-medium"
                      >
                        {m.subject.split(' ')[0]}: <strong>{m.grade}</strong> ({m.marksObtained}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
