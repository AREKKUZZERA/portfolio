import test from 'node:test';
import assert from 'node:assert/strict';

import { getHeroAmbientBlobStyle, getHeroBackgroundTextureStyle } from './heroBackground.js';

test('getHeroBackgroundTextureStyle uses dithered texture to reduce banding', () => {
  const style = getHeroBackgroundTextureStyle();

  assert.match(style.backgroundImage, /repeating-linear-gradient/);
  assert.match(style.backgroundImage, /radial-gradient/);
  assert.equal(style.pointerEvents, 'none');
});

test('getHeroAmbientBlobStyle returns animated pink blob layers', () => {
  const rightBlob = getHeroAmbientBlobStyle('right');
  const leftBlob = getHeroAmbientBlobStyle('left');

  assert.match(rightBlob.backgroundImage, /rgba\(242,57,135/);
  assert.match(leftBlob.backgroundImage, /rgba\(242,57,135/);
  assert.match(rightBlob.animation, /ambient-drift/);
  assert.match(leftBlob.animation, /ambient-drift-reverse/);
});
