import test from 'node:test';
import assert from 'node:assert/strict';

import { getGridParallaxStyle, getParallaxStyle, normalizePointerPosition } from './parallax.js';

test('normalizePointerPosition maps viewport center to zero', () => {
  assert.deepEqual(
    normalizePointerPosition({ clientX: 500, clientY: 400, width: 1000, height: 800 }),
    { x: 0, y: 0 },
  );
});

test('normalizePointerPosition clamps to viewport edges', () => {
  assert.deepEqual(
    normalizePointerPosition({ clientX: 2000, clientY: -200, width: 1000, height: 800 }),
    { x: 1, y: -1 },
  );
});

test('getParallaxStyle builds transform from pointer css vars', () => {
  const style = getParallaxStyle({ x: 18, y: 12, z: 10, rotate: 2, scale: 1.02 });

  assert.match(style.transform, /perspective\(1400px\)/);
  assert.match(style.transform, /var\(--pointer-x, 0\) \* 18px/);
  assert.match(style.transform, /var\(--pointer-y, 0\) \* 12px/);
  assert.match(style.transform, /translateZ/);
  assert.match(style.transform, /rotateX/);
  assert.match(style.transform, /scale\(1.02\)/);
});

test('getGridParallaxStyle offsets background without 3d transform artifacts', () => {
  const style = getGridParallaxStyle({ x: 12, y: 8 });

  assert.equal(style.transform, 'none');
  assert.match(style.backgroundPosition, /var\(--pointer-x, 0\) \* 12px/);
  assert.match(style.backgroundPosition, /var\(--pointer-y, 0\) \* 8px/);
});
