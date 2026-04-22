import { useEffect } from 'react';
import { normalizePointerPosition } from '../lib/parallax';

export function usePointerCssVars() {
  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;
    let nextPosition = { x: 0, y: 0 };

    const flushPointer = () => {
      root.style.setProperty('--pointer-x', String(nextPosition.x));
      root.style.setProperty('--pointer-y', String(nextPosition.y));
      rafId = 0;
    };

    const handlePointerMove = (event) => {
      nextPosition = normalizePointerPosition({
        clientX: event.clientX,
        clientY: event.clientY,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (!rafId) {
        rafId = window.requestAnimationFrame(flushPointer);
      }
    };

    const handlePointerLeave = () => {
      nextPosition = { x: 0, y: 0 };

      if (!rafId) {
        rafId = window.requestAnimationFrame(flushPointer);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);
}
