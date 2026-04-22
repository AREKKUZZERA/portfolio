import test from 'node:test';
import assert from 'node:assert/strict';

import { applyZoomDelta, clampOffset, clampScale } from './zoom.js';

test('clampScale keeps zoom in supported range', () => {
  assert.equal(clampScale(0.5), 1);
  assert.equal(clampScale(2.3456), 2.346);
  assert.equal(clampScale(5), 4);
});

test('clampOffset constrains pan to scaled viewport bounds', () => {
  assert.deepEqual(
    clampOffset({ x: 300, y: -240 }, 2, { width: 400, height: 300 }),
    { x: 200, y: -150 },
  );
});

test('applyZoomDelta resets offset when zoom returns to 1', () => {
  assert.deepEqual(
    applyZoomDelta({
      scale: 1.1,
      offset: { x: 30, y: -20 },
      delta: -0.2,
      viewport: { width: 600, height: 420 },
    }),
    { scale: 1, offset: { x: 0, y: 0 } },
  );
});
