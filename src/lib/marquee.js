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
  'Creative Coding',
  'Web Design',
  'Interaction Design',
];

export function buildSeamlessMarqueeItems(items) {
  return [...items, ...items];
}

export function getMarqueeCopies({ baseWidth, viewportWidth }) {
  if (!baseWidth || !viewportWidth) {
    return 5;
  }

  return Math.max(5, Math.ceil(viewportWidth / baseWidth) + 4);
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
    borderTop: '1px solid var(--b1)',
    paddingTop: '1.2rem',
    paddingBottom: '0.8rem',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    overflow: 'hidden',
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
    '--marquee-shift': baseWidth ? `${baseWidth}px` : '50%',
    willChange: 'transform',
  };
}

export function getMarqueeItemStyle({ isAccent, isHovered }) {
  return {
    flex: 'none',
    padding: '0.45rem 1rem',
    marginRight: '0.35rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    color: isHovered ? 'var(--acc)' : isAccent ? 'var(--acc)' : 'var(--mut)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderRadius: '999px',
    background: isHovered ? 'linear-gradient(180deg, rgba(242,57,135,0.16) 0%, rgba(242,57,135,0.08) 100%)' : 'transparent',
    boxShadow: 'none',
    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
    transformOrigin: 'center',
    textShadow: isHovered ? '0 0 18px rgba(242,57,135,0.35)' : 'none',
    filter: isHovered ? 'drop-shadow(0 0 10px rgba(242,57,135,0.18))' : 'none',
    willChange: 'transform, color, background, box-shadow',
    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease, background 0.3s ease, text-shadow 0.35s ease, filter 0.35s ease',
  };
}
