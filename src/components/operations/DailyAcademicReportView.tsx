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
  Printer,
  Eye,
  BookOpen,
  Calendar,
  Users,
  Award,
} from 'lucide-react';
import { DailyAcademicReport, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

export const DailyAcademicReportView: React.FC = () => {
  const {
    currentBranch,
    academicYear,
    term,
    selectedDate,
    dailyAcademicReports,
    submitDAR,
    branches,
  } = useSchool();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<DailyAcademicReport | null>(
    dailyAcademicReports[0] || null
  );

  // Form State for all 10 Required Sections
  const [formData, setFormData] = useState({
    branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
    submittedBy: 'Mrs. Shabana Parveen (Principal)',
    studentEnrolled: 420,
    studentPresent: 406,
    facultyTotal: 3,
    facultyPresent: 2,
    eventsAndCelebrations: 'Morning Assembly with Surah recitation; Science Fair prep in Discovery Lab.',
    rrrDetails: 'Remedial R1 for Grade 4 Math (Multiplication rules); Revision R2 for Grade 5 Science.',
    observationsDetails: '1 Walkthrough conducted in Grade 8 Tajweed with Muallim Qasim (Exceeds Standards).',
    supportDetails: 'Grade 9 CBSE Social Science tutorial conducted with 16 students attended.',
    syllabusHighlights: 'Grade 5 Science Chapter 5 on track; Grade 4 EVS Chapter 4 on track.',
    ddrVerified: true,
    ddrNotes: 'All classroom daily diary reports (DDR) cross-verified against curriculum schedule.',
    branchVisits: 'Academic Directorate supervisory walkthrough completed from 10:00 AM to 12:30 PM.',
    additionalWork: 'Maintenance of east wing water filtration unit completed.',
    closingMessage: 'Jazakallahu Khairan.',
    principalRemarks: 'All academic delivery on schedule with 1 substitute teacher deployed.',
  });

  const filteredReports = dailyAcademicReports.filter((r) => {
    return currentBranch === 'ALL' || r.branch === currentBranch;
  });

  const handleSubmitNewDAR = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.submittedBy.trim()) {
      setFormError('Please enter the report submitter name.');
      return;
    }
    if (
      !Number.isInteger(formData.studentEnrolled) ||
      !Number.isInteger(formData.studentPresent) ||
      !Number.isInteger(formData.facultyTotal) ||
      !Number.isInteger(formData.facultyPresent) ||
      formData.studentEnrolled <= 0 ||
      formData.facultyTotal <= 0 ||
      formData.studentPresent < 0 ||
      formData.studentPresent > formData.studentEnrolled ||
      formData.facultyPresent < 0 ||
      formData.facultyPresent > formData.facultyTotal
    ) {
      setFormError('Check attendance totals: totals must be positive whole numbers, and present counts must be between zero and the total.');
      return;
    }

    const studentAttPercent = Number(
      ((formData.studentPresent / formData.studentEnrolled) * 100).toFixed(1)
    );
    const facultyAttPercent = Number(
      ((formData.facultyPresent / formData.facultyTotal) * 100).toFixed(1)
    );

    const newDAR: DailyAcademicReport = {
      id: `dar-${Date.now()}`,
      branch: formData.branch,
      date: selectedDate,
      academicYear,
      term,
      submittedBy: formData.submittedBy,
      submissionTime: '04:30 PM',
      status: 'Verified',
      attendanceSummary: {
        studentEnrolled: Number(formData.studentEnrolled),
        studentPresent: Number(formData.studentPresent),
        studentAttendancePercent: studentAttPercent,
        facultyTotal: Number(formData.facultyTotal),
        facultyPresent: Number(formData.facultyPresent),
        facultyAttendancePercent: facultyAttPercent,
      },
      eventsAndCelebrations: formData.eventsAndCelebrations,
      rrrSessionsSummary: [
        {
          tier: 'Remedial (R1)',
          grade: 'Grade 4',
          subject: 'Mathematics',
          concept: 'Multiplication carrying rules',
          studentCount: 8,
        },
      ],
      classroomObservationsSummary: [
        {
          teacherName: 'Muallim Qasim Nadwi',
          grade: 'Grade 8 A',
          subject: 'Tajweed',
          overallRating: 'Exceeds Standards',
        },
      ],
      grade9And10SupportSummary: [
        {
          grade: 'Grade 9',
          subject: 'Social Science',
          topic: 'Constitutional Design in India',
          mentor: 'Mrs. Shabana Parveen',
          attended: 16,
        },
      ],
      syllabusCompletionHighlights: [
        {
          grade: 'Grade 5',
          subject: 'Science',
          chapter: 'Ecosystems & Living Organisms',
          status: 'On Track',
        },
      ],
      teacherDiscussionAndDDR: {
        ddrVerified: formData.ddrVerified,
        verificationNotes: formData.ddrNotes,
      },
      branchVisits: formData.branchVisits,
      additionalWork: formData.additionalWork,
      closingMessage: formData.closingMessage || 'Jazakallahu Khairan.',
      principalRemarks: formData.principalRemarks,
    };

    submitDAR(newDAR);
    setSelectedReportForPreview(newDAR);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-950">Daily Academic Report (DAR)</h2>
          <p className="text-xs text-slate-500">
            Standard institutional 10-section end-of-day report ensuring campus transparency, syllabus tracking, and operational rigor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Draft Today's End-of-Day DAR</span>
          </button>
        </div>
      </div>

      {/* Main Split: Reports Directory on Left & Full Institutional Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports Index (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
              Submitted Reports ({filteredReports.length})
            </span>
            <span className="text-[10px] text-slate-400">AY {academicYear}</span>
          </div>

          <div className="space-y-2.5">
            {filteredReports.map((report) => {
              const isSelected = selectedReportForPreview?.id === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportForPreview(report)}
                  className={`cursor-pointer rounded-xl border p-4 text-xs transition space-y-2 ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-navy-900 text-teal-300 font-mono text-[10px] font-bold px-2 py-0.5">
                      Campus: {report.branch}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        report.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-bold text-navy-950">Report Date: {report.date}</p>
                    <p className="text-[11px] text-slate-500">By: {report.submittedBy}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                    <span>
                      Students: <strong>{report.attendanceSummary.studentAttendancePercent}%</strong>
                    </span>
                    <span>
                      Faculty: <strong>{report.attendanceSummary.facultyAttendancePercent}%</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Institutional Document Preview (8 cols) */}
        <div className="lg:col-span-8">
          {selectedReportForPreview ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-6">
              {/* Official Header */}
              <div className="border-b-2 border-navy-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-teal-700 uppercase">
                    Brainy Stars Holistic Montessori &bull; Bangalore
                  </span>
                  <h3 className="text-xl font-black text-navy-950">
                    DAILY ACADEMIC REPORT (DAR)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Campus: <strong>{selectedReportForPreview.branch}</strong> &bull; Date: <strong>{selectedReportForPreview.date}</strong> &bull; {selectedReportForPreview.academicYear} ({selectedReportForPreview.term})
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <Printer className="h-3.5 w-3.5 text-slate-600" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>

              {/* 1. Attendance Summary */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">1</span>
                  <span>Attendance Summary</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Student Enrollment</span>
                    <strong className="text-navy-950 text-sm">
                      {selectedReportForPreview.attendanceSummary.studentPresent} / {selectedReportForPreview.attendanceSummary.studentEnrolled}
                    </strong>
                    <span className="text-[10px] text-teal-700 font-bold block mt-0.5">
                      ({selectedReportForPreview.attendanceSummary.studentAttendancePercent}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Faculty On Duty</span>
                    <strong className="text-navy-950 text-sm">
                      {selectedReportForPreview.attendanceSummary.facultyPresent} / {selectedReportForPreview.attendanceSummary.facultyTotal}
                    </strong>
                    <span className="text-[10px] text-teal-700 font-bold block mt-0.5">
                      ({selectedReportForPreview.attendanceSummary.facultyAttendancePercent}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">DAR Submission</span>
                    <strong className="text-navy-950 text-xs block mt-1">
                      {selectedReportForPreview.submissionTime}
                    </strong>
                    <span className="text-[10px] text-slate-500">Verified by Principal</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Approval Status</span>
                    <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      {selectedReportForPreview.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Events and Celebrations */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">2</span>
                  <span>Events and Celebrations</span>
                </h4>
                <p className="rounded-xl bg-slate-50 p-3 text-slate-700 border border-slate-200 leading-relaxed">
                  {selectedReportForPreview.eventsAndCelebrations || 'No special celebrations scheduled today; standard academic calendar adhered to.'}
                </p>
              </div>

              {/* 3. RRR Sessions */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">3</span>
                  <span>RRR (Remedial, Revision, Retention) Sessions</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReportForPreview.rrrSessionsSummary.map((rrr, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                      <div>
                        <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 uppercase mr-2">
                          {rrr.tier}
                        </span>
                        <strong className="text-navy-950">{rrr.grade} &bull; {rrr.subject}</strong>
                        <p className="text-[11px] text-slate-600 mt-0.5">Focus: {rrr.concept}</p>
                      </div>
                      <span className="font-bold text-slate-700 text-xs">
                        {rrr.studentCount} Students
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Classroom Observations */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">4</span>
                  <span>Classroom Observations</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReportForPreview.classroomObservationsSummary.map((obs, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                      <div>
                        <strong className="text-navy-950">{obs.teacherName}</strong>
                        <span className="text-slate-500 text-[11px]"> ({obs.grade} - {obs.subject})</span>
                      </div>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        Rating: {obs.overallRating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Grade 9 and Grade 10 Support Sessions */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">5</span>
                  <span>Grade 9 & 10 Support Sessions</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReportForPreview.grade9And10SupportSummary.map((sup, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                      <div>
                        <strong className="text-navy-950">{sup.grade}: {sup.subject}</strong>
                        <p className="text-[11px] text-slate-600 mt-0.5">Topic: {sup.topic} &bull; Mentor: {sup.mentor}</p>
                      </div>
                      <span className="rounded bg-navy-100 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                        {sup.attended} Scholars Attended
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Syllabus Completion */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">6</span>
                  <span>Syllabus Completion Updates</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReportForPreview.syllabusCompletionHighlights.map((syl, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 flex items-center justify-between">
                      <span className="text-slate-800">
                        <strong>{syl.grade} {syl.subject}:</strong> {syl.chapter}
                      </span>
                      <span className="rounded bg-teal-100 text-teal-800 px-2 py-0.5 text-[10px] font-bold">
                        {syl.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Teacher Discussion and DDR Verification */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">7</span>
                  <span>Teacher Discussion & Daily Diary Report (DDR) Verification</span>
                </h4>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">
                      All Faculty DDRs Inspected & Signed by Head of School
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    {selectedReportForPreview.teacherDiscussionAndDDR.verificationNotes}
                  </p>
                </div>
              </div>

              {/* 8. Branch Visits */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">8</span>
                  <span>Branch Visits & Supervisory Audits</span>
                </h4>
                <p className="rounded-xl bg-slate-50 p-3 text-slate-700 border border-slate-200 leading-relaxed">
                  {selectedReportForPreview.branchVisits || 'No outside supervisory visits recorded today.'}
                </p>
              </div>

              {/* 9. Additional Work */}
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white">9</span>
                  <span>Additional Work, Campus Maintenance & Special Tasks</span>
                </h4>
                <p className="rounded-xl bg-slate-50 p-3 text-slate-700 border border-slate-200 leading-relaxed">
                  {selectedReportForPreview.additionalWork || 'Routine clean-up and classroom sterilization completed.'}
                </p>
              </div>

              {/* 10. Closing Statement */}
              <div className="rounded-2xl border-2 border-teal-600/30 bg-teal-50/60 p-5 text-center space-y-2">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">
                  Official End of Day Sign-off
                </span>
                <p className="font-serif text-lg font-bold text-teal-950 italic">
                  "{selectedReportForPreview.closingMessage || 'Jazakallahu Khairan.'}"
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-500 pt-1">
                  <span>Submitted by: <strong>{selectedReportForPreview.submittedBy}</strong></span>
                  <span>&bull;</span>
                  <span>Signed: <strong>{selectedReportForPreview.date}</strong></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400">
              Select a Daily Academic Report from the left to view the official 10-section document.
            </div>
          )}
        </div>
      </div>

      {/* Draft New DAR Modal with all 10 required fields */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-slate-100 pb-3 mb-4">
              <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                End-of-Day Protocol
              </span>
              <h3 className="text-base font-bold text-navy-950">
                Draft Daily Academic Report (DAR)
              </h3>
              <p className="text-xs text-slate-500">
                Complete all established sections for Date: <strong>{selectedDate}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitNewDAR} className="space-y-4 text-xs">
              {formError && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {formError}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value as BranchCode })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    {branches.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Submitting Principal</label>
                  <input
                    type="text"
                    required
                    value={formData.submittedBy}
                    onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              {/* 1. Attendance Inputs */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-navy-950 text-[11px] block uppercase">
                  1. Attendance Counts
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block">Student Enrolled</label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      required
                      value={formData.studentEnrolled}
                      onChange={(e) => setFormData({ ...formData, studentEnrolled: Number(e.target.value) })}
                      className="w-full rounded border border-slate-200 p-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Student Present</label>
                    <input
                      type="number"
                      min={0}
                      max={formData.studentEnrolled}
                      step={1}
                      required
                      value={formData.studentPresent}
                      onChange={(e) => setFormData({ ...formData, studentPresent: Number(e.target.value) })}
                      className="w-full rounded border border-slate-200 p-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Faculty Total</label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      required
                      value={formData.facultyTotal}
                      onChange={(e) => setFormData({ ...formData, facultyTotal: Number(e.target.value) })}
                      className="w-full rounded border border-slate-200 p-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Faculty Present</label>
                    <input
                      type="number"
                      min={0}
                      max={formData.facultyTotal}
                      step={1}
                      required
                      value={formData.facultyPresent}
                      onChange={(e) => setFormData({ ...formData, facultyPresent: Number(e.target.value) })}
                      className="w-full rounded border border-slate-200 p-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Events & Celebrations */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">2. Events & Celebrations</label>
                <textarea
                  rows={2}
                  value={formData.eventsAndCelebrations}
                  onChange={(e) => setFormData({ ...formData, eventsAndCelebrations: e.target.value })}
                  placeholder="Morning assembly highlights, Quran competition prep, awards..."
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              {/* 3 & 4. RRR and Observations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">3. RRR Sessions Conducted</label>
                  <textarea
                    rows={2}
                    value={formData.rrrDetails}
                    onChange={(e) => setFormData({ ...formData, rrrDetails: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">4. Classroom Observations</label>
                  <textarea
                    rows={2}
                    value={formData.observationsDetails}
                    onChange={(e) => setFormData({ ...formData, observationsDetails: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              {/* 5 & 6. Support Sessions & Syllabus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">5. Grade 9 & 10 Support Sessions</label>
                  <textarea
                    rows={2}
                    value={formData.supportDetails}
                    onChange={(e) => setFormData({ ...formData, supportDetails: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">6. Syllabus Completion Highlights</label>
                  <textarea
                    rows={2}
                    value={formData.syllabusHighlights}
                    onChange={(e) => setFormData({ ...formData, syllabusHighlights: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              {/* 7. Teacher Discussion & DDR */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-950 text-[11px] uppercase">
                    7. Teacher Discussion & DDR Verification
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ddrVerified}
                      onChange={(e) => setFormData({ ...formData, ddrVerified: e.target.checked })}
                      className="rounded text-teal-600"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">DDR Signed & Checked</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.ddrNotes}
                  onChange={(e) => setFormData({ ...formData, ddrNotes: e.target.value })}
                  placeholder="Verification remarks on lesson plan alignment..."
                  className="w-full rounded border border-slate-200 p-1.5 text-xs"
                />
              </div>

              {/* 8 & 9. Branch Visits and Additional Work */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">8. Branch Visits / Inspections</label>
                  <input
                    type="text"
                    value={formData.branchVisits}
                    onChange={(e) => setFormData({ ...formData, branchVisits: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">9. Additional Work & Facilities</label>
                  <input
                    type="text"
                    value={formData.additionalWork}
                    onChange={(e) => setFormData({ ...formData, additionalWork: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              {/* 10. Closing Message */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">10. Official Closing</label>
                <input
                  type="text"
                  value={formData.closingMessage}
                  onChange={(e) => setFormData({ ...formData, closingMessage: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-serif"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700 shadow-xs"
                >
                  Submit & Verify Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
