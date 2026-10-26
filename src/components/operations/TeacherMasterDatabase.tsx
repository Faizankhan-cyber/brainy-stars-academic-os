import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Users, CalendarClock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Teacher, BranchCode, TeacherGradeBracket } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const EMPTY_FORM = {
  name: '', designation: '', department: 'Montessori Primary' as Teacher['department'],
  gradeBracket: 'Montessori Pre-Primary' as TeacherGradeBracket, qualification: '', experienceYears: 0,
  branch: 'JAY' as BranchCode, subjects: '', contactNumber: '', email: '', joinDate: new Date().toISOString().slice(0,10),
  employeeType: 'Teaching' as 'Teaching' | 'Non-teaching', weeklyPeriods: 0, maxWeeklyPeriods: 28,
  workingDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'] as string[], timetableStatus: 'Pending' as 'Pending' | 'Draft' | 'Ready',
  weeklyTimetable: [] as Array<{day:string;period:number;grade:string;section:string;subject:string}>, status: 'Active' as Teacher['status'],
};
type EmployeeForm = typeof EMPTY_FORM;
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500';
const labelClass = 'mb-1 block text-sm font-semibold text-slate-700';

export const TeacherMasterDatabase: React.FC = () => {
  const { currentBranch, teachers, addTeacher, updateTeacher, deleteTeacher, branches, academicYear } = useSchool();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [view, setView] = useState<'all'|'new'|'pending'>('all');
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<EmployeeForm>({...EMPTY_FORM, branch: currentBranch === 'ALL' ? 'JAY' : currentBranch});
  const [timetableOpen, setTimetableOpen] = useState(false);
  const [draftSlot, setDraftSlot] = useState({day:'Monday',period:1,grade:'',section:'A',subject:''});

  const filtered = useMemo(() => teachers.filter(t => {
    const matchesBranch = currentBranch === 'ALL' || t.branch === currentBranch;
    const matchesSearch = [t.name,t.code,t.designation,t.email,...t.subjects].some(v => (v||'').toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesView = view === 'all' || (view === 'new' && (Date.now()-new Date(t.joinDate).getTime()) <= 30*86400000) || (view === 'pending' && (t.timetableStatus ?? 'Pending') !== 'Ready');
    return matchesBranch && matchesSearch && matchesStatus && matchesView;
  }), [teachers,currentBranch,search,statusFilter,view]);

  const openNew = () => { setEditing(null); setError(''); setForm({...EMPTY_FORM, branch: currentBranch === 'ALL' ? 'JAY' : currentBranch}); setTimetableOpen(false); setFormOpen(true); };
  const openEdit = (t: Teacher) => {
    setEditing(t); setError('');
    setForm({ ...EMPTY_FORM, name:t.name, designation:t.designation, department:t.department, gradeBracket:t.gradeBracket, qualification:t.qualification,
      experienceYears:t.experienceYears, branch:t.branch, subjects:t.subjects.join(', '), contactNumber:t.contactNumber, email:t.email, joinDate:t.joinDate,
      employeeType:t.employeeType ?? 'Teaching', weeklyPeriods:t.weeklyPeriods, maxWeeklyPeriods:t.maxWeeklyPeriods ?? 28,
      workingDays:t.workingDays ?? ['Monday','Tuesday','Wednesday','Thursday','Friday'], timetableStatus:t.timetableStatus ?? 'Pending',
      weeklyTimetable:t.weeklyTimetable ?? [], status:t.status });
    setTimetableOpen(false); setFormOpen(true);
  };
  const saveEmployee = (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!form.name.trim()) { setError('Employee name is required.'); return; }
    if (form.employeeType === 'Teaching' && form.weeklyPeriods > form.maxWeeklyPeriods) { setError('Assigned teaching periods exceed the maximum weekly load.'); return; }
    if (form.weeklyTimetable.some((s,i,a) => a.findIndex(x => x.day===s.day && x.period===s.period) !== i)) { setError('Timetable has a day/period clash. A teacher cannot be in two classes in the same period.'); return; }
    const id = editing?.id ?? `emp-${Date.now()}`;
    const code = editing?.code ?? `BS-${form.branch}-${String(teachers.length+1).padStart(3,'0')}`;
    const record: Teacher = {
      id, code, name:form.name.trim(), branch:form.branch, designation:form.designation.trim() || (form.employeeType === 'Teaching' ? 'Teacher' : 'Staff'), department:form.department,
      gradeBracket:form.gradeBracket, qualification:form.qualification.trim(), experienceYears:Number(form.experienceYears)||0,
      assignedClasses:Array.from(new Set(form.weeklyTimetable.map(s => `${s.grade} ${s.section}`))), subjects:form.subjects.split(',').map(s=>s.trim()).filter(Boolean),
      approvedSubstituteSubjects:editing?.approvedSubstituteSubjects ?? [], timetableSchedule:editing?.timetableSchedule ?? {1:null,2:null,3:null,4:null,5:null,6:null},
      weeklyPeriods:Number(form.weeklyPeriods)||0, contactNumber:form.contactNumber.trim(), email:form.email.trim(), status:form.status,
      joinDate:form.joinDate, coachingStage:editing?.coachingStage ?? 'Developing', employeeType:form.employeeType, role:form.designation.trim(),
      maxWeeklyPeriods:Number(form.maxWeeklyPeriods)||0, workingDays:form.workingDays, timetableStatus:form.timetableStatus, academicYear,
      weeklyTimetable:form.weeklyTimetable,
    };
    if (editing) updateTeacher(record); else addTeacher(record);
    setFormOpen(false); setEditing(null);
  };
  const addSlot = () => {
    if (!draftSlot.grade.trim() || !draftSlot.subject.trim()) { setError('Enter a grade and subject before adding a timetable period.'); return; }
    if (form.weeklyTimetable.some(s=>s.day===draftSlot.day && s.period===Number(draftSlot.period))) { setError('This day and period already has an assignment.'); return; }
    setForm({...form, weeklyTimetable:[...form.weeklyTimetable,{...draftSlot,period:Number(draftSlot.period)}], timetableStatus:'Draft'});
    setDraftSlot({...draftSlot,period:Math.min(8,Number(draftSlot.period)+1)}); setError('');
  };
  const removeSlot = (index:number) => setForm({...form,weeklyTimetable:form.weeklyTimetable.filter((_,i)=>i!==index),timetableStatus:'Draft'});
  const confirmDelete = (t:Teacher) => {
    if (!window.confirm(`Permanently delete ${t.name}? This is allowed only if no attendance, substitution, observation or coaching records depend on this employee. Otherwise deactivate the employee instead.`)) return;
    const deleted = deleteTeacher(t.id);
    if (!deleted) window.alert('This employee has linked historical records. Permanent deletion was blocked to preserve audit history. Open Edit Employee and set Employment status to Inactive instead.');
  };
  const branchName = (code:string) => branches.find(b=>b.code===code)?.name ?? code;

  return <div className="min-w-0 space-y-5">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div><h2 className="text-2xl font-bold text-slate-900">Teacher Master Database</h2><p className="mt-1 text-sm text-slate-600">Central employee registry, workload and timetable onboarding · Academic year {academicYear}</p></div>
      <button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"><Plus size={18}/> Add Employee</button>
    </div>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[{label:'Total Employees',value:teachers.length},{label:'Active',value:teachers.filter(t=>t.status==='Active').length},{label:'New (30 days)',value:teachers.filter(t=>Date.now()-new Date(t.joinDate).getTime()<=30*86400000).length},{label:'Timetable Pending',value:teachers.filter(t=>(t.timetableStatus??'Pending')!=='Ready').length}].map(card=><div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-sm text-slate-500">{card.label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{card.value}</p></div>)}
    </div>
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Employee views">
      {[['all','All Employees'],['new','New Employees'],['pending','Timetable / Setup Pending']].map(([key,label])=><button key={key} onClick={()=>setView(key as typeof view)} className={`rounded-full px-4 py-2 text-sm font-semibold ${view===key?'bg-purple-800 text-white':'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>{label}</button>)}
    </div>
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 md:flex-row">
      <div className="flex-1"><label className={labelClass}>Search employees</label><div className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={17}/><input className={`${fieldClass} pl-10`} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, employee code, role, subject..."/></div></div>
      <div><label className={labelClass}>Status</label><select className={fieldClass} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="ALL">All statuses</option><option>Active</option><option>On Leave</option><option>Probation</option><option>Inactive</option></select></div>
    </div>
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600"><tr>{['Employee','Code / Branch','Role & grade','Subjects','Weekly load','Timetable','Status','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map(t=><tr key={t.id} className="hover:bg-slate-50"><td className="px-4 py-3"><p className="font-semibold text-slate-900">{t.name}</p><p className="text-xs text-slate-500">{t.email || 'No email added'}</p><p className="text-xs text-slate-500">Joined {t.joinDate}</p></td><td className="px-4 py-3"><p className="font-mono text-xs font-semibold">{t.code}</p><p className="text-xs text-slate-500">{branchName(t.branch)}</p></td><td className="px-4 py-3"><p>{t.designation}</p><p className="text-xs text-slate-500">{t.gradeBracket}</p></td><td className="px-4 py-3">{t.subjects.join(', ')||'—'}</td><td className="px-4 py-3">{t.weeklyPeriods} / {t.maxWeeklyPeriods ?? '—'} periods</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${(t.timetableStatus??'Pending')==='Ready'?'bg-green-100 text-green-800':'bg-amber-100 text-amber-800'}`}>{t.timetableStatus??'Pending'}</span><p className="mt-1 text-xs text-slate-500">{t.weeklyTimetable?.length ?? 0} slots</p></td><td className="px-4 py-3">{t.status}</td><td className="px-4 py-3"><div className="flex gap-2"><button aria-label={`Edit ${t.name}`} onClick={()=>openEdit(t)} className="rounded-md border border-slate-300 p-2 hover:bg-slate-100"><Pencil size={16}/></button><button aria-label={`Delete ${t.name}`} onClick={()=>confirmDelete(t)} className="rounded-md border border-red-200 p-2 text-red-700 hover:bg-red-50"><Trash2 size={16}/></button></div></td></tr>)}{filtered.length===0&&<tr><td colSpan={8} className="px-4 py-12 text-center text-slate-500">No employees match these filters.</td></tr>}</tbody></table></div>
    </div>
    {formOpen && <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"><div className="my-4 w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
      <div className="mb-5 flex items-start justify-between"><div><h3 className="text-xl font-bold text-slate-900">{editing?'Edit Employee Profile':'Add New Employee'}</h3><p className="mt-1 text-sm text-slate-600">Complete the profile and timetable now, or save with timetable pending.</p></div><button onClick={()=>setFormOpen(false)} aria-label="Close form" className="rounded-lg p-2 hover:bg-slate-100"><X/></button></div>
      {error&&<div role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"><AlertTriangle size={18}/>{error}</div>}
      <form onSubmit={saveEmployee} className="space-y-6">
        <section><h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900"><Users size={18}/> Employee details</h4><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><label className={labelClass}>Full name *</label><input required className={fieldClass} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
          <div><label className={labelClass}>Employee type *</label><select className={fieldClass} value={form.employeeType} onChange={e=>setForm({...form,employeeType:e.target.value as EmployeeForm['employeeType']})}><option value="Teaching">Teaching</option><option value="Non-teaching">Non-teaching</option></select></div>
          <div><label className={labelClass}>Designation / role</label><input className={fieldClass} value={form.designation} onChange={e=>setForm({...form,designation:e.target.value})} placeholder="Teacher, HOD, Coordinator..."/></div>
          <div><label className={labelClass}>Branch *</label><select className={fieldClass} value={form.branch} onChange={e=>setForm({...form,branch:e.target.value as BranchCode})}>{branches.map(b=><option key={b.code} value={b.code}>{b.name}</option>)}</select></div>
          <div><label className={labelClass}>Department</label><select className={fieldClass} value={form.department} onChange={e=>setForm({...form,department:e.target.value as Teacher['department']})}>{['Montessori Primary','CBSE Primary','Middle School','Secondary School','Islamic & Value Studies'].map(x=><option key={x}>{x}</option>)}</select></div>
          <div><label className={labelClass}>Grade bracket</label><select className={fieldClass} value={form.gradeBracket} onChange={e=>setForm({...form,gradeBracket:e.target.value as TeacherGradeBracket})}>{['Montessori Pre-Primary','Mother Teacher (Grades 1-2)','Grades 3-5','Grades 6-10'].map(x=><option key={x}>{x}</option>)}</select></div>
          <div><label className={labelClass}>Subjects (comma-separated)</label><input className={fieldClass} value={form.subjects} onChange={e=>setForm({...form,subjects:e.target.value})} placeholder="English, Mathematics"/></div>
          <div><label className={labelClass}>Qualification</label><input className={fieldClass} value={form.qualification} onChange={e=>setForm({...form,qualification:e.target.value})}/></div>
          <div><label className={labelClass}>Experience (years)</label><input type="number" min="0" className={fieldClass} value={form.experienceYears} onChange={e=>setForm({...form,experienceYears:Number(e.target.value)})}/></div>
          <div><label className={labelClass}>Phone</label><input className={fieldClass} value={form.contactNumber} onChange={e=>setForm({...form,contactNumber:e.target.value})}/></div>
          <div><label className={labelClass}>Email</label><input type="email" className={fieldClass} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
          <div><label className={labelClass}>Joining date *</label><input required type="date" className={fieldClass} value={form.joinDate} onChange={e=>setForm({...form,joinDate:e.target.value})}/></div>
          <div><label className={labelClass}>Employment status</label><select className={fieldClass} value={form.status} onChange={e=>setForm({...form,status:e.target.value as Teacher['status']})}><option>Active</option><option>On Leave</option><option>Probation</option><option>Inactive</option></select></div>
        </div></section>
        <section className="border-t border-slate-200 pt-5"><h4 className="mb-3 font-bold text-slate-900">Weekly workload & availability</h4><div className="grid gap-4 sm:grid-cols-3"><div><label className={labelClass}>Assigned teaching periods / week</label><input type="number" min="0" className={fieldClass} value={form.weeklyPeriods} onChange={e=>setForm({...form,weeklyPeriods:Number(e.target.value)})}/></div><div><label className={labelClass}>Maximum periods / week</label><input type="number" min="0" className={fieldClass} value={form.maxWeeklyPeriods} onChange={e=>setForm({...form,maxWeeklyPeriods:Number(e.target.value)})}/></div><div><label className={labelClass}>Timetable status</label><select className={fieldClass} value={form.timetableStatus} onChange={e=>setForm({...form,timetableStatus:e.target.value as EmployeeForm['timetableStatus']})}><option>Pending</option><option>Draft</option><option>Ready</option></select></div></div><div className="mt-3"><span className={labelClass}>Working days</span><div className="flex flex-wrap gap-3">{DAYS.map(day=><label key={day} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.workingDays.includes(day)} onChange={e=>setForm({...form,workingDays:e.target.checked?[...form.workingDays,day]:form.workingDays.filter(d=>d!==day)})}/>{day}</label>)}</div></div></section>
        <section className="border-t border-slate-200 pt-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h4 className="flex items-center gap-2 font-bold text-slate-900"><CalendarClock size={18}/> Weekly timetable setup</h4><button type="button" onClick={()=>setTimetableOpen(!timetableOpen)} className="rounded-lg border border-teal-700 px-3 py-2 text-sm font-semibold text-teal-800">{timetableOpen?'Hide timetable editor':'Set up timetable'}</button></div>
          {timetableOpen&&<div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><div><label className={labelClass}>Day</label><select className={fieldClass} value={draftSlot.day} onChange={e=>setDraftSlot({...draftSlot,day:e.target.value})}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div><div><label className={labelClass}>Period number</label><input type="number" min="1" max="12" className={fieldClass} value={draftSlot.period} onChange={e=>setDraftSlot({...draftSlot,period:Number(e.target.value)})}/></div><div><label className={labelClass}>Grade</label><input className={fieldClass} value={draftSlot.grade} onChange={e=>setDraftSlot({...draftSlot,grade:e.target.value})} placeholder="Grade 4"/></div><div><label className={labelClass}>Section</label><input className={fieldClass} value={draftSlot.section} onChange={e=>setDraftSlot({...draftSlot,section:e.target.value})} placeholder="A"/></div><div><label className={labelClass}>Subject</label><input className={fieldClass} value={draftSlot.subject} onChange={e=>setDraftSlot({...draftSlot,subject:e.target.value})}/></div></div><button type="button" onClick={addSlot} className="mt-3 rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white">Add period</button>
            {form.weeklyTimetable.length>0&&<div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="text-xs uppercase text-slate-500"><th className="p-2">Day</th><th className="p-2">Period</th><th className="p-2">Class</th><th className="p-2">Subject</th><th className="p-2">Action</th></tr></thead><tbody>{form.weeklyTimetable.map((s,i)=><tr key={`${s.day}-${s.period}`} className="border-t border-slate-200"><td className="p-2">{s.day}</td><td className="p-2">{s.period}</td><td className="p-2">{s.grade} {s.section}</td><td className="p-2">{s.subject}</td><td className="p-2"><button type="button" onClick={()=>removeSlot(i)} className="text-red-700 underline">Remove</button></td></tr>)}</tbody></table><button type="button" onClick={()=>setForm({...form,timetableStatus:'Ready'})} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-sm font-semibold text-green-800"><CheckCircle2 size={16}/> Mark timetable ready</button></div>}
          </div>}
          {!timetableOpen&&<p className="text-sm text-slate-600">{form.weeklyTimetable.length} periods configured. You can save now and complete the timetable later; the employee will appear in the pending setup view.</p>}
        </section>
        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5"><button type="button" onClick={()=>setFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button><button type="submit" className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800">{editing?'Save Employee Changes':'Save Employee'}</button></div>
      </form>
    </div></div>}
    <p className="text-xs text-slate-500">Data is currently saved in this browser's demo storage; it is not yet a shared multi-device employee database. Permanent deletion is blocked when linked history exists.</p>
  </div>;
};
