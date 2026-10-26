import React, { useEffect, useMemo, useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { readDemoValue, writeDemoValue } from '../../lib/demoPersistence';
import {
  CalendarDays,
  Clock,
  User,
  MapPin,
  Download,
  FileSpreadsheet,
  Printer,
  Pencil,
  Save,
  AlertTriangle,
  Plus,
  Trash2,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';

interface TimetableManagementProps {
  currentBranch: BranchCode | 'ALL';
}

type EditableSlot = ScheduleSlot & { teacherId?: string };
type SavedSchedules = Record<string, Record<string, Record<number, EditableSlot>>>;
const STORAGE_KEY = 'timetableSchedules';
const HIDDEN_STORAGE_KEY = 'timetableHiddenSchedules';
const emptySlot = (): EditableSlot => ({ subject: '', teacher: '', room: '', category: 'CBSE' });

const PERIODS = [
  { period: 1, time: '08:30 AM - 09:15 AM', label: 'Period 1' },
  { period: 2, time: '09:15 AM - 10:00 AM', label: 'Period 2' },
  { period: 'BREAK', time: '10:00 AM - 10:20 AM', label: 'Morning Fruit & Adab Break' },
  { period: 3, time: '10:20 AM - 11:05 AM', label: 'Period 3' },
  { period: 4, time: '11:05 AM - 11:50 AM', label: 'Period 4' },
  { period: 'LUNCH', time: '11:50 AM - 12:30 PM', label: 'Lunch & Zuhr Salah' },
  { period: 5, time: '12:30 PM - 01:15 PM', label: 'Period 5' },
  { period: 6, time: '01:15 PM - 02:00 PM', label: 'Period 6' },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface ScheduleSlot {
  subject: string;
  teacher: string;
  room: string;
  category: 'Montessori' | 'CBSE' | 'Values/Islamic' | 'Sports/Arts';
}

const SAMPLE_SCHEDULE: Record<string, Record<number, ScheduleSlot>> = {
  Monday: {
    1: { subject: 'Quranic Sciences & Tajweed', teacher: 'Muallim Qasim Nadwi', room: 'Room 301', category: 'Values/Islamic' },
    2: { subject: 'Montessori Decanomial Math', teacher: 'Sr. Fatima Zahra', room: 'Montessori Lab A', category: 'Montessori' },
    3: { subject: 'English Grammar & Literature', teacher: 'Mrs. Shabana Parveen', room: 'Room 301', category: 'CBSE' },
    4: { subject: 'Environmental Studies (EVS)', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    5: { subject: 'Hadith Reflections & Adab', teacher: 'Sr. Ayesha Begum', room: 'Room 301', category: 'Values/Islamic' },
    6: { subject: 'Karate & Physical Alignment', teacher: 'Sensei Farhan Ahmed', room: 'Sports Complex', category: 'Sports/Arts' },
  },
  Tuesday: {
    1: { subject: 'Arabic Language & Lexicon', teacher: 'Muallim Qasim Nadwi', room: 'Room 301', category: 'Values/Islamic' },
    2: { subject: 'Experiential Science Lab', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    3: { subject: 'Mental Math & Geometry', teacher: 'Sr. Fatima Zahra', room: 'Room 301', category: 'CBSE' },
    4: { subject: 'Social Studies & Indian Heritage', teacher: 'Mrs. Shabana Parveen', room: 'Room 301', category: 'CBSE' },
    5: { subject: 'STEM Robotics & Tinkering', teacher: 'Er. Suhaib Akhtar', room: 'Maker Studio', category: 'CBSE' },
    6: { subject: 'Sensorial Calligraphy & Art', teacher: 'Sr. Rehana Banu', room: 'Art Atelier', category: 'Sports/Arts' },
  },
  Wednesday: {
    1: { subject: 'Montessori Sensorial Language', teacher: 'Sr. Fatima Zahra', room: 'Montessori Lab A', category: 'Montessori' },
    2: { subject: 'English Creative Composition', teacher: 'Mrs. Shabana Parveen', room: 'Room 301', category: 'CBSE' },
    3: { subject: 'Quranic Memorization (Hifz)', teacher: 'Muallim Qasim Nadwi', room: 'Room 301', category: 'Values/Islamic' },
    4: { subject: 'Mathematics Word Problem Solving', teacher: 'Er. Suhaib Akhtar', room: 'Room 301', category: 'CBSE' },
    5: { subject: 'Science Concept Inquiry', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    6: { subject: 'Library & Guided Silent Reading', teacher: 'Mrs. Shabana Parveen', room: 'Central Library', category: 'Montessori' },
  },
  Thursday: {
    1: { subject: 'Tajweed Pronunciation Lab', teacher: 'Muallim Qasim Nadwi', room: 'Room 301', category: 'Values/Islamic' },
    2: { subject: 'Montessori Fraction Insets', teacher: 'Sr. Fatima Zahra', room: 'Montessori Lab A', category: 'Montessori' },
    3: { subject: 'Science Demonstration', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    4: { subject: 'Second Language (Hindi/Kannada)', teacher: 'Mr. Ramesh Kumar', room: 'Room 301', category: 'CBSE' },
    5: { subject: 'Grace & Courtesy Circle', teacher: 'Sr. Ayesha Begum', room: 'Room 301', category: 'Values/Islamic' },
    6: { subject: 'Karate Kumite Drill', teacher: 'Sensei Farhan Ahmed', room: 'Sports Complex', category: 'Sports/Arts' },
  },
  Friday: {
    1: { subject: 'Surah Kahf Recitation & Reflection', teacher: 'Muallim Qasim Nadwi', room: 'Auditorium', category: 'Values/Islamic' },
    2: { subject: 'Inter-Disciplinary Project Work', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    3: { subject: 'English Debate & Eloquence', teacher: 'Mrs. Shabana Parveen', room: 'Room 301', category: 'CBSE' },
    4: { subject: 'Jumuah Preparation & Sunnah Manners', teacher: 'Muallim Qasim Nadwi', room: 'Campus Masjid', category: 'Values/Islamic' },
    5: { subject: 'Special Co-Curricular Club', teacher: 'Er. Suhaib Akhtar', room: 'Maker Studio', category: 'Sports/Arts' },
    6: { subject: 'Weekly Academic Review', teacher: 'Sr. Fatima Zahra', room: 'Room 301', category: 'Montessori' },
  },
  Saturday: {
    1: { subject: 'RRR Remedial Clinic (Math)', teacher: 'Er. Suhaib Akhtar', room: 'Room 301', category: 'CBSE' },
    2: { subject: 'Science Exhibition Prep', teacher: 'Ustadh Imran Siddique', room: 'Discovery Lab', category: 'CBSE' },
    3: { subject: 'Creative Calligraphy Showcase', teacher: 'Sr. Rehana Banu', room: 'Art Atelier', category: 'Sports/Arts' },
    4: { subject: 'Montessori Materials Care Routine', teacher: 'Sr. Fatima Zahra', room: 'Montessori Lab A', category: 'Montessori' },
    5: { subject: 'Staff Academic Council Meeting', teacher: 'Academic Leadership', room: 'Council Chamber', category: 'Values/Islamic' },
    6: { subject: 'Dismissal', teacher: 'Duty Guides', room: 'Campus Gates', category: 'Montessori' },
  },
};

export const TimetableManagement: React.FC<TimetableManagementProps> = ({
  currentBranch,
}) => {
  const { teachers } = useSchool();
  const [selectedGrade, setSelectedGrade] = useState('Grade 3 A');
  const [activeDay, setActiveDay] = useState('Monday');
  const [editingPeriod, setEditingPeriod] = useState<number | null>(null);
  const [draft, setDraft] = useState<EditableSlot>(emptySlot());
  const [hiddenSchedules, setHiddenSchedules] = useState<string[]>(() => typeof window === 'undefined' ? [] : readDemoValue<string[]>(window.localStorage, HIDDEN_STORAGE_KEY, []));
  const [savedSchedules, setSavedSchedules] = useState<SavedSchedules>(() => {
    if (typeof window === 'undefined') return {};
    return readDemoValue<SavedSchedules>(window.localStorage, STORAGE_KEY, {});
  });
  useEffect(() => {
    if (typeof window !== 'undefined') writeDemoValue(window.localStorage, STORAGE_KEY, savedSchedules);
  }, [savedSchedules]);
  useEffect(() => {
    if (typeof window !== 'undefined') writeDemoValue(window.localStorage, HIDDEN_STORAGE_KEY, hiddenSchedules);
  }, [hiddenSchedules]);
  const branchKey = currentBranch === 'ALL' ? 'ALL' : currentBranch;
  const scheduleKey = `${branchKey}::${selectedGrade}`;
  const hasSavedTimetable = Object.prototype.hasOwnProperty.call(savedSchedules, scheduleKey);
  const isHiddenTimetable = hiddenSchedules.includes(scheduleKey);
  const activeSchedule: Record<number, EditableSlot> = hasSavedTimetable ? (savedSchedules[scheduleKey]?.[activeDay] || {}) : isHiddenTimetable ? {} : (SAMPLE_SCHEDULE[activeDay] || {});
  const visibleTeacherConflicts = useMemo(() => {
    const counts = new Map<string, number>();
    Object.values(activeSchedule).forEach((lesson) => {
      if (lesson.teacherId) counts.set(lesson.teacherId, (counts.get(lesson.teacherId) || 0) + 1);
    });
    return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([id]) => id));
  }, [activeSchedule]);
  const saveSlot = () => {
    if (editingPeriod === null) return;
    const daySchedule = { ...activeSchedule, [editingPeriod]: { ...draft } };
    setSavedSchedules((prev) => ({
      ...prev,
      [scheduleKey]: { ...(prev[scheduleKey] || {}), [activeDay]: daySchedule },
    }));
    setEditingPeriod(null);
  };
  const beginEdit = (period: number) => {
    setDraft({ ...(activeSchedule[period] || emptySlot()) });
    setEditingPeriod(period);
  };

  const createTimetable = () => {
    if (hasSavedTimetable) return;
    setSavedSchedules((prev) => ({ ...prev, [scheduleKey]: Object.fromEntries(DAYS.map((day) => [day, {}])) }));
    setHiddenSchedules((prev) => prev.filter((key) => key !== scheduleKey));
    setEditingPeriod(null);
  };

  const deleteTimetable = () => {
    if (!hasSavedTimetable && isHiddenTimetable) return;
    if (!window.confirm(`Remove the timetable for ${selectedGrade} at branch ${branchKey} from this browser's demo storage?`)) return;
    setSavedSchedules((prev) => { const next = { ...prev }; delete next[scheduleKey]; return next; });
    setHiddenSchedules((prev) => prev.includes(scheduleKey) ? prev : [...prev, scheduleKey]);
    setEditingPeriod(null);
  };

  const getDaySchedule = (day: string): Record<number, EditableSlot> => {
    if (hasSavedTimetable) return savedSchedules[scheduleKey]?.[day] || {};
    if (isHiddenTimetable) return {};
    return (SAMPLE_SCHEDULE[day] as Record<number, EditableSlot> | undefined) || {};
  };

  const exportCsv = () => {
    const rows = [['Branch', branchKey], ['Class / Section', selectedGrade], [], ['Day', 'Period', 'Time', 'Subject', 'Employee', 'Employee ID', 'Room', 'Category', 'Assignment Status']];
    DAYS.forEach((day) => {
      const daySchedule = getDaySchedule(day);
      PERIODS.forEach((period) => {
        if (typeof period.period !== 'number') {
          rows.push([day, period.label, period.time, '', '', '', '', '', 'Not a teaching period']);
          return;
        }
        const lesson = daySchedule[period.period];
        rows.push([day, String(period.period), period.time, lesson?.subject || '', lesson?.teacher || '', lesson?.teacherId || '', lesson?.room || '', lesson?.category || '', lesson?.teacherId ? 'Linked employee' : lesson?.teacher ? 'Unlinked / illustrative entry' : 'Unassigned']);
      });
    });
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timetable-${String(branchKey).toLowerCase()}-${selectedGrade.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const getBadgeColor = (category: ScheduleSlot['category']) => {
    switch (category) {
      case 'Montessori':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'CBSE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Values/Islamic':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Sports/Arts':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Timetable & Class Allocation</h2>
          <p className="text-xs text-slate-500">
            Montessori 3-period work cycle integration alongside CBSE periods and Islamic values periods.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Grade / Section:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-navy-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="Pre-KG A">Pre-KG A (Montessori Primary)</option>
              <option value="LKG B">LKG B (Montessori Primary)</option>
              <option value="UKG B">UKG B (Montessori Primary)</option>
              <option value="Grade 1 A">Grade 1 A</option>
              <option value="Grade 2 A">Grade 2 A</option>
              <option value="Grade 3 A">Grade 3 A</option>
              <option value="Grade 5 A">Grade 5 A</option>
              <option value="Grade 8 A">Grade 8 A</option>
              <option value="Grade 10">Grade 10 (CBSE Secondary)</option>
            </select>
          </div>
          <button type="button" onClick={createTimetable} disabled={hasSavedTimetable} className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-50" title="Create a blank timetable for this branch and class">
            <Plus className="h-4 w-4" /> <span>New Timetable</span>
          </button>
          <button type="button" onClick={deleteTimetable} disabled={!hasSavedTimetable && isHiddenTimetable} className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50" title="Remove this class timetable from this browser's demo storage">
            <Trash2 className="h-4 w-4" /> <span>Delete Timetable</span>
          </button>
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            title="Download the selected class timetable for the full week as an Excel-compatible CSV"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export Excel (CSV)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            title="Print the currently selected class and day, or choose Save as PDF in the print dialog"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
              activeDay === day
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Period Cards for Selected Day */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-teal-600" />
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wide">
              {activeDay} Schedule &bull; {selectedGrade}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {Object.values(activeSchedule).filter((lesson) => lesson.subject).length} assigned periods · Demo-only schedule
          </span>
        </div>

        <div className="space-y-3">
          {PERIODS.map((slot, idx) => {
            if (typeof slot.period === 'string') {
              // Break period
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-dashed border-amber-300 bg-amber-50/60 px-4 py-2 text-xs text-amber-900 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    <span>{slot.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-amber-800">{slot.time}</span>
                </div>
              );
            }

            const lesson = activeSchedule[slot.period];
            const teacherConflict = !!lesson?.teacherId && visibleTeacherConflicts.has(lesson.teacherId);

            return (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border ${teacherConflict ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50/50'} p-3.5 hover:bg-white hover:border-teal-400 hover:shadow-sm transition`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white font-bold text-xs shrink-0">
                    P{slot.period}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-950 text-xs">
                        {lesson?.subject || 'Free Period / Guided Self Work'}
                      </span>
                      {lesson && (
                        <span
                          className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getBadgeColor(
                            lesson.category
                          )}`}
                        >
                          {lesson.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-400" />
                        {lesson?.teacher || 'Unassigned'}{teacherConflict ? ' · PERIOD CONFLICT' : ''}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {lesson?.room || 'General Hall'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="font-mono text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">{slot.time}</div>
                  <button onClick={() => beginEdit(Number(slot.period))} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-teal-400" aria-label={`Edit period ${slot.period}`}><Pencil className="h-3 w-3" /> Edit</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {editingPeriod !== null && (
        <div role="dialog" aria-modal="true" aria-label={`Edit period ${editingPeriod}`} className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-3">
          <div className="flex items-center justify-between"><h3 className="font-bold text-sm text-navy-950">Edit {activeDay} · Period {editingPeriod} · {selectedGrade}</h3><span className="text-[10px] text-slate-500">Branch: {branchKey}</span></div>
          <p className="text-xs text-slate-600">Changes are saved to this browser's demo storage only. Exported files may include illustrative sample entries until reviewed and replaced with approved school data.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700">Subject<input value={draft.subject} onChange={(e) => setDraft((p) => ({ ...p, subject: e.target.value }))} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Enter subject" /></label>
            <label className="text-xs font-semibold text-slate-700">Assigned employee<select value={draft.teacherId || ''} onChange={(e) => { const t = teachers.find((item) => item.id === e.target.value); setDraft((p) => ({ ...p, teacherId: t?.id || undefined, teacher: t?.name || '' })); }} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">Unassigned / external entry</option>{teachers.filter((t) => t.status === 'Active' && (currentBranch === 'ALL' || t.branch === currentBranch)).map((t) => <option key={t.id} value={t.id}>{t.code} · {t.name}</option>)}</select></label>
            <label className="text-xs font-semibold text-slate-700">Room / learning space<input value={draft.room} onChange={(e) => setDraft((p) => ({ ...p, room: e.target.value }))} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Room / lab" /></label>
            <label className="text-xs font-semibold text-slate-700">Category<select value={draft.category} onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value as ScheduleSlot['category'] }))} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option>Montessori</option><option>CBSE</option><option>Values/Islamic</option><option>Sports/Arts</option></select></label>
          </div>
          <div className="flex gap-2"><button onClick={saveSlot} className="inline-flex items-center gap-1 rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white"><Save className="h-3 w-3" /> Save demo timetable</button><button onClick={() => setEditingPeriod(null)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold">Cancel</button></div>
        </div>
      )}
      <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"><AlertTriangle className="h-4 w-4 shrink-0" /><p><strong>Validation scope:</strong> visible timetable only. Teacher conflict warnings can only use linked employee IDs in this class/day view; cross-class and whole-week conflict validation is not yet available. Timetable data is not yet written back to employee weekly timetables or substitution allocations.</p></div>
    </div>
  );
};
