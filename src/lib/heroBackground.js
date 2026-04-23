export function getHeroBackgroundTextureStyle() {
  return {
    position: 'absolute',
    inset: '-6% -8% -18% -8%',
    zIndex: 0,
    backgroundImage: [
      'radial-gradient(circle at 22% 20%, rgba(242,57,135,0.035) 0%, transparent 24%)',
      'radial-gradient(circle at 74% 68%, rgba(242,57,135,0.04) 0%, transparent 28%)',
      'repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 4px)',
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.008) 0 1px, transparent 1px 5px)',
    ].join(', '),
    backgroundBlendMode: 'screen, screen, normal, normal',
    opacity: 0.32,
    pointerEvents: 'none',
  };
}

export function getHeroAmbientBlobStyle(side) {
  if (side === 'left') {
    return {
      position: 'absolute',
      left: '-18%',
      bottom: '-26%',
      width: 980,
      height: 980,
      zIndex: 0,
      borderRadius: '50%',
      backgroundImage: [
        'radial-gradient(circle at 62% 42%, rgba(242,57,135,0.14) 0%, rgba(242,57,135,0.085) 16%, rgba(242,57,135,0.03) 34%, transparent 62%)',
        'radial-gradient(circle at 34% 68%, rgba(242,57,135,0.08) 0%, rgba(242,57,135,0.018) 28%, transparent 58%)',
      ].join(', '),
      mixBlendMode: 'screen',
      opacity: 0.78,
      animation: 'ambient-drift-reverse 28s ease-in-out infinite alternate',
      pointerEvents: 'none',
    };
  }

  return {
    position: 'absolute',
    top: '-14%',
    right: '-16%',
    width: 900,
    height: 900,
    zIndex: 0,
    borderRadius: '50%',
    backgroundImage: [
      'radial-gradient(circle at 38% 38%, rgba(242,57,135,0.14) 0%, rgba(242,57,135,0.075) 18%, rgba(242,57,135,0.026) 36%, transparent 64%)',
      'radial-gradient(circle at 68% 56%, rgba(242,57,135,0.06) 0%, rgba(242,57,135,0.012) 24%, transparent 52%)',
    ].join(', '),
    mixBlendMode: 'screen',
    opacity: 0.72,
    animation: 'ambient-drift 24s ease-in-out infinite alternate',
    pointerEvents: 'none',
  };
}
