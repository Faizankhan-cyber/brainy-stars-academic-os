import { describe, expect, it } from 'vitest';
import { INITIAL_TEACHERS, INITIAL_TEACHER_ATTENDANCE, evaluateCandidateTeacher } from './baosSampleData';

describe('substitution hard eligibility constraints', () => {
  const base = { period: 2, gradeBracket: 'Grades 3-5' as const, subject: 'General Science', date: '2026-10-26' };
  const candidate = INITIAL_TEACHERS.find((t) => t.id === 'tch-kor-02')!;
  it('blocks cross-branch candidates by default', () => {
    const result = evaluateCandidateTeacher(candidate, { ...base, branch: candidate.branch === 'KOR' ? 'JAY' : 'KOR' }, INITIAL_TEACHER_ATTENDANCE);
    expect(result.isEligible).toBe(false);
    expect(result.disqualificationReason).toContain('Cross-branch substitution requires separate approval');
  });
  it('blocks inactive and non-teaching employees', () => {
    expect(evaluateCandidateTeacher({ ...candidate, status: 'Inactive' }, base, INITIAL_TEACHER_ATTENDANCE).isEligible).toBe(false);
    expect(evaluateCandidateTeacher({ ...candidate, employeeType: 'Non-teaching' }, base, INITIAL_TEACHER_ATTENDANCE).isEligible).toBe(false);
  });
  it('blocks on-duty, half-day and approved-leave employees for ordinary allocation', () => {
    for (const status of ['On Duty', 'Half Day', 'Approved Leave'] as const) {
      const records = INITIAL_TEACHER_ATTENDANCE.filter((r) => r.teacherId !== candidate.id);
      records.push({ id: `test-${status}`, teacherId: candidate.id, teacherName: candidate.name, branch: candidate.branch, date: base.date, status });
      expect(evaluateCandidateTeacher(candidate, base, records).isEligible).toBe(false);
    }
  });
});
