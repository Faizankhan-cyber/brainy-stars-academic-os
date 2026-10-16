import React from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  Calendar,
  Award,
  TrendingUp,
  FileText,
  Sparkles,
} from 'lucide-react';
import { BranchCode } from '../../types/baos';

interface AcademicReviewProps {
  currentBranch: BranchCode | 'ALL';
}

export const AcademicReview: React.FC<AcademicReviewProps> = ({
  currentBranch,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Academic Review & Strategic Targets</h2>
          <p className="text-xs text-slate-500">
            Term-wise curriculum audit, pedagogical efficacy, and NEP 2020 compliance verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            Term 1 Council Review
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-navy-950 text-sm">
              Pedagogical Framework Compliance: Montessori + CBSE
            </h3>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
              100% Certified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <span className="font-bold text-navy-950 block">Montessori Work Cycles</span>
              <p className="text-slate-600 leading-relaxed">
                Primary and pre-primary toddlers uninterruptedly complete the 3-hour morning sensorial & practical life work period across all 4 campuses.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <span className="font-bold text-navy-950 block">CBSE & NEP 2020 Experiential Labs</span>
              <p className="text-slate-600 leading-relaxed">
                Grades 3 to 10 execute inquiry-based science journals, robotics projects, and practical field mathematics with verifiable teacher lesson plans.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-1.5">
              <span className="font-bold text-navy-950 block">Integrated Values & Adab Curriculum</span>
              <p className="text-slate-600 leading-relaxed">
                Tajweed recitation and universal ethical virtues (Sidq, Rahmah, Shukr, Amanah) systematically assessed on all official student progress reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
