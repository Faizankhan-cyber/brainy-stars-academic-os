import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import { TrainingAcademySession } from '../../types/baos';
import { SAMPLE_TRAINING_ACADEMY } from '../../data/baosSampleData';

export const TeacherTrainingAcademy: React.FC = () => {
  const [sessions, setSessions] = useState<TrainingAcademySession[]>(SAMPLE_TRAINING_ACADEMY);

  const handleEnroll = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enrolledCount: s.enrolledCount + 1 } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Teacher Training Academy</h2>
          <p className="text-xs text-slate-500">
            Professional development pathways in Montessori normalization, NEP 2020 pedagogy, and Adab-based values mentoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Certified AMI & CBSE Faculty Development
          </span>
        </div>
      </div>

      {/* Academy Banner */}
      <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-bold text-teal-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Brainy Stars Continuous Professional Development (CPD)</span>
        </div>
        <h3 className="text-xl font-black text-white">Empowering Holistic Educators</h3>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          All Brainy Stars guides complete a mandatory 40-hour annual CPD track blending authentic Montessori Sensorial principles, CBSE NEP 2020 experiential inquiry, and moral character education.
        </p>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-teal-400 hover:shadow-md transition space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                  {session.moduleCategory}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    session.status === 'Open for Enrollment'
                      ? 'bg-emerald-100 text-emerald-800'
                      : session.status === 'Completed'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {session.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-navy-950 leading-snug">{session.title}</h4>

              <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-teal-600" />
                  <span>Lead Trainer: <strong>{session.trainer}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Scheduled Date: <strong>{session.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{session.duration} &bull; {session.mode}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Enrolled Faculty:</span>
                <strong className="text-navy-950">{session.enrolledCount} Teachers</strong>
              </div>

              {session.status === 'Open for Enrollment' ? (
                <button
                  onClick={() => handleEnroll(session.id)}
                  className="w-full rounded-lg bg-teal-600 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition"
                >
                  Enroll Campus Faculty
                </button>
              ) : (
                <button
                  disabled
                  className="w-full rounded-lg bg-slate-100 py-2 text-xs font-semibold text-slate-400 cursor-not-allowed"
                >
                  {session.status === 'Completed' ? 'Workshop Archived' : 'Enrolled'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
