export function getToolVisual(tool) {
  if (tool.icon) {
    return {
      kind: 'image',
      src: tool.icon,
      alt: tool.name,
    };
  }

  return {
    kind: 'glyph',
    label: tool.glyph ?? tool.name.slice(0, 2),
    background: tool.glyphBg ?? 'var(--s3)',
    color: tool.glyphColor ?? 'var(--txt)',
  };
}
