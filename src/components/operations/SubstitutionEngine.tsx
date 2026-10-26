import React, { useState } from 'react';
import {
  Shuffle,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Search,
  Building,
  Check,
  X,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { SubstitutionRequest, BranchCode, Teacher, SubstitutionRuleEvaluation } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';
import { evaluateCandidateTeacher } from '../../data/baosSampleData';

export const SubstitutionEngine: React.FC = () => {
  const {
    currentBranch,
    teachers,
    teacherAttendance,
    substitutionRequests,
    assignSubstitute,
    approveSubstitution,
    publishSubstitutionPlan,
    completeSubstitution,
    resolveUncoveredSubstitution,
    generateSubstitutionRequests,
    selectedDate,
  } = useSchool();

  const [activeRequest, setActiveRequest] = useState<SubstitutionRequest | null>(null);
  const [showRuleDetailsModal, setShowRuleDetailsModal] = useState(false);
  const [resolutionRequestId, setResolutionRequestId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [whatsAppDraft, setWhatsAppDraft] = useState('');

  const filteredRequests = substitutionRequests.filter((r) => {
    return r.date === selectedDate && (currentBranch === 'ALL' || r.branch === currentBranch);
  });

  const handleSelectSubstitute = (
    reqId: string,
    teacherId: string,
    teacherName: string,
    ruleTier: string
  ) => {
    assignSubstitute(reqId, teacherId, teacherName, ruleTier);
    setActiveRequest(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Rule-Based Substitution Engine</h2>
            <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 text-[10px] font-bold border border-amber-200">
              Prototype Rule Engine
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Automated compliance engine enforcing Brainy Stars institutional substitution constraints and priority matching.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => { const count = generateSubstitutionRequests(selectedDate, currentBranch); window.alert(`${count} new request(s) generated from recorded Absent/Approved Leave attendance and the teacher weekly timetable. Existing requests were not duplicated.`); }} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white hover:bg-teal-800">Generate from attendance</button>
          <button onClick={() => { const rows = filteredRequests.filter((r) => r.status === 'Published' || r.status === 'Approved'); const grouped = rows.reduce((acc, r) => { (acc[r.branch] ||= []).push(r); return acc; }, {} as Record<string, SubstitutionRequest[]>); setWhatsAppDraft(Object.entries(grouped).map(([branch, items]) => `*Brainy Stars — Substitution Plan*\nDate: ${selectedDate} | Branch: ${branch}\n${items.map((r) => `Period ${r.period}: ${r.grade} ${r.section} (${r.subject}) — ${r.assignedSubstituteTeacherName || 'Pending assignment'}`).join('\n')}\nPlease follow the approved allocation. Jazakallahu Khairan.`).join('\n\n') || 'No approved or published substitutions are available for the selected date and branch.'); }} className="rounded-lg border border-teal-300 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-900 hover:bg-teal-100">Prepare WhatsApp draft</button>
        </div>
        <button
          onClick={() => setShowRuleDetailsModal(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-teal-400 transition"
        >
          <Info className="h-4 w-4 text-teal-600" />
          <span>Inspect Rule Engine Policies</span>
        </button>
      </div>

      {/* Rules Banner */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50/80 to-slate-50 p-5 text-xs text-slate-700 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-900 font-bold">
            <Sparkles className="h-4 w-4 text-teal-600" />
            <span>Active Institutional Substitution Rules</span>
          </div>
          <span className="text-[10px] text-teal-700 font-mono font-semibold">
            Status: Rules Enforced in Allocation Modal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="rounded-xl bg-white p-3 border border-slate-200 space-y-1">
            <strong className="text-navy-950 block font-bold">1. Mother Teacher Shield</strong>
            <p className="text-slate-600">
              Grade 1 and Grade 2 mother teachers must <strong>never</strong> be allocated as substitutes to protect pre-primary continuity.
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-slate-200 space-y-1">
            <strong className="text-navy-950 block font-bold">2. Strict Grade-Band Boundaries</strong>
            <p className="text-slate-600">
              Grades 3–5 faculty may substitute <strong>only within Grades 3–5</strong>; Grades 6–10 faculty <strong>only within Grades 6–10</strong>.
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-slate-200 space-y-1">
            <strong className="text-navy-950 block font-bold">3. Tiered Priority Matcher</strong>
            <p className="text-slate-600">
              Prefers subject specialists first (Priority 1), then approved subject substitutes (Priority 2), then general free guides.
            </p>
          </div>
        </div>
      </div>

      {/* Substitution Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className={`rounded-2xl border p-5 shadow-xs transition space-y-3 ${
              req.status === 'Pending Allocation'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      req.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {req.priority}
                  </span>
                  <span className="rounded bg-navy-900 text-teal-300 font-mono px-2 py-0.5 text-[10px] font-bold">
                    Period {req.period} ({req.timing})
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    Campus: {req.branch}
                  </span>
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    Grade Band: {req.gradeBracket}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-navy-950 mt-1">
                  Class: {req.grade} Section {req.section} &bull; Subject: {req.subject}
                </h4>
                <p className="text-xs text-slate-500">
                  Absent Faculty Member: <strong className="text-rose-700">{req.absentTeacherName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    ['Assigned', 'Approved', 'Published', 'Completed'].includes(req.status)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {req.status}
                </span>

                <button
                  onClick={() => setActiveRequest(req)}
                  className="rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition flex items-center gap-1.5"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>{req.assignedSubstituteTeacherId ? 'Change Allocation' : 'Review Recommendations'}</span>
                </button>
                {req.status === 'Pending Approval' && (
                  <button onClick={() => approveSubstitution(req.id)} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700">Approve</button>
                )}
                {req.status === 'Approved' && (
                  <button onClick={() => publishSubstitutionPlan(req.branch, req.date)} className="rounded-lg border border-teal-300 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100">Publish day</button>
                )}
                {req.status === 'Published' && (
                  <button onClick={() => completeSubstitution(req.id, 'Academic In-Charge')} className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100">Mark completed</button>
                )}
                {!req.assignedSubstituteTeacherId && req.status !== 'Free Period Approved' && req.status !== 'Cancelled' && (
                  <button onClick={() => { setResolutionRequestId(req.id); setResolutionNote(''); }} className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100">Resolve uncovered</button>
                )}
              </div>
            </div>

            {/* Current Assignment / Evaluations Snapshot */}
            {req.assignedSubstituteTeacherId ? (
              <div className="rounded-xl bg-emerald-50/80 p-3 text-xs border border-emerald-200 text-emerald-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                    Verified Substitute Assignment
                  </span>
                  <p className="font-bold text-emerald-900 mt-0.5 text-sm">
                    {req.assignedSubstituteTeacherName}
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Match Qualification: <strong>{req.assignedRuleTier || 'General Substitute'}</strong> &bull; Double-booking check: Passed
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-200 text-slate-700 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">
                  Rule Evaluation Status
                </span>
                <p className="text-slate-600">
                  Click <strong>"Allocate via Rules"</strong> to review real-time eligibility scores, subject-specialist preferences, and double-booking validations for all candidate teachers.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
          No substitution requests are recorded for {selectedDate} in the selected branch. Requests are not generated automatically from attendance yet.
        </div>
      )}

      {resolutionRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl space-y-3">
            <h3 className="font-bold text-navy-950">Record leadership resolution</h3>
            <p className="text-xs text-slate-600">This records why the period remains uncovered or what alternative leadership has approved. It does not assign a substitute.</p>
            <textarea value={resolutionNote} onChange={(e) => setResolutionNote(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 p-3 text-sm" placeholder="Record the approved resolution or next action…" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setResolutionRequestId(null)} className="rounded-lg border px-3 py-2 text-xs font-semibold">Cancel</button>
              <button disabled={!resolutionNote.trim()} onClick={() => { resolveUncoveredSubstitution(resolutionRequestId, resolutionNote); setResolutionRequestId(null); }} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Save resolution</button>
            </div>
          </div>
        </div>
      )}

      {/* Allocate Substitute Modal with Explicit Rule Verification */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveRequest(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-slate-100 pb-3 mb-4 space-y-1">
              <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                Rule-Based Allocation Engine
              </span>
              <h3 className="text-base font-bold text-navy-950">
                Allocate Substitute for Period {activeRequest.period} ({activeRequest.timing})
              </h3>
              <p className="text-xs text-slate-500">
                Target: {activeRequest.grade} {activeRequest.section} ({activeRequest.subject}) &bull; Band: <strong>{activeRequest.gradeBracket}</strong>
              </p>
            </div>

            {/* Candidates Evaluated Against Rules */}
            <div className="space-y-4 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1">
                <p className="font-bold text-navy-950 text-xs">Rule Constraints Active:</p>
                <ul className="list-disc pl-4 text-slate-600 text-[11px] space-y-0.5">
                  <li>Mother teachers (Grades 1 & 2) disqualified from substituting.</li>
                  <li>Cross-bracket substitution blocked (Grades 3–5 can only substitute in 3–5; 6–10 in 6–10).</li>
                  <li>Double-booking check active against individual teacher timetables.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-navy-950 text-xs uppercase tracking-wide">
                  Candidate Faculty Evaluations ({teachers.length} Evaluated)
                </h4>

                <div className="space-y-2">
                  {teachers.map((t) => {
                    const evalResult = evaluateCandidateTeacher(
                      t,
                      {
                        period: activeRequest.period,
                        gradeBracket: activeRequest.gradeBracket,
                        subject: activeRequest.subject,
                        branch: activeRequest.branch,
                        date: activeRequest.date,
                      },
                      teacherAttendance,
                      substitutionRequests
                    );

                    return (
                      <div
                        key={t.id}
                        className={`rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition ${
                          evalResult.isEligible
                            ? 'border-emerald-200 bg-emerald-50/30'
                            : 'border-slate-200 bg-slate-50/70 opacity-80'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy-950">{t.name}</span>
                            <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] font-mono text-slate-600">
                              {t.gradeBracket}
                            </span>
                            <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] text-slate-600">
                              Campus: {t.branch}
                            </span>
                          </div>

                          {evalResult.isEligible ? (
                            <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span>{evalResult.matchTier}</span>
                              <span>&bull;</span>
                              <span className="text-slate-500 font-normal">Period {activeRequest.period} Free</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[11px] text-rose-700">
                              <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                              <span>{evalResult.disqualificationReason}</span>
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 self-end sm:self-center">
                          {evalResult.isEligible ? (
                            <button
                              onClick={() =>
                                handleSelectSubstitute(
                                  activeRequest.id,
                                  t.id,
                                  t.name,
                                  evalResult.matchTier
                                )
                              }
                              className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700 transition"
                            >
                              Assign Teacher
                            </button>
                          ) : (
                            <span className="rounded bg-slate-200/60 px-2.5 py-1 text-[10px] font-bold text-slate-500 cursor-not-allowed">
                              Ineligible
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-slate-100 pt-3">
              <button
                onClick={() => setActiveRequest(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close Rule Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {whatsAppDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl space-y-3">
            <h3 className="font-bold text-navy-950">Copy-ready WhatsApp message</h3>
            <p className="text-xs text-slate-600">Review the message, then copy and send it manually. BSAOS does not access WhatsApp or send messages.</p>
            <textarea readOnly value={whatsAppDraft} rows={10} className="w-full rounded-lg border border-slate-300 p-3 text-sm" onFocus={(e) => e.currentTarget.select()} />
            <div className="flex justify-end"><button onClick={() => setWhatsAppDraft('')} className="rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white">Close</button></div>
          </div>
        </div>
      )}

      {/* Rule Details Modal */}
      {showRuleDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowRuleDetailsModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-navy-950">
              Brainy Stars Substitution Policy Specifications
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <strong className="text-navy-950 block mb-1">Policy 1: Mother Teacher Shield</strong>
                <p>Grade 1 and Grade 2 mother teachers must not be assigned as substitutes under any circumstance to ensure continuous emotional and academic anchoring for young learners.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <strong className="text-navy-950 block mb-1">Policy 2: Grade Band Isolation</strong>
                <p>Grades 3–5 teachers may substitute only within Grades 3–5. Grades 6–10 teachers may substitute only within Grades 6–10.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <strong className="text-navy-950 block mb-1">Policy 3: Algorithmic Match Hierarchy</strong>
                <p>Preference 1: Teacher who already teaches the required subject.</p>
                <p>Preference 2: Teacher certified or approved to substitute for that subject.</p>
                <p>Preference 3: General eligible substitute within the grade band.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <strong className="text-navy-950 block mb-1">Policy 4: Double-Booking & Availability Safeguard</strong>
                <p>Checks teacher daily attendance (cannot be absent or on sick leave) and verifies that the specific period in their timetable is unassigned.</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowRuleDetailsModal(false)}
                className="rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
