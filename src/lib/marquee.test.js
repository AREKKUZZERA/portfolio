import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildSeamlessMarqueeItems,
  getMarqueeCopies,
  getMarqueeDuration,
  getMarqueeItemStyle,
  getMarqueeTrackStyle,
  getMarqueeViewportStyle,
  MARQUEE_ITEMS,
} from './marquee.js';

test('buildSeamlessMarqueeItems returns two identical halves', () => {
  const items = buildSeamlessMarqueeItems(MARQUEE_ITEMS);
  const half = items.length / 2;

  assert.ok(MARQUEE_ITEMS.length >= 14);
  assert.equal(items.length, MARQUEE_ITEMS.length * 2);
  assert.deepEqual(items.slice(0, half), items.slice(half));
});

test('getMarqueeCopies adds enough copies to cover viewport with buffer', () => {
  assert.equal(getMarqueeCopies({ baseWidth: 700, viewportWidth: 1100 }), 4);
  assert.equal(getMarqueeCopies({ baseWidth: 1600, viewportWidth: 1100 }), 3);
  assert.equal(getMarqueeCopies({ baseWidth: 0, viewportWidth: 1100 }), 3);
});

test('getMarqueeTrackStyle uses measured distance for seamless loop', () => {
  const style = getMarqueeTrackStyle(1280);

  assert.equal(style.animationName, 'marquee-scroll');
  assert.equal(style['--marquee-shift'], '-1280px');
  assert.equal(style.animationPlayState, 'running');
});

test('getMarqueeDuration clamps to a usable range', () => {
  assert.equal(getMarqueeDuration(0), '18s');
  assert.equal(getMarqueeDuration(600), '18s');
  assert.equal(getMarqueeDuration(2400), '28s');
  assert.equal(getMarqueeDuration(6000), '40s');
});

test('getMarqueeItemStyle highlights and enlarges hovered item', () => {
  const baseStyle = getMarqueeItemStyle({ isAccent: false, isHovered: false });
  const hoveredStyle = getMarqueeItemStyle({ isAccent: false, isHovered: true });

  assert.equal(baseStyle.transform, 'scale(1)');
  assert.equal(baseStyle.color, 'var(--mut)');
  assert.equal(hoveredStyle.transform, 'scale(1.06)');
  assert.equal(hoveredStyle.color, 'var(--acc)');
  assert.equal(hoveredStyle.boxShadow, 'none');
  assert.match(hoveredStyle.textShadow, /rgba\(242,57,135,0.35\)/);
  assert.match(hoveredStyle.transition, /cubic-bezier/);
});

test('getMarqueeViewportStyle allows hover glow to extend outside strip', () => {
  const viewportStyle = getMarqueeViewportStyle();

  assert.equal(viewportStyle.overflow, 'visible');
  assert.equal(viewportStyle.paddingTop, '1.2rem');
  assert.equal(viewportStyle.paddingBottom, '0.8rem');
});
