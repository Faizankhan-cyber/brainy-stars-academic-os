import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  User,
  X,
  Info,
} from 'lucide-react';
import { LeadershipActionItem, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

interface PendingActionsFollowUpProps {
  currentBranch: BranchCode | 'ALL';
}

export const PendingActionsFollowUp: React.FC<PendingActionsFollowUpProps> = ({
  currentBranch,
}) => {
  const { leadershipActionItems, toggleLeadershipAction, addLeadershipAction } = useSchool();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Faculty Staffing' as LeadershipActionItem['category'],
    owner: '',
    priority: 'High' as LeadershipActionItem['priority'],
    dueDate: '2026-10-30',
  });

  const filteredItems = leadershipActionItems.filter((item) => {
    return currentBranch === 'ALL' || item.branch === currentBranch;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newItem: LeadershipActionItem = {
      id: `act-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
      owner: formData.owner || 'Academic Council',
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: 'In Progress',
    };

    addLeadershipAction(newItem);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Pending Actions & Follow-ups</h2>
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
              {filteredItems.filter((i) => i.status !== 'Closed').length} Active Items
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Institutional task board governing regulatory compliance, faculty coaching sign-offs, and critical escalations.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Create Leadership Action</span>
        </button>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-5 shadow-xs transition ${
              item.status === 'Closed'
                ? 'border-slate-200 bg-slate-50/60 opacity-75'
                : 'border-slate-200 bg-white hover:border-teal-400'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    item.priority === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                  {item.category}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                  Campus: {item.branch}
                </span>
              </div>

              <h4
                className={`text-sm font-bold text-navy-950 ${
                  item.status === 'Closed' ? 'line-through text-slate-400' : ''
                }`}
              >
                {item.title}
              </h4>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span>
                  Responsible Officer: <strong className="text-slate-700">{item.owner}</strong>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-semibold text-slate-600">
                  <Clock className="h-3 w-3 text-slate-400" />
                  Due: {item.dueDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => toggleLeadershipAction(item.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                  item.status === 'Closed'
                    ? 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{item.status === 'Closed' ? 'Reopen Action' : 'Mark Completed'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">Create Leadership Directive</h3>
            <p className="text-xs text-slate-500 mb-4">Set up actionable institutional task.</p>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Inspect fire safety compliance certificate"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Faculty Staffing">Faculty Staffing</option>
                    <option value="Curriculum Milestone">Curriculum Milestone</option>
                    <option value="Facility & Safety">Facility & Safety</option>
                    <option value="Regulatory & CBSE">Regulatory & CBSE</option>
                    <option value="Parent Escalation">Parent Escalation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Routine">Routine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Responsible Officer</label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="e.g. Principal Mrs. Shabana Parveen"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  Create Action Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
