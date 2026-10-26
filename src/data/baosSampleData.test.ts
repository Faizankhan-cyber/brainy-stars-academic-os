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
    const result = evaluateCandidateTeacher(
      teacher('tch-jay-01'),
      request,
      INITIAL_TEACHER_ATTENDANCE,
    );

    expect(result.isEligible).toBe(false);
    expect(result.matchTier).toBe('Ineligible');
    expect(result.disqualificationReason).toContain('Mother Teachers');
  });

  it('disqualifies an absent teacher even when the period is free', () => {
    const result = evaluateCandidateTeacher(
      teacher('tch-jay-02'),
      request,
      INITIAL_TEACHER_ATTENDANCE,
    );

    expect(result.isEligible).toBe(false);
    expect(result.attendanceStatus).toBe('Absent');
    expect(result.disqualificationReason).toContain('marked Absent');
  });

  it('disqualifies a teacher whose requested period is already occupied', () => {
    const result = evaluateCandidateTeacher(
      teacher('tch-kor-02'),
      { ...request, period: 3 },
      INITIAL_TEACHER_ATTENDANCE,
    );

    expect(result.isEligible).toBe(false);
    expect(result.isFreePeriod).toBe(false);
    expect(result.disqualificationReason).toContain('Double-Booking Conflict');
  });

  it('prioritizes an available subject specialist in the compatible grade bracket', () => {
    const result = evaluateCandidateTeacher(
      teacher('tch-kor-02'),
      request,
      INITIAL_TEACHER_ATTENDANCE,
    );

    expect(result.isEligible).toBe(true);
    expect(result.matchTier).toBe('Subject Specialist (Priority 1)');
    expect(result.isFreePeriod).toBe(true);
    expect(result.attendanceStatus).toBe('Present');
  });

  it('rejects teachers from incompatible grade brackets', () => {
    const result = evaluateCandidateTeacher(
      teacher('tch-kor-03'),
      request,
      INITIAL_TEACHER_ATTENDANCE,
    );

    expect(result.isEligible).toBe(false);
    expect(result.disqualificationReason).toContain('cannot substitute in Grades 3–5');
  });
});
