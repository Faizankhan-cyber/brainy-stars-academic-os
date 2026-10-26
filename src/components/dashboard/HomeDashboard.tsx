import React,{useState} from 'react';
import {UsersRound,CalendarCheck,Shuffle,FileSpreadsheet,Eye,LifeBuoy} from 'lucide-react';
import {NavItemId} from '../../types/baos';
interface HomeDashboardProps{onNavigate:(nav:NavItemId)=>void}
const initialActions=[{id:1,priority:'High',title:'Complete campus self-audit documentation',meta:'Owner: Campus leadership · Due today'},{id:2,priority:'Today',title:'Review pending daily academic reports',meta:'8 reports are waiting for review'},{id:3,priority:'Follow-up',title:'Assign substitute for Period 2',meta:'Jayanagar campus · 1 request'},{id:4,priority:'Planned',title:'Confirm coaching follow-up plans',meta:'3 teacher plans need a next step'}];
const metrics=[{label:'Teachers',value:'128',note:'Across all campuses',icon:UsersRound,tone:'purple',nav:'operations-teachers' as NavItemId},{label:'Attendance',value:'94.2%',note:'Today · 121 on duty',icon:CalendarCheck,tone:'green',nav:'operations-attendance' as NavItemId},{label:'Substitutions',value:'02',note:'Awaiting allocation',icon:Shuffle,tone:'amber',nav:'operations-substitution' as NavItemId},{label:'Daily reports',value:'08',note:'Need review',icon:FileSpreadsheet,tone:'purple',nav:'operations-daily-report' as NavItemId},{label:'Observations',value:'12',note:'Completed this week',icon:Eye,tone:'green',nav:'coaching-observations' as NavItemId},{label:'Interventions',value:'03',note:'Require follow-up',icon:LifeBuoy,tone:'rose',nav:'academics-interventions' as NavItemId}];
const campuses=[{name:'Jayanagar',note:'Strong attendance',pct:'96%',tone:'green'},{name:'Koramangala',note:'Attendance watch',pct:'88%',tone:'amber'},{name:'HBR',note:'Reports in progress',pct:'94%',tone:'green'},{name:'Hubballi',note:'Review 2 actions',pct:'91%',tone:'purple'}];
const activity=[{title:'Substitution request raised',meta:'Jayanagar · Period 2',time:'12m'},{title:'Classroom observation saved',meta:'HBR · Science',time:'35m'},{title:'Daily report submitted',meta:'Primary · Main campus',time:'1h'}];
export const HomeDashboard:React.FC<HomeDashboardProps>=({onNavigate})=>{
  const [actions] = useState(initialActions);
  const [completed, setCompleted] = useState<number[]>([]);
  return (
    <div className="bsa-dashboard space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-.025em] text-[#302a35]">
            Your school, at a glance
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#716879]">
            The priorities and signals that need your attention today.
          </p>
        </div>
        <span className="mt-1 hidden shrink-0 rounded-full bg-[#edf7e8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#39752c] sm:inline">
          Monday · 26 Oct
        </span>
      </div>

      <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 2xl:grid-cols-6">
        {metrics.map(({ label, value, note, icon: Icon, tone, nav }) => (
          <button
            key={label}
            onClick={() => onNavigate(nav)}
            className="metric-card flex min-w-0 flex-col rounded-[14px] border border-[#e8e1eb] bg-white p-4 text-left transition hover:border-[#cbb7d5] hover:shadow-sm"
          >
            <span className={`metric-icon metric-${tone} mb-2.5 flex h-10 w-10 items-center justify-center rounded-[10px]`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-[#716879]">{label}</span>
            <span className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-[#302a35]">
              {value}
            </span>
            <span className="mt-1 text-xs sm:text-sm leading-snug text-[#817687]">{note}</span>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="rounded-[14px] border border-[#e8e1eb] bg-white px-5 py-4 xl:col-span-7">
          <div className="mb-3 flex items-start justify-between border-b border-[#eee8f0] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#302a35]">Priority actions</h3>
              <p className="mt-0.5 text-sm text-[#817687]">A short list of what needs action next.</p>
            </div>
            <span className="rounded-full bg-[#fff4d9] px-3 py-1 text-xs font-bold text-[#9a650b]">
              {actions.filter((a) => !completed.includes(a.id)).length} OPEN
            </span>
          </div>
          {actions.map((a, i) => (
            <div
              key={a.id}
              className={`flex min-h-[52px] items-start gap-3 py-3 ${i ? 'border-t border-[#f0ebf2]' : ''}`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  a.priority === 'High'
                    ? 'bg-[#fff0f1] text-[#c51f48]'
                    : a.priority === 'Today'
                    ? 'bg-[#fff4d9] text-[#9a650b]'
                    : a.priority === 'Follow-up'
                    ? 'bg-[#f4ebf7] text-[#4f1f63]'
                    : 'bg-[#edf7e8] text-[#39752c]'
                }`}
              >
                {completed.includes(a.id) ? 'Done' : a.priority}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm sm:text-base font-semibold leading-snug ${
                    completed.includes(a.id) ? 'text-[#817687] line-through' : 'text-[#302a35]'
                  }`}
                >
                  {a.title}
                </p>
                <p className="mt-1 text-xs sm:text-sm leading-normal text-[#817687]">{a.meta}</p>
              </div>
              <button
                onClick={() =>
                  setCompleted((v) => (v.includes(a.id) ? v.filter((id) => id !== a.id) : [...v, a.id]))
                }
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold ${
                  completed.includes(a.id)
                    ? 'border border-[#e8e1eb] text-[#817687]'
                    : 'bg-[#512064] text-white hover:bg-[#421750]'
                }`}
              >
                {completed.includes(a.id) ? 'Undo' : 'Complete'}
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-[#e8e1eb] bg-white px-5 py-4 xl:col-span-5">
          <div className="mb-3.5 border-b border-[#eee8f0] pb-3">
            <h3 className="text-lg font-bold text-[#302a35]">Campus pulse</h3>
            <p className="mt-0.5 text-sm text-[#817687]">A quick read across your school.</p>
          </div>
          <div className="space-y-4">
            {campuses.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    c.tone === 'green'
                      ? 'bg-[#59ab42]'
                      : c.tone === 'amber'
                      ? 'bg-[#f2a51a]'
                      : 'bg-[#512064]'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-semibold text-[#302a35]">{c.name}</p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#817687]">{c.note}</p>
                </div>
                <span className="pr-1 text-base sm:text-lg font-bold text-[#302a35]">{c.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="rounded-[14px] border border-[#e8e1eb] bg-white px-5 py-4 xl:col-span-7">
          <div className="mb-4 border-b border-[#eee8f0] pb-3">
            <h3 className="text-lg font-bold text-[#302a35]">Academic progress</h3>
            <p className="mt-0.5 text-sm text-[#817687]">Syllabus completion across tracked grades.</p>
          </div>
          {[
            { label: 'Primary', pct: 78, tone: 'purple' },
            { label: 'Middle school', pct: 64, tone: 'green' },
            { label: 'Secondary', pct: 71, tone: 'amber' },
          ].map((g) => (
            <div key={g.label} className="mb-4 last:mb-1">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-[#716879]">{g.label}</span>
                <span className="font-bold text-[#302a35]">{g.pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#f0eaf2]">
                <div className={`progress-${g.tone} h-full rounded-full`} style={{ width: g.pct + '%' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-[#e8e1eb] bg-white px-5 py-4 xl:col-span-5">
          <div className="mb-3.5 border-b border-[#eee8f0] pb-3">
            <h3 className="text-lg font-bold text-[#302a35]">Recent activity</h3>
            <p className="mt-0.5 text-sm text-[#817687]">Updates from campus teams.</p>
          </div>
          {activity.map((a, i) => (
            <div
              key={a.title}
              className={`flex items-start gap-3 py-3 ${i ? 'border-t border-[#f0ebf2]' : ''}`}
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#59ab42]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base font-semibold leading-snug text-[#302a35]">{a.title}</p>
                <p className="mt-0.5 text-xs sm:text-sm leading-normal text-[#817687]">{a.meta}</p>
              </div>
              <span className="shrink-0 text-xs sm:text-sm font-medium text-[#817687]">{a.time}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-between gap-2 pt-2 text-xs text-[#8c8292]">
        <span>BSAOS · Academic operations, teacher growth and school improvement.</span>
        <span>UI CONCEPT · 01</span>
      </footer>
    </div>
  );
};