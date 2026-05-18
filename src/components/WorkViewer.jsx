import { useEffect, useRef } from 'react';
import { useWorkViewer } from '../hooks/useWorkViewer';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function WorkViewer({ work, lang, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const {
    handleFit,
    handleFrameLoad,
    handleFullscreen,
    handleImageLoad,
    handleStepZoom,
    frameRef,
    htmlStageHeight,
    imageLoading,
    imageSrc,
    isHtmlViewer,
    labels,
    renderedHeight,
    renderedWidth,
    viewport,
    viewportRef,
    zoom,
  } = useWorkViewer({ work, lang, onClose });

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const focusTarget = closeButtonRef.current ?? dialogRef.current;

    focusTarget?.focus({ preventScroll: true });

    return () => {
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus({ preventScroll: true });
      }
    };
  }, []);

  const handleDialogKeyDown = (event) => {
    if (event.key !== 'Tab') return;

    const focusableElements = [...dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []]
      .filter((element) => element.offsetParent !== null);

    if (!focusableElements.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const stageStyle = {
    '--stage-width': isHtmlViewer ? '100%' : `${Math.max(renderedWidth, viewport.width)}px`,
    '--stage-min-height': isHtmlViewer ? `${viewport.height}px` : `${Math.max(renderedHeight, viewport.height)}px`,
  };
  const mediaStyle = {
    '--media-width': `${renderedWidth}px`,
    '--media-height': `${renderedHeight}px`,
    '--html-height': `${htmlStageHeight}px`,
  };

  return (
    <div
      ref={dialogRef}
      onClick={onClose}
      onKeyDown={handleDialogKeyDown}
      className={`work-viewer ${isHtmlViewer ? 'work-viewer--html' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-viewer-title"
      tabIndex={-1}
    >
      <div className="work-viewer-panels" onClick={(event) => event.stopPropagation()}>
        <div className="work-viewer-title-panel">
          <div id="work-viewer-title" className="work-viewer-title">{work.title}</div>
          <div className="work-viewer-hint">{labels.hint}</div>
        </div>

        <div className="work-viewer-controls-panel">
          {!isHtmlViewer && (
            <>
              <button type="button" className="btn-ghost" onClick={() => handleStepZoom(0.2)}>+</button>
              <button type="button" className="btn-ghost" onClick={() => handleStepZoom(-0.2)}>-</button>
              <button type="button" className="btn-ghost" onClick={handleFullscreen}>{labels.fullscreen}</button>
              <button type="button" className="btn-ghost" onClick={handleFit}>{labels.fit}</button>
              <div className="work-viewer-zoom">{labels.zoom}: {Math.round(zoom * 100)}%</div>
            </>
          )}
          <button ref={closeButtonRef} type="button" className="btn-primary" onClick={onClose}>{labels.close}</button>
        </div>
      </div>

      <div
        className={`work-viewer-scroll ${isHtmlViewer ? 'work-viewer-scroll--html' : ''}`}
        ref={viewportRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="work-viewer-stage" style={stageStyle}>
          {isHtmlViewer ? (
            <iframe
              ref={frameRef}
              src={work.htmlUrl}
              title={work.title}
              className="work-viewer-frame"
              style={mediaStyle}
              onLoad={handleFrameLoad}
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={work.title}
              draggable={false}
              onLoad={handleImageLoad}
              className="work-viewer-image"
              style={mediaStyle}
            />
          ) : null}

          {imageLoading && <div className="work-viewer-loading">Loading...</div>}
        </div>
      </div>
    </div>
  );
}
