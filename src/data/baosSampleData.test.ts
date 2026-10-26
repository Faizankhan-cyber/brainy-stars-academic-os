import { describe, expect, it } from 'vitest';
import {
  INITIAL_TEACHER_ATTENDANCE,
  INITIAL_TEACHERS,
  evaluateCandidateTeacher,
} from './baosSampleData';

const request = {
  period: 2,
  gradeBracket: 'Grades 3-5' as const,
  subject: 'General Science',
};

function teacher(id: string) {
  const found = INITIAL_TEACHERS.find((item) => item.id === id);
  if (!found) throw new Error(`Missing demo teacher: ${id}`);
  return found;
}

describe('evaluateCandidateTeacher', () => {
  it('disqualifies Grade 1–2 mother teachers from substitution', () => {
    const result = evaluateCandidateTeacher(teacher('tch-jay-01'), request, INITIAL_TEACHER_ATTENDANCE);
    expect(result.isEligible).toBe(false);
    expect(result.matchTier).toBe('Ineligible');
    expect(result.disqualificationReason).toContain('Mother Teachers');
  });

  it('disqualifies an absent teacher even when the period is free', () => {
    const result = evaluateCandidateTeacher(teacher('tch-jay-02'), request, INITIAL_TEACHER_ATTENDANCE);
    expect(result.isEligible).toBe(false);
    expect(result.attendanceStatus).toBe('Absent');
    expect(result.disqualificationReason).toContain('marked Absent');
  });

  it('disqualifies a teacher whose requested period is already occupied', () => {
    // tch-kor-02 has Grade 3B Math scheduled in period 4; period 3 is free.
    const result = evaluateCandidateTeacher(
      teacher('tch-kor-02'),
      { ...request, period: 4 },
      INITIAL_TEACHER_ATTENDANCE,
    );
    expect(result.isEligible).toBe(false);
    expect(result.isFreePeriod).toBe(false);
    expect(result.disqualificationReason).toContain('Double-Booking Conflict');
  });

  it('prioritizes an available subject specialist in the compatible grade bracket', () => {
    // tch-kor-02 is a Mathematics specialist, not a General Science specialist.
    const result = evaluateCandidateTeacher(
      teacher('tch-kor-02'),
      { ...request, subject: 'Mathematics' },
      INITIAL_TEACHER_ATTENDANCE,
    );
    expect(result.isEligible).toBe(true);
    expect(result.matchTier).toBe('Subject Specialist (Priority 1)');
    expect(result.isFreePeriod).toBe(true);
    expect(result.attendanceStatus).toBe('Present');
  });

  it('rejects teachers from incompatible grade brackets', () => {
    const incompatibleTeacher = teacher('tch-kor-03');
    // Keep this test focused on grade-band eligibility; attendance is a separate constraint.
    const attendanceWithoutCandidate = INITIAL_TEACHER_ATTENDANCE.filter(
      (record) => record.teacherId !== incompatibleTeacher.id,
    );
    const result = evaluateCandidateTeacher(incompatibleTeacher, request, attendanceWithoutCandidate);
    expect(result.isEligible).toBe(false);
    expect(result.disqualificationReason).toContain('cannot substitute in Grades 3–5');
  });
});
