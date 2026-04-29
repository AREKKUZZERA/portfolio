import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  clampViewerZoom,
  getWorkViewerKind,
  getViewerFitScale,
} from '../lib/workViewer';

const DEFAULT_IMAGE_SIZE = { width: 1600, height: 1000 };

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

export function useWorkViewer({ work, lang, onClose }) {
  const viewportRef = useRef(null);
  const imageReadyRef = useRef(false);
  const initializedRef = useRef(false);
  const viewerKind = getWorkViewerKind(work);
  const isHtmlViewer = viewerKind === 'html';
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const [viewport, setViewport] = useState(DEFAULT_IMAGE_SIZE);
  const [imageSrc, setImageSrc] = useState(work.image ?? null);
  const [imageLoading, setImageLoading] = useState(viewerKind === 'image' && !work.image);
  const [zoom, setZoom] = useState(1);

  const labels = useMemo(() => LABELS[lang] ?? LABELS.en, [lang]);

  useEffect(() => {
    imageReadyRef.current = isHtmlViewer;
    initializedRef.current = false;
  }, [work, imageSrc, isHtmlViewer]);

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
  const htmlStageHeight = Math.max(viewport.height - 112, 520);

  const handleImageLoad = (event) => {
    const nextImageSize = {
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    };
    imageReadyRef.current = true;
    setImageSize(nextImageSize);
    initializeView(nextImageSize, viewport);
  };

  return {
    handleFit,
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
