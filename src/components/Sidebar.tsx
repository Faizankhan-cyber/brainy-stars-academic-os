import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Shuffle,
  FileSpreadsheet,
  Building,
  Eye,
  Target,
  Award,
  GraduationCap,
  TrendingUp,
  ClipboardList,
  BookOpenCheck,
  LifeBuoy,
  BookMarked,
  Sparkles,
  Repeat,
  HeartHandshake,
  MessageSquare,
  AlertCircle,
  Crown,
  BarChart3,
  CheckSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { NavItemId } from '../types/baos';

interface SidebarProps {
  activeNav: NavItemId;
  onNavigate: (id: NavItemId) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  items: {
    id: NavItemId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

const SECTIONS: NavSection[] = [
  {
    id: 'sec-operations',
    title: 'Operations',
    icon: Users,
    defaultOpen: true,
    items: [
      { id: 'operations-teachers', label: 'Teacher Master Database', icon: Users },
      { id: 'operations-attendance', label: 'Teacher Attendance', icon: CalendarCheck },
      { id: 'operations-timetable', label: 'Timetable Management', icon: CalendarDays },
      { id: 'operations-substitution', label: 'Substitution Engine', icon: Shuffle, badge: '4 Pending', badgeColor: 'bg-amber-500/20 text-amber-300' },
      { id: 'operations-daily-report', label: 'Daily Academic Report', icon: FileSpreadsheet, badge: 'DAR', badgeColor: 'bg-teal-500/20 text-teal-300' },
      { id: 'operations-branch', label: 'Branch Operations', icon: Building },
    ],
  },
  {
    id: 'sec-coaching',
    title: 'Coaching',
    icon: Target,
    defaultOpen: false,
    items: [
      { id: 'coaching-observations', label: 'Classroom Observation Tracker', icon: Eye },
      { id: 'coaching-plans', label: 'Teacher Coaching Plans', icon: Target },
      { id: 'coaching-performance', label: 'Teacher Performance & Follow-up', icon: Award },
      { id: 'coaching-academy', label: 'Teacher Training Academy', icon: GraduationCap, badge: 'New', badgeColor: 'bg-teal-500/20 text-teal-300' },
    ],
  },
  {
    id: 'sec-academics',
    title: 'Academics',
    icon: BookOpenCheck,
    defaultOpen: false,
    items: [
      { id: 'academics-progress', label: 'Academic Progress Tracker', icon: TrendingUp },
      { id: 'academics-assessments', label: 'Assessment Management', icon: ClipboardList },
      { id: 'academics-syllabus', label: 'Syllabus Completion Tracker', icon: BookOpenCheck },
      { id: 'academics-interventions', label: 'Student Intervention Tracker', icon: LifeBuoy, badge: '3 Active', badgeColor: 'bg-amber-500/20 text-amber-300' },
      { id: 'academics-grade9', label: 'Grade 9 Support Sessions', icon: BookMarked },
      { id: 'academics-grade10', label: 'Grade 10 Support Sessions', icon: Sparkles, badge: 'Board', badgeColor: 'bg-teal-500/20 text-teal-300' },
      { id: 'academics-rrr', label: 'RRR Session Tracker', icon: Repeat },
    ],
  },
  {
    id: 'sec-parents',
    title: 'Parents',
    icon: HeartHandshake,
    defaultOpen: false,
    items: [
      { id: 'parents-ptm', label: 'PTM Tracker', icon: HeartHandshake },
      { id: 'parents-communication', label: 'Parent Communication Log', icon: MessageSquare },
      { id: 'parents-concerns', label: 'Parent Concern & Follow-up', icon: AlertCircle, badge: '2 Open', badgeColor: 'bg-rose-500/20 text-rose-300' },
    ],
  },
  {
    id: 'sec-leadership',
    title: 'Leadership',
    icon: Crown,
    defaultOpen: false,
    items: [
      { id: 'leadership-executive', label: 'Executive Dashboard', icon: Crown },
      { id: 'leadership-branch', label: 'Branch Performance', icon: BarChart3 },
      { id: 'leadership-review', label: 'Academic Review', icon: BookOpenCheck },
      { id: 'leadership-actions', label: 'Pending Actions & Follow-ups', icon: CheckSquare, badge: '4 Items', badgeColor: 'bg-amber-500/20 text-amber-300' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'sec-operations': false,
    'sec-coaching': false,
    'sec-academics': false,
    'sec-parents': false,
    'sec-leadership': false,
  });

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#49205a] text-white transition-all duration-300 ease-in-out border-r border-[#3d1b4b] ${
          isOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-72'
        }`}
      >
        {/* Compact application identity — no school logo */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-5 bg-[#3d1b4b]">
          <div className="min-w-0">
            <span className="block text-sm font-extrabold tracking-[0.12em] text-white">BSAOS</span>
            <span className="block text-[10px] font-medium text-white/55">Academic workspace</span>
          </div>
          <button
            onClick={onToggle}
            className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {/* 1. Home Dashboard button */}
          <div>
            <button
              onClick={() => onNavigate('home')}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                activeNav === 'home'
                  ? 'bg-[#59ac43] text-white shadow-sm'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className={`h-4 w-4 ${activeNav === 'home' ? 'text-white' : 'text-teal-400'}`} />
              <span className="flex-1 text-left">Home Dashboard</span>
              {activeNav === 'home' && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </button>
          </div>

          {/* Nav Sections 2 through 6 */}
          {SECTIONS.map((section) => {
            const isSectionCollapsed = collapsedSections[section.id];
            const hasActiveChild = section.items.some((i) => i.id === activeNav);

            return (
              <div key={section.id} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                    hasActiveChild ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <section.icon className="h-3.5 w-3.5 text-slate-500" />
                    {section.title}
                  </span>
                  {isSectionCollapsed ? (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                  )}
                </button>

                {!isSectionCollapsed && (
                  <div className="space-y-0.5 pl-1.5">
                    {section.items.map((item) => {
                      const isActive = activeNav === item.id;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.id)}
                          className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-teal-600/20 text-teal-300 border border-teal-500/40 font-semibold'
                              : 'text-slate-300 hover:bg-navy-800/80 hover:text-white'
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          />
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                item.badgeColor || 'bg-navy-800 text-slate-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* 7. Settings */}
          <div className="pt-2 border-t border-navy-800">
            <button
              onClick={() => onNavigate('settings')}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                activeNav === 'settings'
                  ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-900/30'
                  : 'text-slate-400 hover:bg-navy-800 hover:text-white'
              }`}
            >
              <Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
              <span className="flex-1 text-left">Settings & Architecture</span>
              <span className="text-[10px] text-teal-400 font-mono">v1.0</span>
            </button>
          </div>
        </div>

        {/* Bottom Status Box */}
        <div className="p-3 border-t border-navy-800 bg-navy-950/40 text-[11px]">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Bangalore Campuses</span>
            <span className="text-teal-400 font-bold">4 Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Holistic Montessori &bull; CBSE Affiliated &bull; Values Integrated
          </p>
        </div>
      </aside>
    </>
  );
};
