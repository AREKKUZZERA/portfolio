import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  clampViewerZoom,
  getWorkViewerKind,
  getViewerFitScale,
} from '../lib/workViewer';

const DEFAULT_IMAGE_SIZE = { width: 1600, height: 1000 };
const FRAME_VIEWPORT_LOCK_STYLE_ID = 'work-viewer-viewport-lock';
const FRAME_HEIGHT_PROPERTIES = ['height', 'min-height', 'max-height'];

const LABELS = {
  ru: {
    close: 'Закрыть',
    fit: 'Fit',
    fullscreen: 'Fullscreen',
    hint: 'Нативная прокрутка работает колесом, трекпадом и scrollbar',
    zoom: 'Масштаб',
  },
  en: {
    close: 'Close',
    fit: 'Fit',
    fullscreen: 'Fullscreen',
    hint: 'Native scrolling works with wheel, trackpad and scrollbars',
    zoom: 'Zoom',
  },
};

function getHtmlFrameViewportHeight(viewportHeight) {
  return Math.max((viewportHeight ?? 0) - 112, 520);
}

function replaceViewportHeightUnits(value, viewportHeight) {
  return value.replace(/(-?\d*\.?\d+)vh\b/g, (_, rawValue) => (
    `${Number((Number(rawValue) * viewportHeight / 100).toFixed(3))}px`
  ));
}

function collectFrameViewportHeightRules(rules, viewportHeight) {
  return [...rules].flatMap((rule) => {
    if ('cssRules' in rule) {
      const nestedRules = collectFrameViewportHeightRules(rule.cssRules, viewportHeight).join('');
      return nestedRules ? [`${rule.conditionText ? `@media ${rule.conditionText}` : rule.cssText.split('{')[0]}{${nestedRules}}`] : [];
    }

    if (!rule.selectorText || !rule.style) return [];

    const declarations = FRAME_HEIGHT_PROPERTIES
      .map((property) => {
        const value = rule.style.getPropertyValue(property);
        if (!value.includes('vh')) return null;
        return `${property}:${replaceViewportHeightUnits(value, viewportHeight)} !important;`;
      })
      .filter(Boolean)
      .join('');

    return declarations ? [`${rule.selectorText}{${declarations}}`] : [];
  });
}

function lockFrameViewportHeight(frameDocument, viewportHeight) {
  const previousStyle = frameDocument.getElementById(FRAME_VIEWPORT_LOCK_STYLE_ID);
  previousStyle?.remove();

  const rules = [...frameDocument.styleSheets].flatMap((styleSheet) => {
    try {
      return collectFrameViewportHeightRules(styleSheet.cssRules, viewportHeight);
    } catch {
      return [];
    }
  });

  if (!rules.length) return;

  const style = frameDocument.createElement('style');
  style.id = FRAME_VIEWPORT_LOCK_STYLE_ID;
  style.textContent = rules.join('');
  frameDocument.head.append(style);
}

export function useWorkViewer({ work, lang, onClose }) {
  const viewportRef = useRef(null);
  const frameRef = useRef(null);
  const imageReadyRef = useRef(false);
  const initializedRef = useRef(false);
  const viewerKind = getWorkViewerKind(work);
  const isHtmlViewer = viewerKind === 'html';
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const [viewport, setViewport] = useState(DEFAULT_IMAGE_SIZE);
  const [imageSrc, setImageSrc] = useState(work.image ?? null);
  const [imageLoading, setImageLoading] = useState(viewerKind === 'image' && !work.image);
  const [htmlStageHeight, setHtmlStageHeight] = useState(DEFAULT_IMAGE_SIZE.height);
  const [zoom, setZoom] = useState(1);

  const labels = useMemo(() => LABELS[lang] ?? LABELS.en, [lang]);

  useEffect(() => {
    imageReadyRef.current = isHtmlViewer;
    initializedRef.current = false;
  }, [work, imageSrc, isHtmlViewer]);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const updateFrameHeight = useCallback(() => {
    if (!isHtmlViewer || !frameRef.current) return;

    const frameDocument = frameRef.current.contentDocument;
    if (!frameDocument) return;

    frameDocument.documentElement.style.overflow = 'hidden';
    frameDocument.body.style.overflow = 'hidden';
    lockFrameViewportHeight(frameDocument, getHtmlFrameViewportHeight(viewport.height));

    const nextHeight = Math.max(
      frameDocument.documentElement.scrollHeight,
      frameDocument.body.scrollHeight,
      getHtmlFrameViewportHeight(viewport.height),
      520,
    );

    setHtmlStageHeight(nextHeight);
  }, [isHtmlViewer, viewport.height]);

  useEffect(() => {
    let cancelled = false;

    if (isHtmlViewer || work.image || !work.imageLoader) {
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
  }, [work, isHtmlViewer]);

  const scrollToTopCenter = useCallback((nextZoom, nextImageSize, nextViewport) => {
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
  }, []);

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
  }, [scrollToTopCenter]);

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

  useEffect(() => {
    updateFrameHeight();
  }, [updateFrameHeight]);

  const handleFit = () => {
    if (isHtmlViewer) return;
    setZoom(1);
    scrollToTopCenter(1, imageSize, viewport);
  };

  const handleFullscreen = () => {
    if (isHtmlViewer) return;
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
    if (isHtmlViewer) return;
    const nextZoom = clampViewerZoom(zoom + delta);
    setZoom(nextZoom);
  };

  const fitScale = getViewerFitScale(imageSize, viewport);
  const renderedWidth = imageSize.width * fitScale * zoom;
  const renderedHeight = imageSize.height * fitScale * zoom;
  const handleImageLoad = (event) => {
    const nextImageSize = {
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    };
    imageReadyRef.current = true;
    setImageSize(nextImageSize);
    initializeView(nextImageSize, viewport);
  };

  const handleFrameLoad = () => {
    updateFrameHeight();
  };

  return {
    frameRef,
    handleFit,
    handleFrameLoad,
    handleFullscreen,
    handleImageLoad,
    handleStepZoom,
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
  };
}
