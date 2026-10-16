import React, { useState } from 'react';
import {
  Target,
  Plus,
  CheckCircle2,
  Clock,
  BookOpen,
  User,
  ArrowRight,
  TrendingUp,
  X,
} from 'lucide-react';
import { CoachingPlan, BranchCode } from '../../types/baos';
import { SAMPLE_COACHING_PLANS, SAMPLE_TEACHERS } from '../../data/baosSampleData';

interface TeacherCoachingPlansProps {
  currentBranch: BranchCode | 'ALL';
}

export const TeacherCoachingPlans: React.FC<TeacherCoachingPlansProps> = ({
  currentBranch,
}) => {
  const [plans, setPlans] = useState<CoachingPlan[]>(SAMPLE_COACHING_PLANS);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    teacherName: '',
    coachName: 'Sr. Fatima Zahra (Lead Coach)',
    cycle: 'Q1 2026' as CoachingPlan['cycle'],
    targetSkill: '',
    smartGoal: '',
    actionSteps: '',
  });

  const filteredPlans = plans.filter((p) => {
    return currentBranch === 'ALL' || p.branch === currentBranch;
  });

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teacherName) return;

    const newPlan: CoachingPlan = {
      id: `cp-${Date.now()}`,
      teacherId: 'tch-new',
      teacherName: formData.teacherName,
      branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
      coachName: formData.coachName,
      cycle: formData.cycle,
      targetSkill: formData.targetSkill || 'Differentiated Montessori Instruction',
      smartGoal: formData.smartGoal || 'Implement inquiry questioning protocols with 85% fidelity.',
      actionSteps: formData.actionSteps
        ? formData.actionSteps.split('\n').filter(Boolean)
        : ['Conduct peer observation', 'Review student lesson journals'],
      resourcesProvided: ['Brainy Stars Pedagogy Handbook', 'Observation Rubric'],
      startDate: new Date().toISOString().split('T')[0],
      reviewDate: '2026-11-30',
      progressPercent: 20,
      status: 'In Progress',
    };

    setPlans([newPlan, ...plans]);
    setIsAddPlanModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Teacher Coaching Plans (TCP)</h2>
          <p className="text-xs text-slate-500">
            Individualized SMART skill goals, action steps, and peer mentoring cycles for educators.
          </p>
        </div>

        <button
          onClick={() => setIsAddPlanModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Create Coaching Plan</span>
        </button>
      </div>

      {/* Coaching Plans Grid */}
      <div className="space-y-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-navy-950 text-sm">{plan.teacherName}</h3>
                  <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                    Campus: {plan.branch}
                  </span>
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    Cycle: {plan.cycle}
                  </span>
                </div>
                <p className="text-xs font-semibold text-teal-800 mt-0.5">
                  Target Skill: {plan.targetSkill}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-32 text-right">
                  <div className="flex items-center justify-between text-[11px] font-bold text-navy-900 mb-1">
                    <span>Progress</span>
                    <span>{plan.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-600 transition-all duration-500"
                      style={{ width: `${plan.progressPercent}%` }}
                    />
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                  {plan.status}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 space-y-1">
              <span className="font-bold text-slate-700 uppercase text-[10px]">SMART Goal</span>
              <p className="text-slate-800 leading-relaxed">{plan.smartGoal}</p>
            </div>

            {/* Action Steps */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 uppercase text-[10px]">Action Steps & Milestones</span>
              <div className="space-y-1">
                {plan.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-1">
              <span>
                Assigned Mentor: <strong className="text-slate-700">{plan.coachName}</strong>
              </span>
              <span>
                Review Deadline: <strong className="text-slate-700">{plan.reviewDate}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Plan Modal */}
      {isAddPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsAddPlanModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">Create Teacher Coaching Plan</h3>
            <p className="text-xs text-slate-500 mb-4">Set up developmental targets for faculty.</p>

            <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty Member</label>
                <select
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  required
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                >
                  <option value="">-- Choose faculty --</option>
                  {SAMPLE_TEACHERS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Pedagogical Skill</label>
                <input
                  type="text"
                  required
                  value={formData.targetSkill}
                  onChange={(e) => setFormData({ ...formData, targetSkill: e.target.value })}
                  placeholder="e.g. 3-Period Lesson Flow & Silence Game Mastery"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">SMART Goal Statement</label>
                <textarea
                  rows={2}
                  required
                  value={formData.smartGoal}
                  onChange={(e) => setFormData({ ...formData, smartGoal: e.target.value })}
                  placeholder="Specific, Measurable, Attainable, Relevant, and Time-bound goal..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Action Steps (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.actionSteps}
                  onChange={(e) => setFormData({ ...formData, actionSteps: e.target.value })}
                  placeholder="Record micro-teaching video&#10;Attend Montessori normalization workshop&#10;Peer review observation"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPlanModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"
                >
                  Save Coaching Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
