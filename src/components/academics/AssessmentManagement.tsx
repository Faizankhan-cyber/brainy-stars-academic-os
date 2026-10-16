import React, { useState } from 'react';
import {
  ClipboardList,
  Calendar,
  Award,
  CheckCircle,
  Download,
  Eye,
  X,
  Printer,
  Sparkles,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';
import { INITIAL_ASSESSMENTS } from '../../data/mockData';

interface AssessmentManagementProps {
  currentBranch: BranchCode | 'ALL';
}

export const AssessmentManagement: React.FC<AssessmentManagementProps> = ({
  currentBranch,
}) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [reportCardRecord, setReportCardRecord] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Assessment & Exam Management</h2>
          <p className="text-xs text-slate-500">
            Formative competency evaluations, term examinations, and Brainy Stars holistic report cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-navy-900 shadow-sm"
          >
            <option value="Term 1">Term 1 Assessment (2026-27)</option>
            <option value="Unit Test 1">Unit Test 1 (Formative)</option>
            <option value="Term 2">Term 2 Summative</option>
          </select>
        </div>
      </div>

      {/* Assessment Cycle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Assessment Phase</span>
          <p className="text-lg font-bold text-navy-950">Term 1 Holistic Evaluations</p>
          <p className="text-xs text-slate-500">
            Conducted: Oct 03 - Oct 12, 2026 &bull; Grade entry 100% complete
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Average Class Aggregate</span>
          <p className="text-lg font-bold text-teal-700">92.4% Across All Campuses</p>
          <p className="text-xs text-slate-500">
            Scholastic + Montessori Sensorial Competencies
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Character & Values Rubric</span>
          <p className="text-lg font-bold text-emerald-700">4.8 / 5.0 Adab Rating</p>
          <p className="text-xs text-slate-500">
            Truthfulness, Rahmah, Shukr & Cleanliness
          </p>
        </div>
      </div>

      {/* Published Assessments List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wide">
            Published Student Report Cards ({INITIAL_ASSESSMENTS.length} Ready)
          </h3>
          <span className="text-[11px] text-teal-700 font-semibold">
            Certified by Academic Directorate
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {INITIAL_ASSESSMENTS.map((record) => (
            <div
              key={record.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-bold text-navy-950 text-sm">{record.studentName}</p>
                <div className="flex items-center gap-3 text-slate-500 mt-0.5">
                  <span>{record.grade}</span>
                  <span>&bull;</span>
                  <span>{record.term} ({record.academicYear})</span>
                  <span>&bull;</span>
                  <span className="text-teal-700 font-semibold">
                    Attendance: {record.attendancePercent}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReportCardRecord(record)}
                  className="rounded-lg bg-navy-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-teal-700 transition flex items-center gap-1.5"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Holistic Report Card</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holistic Report Card Modal */}
      {reportCardRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-8">
            <button
              onClick={() => setReportCardRecord(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* School Header */}
            <div className="border-b-2 border-navy-900 pb-4 text-center space-y-1">
              <span className="text-[10px] font-bold text-teal-700 tracking-widest uppercase">
                Holistic Montessori &bull; CBSE Affiliated
              </span>
              <h3 className="text-lg font-black text-navy-950">
                BRAINY STARS HOLISTIC PROGRESS REPORT
              </h3>
              <p className="text-xs text-slate-600">
                {reportCardRecord.term} &bull; Academic Year {reportCardRecord.academicYear} &bull; Bangalore
              </p>
            </div>

            {/* Student Info Bar */}
            <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl bg-slate-50 p-3 text-xs border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Student Name</span>
                <strong className="text-navy-950">{reportCardRecord.studentName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Grade</span>
                <strong className="text-navy-950">{reportCardRecord.grade}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Attendance</span>
                <strong className="text-teal-700">{reportCardRecord.attendancePercent}%</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Date Issued</span>
                <strong className="text-slate-700">{reportCardRecord.generatedDate}</strong>
              </div>
            </div>

            {/* Scholastic Marks */}
            <div className="space-y-2 mb-4 text-xs">
              <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide">
                1. Scholastic Subject Marks
              </h4>
              <table className="w-full text-left border border-slate-200">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="p-2">Subject</th>
                    <th className="p-2 text-center">Max Marks</th>
                    <th className="p-2 text-center">Marks Obtained</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportCardRecord.scholasticMarks.map((m: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 font-semibold text-slate-800">{m.subject}</td>
                      <td className="p-2 text-center text-slate-500">{m.maxMarks}</td>
                      <td className="p-2 text-center font-bold text-navy-950">{m.marksObtained}</td>
                      <td className="p-2 text-center font-bold text-teal-700">{m.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Holistic Values & Adab */}
            <div className="space-y-2 mb-4 text-xs">
              <h4 className="font-bold text-navy-950 uppercase text-[11px] tracking-wide">
                2. Holistic Values & Adab Rubric (Max 5.0)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {reportCardRecord.holisticValues.map((v: any, idx: number) => (
                  <div key={idx} className="rounded-lg bg-teal-50/50 p-2 border border-teal-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-950 text-[11px]">{v.value}</span>
                      <strong className="text-teal-800">{v.score} / 5</strong>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">{v.remark}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Remarks */}
            <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-200 text-slate-700 mb-4">
              <span className="font-bold text-navy-950 uppercase text-[10px] block mb-0.5">
                Teacher's Holistic Assessment:
              </span>
              <p className="italic">"{reportCardRecord.teacherRemarks}"</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="h-4 w-4" />
                <span>Print Official Card</span>
              </button>
              <button
                onClick={() => setReportCardRecord(null)}
                className="rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
