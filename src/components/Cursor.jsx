import { useEffect, useRef } from 'react';

export default function Cursor() {
  const blobRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const node = blobRef.current;

    if (!node || reduceMotion.matches || coarsePointer.matches) {
      return undefined;
    }

    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    pos.current = center;
    cur.current = center;
    node.style.opacity = '0.9';

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.07;
      cur.current.y += (pos.current.y - cur.current.y) * 0.07;
      node.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 0,
        left: 0,
        top: 0,
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,57,135,0.11) 0%, rgba(242,57,135,0.04) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.3s',
        willChange: 'transform',
      }}
    />
  );
}
