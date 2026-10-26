import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  AlertCircle,
  Building,
  Check,
  Info,
} from 'lucide-react';
import { TeacherAttendance, BranchCode } from '../../types/baos';
import { useSchool } from '../../context/SchoolContext';

export const TeacherAttendanceView: React.FC = () => {
  const {
    currentBranch,
    teachers,
    selectedDate,
    setSelectedDate,
    teacherAttendance,
    updateTeacherAttendance,
    markAllTeachersPresent,
  } = useSchool();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const selectedDayAttendance = teacherAttendance.filter((item) => {
    const matchesBranch = currentBranch === 'ALL' || item.branch === currentBranch;
    return matchesBranch && item.date === selectedDate;
  });

  const filteredAttendance = selectedDayAttendance.filter((item) => {
    const matchesBranch = currentBranch === 'ALL' || item.branch === currentBranch;
    const matchesDate = item.date === selectedDate;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch = item.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBranch && matchesDate && matchesStatus && matchesSearch;
  });

  const presentCount = selectedDayAttendance.filter(
    (a) => a.status === 'Present' || a.status === 'On Duty'
  ).length;
  const absentCount = selectedDayAttendance.filter((a) => a.status === 'Absent').length;
  const leaveCount = selectedDayAttendance.filter((a) => a.status === 'Approved Leave' || a.leaveType).length;
  const lateCount = selectedDayAttendance.filter((a) => a.status === 'Late').length;

  return (
    <div className="space-y-6">
      {/* Top Banner and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-950">Teacher Attendance Registry</h2>
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
              Demo Register · Manual Entry
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Manual attendance records stored in this browser only. No biometric integration is configured.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            onClick={() => setShowBulkConfirm(true)}
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 transition"
          >
            <Check className="h-4 w-4" />
            <span>Mark Visible Records Present</span>
          </button>
        </div>
      </div>

      {showBulkConfirm && (
        <div role="alertdialog" aria-modal="true" aria-label="Confirm bulk attendance" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
          <p className="font-bold text-amber-950">Confirm bulk marking</p>
          <p className="mt-1 text-amber-900">This marks existing records for {selectedDate} in {currentBranch === 'ALL' ? 'all visible branches' : currentBranch} as Present. It does not create missing records or invent check-in times.</p>
          <div className="mt-3 flex gap-2"><button onClick={() => { markAllTeachersPresent(); setShowBulkConfirm(false); }} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white">Confirm marking</button><button onClick={() => setShowBulkConfirm(false)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold">Cancel</button></div>
        </div>
      )}

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Rostered</span>
          <p className="text-xl font-black text-navy-950 mt-1">{teachers.filter((t) => t.status === 'Active' && (currentBranch === 'ALL' || t.branch === currentBranch)).length}</p>
          <span className="text-[10px] text-slate-400">Active employee roster · {selectedDate}</span>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs">
          <span className="text-xs font-semibold text-emerald-800">Present & On-Duty</span>
          <p className="text-xl font-black text-emerald-700 mt-1">{presentCount}</p>
          <span className="text-[10px] text-emerald-700 font-medium">Classrooms staffed</span>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 shadow-xs">
          <span className="text-xs font-semibold text-rose-800">Absent</span>
          <p className="text-xl font-black text-rose-700 mt-1">{absentCount}</p>
          <span className="text-[10px] text-rose-700 font-medium">Substitution rule triggered</span>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-xs">
          <span className="text-xs font-semibold text-amber-800">Late Arrival</span>
          <p className="text-xl font-black text-amber-700 mt-1">{lateCount}</p>
          <span className="text-[10px] text-amber-700 font-medium">Deadline varies by branch/staff</span>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 shadow-xs">
          <span className="text-xs font-semibold text-violet-800">Leave / Leave-tagged</span>
          <p className="text-xl font-black text-violet-700 mt-1">{leaveCount}</p>
          <span className="text-[10px] text-violet-700 font-medium">Review approval and remarks</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search educator name..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="On Duty">On Duty</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Approved Leave">Approved Leave</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Manual Check-in</th>
                <th className="py-3 px-4">Departure</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Leave / Operational Note</th>
                <th className="py-3 px-4 text-right">Quick Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <p className="font-bold text-navy-950">{record.teacherName}</p>
                    <span className="text-[10px] text-slate-400 font-mono">Employee ID: {teachers.find((t) => t.id === record.teacherId)?.code || record.teacherId}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {record.branch}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {record.checkIn || '—'}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {record.checkOut || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        record.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : record.status === 'Absent'
                          ? 'bg-rose-100 text-rose-800'
                          : record.status === 'Late'
                          ? 'bg-amber-100 text-amber-800'
                          : record.status === 'Approved Leave'
                          ? 'bg-violet-100 text-violet-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {record.leaveType && (
                      <span className="font-semibold text-slate-800 mr-1.5">[{record.leaveType}]</span>
                    )}
                    {record.remarks || 'No additional note'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => updateTeacherAttendance(record.id, 'Present')}
                        title="Mark Present"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${
                          record.status === 'Present'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => updateTeacherAttendance(record.id, 'Absent')}
                        title="Mark Absent"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${
                          record.status === 'Absent'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => updateTeacherAttendance(record.id, 'Late')}
                        title="Mark Late"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${
                          record.status === 'Late'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        L
                      </button>
                      <button
                        onClick={() => updateTeacherAttendance(record.id, 'On Duty')}
                        title="Mark On Duty"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${
                          record.status === 'On Duty'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        OD
                      </button>
                      <button
                        onClick={() => updateTeacherAttendance(record.id, 'Approved Leave')}
                        title="Mark Approved Leave"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${record.status === 'Approved Leave' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >LV</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
