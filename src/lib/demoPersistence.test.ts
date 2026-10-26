import { describe, expect, it } from 'vitest';
import { DEMO_STORAGE_PREFIX, readDemoValue, writeDemoValue, type StorageLike } from './demoPersistence';

function createStorage(initial: Record<string, string> = {}): StorageLike {
  const values = new Map(Object.entries(initial));
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
}

describe('demo state persistence', () => {
  it('uses the fallback when no saved value exists', () => {
    expect(readDemoValue(createStorage(), 'teachers', [{ id: 'demo' }])).toEqual([{ id: 'demo' }]);
  });
  it('round-trips saved values under a versioned namespace', () => {
    const storage = createStorage();
    expect(writeDemoValue(storage, 'teachers', [{ id: 't-1', name: 'Sample Teacher' }])).toBe(true);
    expect(storage.getItem(DEMO_STORAGE_PREFIX + 'teachers')).toContain('Sample Teacher');
    expect(readDemoValue(storage, 'teachers', [])).toEqual([{ id: 't-1', name: 'Sample Teacher' }]);
  });
  it('falls back for malformed JSON or an unexpected array shape', () => {
    const storage = createStorage({ [DEMO_STORAGE_PREFIX + 'teachers']: '{bad json', [DEMO_STORAGE_PREFIX + 'attendance']: JSON.stringify({ id: 'wrong-shape' }) });
    expect(readDemoValue(storage, 'teachers', [{ id: 'fallback' }])).toEqual([{ id: 'fallback' }]);
    expect(readDemoValue(storage, 'attendance', [])).toEqual([]);
  });
  it('handles storage failures without throwing', () => {
    const blocked: StorageLike = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
    expect(readDemoValue(blocked, 'key', 'safe')).toBe('safe');
    expect(writeDemoValue(blocked, 'key', 'value')).toBe(false);
  });
});
