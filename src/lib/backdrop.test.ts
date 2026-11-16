import test from 'node:test';
import assert from 'node:assert/strict';
import { computeBackdropState, type ChapterBounds } from './backdrop';

const CHAPTERS: ChapterBounds[] = [
  { id: 'top', top: 0, height: 1000 },
  { id: 'trajectory', top: 1000, height: 1200 },
  { id: 'publications', top: 2200, height: 1400 },
  { id: 'projects', top: 3600, height: 1200 },
];

test('computeBackdropState selects active chapter and keeps weights normalized to 1', () => {
  const atStart = computeBackdropState(0, 900, CHAPTERS);
  assert.equal(atStart.activeIndex, 0);
  const sumStart = atStart.weights.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sumStart - 1) < 1e-6);

  const inPubs = computeBackdropState(2300, 900, CHAPTERS);
  assert.equal(inPubs.activeIndex, 2);
  const sumPubs = inPubs.weights.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sumPubs - 1) < 1e-6);
});

test('computeBackdropState emits transitionPulse near chapter boundaries and decays away from boundaries', () => {
  const vh = 800;
  // probeY = scrollY + 0.45 * 800 = scrollY + 360
  // Inside chapter 0 well before blendBand
  const steady = computeBackdropState(0, vh, CHAPTERS);
  assert.equal(steady.transitionPulse, 0);

  // Near boundary top=1000 (blendBand = 360 -> mid crossfade when probeY = 820 -> scrollY = 460)
  const crossing = computeBackdropState(460, vh, CHAPTERS);
  assert.ok(crossing.transitionPulse > 0.85, `Expected strong pulse at boundary, got ${crossing.transitionPulse}`);
  assert.ok(crossing.weights[0] > 0 && crossing.weights[1] > 0);
});
