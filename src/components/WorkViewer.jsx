import { useWorkViewer } from '../hooks/useWorkViewer';

export default function WorkViewer({ work, lang, onClose }) {
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
    <div onClick={onClose} className={`work-viewer ${isHtmlViewer ? 'work-viewer--html' : ''}`}>
      <div className="work-viewer-panels" onClick={(event) => event.stopPropagation()}>
        <div className="work-viewer-title-panel">
          <div className="work-viewer-title">{work.title}</div>
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
          <button type="button" className="btn-primary" onClick={onClose}>{labels.close}</button>
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
