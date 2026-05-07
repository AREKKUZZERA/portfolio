export function getHeroBackgroundTextureStyle() {
  return {
    position: 'absolute',
    inset: '-14% -10%',
    zIndex: 0,
    backgroundImage: [
      'radial-gradient(closest-side at 18% 18%, rgba(242,57,135,0.14), rgba(242,57,135,0.055) 42%, transparent 100%)',
      'radial-gradient(closest-side at 88% 12%, rgba(242,57,135,0.11), rgba(242,57,135,0.042) 44%, transparent 100%)',
      'radial-gradient(closest-side at 28% 92%, rgba(242,57,135,0.09), rgba(242,57,135,0.034) 46%, transparent 100%)',
    ].join(', '),
    filter: 'blur(56px)',
    opacity: 0.58,
    pointerEvents: 'none',
  };
}

export function getHeroAmbientWashStyle() {
  return {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    backgroundImage: 'none',
    pointerEvents: 'none',
  };
}
