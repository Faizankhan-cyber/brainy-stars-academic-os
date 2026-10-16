import React, { useState } from 'react';
import {
  AlertCircle,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Phone,
  User,
  X,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { ParentConcern, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

interface ParentConcernTrackerProps {
  currentBranch: BranchCode | 'ALL';
}

export const ParentConcernTracker: React.FC<ParentConcernTrackerProps> = ({
  currentBranch,
}) => {
  const { parentConcerns, resolveParentConcern } = useSchool();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [resolvingTicket, setResolvingTicket] = useState<ParentConcern | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  const filteredConcerns = parentConcerns.filter((c) => {
    return currentBranch === 'ALL' || c.branch === currentBranch;
  });

  const handleResolve = (ticketId: string) => {
    if (!resolutionText) return;
    resolveParentConcern(ticketId, resolutionText);
    setResolvingTicket(null);
    setResolutionText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Parent Concern & Follow-up Tracker</h2>
            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-800 border border-rose-200">
              SLA Monitored
            </span>
          </div>
          <p className="text-xs text-slate-500">
            SLA-governed grievance redressal for transport, academics, hot meals, and student safety.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Log Parent Concern Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredConcerns.map((ticket) => (
          <div
            key={ticket.id}
            className={`rounded-2xl border p-5 shadow-xs space-y-3 transition ${
              ticket.status === 'Open' || ticket.status === 'Under Investigation'
                ? 'border-amber-200 bg-amber-50/20'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded">
                    {ticket.ticketNo}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      ticket.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ticket.priority} Priority
                  </span>
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    Category: {ticket.category}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                    Campus: {ticket.branch}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">
                  Student: {ticket.studentName} ({ticket.grade}) &bull; Parent: {ticket.parentName} ({ticket.contactNumber})
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    ticket.status === 'Closed'
                      ? 'bg-slate-100 text-slate-700'
                      : ticket.status === 'Resolution Communicated'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ticket.status}
                </span>
                {ticket.slaDaysRemaining > 0 && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    SLA: {ticket.slaDaysRemaining}d remaining
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {ticket.description}
            </p>

            {ticket.resolutionSummary && (
              <div className="rounded-xl bg-teal-50/60 p-3 text-xs border border-teal-100 text-teal-950">
                <strong className="block mb-0.5">Resolution Provided & Communicated:</strong>
                <p>{ticket.resolutionSummary}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2 pt-1">
              <span>
                Assigned Officer: <strong className="text-slate-700">{ticket.assignedOfficer}</strong> &bull; Logged: {ticket.loggedDate}
              </span>

              {ticket.status !== 'Closed' && (
                <button
                  onClick={() => setResolvingTicket(ticket)}
                  className="rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700 self-end sm:self-auto"
                >
                  Update & Close Ticket
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resolution Modal */}
      {resolvingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setResolvingTicket(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">
              Resolve Ticket {resolvingTicket.ticketNo}
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Record verified action taken for {resolvingTicket.studentName}'s family.
            </p>

            <div className="space-y-3 text-xs">
              <textarea
                rows={3}
                required
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                placeholder="Detail resolution communicating to parent and corrective step taken..."
                className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setResolvingTicket(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolve(resolvingTicket.id)}
                  disabled={!resolutionText}
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700 disabled:opacity-50"
                >
                  Mark Ticket Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
