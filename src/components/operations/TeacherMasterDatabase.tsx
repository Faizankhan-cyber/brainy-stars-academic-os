import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  X,
  ShieldAlert,
} from 'lucide-react';
import { Teacher, BranchCode, TeacherGradeBracket } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

export const TeacherMasterDatabase: React.FC = () => {
  const { currentBranch, teachers, addTeacher, branches } = useSchool();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedBracket, setSelectedBracket] = useState<string>('ALL');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New teacher form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: 'Montessori Primary' as Teacher['department'],
    gradeBracket: 'Grades 3-5' as TeacherGradeBracket,
    qualification: '',
    experienceYears: 4,
    branch: (currentBranch === 'ALL' ? 'JAY' : currentBranch) as BranchCode,
    subjects: '',
    contactNumber: '',
    email: '',
  });

  const filteredTeachers = teachers.filter((t) => {
    const matchesBranch = currentBranch === 'ALL' || t.branch === currentBranch;
    const matchesDept = selectedDept === 'ALL' || t.department === selectedDept;
    const matchesBracket = selectedBracket === 'ALL' || t.gradeBracket === selectedBracket;
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBranch && matchesDept && matchesBracket && matchesSearch;
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newTeacher: Teacher = {
      id: `tch-${Date.now()}`,
      code: `BST-${formData.branch}-${String(teachers.length + 1).padStart(2, '0')}`,
      name: formData.name,
      branch: formData.branch,
      designation: formData.designation || 'Academic Educator',
      department: formData.department,
      gradeBracket: formData.gradeBracket,
      qualification: formData.qualification || 'B.Ed. / AMI Diploma',
      experienceYears: Number(formData.experienceYears) || 1,
      assignedClasses: ['Grade 3 A'],
      subjects: formData.subjects ? formData.subjects.split(',').map((s) => s.trim()) : ['General Science'],
      approvedSubstituteSubjects: ['Mathematics', 'Value Studies'],
      timetableSchedule: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
      weeklyPeriods: 22,
      contactNumber: formData.contactNumber || '+91 98450 00000',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@brainystars.internal`,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      coachingStage: 'Developing',
    };

    addTeacher(newTeacher);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top action & filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Teacher Master Database</h2>
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
              {filteredTeachers.length} Registered Faculty
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Centralized registry of Montessori Guides, Mother Teachers, CBSE Faculty, and Values Educators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Faculty Member</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by faculty name, code, subject, or designation..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Montessori Primary">Montessori Primary</option>
            <option value="CBSE Primary">CBSE Primary</option>
            <option value="Middle School">Middle School</option>
            <option value="Secondary School">Secondary School</option>
            <option value="Islamic & Value Studies">Islamic & Value Studies</option>
          </select>

          <select
            value={selectedBracket}
            onChange={(e) => setSelectedBracket(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Grade Brackets</option>
            <option value="Mother Teacher (Grades 1-2)">Mother Teachers (Grades 1-2)</option>
            <option value="Grades 3-5">Grades 3–5 Faculty</option>
            <option value="Grades 6-10">Grades 6–10 Faculty</option>
          </select>
        </div>
      </div>

      {/* Teachers Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Employee Code</th>
                <th className="py-3 px-4">Grade Bracket</th>
                <th className="py-3 px-4">Department & Role</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Weekly Load</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-teal-300 font-bold text-xs shrink-0">
                        {teacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-navy-950">{teacher.name}</p>
                        <p className="text-[11px] text-slate-500">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    {teacher.code}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                        teacher.gradeBracket === 'Mother Teacher (Grades 1-2)'
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : teacher.gradeBracket === 'Grades 3-5'
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-teal-100 text-teal-900 border border-teal-200'
                      }`}
                    >
                      {teacher.gradeBracket}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800">{teacher.designation}</p>
                    <span className="text-[10px] text-slate-500">{teacher.department}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                      {teacher.branch}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-700">{teacher.weeklyPeriods}</span>
                    <span className="text-slate-400 text-[10px]"> periods/wk</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        teacher.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          teacher.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      {teacher.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Teacher Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4 border-b border-slate-100 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-teal-300 text-lg font-bold shadow-md">
                {selectedTeacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-navy-950">{selectedTeacher.name}</h3>
                  <span className="rounded bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-bold text-teal-800">
                    {selectedTeacher.code}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{selectedTeacher.designation}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Campus: {selectedTeacher.branch}</span>
                  <span>&bull;</span>
                  <span>Grade Bracket: <strong>{selectedTeacher.gradeBracket}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 uppercase text-[10px]">Department</span>
                <p className="font-bold text-slate-800">{selectedTeacher.department}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 uppercase text-[10px]">Qualification</span>
                <p className="font-bold text-slate-800">{selectedTeacher.qualification}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 uppercase text-[10px]">Teaching Experience</span>
                <p className="font-bold text-slate-800">{selectedTeacher.experienceYears} Years</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 uppercase text-[10px]">Substitution Status</span>
                <p className="font-bold text-slate-800">
                  {selectedTeacher.gradeBracket === 'Mother Teacher (Grades 1-2)'
                    ? 'Prohibited (Mother Teacher Shield)'
                    : `Eligible within ${selectedTeacher.gradeBracket}`}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs space-y-2 border border-slate-100">
              <span className="font-semibold text-slate-500 uppercase text-[10px]">Subjects Taught</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTeacher.subjects.map((sub, i) => (
                  <span key={i} className="rounded-md bg-white border border-slate-200 px-2 py-1 text-slate-700 font-medium">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-navy-950 mb-1">Register Faculty Member</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add faculty credentials to the local in-memory master database.
            </p>

            <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sr. Maryam Siddiqui"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Bracket</label>
                  <select
                    value={formData.gradeBracket}
                    onChange={(e) => setFormData({ ...formData, gradeBracket: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    <option value="Mother Teacher (Grades 1-2)">Mother Teacher (Grades 1-2)</option>
                    <option value="Grades 3-5">Grades 3–5 Faculty</option>
                    <option value="Grades 6-10">Grades 6–10 Faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  >
                    {branches.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Primary Guide"
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. AMI Diploma, B.Ed."
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  placeholder="e.g. General Science, EVS"
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700 shadow-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
