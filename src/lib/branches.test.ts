import { describe, expect, it } from 'vitest';
import { normalizeBranchCode } from './branches';

describe('normalizeBranchCode', () => {
  it.each([['JAY','JAY'], ['jay','JAY'], [' HBR ','HBR'], ['kor','KOR'], ['HUB','HUB'], ['BNR','JAY'], [' bnr ','JAY']])('normalizes %s to %s', (input, expected) => {
    expect(normalizeBranchCode(input)).toBe(expected);
  });
  it.each([null, undefined, 4, '', 'ALL', 'UNKNOWN', 'JNR'])('rejects unsupported branch input %s', (input) => {
    expect(normalizeBranchCode(input)).toBeNull();
  });
});
