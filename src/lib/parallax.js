export function normalizePointerPosition({ clientX, clientY, width, height }) {
  if (!width || !height) {
    return { x: 0, y: 0 };
  }

  const x = ((clientX / width) - 0.5) * 2;
  const y = ((clientY / height) - 0.5) * 2;

  return {
    x: Number(Math.max(-1, Math.min(1, x)).toFixed(4)),
    y: Number(Math.max(-1, Math.min(1, y)).toFixed(4)),
  };
}

export function getParallaxStyle({
  x = 0,
  y = 0,
  z = 0,
  rotate = 0,
  scale = 1,
  transition = 'transform 140ms cubic-bezier(0.22, 1, 0.36, 1)',
} = {}) {
  return {
    transform: `perspective(1400px) translate3d(calc(var(--pointer-x, 0) * ${x}px), calc(var(--pointer-y, 0) * ${y}px), 0) translateZ(calc((var(--pointer-x, 0) * ${z}px) + (var(--pointer-y, 0) * ${z * -0.65}px))) rotateX(calc(var(--pointer-y, 0) * ${rotate}deg)) rotateY(calc(var(--pointer-x, 0) * ${rotate * -1}deg)) scale(${scale})`,
    transformStyle: 'preserve-3d',
    transformOrigin: 'center center',
    willChange: 'transform',
    transition,
  };
}

export function getGridParallaxStyle({ x = 0, y = 0 } = {}) {
  return {
    transform: 'none',
    backgroundPosition: `calc(var(--pointer-x, 0) * ${x}px) calc(var(--pointer-y, 0) * ${y}px), calc(var(--pointer-x, 0) * ${x * 0.6}px) calc(var(--pointer-y, 0) * ${y * 0.6}px)`,
    transition: 'background-position 140ms cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'background-position',
  };
}
