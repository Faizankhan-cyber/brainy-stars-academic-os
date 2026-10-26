export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const DEMO_STORAGE_PREFIX = 'bsaos:demo:v1:';

export function readDemoValue<T>(storage: StorageLike, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(DEMO_STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    if (fallback !== null && typeof fallback === 'object' && !Array.isArray(fallback) &&
      (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed))) return fallback;
    if (typeof fallback === 'string' && typeof parsed !== 'string') return fallback;
    if (typeof fallback === 'number' && typeof parsed !== 'number') return fallback;
    if (typeof fallback === 'boolean' && typeof parsed !== 'boolean') return fallback;
    return parsed as T;
  } catch { return fallback; }
}

export function writeDemoValue(storage: StorageLike, key: string, value: unknown): boolean {
  try { storage.setItem(DEMO_STORAGE_PREFIX + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
