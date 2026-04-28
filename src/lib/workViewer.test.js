import test from 'node:test';
import assert from 'node:assert/strict';

import {
  clampViewerOffset,
  getWorkViewerKind,
  getViewerFitScale,
  getViewerNextState,
} from './workViewer.js';

test('getViewerFitScale fits large image into viewport', () => {
  assert.equal(
    getViewerFitScale(
      { width: 2400, height: 1600 },
      { width: 1200, height: 900 },
    ),
    0.5,
  );
});

test('clampViewerOffset locks axis when scaled image does not overflow', () => {
  assert.deepEqual(
    clampViewerOffset(
      { x: 400, y: -300 },
      1.2,
      { width: 1000, height: 1000 },
      { width: 1600, height: 900 },
    ),
    { x: 0, y: -90 },
  );
});

test('getViewerNextState clamps zoom and offset together', () => {
  assert.deepEqual(
    getViewerNextState({
      zoom: 3.9,
      offset: { x: 2500, y: 2500 },
      delta: 1,
      image: { width: 1600, height: 900 },
      viewport: { width: 1200, height: 700 },
    }),
    { zoom: 4, offset: { x: 1800, y: 1000 } },
  );
});

test('getWorkViewerKind selects html viewer when htmlUrl is present', () => {
  assert.equal(getWorkViewerKind({ htmlUrl: '/assets/case.html' }), 'html');
  assert.equal(getWorkViewerKind({ imageLoader: () => Promise.resolve() }), 'image');
});
