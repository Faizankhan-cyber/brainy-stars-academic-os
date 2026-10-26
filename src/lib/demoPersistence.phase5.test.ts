import { describe, expect, it } from 'vitest';
import { DEMO_STORAGE_PREFIX, readDemoValue, writeDemoValue } from './demoPersistence';

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}

describe('Phase 5 demo persistence safeguards', () => {
  it('uses a namespaced key and round-trips a value', () => {
    const storage = createStorage();
    expect(writeDemoValue(storage, 'attendance', [{ teacherId: 't-1', status: 'Present' }])).toBe(true);
    expect(storage.values.has(`${DEMO_STORAGE_PREFIX}attendance`)).toBe(true);
    expect(readDemoValue(storage, 'attendance', [])).toEqual([{ teacherId: 't-1', status: 'Present' }]);
  });

  it('returns the fallback for missing or malformed JSON', () => {
    const fallback = [{ id: 'safe-default' }];
    expect(readDemoValue(createStorage(), 'missing', fallback)).toBe(fallback);
    expect(readDemoValue(createStorage({ [`${DEMO_STORAGE_PREFIX}broken`]: '{not-json' }), 'broken', fallback)).toBe(fallback);
  });

  it('rejects parsed values with an incompatible fallback shape', () => {
    const storage = createStorage({
      [`${DEMO_STORAGE_PREFIX}records`]: JSON.stringify({ unexpected: true }),
      [`${DEMO_STORAGE_PREFIX}count`]: JSON.stringify('not-a-number'),
      [`${DEMO_STORAGE_PREFIX}flag`]: JSON.stringify(1),
    });
    expect(readDemoValue(storage, 'records', [])).toEqual([]);
    expect(readDemoValue(storage, 'count', 0)).toBe(0);
    expect(readDemoValue(storage, 'flag', false)).toBe(false);
  });

  it('fails safely when browser storage is unavailable or full', () => {
    const fallback = { safe: true };
    const brokenStorage = {
      getItem() { throw new Error('storage blocked'); },
      setItem() { throw new Error('quota exceeded'); },
    };
    expect(readDemoValue(brokenStorage, 'x', fallback)).toBe(fallback);
    expect(writeDemoValue(brokenStorage, 'x', { saved: true })).toBe(false);
  });
});
