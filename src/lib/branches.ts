import type { BranchCode } from '../types/baos';

/** Normalize imported branch identifiers; BNR is a legacy alias for JAY. */
export function normalizeBranchCode(value: unknown): BranchCode | null {
  if (typeof value !== 'string') return null;
  const code = value.trim().toUpperCase();
  if (code === 'BNR') return 'JAY';
  switch (code) {
    case 'JAY': case 'HBR': case 'KOR': case 'HUB': return code;
    default: return null;
  }
}
