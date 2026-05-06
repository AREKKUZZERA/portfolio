import test from 'node:test';
import assert from 'node:assert/strict';

import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from './heroBackground.js';

test('getHeroBackgroundTextureStyle keeps soft color without diagonal texture', () => {
  const style = getHeroBackgroundTextureStyle();

  assert.match(style.backgroundImage, /radial-gradient/);
  assert.doesNotMatch(style.backgroundImage, /repeating-linear-gradient/);
  assert.equal(style.pointerEvents, 'none');
});

test('getHeroAmbientWashStyle returns static pink wash layers', () => {
  const wash = getHeroAmbientWashStyle();

  assert.match(wash.backgroundImage, /rgba\(242,57,135/);
  assert.match(wash.backgroundImage, /ellipse/);
  assert.equal(wash.animation, undefined);
  assert.equal(wash.pointerEvents, 'none');
});
