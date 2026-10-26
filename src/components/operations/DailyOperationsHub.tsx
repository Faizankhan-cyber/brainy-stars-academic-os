import React, { useMemo, useState } from 'react';
import { Activity, AlertTriangle, BookOpenCheck, CalendarCheck, ClipboardList, Copy, FileText, GitBranch, GraduationCap, RefreshCw, Users } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { BranchCode, NavItemId } from '../../types/baos';

interface DailyOperationsHubProps { onNavigate: (nav: NavItemId) => void; }

const dateLabel = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const withinDays = (date: string, endDate: string, days: number) => {
  const end = new Date(`${endDate}T12:00:00`).getTime();
  const value = new Date(`${date}T12:00:00`).getTime();
  return Number.isFinite(end) && Number.isFinite(value) && value <= end && value >= end - (days - 1) * 86400000;
};

export const DailyOperationsHub: React.FC<DailyOperationsHubProps> = ({ onNavigate }) => {
  const { selectedDate, setSelectedDate, currentBranch, branches, teachers, teacherAttendance, substitutionRequests, dailyAcademicReports, classroomObservations, syllabusProgress, leadershipActionItems, coachingPlans } = useSchool();
  const [reportWindow, setReportWindow] = useState<'daily' | 'weekly'>('daily');
  const [copied, setCopied] = useState(false);
  const branchMatches = (branch: BranchCode) => currentBranch === 'ALL' || branch === currentBranch;
  const attendance = useMemo(() => teacherAttendance.filter(r => r.date === selectedDate && branchMatches(r.branch)), [teacherAttendance, selectedDate, currentBranch]);
  const requests = useMemo(() => substitutionRequests.filter(r => r.date === selectedDate && branchMatches(r.branch) && r.status !== 'Cancelled'), [substitutionRequests, selectedDate, currentBranch]);
  const reports = useMemo(() => dailyAcademicReports.filter(r => r.date === selectedDate && branchMatches(r.branch)), [dailyAcademicReports, selectedDate, currentBranch]);
  const observations = useMemo(() => classroomObservations.filter(r => withinDays(r.date, selectedDate, reportWindow === 'daily' ? 1 : 7) && branchMatches(r.branch)), [classroomObservations, selectedDate, currentBranch, reportWindow]);
  const delayed = useMemo(() => syllabusProgress.filter(r => branchMatches(r.branch) && r.status === 'Delayed'), [syllabusProgress, currentBranch]);
  const openActions = leadershipActionItems.filter(a => a.status !== 'Closed' && branchMatches(a.branch));
  const activeTeachers = teachers.filter(t => t.status === 'Active' && branchMatches(t.branch));
  const absentCount = attendance.filter(r => r.status === 'Absent' || r.status === 'Approved Leave').length;
  const presentCount = attendance.filter(r => r.status === 'Present').length;
  const unresolvedSubs = requests.filter(r => !['Completed', 'Cancelled', 'Free Period Approved'].includes(r.status));
  const uncovered = requests.filter(r => r.status === 'Uncovered');
  const needsCoaching = observations.filter(r => r.overallRating === 'Needs Coaching Support');
  const scopeLabel = currentBranch === 'ALL' ? 'All branches' : branches.find(b => b.code === currentBranch)?.name ?? currentBranch;

  const brief = useMemo(() => {
    const dateEnd = selectedDate;
    const relevantAttendance = teacherAttendance.filter(r => withinDays(r.date, dateEnd, reportWindow === 'daily' ? 1 : 7) && branchMatches(r.branch));
    const relevantSubs = substitutionRequests.filter(r => withinDays(r.date, dateEnd, reportWindow === 'daily' ? 1 : 7) && branchMatches(r.branch) && r.status !== 'Cancelled');
    const relevantReports = dailyAcademicReports.filter(r => withinDays(r.date, dateEnd, reportWindow === 'daily' ? 1 : 7) && branchMatches(r.branch));
    const relevantObservations = classroomObservations.filter(r => withinDays(r.date, dateEnd, reportWindow === 'daily' ? 1 : 7) && branchMatches(r.branch));
    const verifiedReports = relevantReports.filter(r => r.status === 'Verified').length;
    const pendingReports = relevantReports.filter(r => r.status !== 'Verified').length;
    const openSubs = relevantSubs.filter(r => !['Completed', 'Cancelled', 'Free Period Approved'].includes(r.status)).length;
    const uncoveredCount = relevantSubs.filter(r => r.status === 'Uncovered').length;
    const needsSupport = relevantObservations.filter(r => r.overallRating === 'Needs Coaching Support').length;
    const delayedCount = syllabusProgress.filter(r => branchMatches(r.branch) && r.status === 'Delayed').length;
    const lines = [
      `BRAINY STARS — ${reportWindow === 'daily' ? 'DAILY' : 'WEEKLY'} OPERATIONS BRIEF`,
      `Date: ${reportWindow === 'daily' ? dateLabel(selectedDate) : `7-day window ending ${dateLabel(selectedDate)}`}`,
      `Scope: ${scopeLabel}`,
      '',
      'OPERATIONS',
      `• Active teachers in scope: ${activeTeachers.length}`,
      `• Attendance records in period: ${relevantAttendance.length}; absent/approved leave records: ${relevantAttendance.filter(r => r.status === 'Absent' || r.status === 'Approved Leave').length}`,
      `• Substitution requests: ${relevantSubs.length}; unresolved: ${openSubs}; uncovered periods: ${uncoveredCount}`,
      '',
      'ACADEMICS & COACHING',
      `• DARs submitted in period: ${relevantReports.length}; verified: ${verifiedReports}; pending review/flagged: ${pendingReports}`,
      `• Delayed syllabus trackers in current records: ${delayedCount}`,
      `• Classroom observations in period: ${relevantObservations.length}; needs coaching support: ${needsSupport}`,
      `• Open leadership actions: ${openActions.length}`,
      '',
      'PRIORITY FOLLOW-UP',
      ...(uncoveredCount ? [`• Resolve ${uncoveredCount} uncovered substitution period(s).`] : []),
      ...(openSubs > uncoveredCount ? [`• Review ${openSubs - uncoveredCount} other unresolved substitution request(s).`] : []),
      ...(pendingReports ? [`• Review ${pendingReports} pending/flagged DAR(s).`] : []),
      ...(delayedCount ? [`• Agree recovery actions for ${delayedCount} delayed syllabus tracker(s).`] : []),
      ...(needsSupport ? [`• Review coaching follow-up for ${needsSupport} observation(s) marked “Needs Coaching Support”.`] : []),
      ...(openActions.length ? [`• Follow up ${openActions.length} open leadership action(s).`] : []),
      ...(!uncoveredCount && !openSubs && !pendingReports && !delayedCount && !needsSupport && !openActions.length ? ['• No priority follow-ups were identified by these record-based checks.'] : []),
      '',
      'Prepared from the BSAOS demo records. Validate figures before sharing as an official management report.'
    ];
    return lines.join('\n');
  }, [reportWindow, selectedDate, currentBranch, teachers, teacherAttendance, substitutionRequests, dailyAcademicReports, classroomObservations, syllabusProgress, leadershipActionItems, coachingPlans]);

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const metricCards = [
    { label: 'Attendance records', value: attendance.length, detail: `${presentCount} marked present · ${absentCount} absent/leave`, icon: Users, nav: 'operations-attendance' as NavItemId },
    { label: 'Open substitutions', value: unresolvedSubs.length, detail: `${uncovered.length} uncovered period(s)`, icon: GitBranch, nav: 'operations-substitution' as NavItemId, alert: uncovered.length > 0 },
    { label: 'Daily reports', value: reports.length, detail: `${reports.filter(r => r.status === 'Verified').length} verified`, icon: FileText, nav: 'operations-daily-report' as NavItemId },
    { label: 'Delayed syllabus', value: delayed.length, detail: 'Across selected branch scope', icon: BookOpenCheck, nav: 'academics-syllabus' as NavItemId, alert: delayed.length > 0 },
  ];

  const workflow = [
    { title: 'Record teacher attendance', detail: 'Use attendance records to identify absence and leave.', nav: 'operations-attendance' as NavItemId, status: attendance.length ? `${attendance.length} records` : 'Needs input', done: attendance.length > 0, icon: CalendarCheck },
    { title: 'Review substitution plan', detail: 'Allocate, approve, publish and close periods manually.', nav: 'operations-substitution' as NavItemId, status: uncovered.length ? `${uncovered.length} uncovered` : unresolvedSubs.length ? `${unresolvedSubs.length} open` : 'Review', done: unresolvedSubs.length === 0, icon: GitBranch },
    { title: 'Verify daily academic reports', detail: 'Check attendance, support sessions and syllabus notes.', nav: 'operations-daily-report' as NavItemId, status: reports.length ? `${reports.filter(r => r.status === 'Verified').length}/${reports.length} verified` : 'No report yet', done: reports.length > 0 && reports.every(r => r.status === 'Verified'), icon: ClipboardList },
    { title: 'Follow up learning and coaching', detail: 'Review delayed syllabus and observation follow-ups.', nav: 'academics-syllabus' as NavItemId, status: `${delayed.length} delayed · ${needsCoaching.length} coaching`, done: delayed.length === 0 && needsCoaching.length === 0, icon: GraduationCap },
  ];

  return <div className="mx-auto max-w-[1400px] space-y-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#7b4d89]">Phase 4 · Live Operations</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-[#302a35] md:text-3xl">Daily Operating System</h1><p className="mt-2 max-w-2xl text-sm text-slate-600">A single operating view for attendance, substitutions, academic reporting, syllabus progress and coaching follow-up.</p></div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><label htmlFor="ops-date" className="text-sm font-semibold text-slate-700">Report date</label><input id="ops-date" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800">{scopeLabel}</span></div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metricCards.map(card => { const Icon = card.icon; return <button key={card.label} onClick={() => onNavigate(card.nav)} className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${card.alert ? 'border-amber-300' : 'border-slate-200'}`}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-600">{card.label}</p><p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">{card.value}</p></div><span className={`rounded-xl p-2.5 ${card.alert ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-800'}`}><Icon className="h-5 w-5" /></span></div><p className="mt-3 text-xs text-slate-500">{card.detail}</p></button>; })}
    </div>

    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_.85fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Daily operating checklist</h2><p className="mt-1 text-sm text-slate-500">Use existing modules; records remain in their source screens.</p></div><Activity className="h-5 w-5 text-violet-700" /></div><div className="mt-4 space-y-3">{workflow.map((item, i) => { const Icon = item.icon; return <button key={item.title} onClick={() => onNavigate(item.nav)} className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50/40"><span className={`mt-0.5 rounded-lg p-2 ${item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-slate-800">{i + 1}. {item.title}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{item.status}</span></span><span className="mt-1 block text-sm text-slate-500">{item.detail}</span></span></button>; })}</div></section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Leadership report builder</h2><p className="mt-1 text-sm text-slate-500">Creates a copy-ready summary from existing BSAOS records.</p></div><FileText className="h-5 w-5 text-violet-700" /></div><div className="mt-4 flex gap-2"><button onClick={() => setReportWindow('daily')} className={`rounded-lg px-3 py-2 text-sm font-semibold ${reportWindow === 'daily' ? 'bg-[#512064] text-white' : 'border border-slate-300 text-slate-700'}`}>Daily</button><button onClick={() => setReportWindow('weekly')} className={`rounded-lg px-3 py-2 text-sm font-semibold ${reportWindow === 'weekly' ? 'bg-[#512064] text-white' : 'border border-slate-300 text-slate-700'}`}>Weekly</button><button onClick={copyBrief} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#59ab42] px-3 py-2 text-sm font-semibold text-white hover:bg-[#4b9638]"><Copy className="h-4 w-4" />{copied ? 'Copied' : 'Copy brief'}</button></div><pre className="mt-3 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-700">{brief}</pre><p className="mt-3 flex items-start gap-2 text-xs text-amber-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Demo data only. Verify the summary before sending it to the Director or Academic Director.</p></section>
    </div>
    <div className="flex flex-col gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-violet-950">Operational principle</p><p className="mt-1 text-sm text-violet-900/80">The hub highlights what needs attention; authorised staff retain control over assignments, approvals and official reporting.</p></div><button onClick={() => onNavigate('leadership-executive')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-900 hover:bg-violet-100"><RefreshCw className="h-4 w-4" />Open executive overview</button></div>
  </div>;
};
