import React from 'react';
import {
  Users,
  CalendarCheck,
  Shuffle,
  FileSpreadsheet,
  Eye,
  LifeBuoy,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Building,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { NavItemId } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

interface HomeDashboardProps {
  onNavigate: (nav: NavItemId) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate }) => {
  const {
    academicYear,
    term,
    selectedDate,
    currentBranch,
    teachers,
    teacherAttendance,
    substitutionRequests,
    dailyAcademicReports,
    classroomObservations,
    studentInterventions,
    leadershipActionItems,
    recentActivities,
    branches,
    toggleLeadershipAction,
  } = useSchool();

  // Mathematically consistent derived calculations
  const filteredTeachers =
    currentBranch === 'ALL'
      ? teachers
      : teachers.filter((t) => t.branch === currentBranch);

  const filteredAttendance = teacherAttendance.filter(
    (a) => (currentBranch === 'ALL' || a.branch === currentBranch) && a.date === selectedDate
  );

  const presentCount = filteredAttendance.filter(
    (a) => a.status === 'Present' || a.status === 'On Duty'
  ).length;

  const attendanceRate =
    filteredAttendance.length > 0
      ? ((presentCount / filteredAttendance.length) * 100).toFixed(1)
      : '100.0';

  const pendingSubstitutions = substitutionRequests.filter(
    (s) => (currentBranch === 'ALL' || s.branch === currentBranch) && s.status === 'Pending Allocation'
  ).length;

  const pendingReports = dailyAcademicReports.filter(
    (r) => (currentBranch === 'ALL' || r.branch === currentBranch) && r.status === 'Pending Review'
  ).length;

  const observationCount = classroomObservations.filter(
    (o) => currentBranch === 'ALL' || o.branch === currentBranch
  ).length;

  const academicFollowUps = studentInterventions.filter(
    (i) => (currentBranch === 'ALL' || i.branch === currentBranch) && i.outcomeStatus !== 'Resolved / Exited'
  ).length;

  const filteredActionItems = leadershipActionItems.filter(
    (i) => currentBranch === 'ALL' || i.branch === currentBranch
  );

  const filteredRecentActivities = recentActivities.filter(
    (a) => currentBranch === 'ALL' || a.branch === currentBranch || a.branch === 'All'
  );

  return (
    <div className="space-y-6">
      {/* Demonstration Data Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-amber-950">Demonstration Data Notice</p>
            <p className="text-amber-800 leading-relaxed">
              All metrics, faculty rosters, timetables, and actions are consistent sample values configured for functional evaluation of BAOS.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="rounded-md bg-amber-200/80 px-2.5 py-1 font-mono font-semibold text-[11px] text-amber-950">
            PROTOTYPE EVALUATION MODE
          </span>
        </div>
      </div>

      {/* Top Welcome Strip with active Academic Year and Term */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Academic Year {academicYear}</span>
              <span>&bull;</span>
              <span>{term}</span>
              <span>&bull;</span>
              <span>Scope: {currentBranch === 'ALL' ? 'All Campuses' : currentBranch}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Brainy Stars Academic Operating System
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Integrated operations, teacher coaching, CBSE + Montessori academics, and leadership governance for holistic child development.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('operations-substitution')}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-950/40 hover:bg-teal-500 transition"
            >
              <Shuffle className="h-4 w-4" />
              <span>Substitution Engine</span>
            </button>
            <button
              onClick={() => onNavigate('operations-daily-report')}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-navy-800/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-navy-800 hover:text-white transition"
            >
              <FileSpreadsheet className="h-4 w-4 text-teal-400" />
              <span>Submit DAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Required Summary KPI Cards (Mathematically consistent with store) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Total Teachers */}
        <div
          onClick={() => onNavigate('operations-teachers')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-teal-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Teachers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-800 group-hover:bg-teal-50 group-hover:text-teal-700 transition">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-navy-950">{filteredTeachers.length}</span>
            <span className="text-[11px] font-medium text-slate-500">Faculty</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-teal-700 font-medium">
            <span>Rostered in Scope</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* 2. Teacher Attendance */}
        <div
          onClick={() => onNavigate('operations-attendance')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-teal-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Teacher Attendance</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-navy-950">{attendanceRate}%</span>
            <span className="text-[11px] font-semibold text-emerald-600">
              {presentCount}/{filteredAttendance.length} On Duty
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Date: {selectedDate}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-teal-600" />
          </div>
        </div>

        {/* 3. Substitution Requests */}
        <div
          onClick={() => onNavigate('operations-substitution')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-amber-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Substitutions</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-100 transition">
              <Shuffle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700">{pendingSubstitutions}</span>
            <span className="text-[11px] font-bold text-amber-800">Pending</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-amber-700 font-medium">
            <span>Rule-Based Engine</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* 4. Pending Daily Reports */}
        <div
          onClick={() => onNavigate('operations-daily-report')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-teal-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Daily Reports (DAR)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-800 group-hover:bg-teal-50 group-hover:text-teal-700 transition">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-navy-950">{pendingReports}</span>
            <span className="text-[11px] font-medium text-slate-500">To Review</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-teal-700 font-medium">
            <span>End-of-Day Protocol</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* 5. Classroom Observations */}
        <div
          onClick={() => onNavigate('coaching-observations')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-teal-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Observations</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-navy-950">{observationCount}</span>
            <span className="text-[11px] font-medium text-slate-500">Completed</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-teal-700 font-medium">
            <span>5-Domain Rubric</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* 6. Academic Follow-ups */}
        <div
          onClick={() => onNavigate('academics-interventions')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-rose-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Interventions</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 group-hover:bg-rose-100 transition">
              <LifeBuoy className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-700">{academicFollowUps}</span>
            <span className="text-[11px] font-bold text-rose-800">Active</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-rose-700 font-medium">
            <span>Concept & Sensory</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Pending Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Pending Actions & Critical Follow-ups */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wide">
                Pending Actions & Follow-ups ({filteredActionItems.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('leadership-actions')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Manage Directives</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredActionItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 shadow-xs transition ${
                  item.status === 'Closed' ? 'border-slate-200 bg-slate-50 opacity-75' : 'border-slate-200 bg-white hover:border-teal-400'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        item.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Campus: {item.branch}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold text-slate-800 ${item.status === 'Closed' ? 'line-through text-slate-400' : ''}`}>
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span>Owner: {item.owner}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      Due: {item.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => toggleLeadershipAction(item.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      item.status === 'Closed'
                        ? 'border border-slate-200 bg-slate-100 text-slate-600'
                        : 'bg-navy-900 text-white hover:bg-teal-600'
                    }`}
                  >
                    {item.status === 'Closed' ? 'Reopen' : 'Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Module Shortcut Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => onNavigate('academics-grade10')}
              className="cursor-pointer rounded-xl border border-teal-200 bg-teal-50/50 p-4 hover:bg-teal-50 transition"
            >
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <span>Grade 10 Board Support Sessions</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Mathematics & Science support clinics for board exam readiness.
              </p>
            </div>

            <div
              onClick={() => onNavigate('coaching-academy')}
              className="cursor-pointer rounded-xl border border-navy-200 bg-navy-50/50 p-4 hover:bg-navy-50 transition"
            >
              <div className="flex items-center gap-2 text-navy-900 font-bold text-xs">
                <Building className="h-4 w-4 text-navy-700" />
                <span>Teacher Training Academy</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Montessori Normalization & NEP 2020 pedagogical modules.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Recent Activity Log */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal-700" />
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wide">
                Recent Campus Activity
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Live Feed</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs divide-y divide-slate-100">
            {filteredRecentActivities.map((act) => (
              <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-teal-700 shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium ml-2">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {act.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-teal-700">
                    <span className="rounded bg-slate-100 px-1.5 py-0.2 text-slate-600">
                      Campus: {act.branch}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Overview Mini-Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-navy-900 uppercase">
                Active Campuses ({branches.length})
              </span>
              <button
                onClick={() => onNavigate('operations-branch')}
                className="text-[11px] font-bold text-teal-700 hover:underline"
              >
                Details &rarr;
              </button>
            </div>
            <div className="space-y-2">
              {branches.map((b) => (
                <div key={b.code} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-700">{b.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {b.studentCount} Students &bull; {b.facultyCount} Faculty
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
