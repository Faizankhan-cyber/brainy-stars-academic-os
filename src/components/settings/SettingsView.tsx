import React from 'react';
import {
  Settings,
  Database,
  ShieldCheck,
  Building,
  Key,
  Server,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">System Settings & Architecture</h2>
          <p className="text-xs text-slate-500">
            System configuration, data schema readiness, and institutional parameters for Brainy Stars Academic OS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            BAOS Core v1.0.0
          </span>
        </div>
      </div>

      {/* Integration Readiness Notice */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-teal-950">
              Cloud Firestore & Firebase Auth Architecture Prepared
            </h3>
            <p className="text-xs text-teal-900/80">
              Type definitions and schema models are staged for direct Firebase Firestore synchronization without active billable connections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/teachers</span>
            <span className="text-[10px] text-slate-500">Master faculty directory & qualifications</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/attendance</span>
            <span className="text-[10px] text-slate-500">Biometric daily logs & leave approvals</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/observations</span>
            <span className="text-[10px] text-slate-500">5-domain Montessori & inquiry rubrics</span>
          </div>
          <div className="rounded-xl bg-white p-3 border border-teal-100">
            <span className="font-mono text-[11px] font-bold text-teal-800 block">/parent_concerns</span>
            <span className="text-[10px] text-slate-500">SLA ticket queue and redressal log</span>
          </div>
        </div>
      </div>

      {/* Institutional Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-navy-950 text-sm border-b border-slate-100 pb-2">
            Academic Calendar & Term Boundaries
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Active Academic Year</span>
              <strong className="text-navy-950">2026 – 2027</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Term 1 Instructional Window</span>
              <strong className="text-navy-950">June 01, 2026 – October 31, 2026</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Term 2 Instructional Window</span>
              <strong className="text-navy-950">November 10, 2026 – March 31, 2027</strong>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Curriculum Affiliations</span>
              <strong className="text-teal-700">Montessori (AMI) + CBSE (NEP 2020)</strong>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-navy-950 text-sm border-b border-slate-100 pb-2">
            Environment & Cost Guardrails
          </h3>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Ongoing Cost:</strong> Uses 100% free eligible runtime, local memory cache, and client bundles.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Data Privacy:</strong> Zero real personal credentials, PII, or student secrets stored or transmitted.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>GitHub Versioning:</strong> Fully tracked component tree with complete clean Git state and standard configuration.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
