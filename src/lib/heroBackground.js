export function getHeroBackgroundTextureStyle() {
  return {
    position: 'absolute',
    inset: '-6% -8% -18% -8%',
    zIndex: 0,
    backgroundImage: [
      'radial-gradient(circle at 22% 20%, rgba(242,57,135,0.035) 0%, transparent 24%)',
      'radial-gradient(circle at 74% 68%, rgba(242,57,135,0.04) 0%, transparent 28%)',
    ].join(', '),
    backgroundBlendMode: 'screen, screen',
    opacity: 0.32,
    pointerEvents: 'none',
  };
}

export function getHeroAmbientWashStyle() {
  return {
    position: 'absolute',
    inset: '-10% -8% -24%',
    zIndex: 0,
    backgroundImage: [
      'radial-gradient(ellipse 86% 62% at 34% 76%, rgba(242,57,135,0.105) 0%, rgba(242,57,135,0.052) 32%, rgba(242,57,135,0.016) 56%, transparent 78%)',
      'radial-gradient(ellipse 70% 54% at 82% 18%, rgba(242,57,135,0.06) 0%, rgba(242,57,135,0.022) 42%, transparent 72%)',
      'linear-gradient(180deg, rgba(242,57,135,0.018) 0%, transparent 34%, rgba(242,57,135,0.024) 100%)',
    ].join(', '),
    opacity: 0.9,
    pointerEvents: 'none',
  };
}
