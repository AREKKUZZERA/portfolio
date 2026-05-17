import { useEffect, useRef } from 'react';
import { normalizePointerPosition } from '../../lib/parallax';

const PARALLAX_X = 18;
const PARALLAX_Y = 12;

function getPixelValue(styles, name, fallback) {
  const value = Number.parseFloat(styles.getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

function drawRepeatingLines(context, { width, height, spacing, offsetX, offsetY, color }) {
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.beginPath();

  const startX = (((offsetX % spacing) + spacing) % spacing) - spacing;
  const startY = (((offsetY % spacing) + spacing) % spacing) - spacing;

  for (let x = startX; x < width + spacing; x += spacing) {
    const crispX = Math.round(x) + 0.5;
    context.moveTo(crispX, 0);
    context.lineTo(crispX, height);
  }

  for (let y = startY; y < height + spacing; y += spacing) {
    const crispY = Math.round(y) + 0.5;
    context.moveTo(0, crispY);
    context.lineTo(width, crispY);
  }

  context.stroke();
}

export default function HeroCanvasGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest('.hero-section');
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    let rafId = 0;
    let pointer = { x: 0, y: 0 };

    const draw = () => {
      rafId = 0;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = Math.ceil(rect.width * pixelRatio);
      const canvasHeight = Math.ceil(rect.height * pixelRatio);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const styles = window.getComputedStyle(hero);
      const minor = getPixelValue(styles, '--hero-grid-minor', 76);
      const major = getPixelValue(styles, '--hero-grid-major', 380);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const activePointer = reduceMotion.matches || coarsePointer.matches ? { x: 0, y: 0 } : pointer;
      const shiftX = activePointer.x * PARALLAX_X;
      const shiftY = activePointer.y * PARALLAX_Y;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);

      context.save();
      context.translate(shiftX, shiftY);
      drawRepeatingLines(context, {
        width: rect.width,
        height: rect.height,
        spacing: minor,
        offsetX: centerX + minor / 2,
        offsetY: centerY + minor / 2,
        color: 'rgba(255,255,255,0.065)',
      });
      drawRepeatingLines(context, {
        width: rect.width,
        height: rect.height,
        spacing: major,
        offsetX: centerX + major / 2,
        offsetY: centerY + major / 2,
        color: 'rgba(255,255,255,0.09)',
      });
      context.restore();

      context.globalCompositeOperation = 'destination-in';
      const mask = context.createRadialGradient(
        rect.width * 0.52,
        rect.height * 0.46,
        0,
        rect.width * 0.52,
        rect.height * 0.46,
        Math.max(rect.width, rect.height) * 0.58,
      );
      mask.addColorStop(0, 'rgba(0,0,0,1)');
      mask.addColorStop(0.76, 'rgba(0,0,0,1)');
      mask.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = mask;
      context.fillRect(0, 0, rect.width, rect.height);
      context.globalCompositeOperation = 'source-over';
    };

    const requestDraw = () => {
      if (!rafId) rafId = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      pointer = normalizePointerPosition({
        clientX: event.clientX,
        clientY: event.clientY,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      requestDraw();
    };

    const handlePointerLeave = () => {
      pointer = { x: 0, y: 0 };
      requestDraw();
    };

    const resizeObserver = new ResizeObserver(requestDraw);
    resizeObserver.observe(canvas);
    requestDraw();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', requestDraw);
    reduceMotion.addEventListener?.('change', requestDraw);
    coarsePointer.addEventListener?.('change', requestDraw);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', requestDraw);
      reduceMotion.removeEventListener?.('change', requestDraw);
      coarsePointer.removeEventListener?.('change', requestDraw);

      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas className="hero-grid-canvas" ref={canvasRef} aria-hidden="true" />;
}
