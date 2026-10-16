import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  User,
  MapPin,
  Filter,
  Layers,
  Sparkles,
  Printer,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';

interface TimetableManagementProps {
  currentBranch: BranchCode | 'ALL';
}

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
  const [selectedGrade, setSelectedGrade] = useState('Grade 3 A');
  const [activeDay, setActiveDay] = useState('Monday');

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
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <Printer className="h-4 w-4" />
            <span>Print Grid</span>
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
            6 Academic Periods &bull; Zero Conflict Verified
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

            const lesson = SAMPLE_SCHEDULE[activeDay]?.[slot.period];

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 hover:bg-white hover:border-teal-400 hover:shadow-sm transition"
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
                        {lesson?.teacher || 'Unassigned'}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {lesson?.room || 'General Hall'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="self-end sm:self-center font-mono text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  {slot.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
