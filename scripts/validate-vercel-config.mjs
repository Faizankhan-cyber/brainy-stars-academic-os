import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
assert.ok(Array.isArray(config.headers), 'Vercel headers must be an array');
const allHeaders = config.headers.flatMap((rule) => rule.headers ?? []);
const headerMap = new Map(allHeaders.map(({ key, value }) => [key.toLowerCase(), value]));

for (const name of [
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
  'strict-transport-security',
  'content-security-policy',
  'x-robots-tag',
]) {
  assert.ok(headerMap.has(name), `Missing required security header: ${name}`);
}

assert.equal(headerMap.get('x-content-type-options'), 'nosniff');
assert.equal(headerMap.get('x-frame-options'), 'DENY');
assert.match(headerMap.get('content-security-policy'), /default-src 'self'/);
assert.match(headerMap.get('content-security-policy'), /frame-ancestors 'none'/);
assert.match(headerMap.get('x-robots-tag'), /noindex/);
console.log(`Validated ${headerMap.size} baseline security headers.`);
