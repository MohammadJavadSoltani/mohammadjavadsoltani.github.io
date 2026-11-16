import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, easeOutCubic, lerp, range, smoothstep } from './math';

test('clamp constrains values between bounds', () => {
  assert.equal(clamp(-0.5), 0);
  assert.equal(clamp(0.42), 0.42);
  assert.equal(clamp(1.7), 1);
  assert.equal(clamp(12, 0, 10), 10);
});

test('lerp and range interpolate and normalize intervals cleanly', () => {
  assert.equal(lerp(10, 20, 0.25), 12.5);
  assert.equal(range(0.5, 0.25, 0.75), 0.5);
  assert.equal(range(0.1, 0.25, 0.75), 0);
  assert.equal(range(0.95, 0.25, 0.75), 1);
});

test('easing functions preserve boundary invariants', () => {
  assert.equal(smoothstep(0), 0);
  assert.equal(smoothstep(1), 1);
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
  assert.ok(easeOutCubic(0.5) > 0.5);
});
