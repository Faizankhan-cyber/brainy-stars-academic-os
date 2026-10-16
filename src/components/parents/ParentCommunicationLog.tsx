import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  Phone,
  Calendar,
  User,
  X,
  FileText,
} from 'lucide-react';
import { ParentCommunication, BranchCode } from '../../types/baos';
import { SAMPLE_PARENT_COMMUNICATIONS } from '../../data/baosSampleData';

interface ParentCommunicationLogProps {
  currentBranch: BranchCode | 'ALL';
}

export const ParentCommunicationLog: React.FC<ParentCommunicationLogProps> = ({
  currentBranch,
}) => {
  const [communications, setCommunications] = useState<ParentCommunication[]>(SAMPLE_PARENT_COMMUNICATIONS);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    grade: 'Grade 3 A',
    parentName: '',
    type: 'Phone Consultation' as ParentCommunication['type'],
    subject: '',
    summary: '',
    initiatedBy: 'Muallim Qasim Nadwi',
  });

  const filteredComms = communications.filter((c) => {
    return currentBranch === 'ALL' || c.branch === currentBranch;
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName) return;

    const newLog: ParentCommunication = {
      id: `pcom-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      studentName: formData.studentName,
      grade: formData.grade,
      branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
      parentName: formData.parentName,
      type: formData.type,
      subject: formData.subject || 'Routine Academic Consultation',
      summary: formData.summary || 'Consultation regarding progress in core subjects.',
      initiatedBy: formData.initiatedBy,
    };

    setCommunications([newLog, ...communications]);
    setIsLogModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Parent Communication Log</h2>
          <p className="text-xs text-slate-500">
            Chronological documentation of outbound and inbound home-school touchpoints.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Log Parent Interaction</span>
        </button>
      </div>

      {/* Communications Feed */}
      <div className="space-y-3">
        {filteredComms.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    {item.type}
                  </span>
                  <span className="font-bold text-navy-950 text-sm">{item.studentName}</span>
                  <span className="text-xs text-slate-500">&bull; {item.grade}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                    Campus: {item.branch}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{item.subject}</h4>
              </div>

              <span className="text-xs text-slate-400 font-medium">{item.date}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {item.summary}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-1 pt-1">
              <span>
                Parent: <strong className="text-slate-700">{item.parentName}</strong>
              </span>
              <span>
                Initiated by Faculty: <strong className="text-teal-700">{item.initiatedBy}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Log Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">Record Parent Interaction</h3>
            <p className="text-xs text-slate-500 mb-4">Log interaction details for cumulative student records.</p>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Zayd Muhammad Khan"
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Mr. Ayub Khan"
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Interaction Medium</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Phone Consultation">Phone Consultation</option>
                    <option value="In-Person Conference">In-Person Conference</option>
                    <option value="Official Circular">Official Circular</option>
                    <option value="Counseling Sync">Counseling Sync</option>
                  </select>
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

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Progress discussion on Quran recitation and Math"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Discussion Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Key points discussed and agreed action items..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"
                >
                  Save Communication Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
