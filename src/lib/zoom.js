export function clampScale(scale, min = 1, max = 4) {
  return Math.min(max, Math.max(min, Number(scale.toFixed(3))));
}

export function clampOffset(offset, scale, viewport) {
  if (scale <= 1) {
    return { x: 0, y: 0 };
  }

  const maxX = ((viewport.width || 0) * (scale - 1)) / 2;
  const maxY = ((viewport.height || 0) * (scale - 1)) / 2;

  return {
    x: Number(Math.max(-maxX, Math.min(maxX, offset.x)).toFixed(3)),
    y: Number(Math.max(-maxY, Math.min(maxY, offset.y)).toFixed(3)),
  };
}

export function applyZoomDelta({ scale, offset, delta, viewport }) {
  const nextScale = clampScale(scale + delta);
  return {
    scale: nextScale,
    offset: clampOffset(offset, nextScale, viewport),
  };
}
