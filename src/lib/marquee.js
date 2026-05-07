export const MARQUEE_ITEMS = [
  'Figma',
  'Adobe Photoshop',
  'Illustrator',
  'UI Design',
  'UX Research',
  'Brand Identity',
  'Typography',
  'Motion Design',
  'Design Systems',
  'Wireframing',
  'Prototyping',
  'Visual Identity',
  'Art Direction',
  'Coding',
  'Web Design',
  'Interaction Design',
];

export function buildSeamlessMarqueeItems(items) {
  return [...items, ...items];
}

export function getMarqueeCopies({ baseWidth, viewportWidth }) {
  if (!baseWidth || !viewportWidth) {
    return 3;
  }

  return Math.max(3, Math.ceil(viewportWidth / baseWidth) + 2);
}

export function getMarqueeDuration(baseWidth) {
  if (!baseWidth) {
    return '18s';
  }

  const seconds = Math.max(18, Math.min(40, Math.round(baseWidth / 85)));
  return `${seconds}s`;
}

export function getMarqueeViewportStyle() {
  return {
    marginTop: '6rem',
    paddingTop: '1.2rem',
    paddingBottom: '0.8rem',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    overflow: 'visible',
    position: 'relative',
  };
}

export function getMarqueeTrackStyle(baseWidth) {
  return {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    animationName: 'marquee-scroll',
    animationDuration: getMarqueeDuration(baseWidth),
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: 'running',
    '--marquee-start': baseWidth ? `-${baseWidth}px` : '-50%',
    '--marquee-shift': baseWidth ? `-${baseWidth}px` : '-50%',
    willChange: 'transform',
  };
}

export function getMarqueeItemStyle() {
  return {
    flex: 'none',
    padding: '0.45rem 1rem',
    marginRight: '0.35rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderRadius: '999px',
    transformOrigin: 'center',
    willChange: 'transform, color, background, box-shadow',
  };
}
