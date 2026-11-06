import React from 'react';
import {
  Sparkles, Home, UsersRound, GraduationCap, TrendingUp, ClipboardList,
  BookOpen, LifeBuoy, Heart, Clock3, ChevronLeft, ChevronRight, CalendarDays, GitBranch,
  FileText, Eye, ClipboardCheck, BookMarked, Settings, Activity,
} from 'lucide-react';
import { NavItemId } from '../types/baos';

interface SidebarProps {
  activeNav: NavItemId;
  onNavigate: (nav: NavItemId) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const sections = [
  { label: 'DASHBOARD', items: [
    { label: 'Executive Overview', nav: 'home' as NavItemId, icon: Home },
  ]},
  { label: 'SCHOOL OPERATIONS', items: [
    { label: 'Teacher Database', nav: 'operations-teachers' as NavItemId, icon: UsersRound },
    { label: 'Teacher Attendance', nav: 'operations-attendance' as NavItemId, icon: ClipboardCheck },
    { label: 'Timetable Management', nav: 'operations-timetable' as NavItemId, icon: CalendarDays },
    { label: 'Substitution Engine', nav: 'operations-substitution' as NavItemId, icon: GitBranch },
    { label: 'Daily Operating System', nav: 'operations-daily-ops' as NavItemId, icon: Activity },
    { label: 'Daily Academic Report', nav: 'operations-daily-report' as NavItemId, icon: FileText },
    { label: 'Branch Operations', nav: 'operations-branch' as NavItemId, icon: BookMarked },
  ]},
  { label: 'ACADEMIC EXCELLENCE', items: [
    { label: 'Academic Progress', nav: 'academics-progress' as NavItemId, icon: TrendingUp },
    { label: 'Assessments', nav: 'academics-assessments' as NavItemId, icon: ClipboardList },
    { label: 'Syllabus Tracker', nav: 'academics-syllabus' as NavItemId, icon: BookOpen },
    { label: 'Student Interventions', nav: 'academics-interventions' as NavItemId, icon: LifeBuoy },
    { label: 'Grade 9 Support', nav: 'academics-grade9' as NavItemId, icon: GraduationCap },
    { label: 'Grade 10 Support', nav: 'academics-grade10' as NavItemId, icon: GraduationCap },
    { label: 'RRR Sessions', nav: 'academics-rrr' as NavItemId, icon: BookMarked },
    { label: 'Classroom Observations', nav: 'coaching-observations' as NavItemId, icon: Eye },
    { label: 'Coaching Plans', nav: 'coaching-plans' as NavItemId, icon: Heart },
    { label: 'Performance & Follow-up', nav: 'coaching-performance' as NavItemId, icon: TrendingUp },
    { label: 'Teacher Training Academy', nav: 'coaching-academy' as NavItemId, icon: GraduationCap },
  ]},
  { label: 'PARENT PARTNERSHIPS', items: [
    { label: 'PTM Tracker', nav: 'parents-ptm' as NavItemId, icon: UsersRound },
    { label: 'Parent Communication', nav: 'parents-communication' as NavItemId, icon: Heart },
    { label: 'Parent Concerns', nav: 'parents-concerns' as NavItemId, icon: LifeBuoy },
  ]},
  { label: 'LEADERSHIP & REPORTS', items: [
    { label: 'Executive Reports', nav: 'leadership-executive' as NavItemId, icon: FileText },
    { label: 'Branch Performance', nav: 'leadership-branch' as NavItemId, icon: TrendingUp },
    { label: 'Academic Review', nav: 'leadership-review' as NavItemId, icon: ClipboardList },
    { label: 'Leadership Actions', nav: 'leadership-actions' as NavItemId, icon: Clock3 },
  ]},
  { label: 'SYSTEM', items: [
    { label: 'Settings', nav: 'settings' as NavItemId, icon: Settings },
  ]},
];

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavigate, isOpen, onToggle }) => (
  <>
    <button aria-label="Close navigation overlay" onClick={onToggle} className={`fixed inset-0 z-40 bg-black/35 lg:hidden ${isOpen ? 'block' : 'hidden'}`} />
    <aside aria-label="Sidebar navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[285px] shrink-0 flex-col border-r border-[#431750] bg-[#512064] text-white shadow-xl transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mx-3 flex min-h-[76px] shrink-0 items-center gap-3 border-b border-white/15 px-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#59ab42] text-white"><Sparkles className="h-6 w-6 fill-white/20" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-extrabold leading-5 tracking-wide">BRAINY STARS</p>
          <p className="mt-1 text-xs font-medium leading-4 text-white/80">ACADEMIC OPERATING SYSTEM</p>
        </div>
        <button aria-label="Collapse sidebar" onClick={onToggle} className="rounded-md p-2 hover:bg-white/10">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <nav aria-label="Main navigation" className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {sections.map((section, i) => (
          <section key={section.label || i} className="space-y-2">
            <p className="px-2 pb-1 text-xs font-bold tracking-[.09em] text-white/65">{section.label}</p>
            <div className="space-y-1">
              {section.items.map(item => {
                const active = activeNav === item.nav;
                const Icon = item.icon;
                return <button key={item.nav} aria-current={active ? 'page' : undefined} onClick={() => { onNavigate(item.nav); onToggle(); }} className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm leading-5 transition ${active ? 'bg-[#59ab42] font-semibold text-white shadow-sm' : 'text-white/90 hover:bg-white/10'}`}>
                  <Icon className="h-[18px] w-[18px] shrink-0" /><span>{item.label}</span>
                </button>;
              })}
            </div>
          </section>
        ))}
      </nav>
      <div className="m-3 flex min-h-[66px] shrink-0 items-center gap-3 rounded-xl bg-white/10 px-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#59ab42] text-sm font-bold text-white">AT</div>
        <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">Academic In-Charge</p><p className="mt-1 truncate text-xs text-white/70">Brainy Stars School</p></div>
      </div>
    </aside>
    {!isOpen && <button aria-label="Open sidebar navigation" onClick={onToggle} className="fixed left-3 top-3 z-30 hidden rounded-lg bg-[#512064] p-2 text-white shadow-md lg:block"><ChevronRight className="h-5 w-5" /></button>}
  </>
);
