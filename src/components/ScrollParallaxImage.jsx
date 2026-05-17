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
  const layerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    if (!layer || !canvas) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = canvas.getContext('2d');
    const image = new Image();
    let imageReady = false;
    let rafId = 0;
    let cancelled = false;

    const draw = () => {
      rafId = 0;
      if (!imageReady || cancelled || !context) return;

      const layerRect = layer.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      if (!layerRect.width || !layerRect.height || !canvasRect.width || !canvasRect.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = Math.ceil(canvasRect.width * pixelRatio);
      const canvasHeight = Math.ceil(canvasRect.height * pixelRatio);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = layerRect.top + layerRect.height / 2;
      const progress = (viewportCenter - elementCenter) / viewportHeight;
      const activeProgress = reduceMotion.matches ? 0 : progress;
      const xOffset = activeProgress * xDistance * speed;
      const yOffset = activeProgress * distance * speed;
      const scrollRotate = activeProgress * rotateDistance * speed;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
      context.save();
      context.translate(canvasRect.width / 2 + xOffset, canvasRect.height / 2 + yOffset);
      context.rotate(((rotate + scrollRotate) * Math.PI) / 180);
      context.scale(flipX ? -1 : 1, 1);
      context.drawImage(
        image,
        -layerRect.width / 2,
        -layerRect.height / 2,
        layerRect.width,
        layerRect.height,
      );
      context.restore();
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(draw);
    };

    image.onload = () => {
      if (cancelled) return;
      imageReady = true;
      layer.style.setProperty('--sakura-aspect', `${image.naturalWidth} / ${image.naturalHeight}`);
      requestUpdate();
    };
    image.src = src;

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(layer);

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener?.('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener?.('change', requestUpdate);
      resizeObserver.disconnect();
      cancelled = true;

      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [distance, flipX, rotate, rotateDistance, speed, src, xDistance]);

  return (
    <span
      ref={layerRef}
      aria-hidden={alt ? undefined : true}
      aria-label={alt || undefined}
      className={`sakura-parallax ${className}`.trim()}
      role={alt ? 'img' : undefined}
      style={style}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </span>
  );
}
