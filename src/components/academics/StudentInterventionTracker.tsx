import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  User,
  X,
  Target,
  Info,
} from 'lucide-react';
import { StudentIntervention, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

interface StudentInterventionTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const StudentInterventionTracker: React.FC<StudentInterventionTrackerProps> = ({
  currentBranch,
}) => {
  const { studentInterventions, addIntervention, teachers } = useSchool();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    admissionNo: 'ADM/2026/0499',
    grade: 'Grade 3 A',
    triggerCategory: 'Concept Deficit' as StudentIntervention['triggerCategory'],
    subjectArea: '',
    assignedEducator: 'Ustadh Imran Siddique',
    strategySummary: '',
    sessionFrequency: 'Tri-Weekly' as StudentIntervention['sessionFrequency'],
  });

  const filteredInterventions = studentInterventions.filter((item) => {
    return currentBranch === 'ALL' || item.branch === currentBranch;
  });

  const handleAddIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName) return;

    const newIntervention: StudentIntervention = {
      id: `int-${Date.now()}`,
      studentName: formData.studentName,
      admissionNo: formData.admissionNo,
      grade: formData.grade,
      branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
      triggerCategory: formData.triggerCategory,
      subjectArea: formData.subjectArea || 'Foundational Mathematics',
      assignedEducator: formData.assignedEducator,
      strategySummary: formData.strategySummary || 'Differentiated sensory work using Montessori apparatus.',
      sessionFrequency: formData.sessionFrequency,
      targetReviewDate: '2026-11-20',
      outcomeStatus: 'Active Intervention',
    };

    addIntervention(newIntervention);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Student Intervention Tracker</h2>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
              {filteredInterventions.filter((i) => i.outcomeStatus !== 'Resolved / Exited').length} Active Support Plans
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Targeted academic, sensory, and linguistic support ensuring no star is left behind.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Student Intervention Plan</span>
        </button>
      </div>

      {/* Intervention Plans Grid */}
      <div className="space-y-4">
        {filteredInterventions.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-navy-950 text-sm">{item.studentName}</h3>
                  <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900 font-mono">
                    {item.admissionNo}
                  </span>
                  <span className="text-xs text-slate-500">&bull; {item.grade}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">Focus: {item.subjectArea}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                  Trigger: {item.triggerCategory}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    item.outcomeStatus === 'Demonstrating Gains'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.outcomeStatus}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Pedagogical Intervention Strategy
              </span>
              <p className="text-slate-800 leading-relaxed">{item.strategySummary}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-1 gap-1">
              <span>
                Assigned Educator: <strong className="text-slate-700">{item.assignedEducator}</strong> &bull; Frequency: {item.sessionFrequency}
              </span>
              <span className="text-teal-700 font-semibold">
                Next Review Date: {item.targetReviewDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">Initiate Student Intervention</h3>
            <p className="text-xs text-slate-500 mb-4">
              Structured developmental protocol for students requiring individualized guidance.
            </p>

            <form onSubmit={handleAddIntervention} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Ibrahim Farooq"
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade</label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trigger Category</label>
                  <select
                    value={formData.triggerCategory}
                    onChange={(e) => setFormData({ ...formData, triggerCategory: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Concept Deficit">Concept Deficit</option>
                    <option value="Language & Reading Barrier">Language & Reading Barrier</option>
                    <option value="Attendance Lag">Attendance Lag</option>
                    <option value="Focus & Sensory Need">Focus & Sensory Need</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={formData.sessionFrequency}
                    onChange={(e) => setFormData({ ...formData, sessionFrequency: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Daily 30m">Daily 30 mins</option>
                    <option value="Tri-Weekly">Tri-Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Educator</label>
                <select
                  value={formData.assignedEducator}
                  onChange={(e) => setFormData({ ...formData, assignedEducator: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject / Specific Focus Area</label>
                <input
                  type="text"
                  required
                  value={formData.subjectArea}
                  onChange={(e) => setFormData({ ...formData, subjectArea: e.target.value })}
                  placeholder="e.g. Fractions, Phonics Blending, or Sensory Calming"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Intervention Strategy</label>
                <textarea
                  rows={2}
                  value={formData.strategySummary}
                  onChange={(e) => setFormData({ ...formData, strategySummary: e.target.value })}
                  placeholder="Apparatus to be used, small-group format, reinforcement drills..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"
                >
                  Create Intervention Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
