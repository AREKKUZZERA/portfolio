import { useEffect, useRef } from 'react';

export default function ScrollParallaxImage({
  src,
  alt = '',
  className = '',
  speed = 0.08,
  distance = 120,
  xDistance = 0,
  rotateDistance = 0,
  rotate = 0,
  flipX = false,
  style,
}) {
  const imageRef = useRef(null);

  useEffect(() => {
    const node = imageRef.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;

    const update = () => {
      rafId = 0;

      if (reduceMotion.matches) {
        node.style.setProperty('--sakura-x', '0px');
        node.style.setProperty('--sakura-y', '0px');
        node.style.setProperty('--sakura-scroll-rotate', '0deg');
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const progress = (viewportCenter - elementCenter) / viewportHeight;
      const yOffset = progress * distance * speed;
      const xOffset = progress * xDistance * speed;
      const scrollRotate = progress * rotateDistance * speed;

      node.style.setProperty('--sakura-x', `${xOffset.toFixed(2)}px`);
      node.style.setProperty('--sakura-y', `${yOffset.toFixed(2)}px`);
      node.style.setProperty('--sakura-scroll-rotate', `${scrollRotate.toFixed(2)}deg`);
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
  }, [distance, rotateDistance, speed, xDistance]);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={`sakura-parallax ${className}`.trim()}
      loading="lazy"
      decoding="async"
      style={{
        '--sakura-rotate': `${rotate}deg`,
        '--sakura-scale-x': flipX ? -1 : 1,
        ...style,
      }}
    />
  );
}
