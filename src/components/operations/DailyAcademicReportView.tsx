import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Building,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { DailyAcademicReport, BranchCode } from '../../types/baos';
import { SAMPLE_DAILY_REPORTS, BRANCHES } from '../../data/baosSampleData';

interface DailyAcademicReportViewProps {
  currentBranch: BranchCode | 'ALL';
}

export const DailyAcademicReportView: React.FC<DailyAcademicReportViewProps> = ({
  currentBranch,
}) => {
  const [reports, setReports] = useState<DailyAcademicReport[]>(SAMPLE_DAILY_REPORTS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DailyAcademicReport | null>(null);

  const [formData, setFormData] = useState({
    branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
    submittedBy: 'Mrs. Shabana Parveen (Principal)',
    totalClassesScheduled: 32,
    classesConducted: 32,
    substitutionsHandled: 1,
    montessoriWorkPeriodCompleted: true,
    quranicRecitationConducted: true,
    keyHighlights: '',
    operationalBottlenecks: '',
  });

  const filteredReports = reports.filter((r) => {
    return currentBranch === 'ALL' || r.branch === currentBranch;
  });

  const handleSubmitDAR = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: DailyAcademicReport = {
      id: `dar-${Date.now()}`,
      branch: formData.branch,
      date: new Date().toISOString().split('T')[0],
      submittedBy: formData.submittedBy,
      submissionTime: '04:45 PM',
      totalClassesScheduled: Number(formData.totalClassesScheduled),
      classesConducted: Number(formData.classesConducted),
      substitutionsHandled: Number(formData.substitutionsHandled),
      montessoriWorkPeriodCompleted: formData.montessoriWorkPeriodCompleted,
      quranicRecitationConducted: formData.quranicRecitationConducted,
      keyHighlights: formData.keyHighlights || 'Montessori work cycles completed smoothly.',
      operationalBottlenecks: formData.operationalBottlenecks || 'None reported.',
      status: 'Verified',
    };

    setReports([newReport, ...reports]);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Daily Academic Report (DAR)</h2>
          <p className="text-xs text-slate-500">
            Mandatory end-of-day operational accountability logging syllabus milestones, Montessori cycles, and campus bottlenecks.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Submit Today's DAR</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-teal-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-navy-900 text-teal-300 font-mono px-2 py-0.5 text-xs font-bold">
                  {report.branch}
                </span>
                <span className="text-xs font-bold text-navy-950">
                  Daily Report &bull; {report.date}
                </span>
                <span className="text-[11px] text-slate-400">
                  (Submitted at {report.submissionTime})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    report.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {report.status}
                </span>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-50"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Sessions Completed</span>
                <p className="font-bold text-navy-950 text-sm mt-0.5">
                  {report.classesConducted} / {report.totalClassesScheduled}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Substitutions Handled</span>
                <p className="font-bold text-navy-950 text-sm mt-0.5">{report.substitutionsHandled}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Montessori Cycle</span>
                <p className="font-bold text-emerald-700 text-sm mt-0.5">
                  {report.montessoriWorkPeriodCompleted ? '100% Completed' : 'Interrupted'}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Quranic Recitation</span>
                <p className="font-bold text-teal-700 text-sm mt-0.5">
                  {report.quranicRecitationConducted ? 'Conducted' : 'Pending'}
                </p>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <p className="text-slate-700">
                <strong className="text-navy-900">Key Highlights: </strong>
                {report.keyHighlights}
              </p>
              {report.operationalBottlenecks && (
                <p className="text-amber-900 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                  <strong>Operational Bottlenecks: </strong>
                  {report.operationalBottlenecks}
                </p>
              )}
            </div>

            <div className="text-[11px] text-slate-400 pt-1">
              Submitted by: <span className="font-semibold text-slate-600">{report.submittedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit DAR Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-navy-950 mb-1">Submit Daily Academic Report</h3>
            <p className="text-xs text-slate-500 mb-4">
              Log daily educational delivery for your campus.
            </p>

            <form onSubmit={handleSubmitDAR} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="JAY">Jayanagar Main</option>
                    <option value="HBR">HBR Layout</option>
                    <option value="KOR">Koramangala</option>
                    <option value="HUB">Hubballi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Submitting Principal/Head</label>
                  <input
                    type="text"
                    value={formData.submittedBy}
                    onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Classes Scheduled</label>
                  <input
                    type="number"
                    value={formData.totalClassesScheduled}
                    onChange={(e) => setFormData({ ...formData, totalClassesScheduled: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Classes Conducted</label>
                  <input
                    type="number"
                    value={formData.classesConducted}
                    onChange={(e) => setFormData({ ...formData, classesConducted: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Substitutions</label>
                  <input
                    type="number"
                    value={formData.substitutionsHandled}
                    onChange={(e) => setFormData({ ...formData, substitutionsHandled: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.montessoriWorkPeriodCompleted}
                    onChange={(e) => setFormData({ ...formData, montessoriWorkPeriodCompleted: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="font-semibold text-slate-700">Montessori 3-hr Cycle Conducted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.quranicRecitationConducted}
                    onChange={(e) => setFormData({ ...formData, quranicRecitationConducted: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="font-semibold text-slate-700">Quranic Recitation Conducted</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Academic Highlights</label>
                <textarea
                  rows={2}
                  value={formData.keyHighlights}
                  onChange={(e) => setFormData({ ...formData, keyHighlights: e.target.value })}
                  placeholder="e.g. Science lab experiments, sensorial gradation presentations..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Operational Bottlenecks / Facility Issues</label>
                <textarea
                  rows={2}
                  value={formData.operationalBottlenecks}
                  onChange={(e) => setFormData({ ...formData, operationalBottlenecks: e.target.value })}
                  placeholder="e.g. Projector replacement needed in room 204..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700 shadow-sm"
                >
                  Confirm & Submit DAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-navy-950 mb-1">
              DAR Details &bull; Campus {selectedReport.branch}
            </h3>
            <p className="text-xs text-slate-500 mb-3">{selectedReport.date}</p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-600">Highlights:</span>
                <p className="text-slate-800 mt-1">{selectedReport.keyHighlights}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg text-amber-900 border border-amber-200">
                <span className="font-semibold">Bottlenecks:</span>
                <p className="mt-1">{selectedReport.operationalBottlenecks || 'None'}</p>
              </div>
              {selectedReport.principalRemarks && (
                <div className="p-3 bg-teal-50 rounded-lg text-teal-900 border border-teal-200">
                  <span className="font-semibold">Principal Remarks:</span>
                  <p className="mt-1">{selectedReport.principalRemarks}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
