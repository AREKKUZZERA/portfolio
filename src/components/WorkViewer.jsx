import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  clampViewerZoom,
  getViewerFitScale,
} from '../lib/workViewer';

const DEFAULT_IMAGE_SIZE = { width: 1600, height: 1000 };

export default function WorkViewer({
  work,
  lang,
  onClose,
}) {
  const viewportRef = useRef(null);
  const imageReadyRef = useRef(false);
  const initializedRef = useRef(false);
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const [viewport, setViewport] = useState(DEFAULT_IMAGE_SIZE);
  const [imageSrc, setImageSrc] = useState(work.image ?? null);
  const [imageLoading, setImageLoading] = useState(!work.image);
  const [zoom, setZoom] = useState(1);

  const labels = useMemo(() => ({
    ru: {
      close: 'Закрыть',
      fit: 'Fit',
      fullscreen: 'Fullscreen',
      zoom: 'Масштаб',
    },
    en: {
      close: 'Close',
      fit: 'Fit',
      fullscreen: 'Fullscreen',
      hint: 'Native scrolling works with wheel, trackpad and scrollbars',
      zoom: 'Zoom',
    },
  })[lang] ?? {
    close: 'Close',
    fit: 'Fit',
    fullscreen: 'Fullscreen',
    hint: 'Native scrolling works with wheel, trackpad and scrollbars',
    zoom: 'Zoom',
  }, [lang]);

  useEffect(() => {
    imageReadyRef.current = false;
    initializedRef.current = false;
  }, [work, imageSrc]);

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
    let cancelled = false;

    if (work.image || !work.imageLoader) {
      return undefined;
    }

    work.imageLoader().then((module) => {
      if (cancelled) return;
      setImageSrc(module.default);
      setImageLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [work]);

  const scrollToTopCenter = (nextZoom, nextImageSize, nextViewport) => {
    const viewportNode = viewportRef.current;
    if (!viewportNode) return;

    requestAnimationFrame(() => {
      const fitScale = getViewerFitScale(nextImageSize, nextViewport);
      const renderedWidth = nextImageSize.width * fitScale * nextZoom;
      const targetLeft = Math.max(0, (renderedWidth - nextViewport.width) / 2);

      viewportNode.scrollTo({
        left: targetLeft,
        top: 0,
        behavior: 'auto',
      });
    });
  };

  const initializeView = useCallback((nextImageSize, nextViewport) => {
    if (initializedRef.current || !imageReadyRef.current) return;
    if (!nextViewport?.width || !nextViewport?.height || !nextImageSize?.width || !nextImageSize?.height) return;

    initializedRef.current = true;
    const fitScale = getViewerFitScale(nextImageSize, nextViewport);
    const coverScale = Math.max(
      nextViewport.width / nextImageSize.width,
      nextViewport.height / nextImageSize.height,
    );
    const nextZoom = clampViewerZoom(coverScale / fitScale);

    setZoom(nextZoom);
    scrollToTopCenter(nextZoom, nextImageSize, nextViewport);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nextViewport = { width: rect.width, height: rect.height };
      setViewport(nextViewport);

      if (imageReadyRef.current) {
        initializeView(imageSize, nextViewport);
      }
    };

    updateViewport();

    if (!viewportRef.current || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }

    const observer = new ResizeObserver(updateViewport);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [imageSize, initializeView]);

  const handleFit = () => {
    setZoom(1);
    scrollToTopCenter(1, imageSize, viewport);
  };

  const handleFullscreen = () => {
    if (!viewport.width || !viewport.height || !imageSize.width || !imageSize.height) return;

    const fitScale = getViewerFitScale(imageSize, viewport);
    const coverScale = Math.max(
      viewport.width / imageSize.width,
      viewport.height / imageSize.height,
    );
    const nextZoom = clampViewerZoom(coverScale / fitScale);

    setZoom(nextZoom);
    scrollToTopCenter(nextZoom, imageSize, viewport);
  };

  const handleStepZoom = (delta) => {
    const nextZoom = clampViewerZoom(zoom + delta);
    setZoom(nextZoom);
  };

  const fitScale = getViewerFitScale(imageSize, viewport);
  const renderedWidth = imageSize.width * fitScale * zoom;
  const renderedHeight = imageSize.height * fitScale * zoom;

  return (
    <div
      onClick={onClose}
      className="work-viewer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 320,
        background: 'rgba(6,6,6,0.94)',
      }}
    >
      <div
        className="work-viewer-panels"
        onClick={(event) => event.stopPropagation()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem',
          flexWrap: 'wrap',
          pointerEvents: 'none',
        }}
      >
        <div className="work-viewer-title-panel" style={{
          maxWidth: 'min(36rem, calc(100% - 1rem))',
          padding: '0.9rem 1rem',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 18,
          background: 'rgba(10,10,10,0.72)',
          boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
          pointerEvents: 'auto',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.15rem, 2.4vw, 2rem)',
            lineHeight: 1.05,
            color: 'var(--txt)',
          }}>{work.title}</div>
          <div style={{
            marginTop: '0.35rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--mut)',
          }}>{labels.hint}</div>
        </div>

        <div className="work-viewer-controls-panel" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          padding: '0.7rem',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 18,
          background: 'rgba(10,10,10,0.72)',
          boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
          pointerEvents: 'auto',
        }}>
          <button type="button" className="btn-ghost" onClick={() => handleStepZoom(0.2)}>+</button>
          <button type="button" className="btn-ghost" onClick={() => handleStepZoom(-0.2)}>-</button>
          <button type="button" className="btn-ghost" onClick={handleFullscreen}>{labels.fullscreen}</button>
          <button type="button" className="btn-ghost" onClick={handleFit}>{labels.fit}</button>
          <div style={{
            minWidth: 96,
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--acc)',
          }}>{labels.zoom}: {Math.round(zoom * 100)}%</div>
          <button type="button" className="btn-primary" onClick={onClose}>{labels.close}</button>
        </div>
      </div>

      <div
        className="work-viewer-scroll"
        ref={viewportRef}
        onClick={(event) => event.stopPropagation()}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'auto',
          overscrollBehavior: 'contain',
          background: 'radial-gradient(circle at top, rgba(242,57,135,0.08), transparent 40%), rgba(12,12,12,0.88)',
          scrollbarGutter: 'stable both-edges',
        }}
      >
        <div
          className="work-viewer-stage"
          style={{
            width: `${Math.max(renderedWidth, viewport.width)}px`,
            minHeight: `${Math.max(renderedHeight, viewport.height)}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '5.5rem',
            paddingBottom: '2rem',
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={work.title}
              draggable={false}
              onLoad={(event) => {
                const nextImageSize = {
                  width: event.currentTarget.naturalWidth,
                  height: event.currentTarget.naturalHeight,
                };
                imageReadyRef.current = true;
                setImageSize(nextImageSize);
                initializeView(nextImageSize, viewport);
              }}
              style={{
                display: 'block',
                width: `${renderedWidth}px`,
                height: `${renderedHeight}px`,
                maxWidth: 'none',
                userSelect: 'none',
                boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
              }}
            />
          ) : null}

          {imageLoading && (
            <div style={{
              position: 'fixed',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              color: 'var(--mut)',
              textTransform: 'uppercase',
            }}>
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
