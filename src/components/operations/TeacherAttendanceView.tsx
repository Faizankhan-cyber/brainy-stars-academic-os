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
} from 'lucide-react';
import { TeacherAttendance, BranchCode } from '../../types/baos';
import { SAMPLE_TEACHER_ATTENDANCE } from '../../data/baosSampleData';

interface TeacherAttendanceViewProps {
  currentBranch: BranchCode | 'ALL';
}

export const TeacherAttendanceView: React.FC<TeacherAttendanceViewProps> = ({
  currentBranch,
}) => {
  const [attendance, setAttendance] = useState<TeacherAttendance[]>(SAMPLE_TEACHER_ATTENDANCE);
  const [selectedDate, setSelectedDate] = useState('2026-10-16');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendance = attendance.filter((item) => {
    const matchesBranch = currentBranch === 'ALL' || item.branch === currentBranch;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch = item.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBranch && matchesStatus && matchesSearch;
  });

  const presentCount = filteredAttendance.filter((a) => a.status === 'Present' || a.status === 'On Duty').length;
  const absentCount = filteredAttendance.filter((a) => a.status === 'Absent').length;
  const lateCount = filteredAttendance.filter((a) => a.status === 'Late').length;

  const handleUpdateStatus = (id: string, newStatus: TeacherAttendance['status']) => {
    setAttendance((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleMarkAllPresent = () => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (currentBranch === 'ALL' || item.branch === currentBranch) {
          return { ...item, status: 'Present', checkIn: '08:00 AM' };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Teacher Attendance Registry</h2>
          <p className="text-xs text-slate-500">
            Real-time biometric & roll-call monitoring across campus gates and classrooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
          >
            <Check className="h-4 w-4" />
            <span>Mark All Present</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Rostered</span>
          <p className="text-xl font-black text-navy-950 mt-1">{filteredAttendance.length}</p>
          <span className="text-[10px] text-slate-400">Scheduled for today</span>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <span className="text-xs font-semibold text-emerald-800">Present & On-Duty</span>
          <p className="text-xl font-black text-emerald-700 mt-1">{presentCount}</p>
          <span className="text-[10px] text-emerald-700 font-medium">Classrooms staffed</span>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm">
          <span className="text-xs font-semibold text-rose-800">Absent</span>
          <p className="text-xl font-black text-rose-700 mt-1">{absentCount}</p>
          <span className="text-[10px] text-rose-700 font-medium">Substitutions triggered</span>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <span className="text-xs font-semibold text-amber-800">Late Arrival</span>
          <p className="text-xl font-black text-amber-700 mt-1">{lateCount}</p>
          <span className="text-[10px] text-amber-700 font-medium">Logged post 08:15 AM</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
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
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Gate Check-in</th>
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
                    <span className="text-[10px] text-slate-400 font-mono">ID: {record.teacherId}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {record.branch}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {record.checkIn || '—'}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {record.checkOut || 'Active In-Class'}
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
                    {record.remarks || 'Standard biometric confirmation.'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleUpdateStatus(record.id, 'Present')}
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
                        onClick={() => handleUpdateStatus(record.id, 'Absent')}
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
                        onClick={() => handleUpdateStatus(record.id, 'Late')}
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
                        onClick={() => handleUpdateStatus(record.id, 'On Duty')}
                        title="Mark On Duty"
                        className={`rounded px-2 py-1 text-[10px] font-bold transition ${
                          record.status === 'On Duty'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        OD
                      </button>
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
