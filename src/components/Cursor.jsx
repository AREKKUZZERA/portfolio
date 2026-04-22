import { useEffect, useRef } from 'react';

export default function Cursor() {
  const blobRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cur = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.07;
      cur.current.y += (pos.current.y - cur.current.y) * 0.07;
      if (blobRef.current) {
        blobRef.current.style.left = cur.current.x + 'px';
        blobRef.current.style.top  = cur.current.y + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
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
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,57,135,0.11) 0%, rgba(242,57,135,0.04) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(2px)',
        opacity: 0.9,
        transition: 'opacity 0.3s',
      }}
    />
  );
}
