export function clampViewerZoom(zoom, min = 1, max = 4) {
  return Math.min(max, Math.max(min, Number(zoom.toFixed(3))));
}

export function getViewerFitScale(image, viewport) {
  if (!image?.width || !image?.height || !viewport?.width || !viewport?.height) {
    return 1;
  }

  return Number(
    Math.min(viewport.width / image.width, viewport.height / image.height).toFixed(4),
  );
}

export function clampViewerOffset(offset, zoom, image, viewport) {
  if (!image?.width || !image?.height || !viewport?.width || !viewport?.height) {
    return { x: 0, y: 0 };
  }

  const fitScale = getViewerFitScale(image, viewport);
  const renderedWidth = image.width * fitScale * zoom;
  const renderedHeight = image.height * fitScale * zoom;
  const maxX = Math.max(0, (renderedWidth - viewport.width) / 2);
  const maxY = Math.max(0, (renderedHeight - viewport.height) / 2);

  return {
    x: Number(Math.max(-maxX, Math.min(maxX, offset.x)).toFixed(3)),
    y: Number(Math.max(-maxY, Math.min(maxY, offset.y)).toFixed(3)),
  };
}

export function getViewerOffsetForPointZoom({
  zoom,
  nextZoom,
  offset,
  point,
  viewport,
  image,
}) {
  if (!viewport?.width || !viewport?.height || !point || !image?.width || !image?.height) {
    return { x: 0, y: 0 };
  }

  const centerX = viewport.width / 2;
  const centerY = viewport.height / 2;
  const ratio = nextZoom / zoom;
  const localX = point.x - centerX;
  const localY = point.y - centerY;

  return clampViewerOffset(
    {
      x: offset.x * ratio + localX * (1 - ratio),
      y: offset.y * ratio + localY * (1 - ratio),
    },
    nextZoom,
    image,
    viewport,
  );
}

export function getViewerNextState({
  zoom,
  offset,
  delta,
  image,
  viewport,
}) {
  const nextZoom = clampViewerZoom(zoom + delta);

  return {
    zoom: nextZoom,
    offset: clampViewerOffset(offset, nextZoom, image, viewport),
  };
}
