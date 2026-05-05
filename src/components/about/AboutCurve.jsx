import { useEffect, useId, useRef } from 'react';

const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 260;
const EDGE_Y = 76;

function getCurvePath(curveY) {
  return `M 0 ${EDGE_Y} Q ${VIEWBOX_WIDTH / 2} ${curveY} ${VIEWBOX_WIDTH} ${EDGE_Y} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z`;
}

function getCurveLinePath(curveY) {
  return `M 0 ${EDGE_Y} Q ${VIEWBOX_WIDTH / 2} ${curveY} ${VIEWBOX_WIDTH} ${EDGE_Y}`;
}

export default function AboutCurve() {
  const pathRef = useRef(null);
  const lineRef = useRef(null);
  const reactId = useId();
  const gradientId = `about-curve-${reactId.replace(/:/g, '')}`;

  useEffect(() => {
    const path = pathRef.current;
    const line = lineRef.current;
    const section = path?.closest('#about');
    if (!path || !line || !section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;

    const update = () => {
      rafId = 0;

      if (reduceMotion.matches) {
        path.setAttribute('d', getCurvePath(136));
        line.setAttribute('d', getCurveLinePath(136));
        return;
      }

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const range = Math.max(window.innerHeight * 0.62, 1);
      const progress = Math.min(Math.max((start - rect.top) / range, 0), 1);
      const curveY = 214 - progress * 128;

      path.setAttribute('d', getCurvePath(curveY));
      line.setAttribute('d', getCurveLinePath(curveY));
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener?.('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener?.('change', requestUpdate);

      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      className="about-curve"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="100%" stopColor="#181818" />
        </linearGradient>
      </defs>
      <path ref={pathRef} className="about-curve__shape" d={getCurvePath(214)} fill={`url(#${gradientId})`} />
      <path
        ref={lineRef}
        className="about-curve__line"
        d={getCurveLinePath(214)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
