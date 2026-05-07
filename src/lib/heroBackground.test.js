import test from 'node:test';
import assert from 'node:assert/strict';

import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from './heroBackground.js';

test('getHeroBackgroundTextureStyle keeps soft color without diagonal texture', () => {
  const style = getHeroBackgroundTextureStyle();

  assert.match(style.backgroundImage, /radial-gradient/);
  assert.doesNotMatch(style.backgroundImage, /repeating-linear-gradient/);
  assert.equal(style.filter, 'blur(56px)');
  assert.equal(style.pointerEvents, 'none');
});

test('getHeroAmbientWashStyle stays disabled to avoid background artifacts', () => {
  const wash = getHeroAmbientWashStyle();

  assert.equal(wash.backgroundImage, 'none');
  assert.equal(wash.animation, undefined);
  assert.equal(wash.pointerEvents, 'none');
});
