import { useEffect, useMemo, useRef, useState } from 'react';
import {
  clampViewerOffset,
  clampViewerZoom,
  getViewerFitScale,
  getViewerNextState,
} from '../lib/workViewer';

const DEFAULT_IMAGE_SIZE = { width: 1600, height: 1000 };

export default function WorkViewer({
  work,
  lang,
  onClose,
}) {
  const viewportRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, offset: { x: 0, y: 0 } });
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const [viewport, setViewport] = useState(DEFAULT_IMAGE_SIZE);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const labels = useMemo(() => ({
    ru: {
      close: 'Закрыть',
      fit: 'Fit',
      native: '100%',
      hint: 'Колесо мыши — масштаб, drag — перемещение, Esc — закрыть',
      zoom: 'Масштаб',
    },
    en: {
      close: 'Close',
      fit: 'Fit',
      native: '100%',
      hint: 'Mouse wheel to zoom, drag to pan, Esc to close',
      zoom: 'Zoom',
    },
  })[lang] ?? {
    close: 'Close',
    fit: 'Fit',
    native: '100%',
    hint: 'Mouse wheel to zoom, drag to pan, Esc to close',
    zoom: 'Zoom',
  }, [lang]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const updateViewport = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;
      setViewport({ width: rect.width, height: rect.height });
    };

    updateViewport();

    if (!viewportRef.current || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }

    const observer = new ResizeObserver(updateViewport);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  const applyState = (nextZoom, nextOffset) => {
    if (!viewport) return;

    setZoom(nextZoom);
    setOffset(clampViewerOffset(nextOffset, nextZoom, imageSize, viewport));
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (!viewport) return;

    const next = getViewerNextState({
      zoom,
      offset,
      delta: event.deltaY < 0 ? 0.18 : -0.18,
      image: imageSize,
      viewport,
    });

    setZoom(next.zoom);
    setOffset(next.offset);
  };

  const handlePointerDown = (event) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      offset,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active || zoom <= 1) return;
    if (!viewport) return;

    setOffset(clampViewerOffset(
      {
        x: dragRef.current.offset.x + (event.clientX - dragRef.current.startX),
        y: dragRef.current.offset.y + (event.clientY - dragRef.current.startY),
      },
      zoom,
      imageSize,
      viewport,
    ));
  };

  const stopDrag = (event) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleFit = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleNative = () => {
    if (!viewport) return;

    const fitScale = getViewerFitScale(imageSize, viewport);
    applyState(clampViewerZoom(1 / fitScale), { x: 0, y: 0 });
  };

  const handleStepZoom = (delta) => {
    if (!viewport) return;

    const next = getViewerNextState({
      zoom,
      offset,
      delta,
      image: imageSize,
      viewport,
    });
    setZoom(next.zoom);
    setOffset(next.offset);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 320,
        background: 'rgba(10,10,10,0.82)',
        backdropFilter: 'blur(18px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.8rem 0 1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1,
            color: 'var(--txt)',
          }}>{work.title}</div>
          <div style={{
            marginTop: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--mut)',
          }}>{labels.hint}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn-ghost" onClick={() => handleStepZoom(0.2)}>+</button>
          <button type="button" className="btn-ghost" onClick={() => handleStepZoom(-0.2)}>-</button>
          <button type="button" className="btn-ghost" onClick={handleNative}>{labels.native}</button>
          <button type="button" className="btn-ghost" onClick={handleFit}>{labels.fit}</button>
          <div style={{
            minWidth: 74,
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--acc)',
          }}>{labels.zoom}: {Math.round(zoom * 100)}%</div>
          <button type="button" className="btn-primary" onClick={onClose}>{labels.close}</button>
        </div>
      </div>

      <div
        ref={viewportRef}
        onClick={(event) => event.stopPropagation()}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onDoubleClick={handleFit}
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'radial-gradient(circle at top, rgba(242,57,135,0.08), transparent 40%), rgba(12,12,12,0.88)',
          touchAction: 'none',
          cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        <img
          src={work.image}
          alt={work.title}
          draggable={false}
          onLoad={(event) => {
            setImageSize({
              width: event.currentTarget.naturalWidth,
              height: event.currentTarget.naturalHeight,
            });
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            maxWidth: 'none',
            width: `${imageSize.width * getViewerFitScale(imageSize, viewport) * zoom}px`,
            height: 'auto',
            transform: `translate3d(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px), 0)`,
            transition: dragging ? 'none' : 'transform 140ms ease-out, width 140ms ease-out',
            userSelect: 'none',
            pointerEvents: 'none',
            boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
          }}
        />
      </div>
    </div>
  );
}
