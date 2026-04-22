import test from 'node:test';
import assert from 'node:assert/strict';

import { getToolVisual } from './toolVisual.js';

test('getToolVisual returns glyph fallback when icon is missing', () => {
  const visual = getToolVisual({
    name: 'Adobe InDesign',
    glyph: 'Id',
    glyphBg: '#49021f',
    glyphColor: '#ff3366',
  });

  assert.equal(visual.kind, 'glyph');
  assert.equal(visual.label, 'Id');
  assert.equal(visual.background, '#49021f');
  assert.equal(visual.color, '#ff3366');
});

test('getToolVisual returns image when icon exists', () => {
  const visual = getToolVisual({
    name: 'Figma',
    icon: 'https://skillicons.dev/icons?i=figma',
  });

  assert.equal(visual.kind, 'image');
  assert.equal(visual.src, 'https://skillicons.dev/icons?i=figma');
});
