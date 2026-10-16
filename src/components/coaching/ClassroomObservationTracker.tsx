import React, { useState } from 'react';
import {
  Eye,
  Plus,
  Star,
  CheckCircle2,
  Calendar,
  User,
  Search,
  Filter,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ClassroomObservation, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

interface ClassroomObservationTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const ClassroomObservationTracker: React.FC<ClassroomObservationTrackerProps> = ({
  currentBranch,
}) => {
  const { classroomObservations, addObservation, teachers } = useSchool();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<ClassroomObservation | null>(null);

  const [formData, setFormData] = useState({
    teacherName: '',
    observerName: 'Mrs. Shabana Parveen',
    grade: 'Grade 4 A',
    subject: 'General Science',
    lessonTopic: '',
    preparedEnvironment: 5,
    studentEngagement: 5,
    pedagogyAndInquiry: 4,
    valueIntegration: 5,
    timeManagement: 4,
    glows: '',
    grows: '',
  });

  const filteredObservations = classroomObservations.filter((obs) => {
    return currentBranch === 'ALL' || obs.branch === currentBranch;
  });

  const handleCreateObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teacherName) return;

    const newObs: ClassroomObservation = {
      id: `obs-${Date.now()}`,
      teacherId: 'tch-new',
      teacherName: formData.teacherName,
      observerName: formData.observerName,
      observerRole: 'Academic Coordinator',
      branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
      date: new Date().toISOString().split('T')[0],
      grade: formData.grade,
      subject: formData.subject,
      lessonTopic: formData.lessonTopic || 'Montessori 3-Period Lesson',
      domainScores: {
        preparedEnvironment: Number(formData.preparedEnvironment),
        studentEngagement: Number(formData.studentEngagement),
        pedagogyAndInquiry: Number(formData.pedagogyAndInquiry),
        valueIntegration: Number(formData.valueIntegration),
        timeManagement: Number(formData.timeManagement),
      },
      glows: formData.glows || 'Clear presentation and good rapport with students.',
      grows: formData.grows || 'Allow children more silent contemplation time before answering.',
      overallRating: 'Proficient',
      nextFollowUpDate: '2026-11-15',
    };

    addObservation(newObs);
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Classroom Observation Tracker</h2>
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
              {filteredObservations.length} Recorded Walkthroughs
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Formative developmental peer-observations assessing Montessori prepared environments, student inquiry, and Islamic values integration.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Log Observation Walkthrough</span>
        </button>
      </div>

      {/* Observation Cards */}
      <div className="space-y-4">
        {filteredObservations.map((obs) => {
          const avgScore = (
            (obs.domainScores.preparedEnvironment +
              obs.domainScores.studentEngagement +
              obs.domainScores.pedagogyAndInquiry +
              obs.domainScores.valueIntegration +
              obs.domainScores.timeManagement) /
            5
          ).toFixed(1);

          return (
            <div
              key={obs.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 hover:border-teal-400 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950 text-sm">{obs.teacherName}</span>
                    <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                      Campus: {obs.branch}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      &bull; {obs.grade} ({obs.subject})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Topic: {obs.lessonTopic}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      obs.overallRating === 'Exceeds Standards'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {obs.overallRating}
                  </span>
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    <span>{avgScore} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* 5 Domains Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Prepared Env.
                  </span>
                  <strong className="text-navy-950 text-sm">
                    {obs.domainScores.preparedEnvironment}/5
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Engagement
                  </span>
                  <strong className="text-navy-950 text-sm">
                    {obs.domainScores.studentEngagement}/5
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Inquiry
                  </span>
                  <strong className="text-navy-950 text-sm">
                    {obs.domainScores.pedagogyAndInquiry}/5
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Values
                  </span>
                  <strong className="text-navy-950 text-sm">
                    {obs.domainScores.valueIntegration}/5
                  </strong>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Time Mgmt
                  </span>
                  <strong className="text-navy-950 text-sm">
                    {obs.domainScores.timeManagement}/5
                  </strong>
                </div>
              </div>

              {/* Glows and Grows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-teal-50/60 border border-teal-100 p-3">
                  <span className="font-bold text-teal-900 block mb-1">
                    Glows (Strengths Observed):
                  </span>
                  <p className="text-slate-700 leading-relaxed">{obs.glows}</p>
                </div>
                <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-3">
                  <span className="font-bold text-amber-900 block mb-1">
                    Grows (Actionable Coaching Focus):
                  </span>
                  <p className="text-slate-700 leading-relaxed">{obs.grows}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 gap-1">
                <span>
                  Observed by: <strong className="text-slate-700">{obs.observerName}</strong> ({obs.observerRole}) &bull; Date: {obs.date}
                </span>
                <span className="text-teal-700 font-semibold">
                  Follow-up debrief scheduled: {obs.nextFollowUpDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Observation Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-navy-950 mb-1">Log Classroom Walkthrough</h3>
            <p className="text-xs text-slate-500 mb-4">
              Conduct developmental walkthrough and record 5-domain scores.
            </p>

            <form onSubmit={handleCreateObservation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teacher</label>
                  <select
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="">-- Select Teacher --</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.branch})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade & Section</label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lesson Topic</label>
                <input
                  type="text"
                  required
                  value={formData.lessonTopic}
                  onChange={(e) => setFormData({ ...formData, lessonTopic: e.target.value })}
                  placeholder="e.g. Sensorial binomial cube calibration"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Glows (What went well)</label>
                <textarea
                  rows={2}
                  value={formData.glows}
                  onChange={(e) => setFormData({ ...formData, glows: e.target.value })}
                  placeholder="Strengths observed in student engagement and material presentation..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grows (Coaching Focus)</label>
                <textarea
                  rows={2}
                  value={formData.grows}
                  onChange={(e) => setFormData({ ...formData, grows: e.target.value })}
                  placeholder="Actionable steps for the next coaching sync..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"
                >
                  Save Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
