import { useEffect, useMemo, useState } from 'react';
import { getMarqueeCopies } from '../lib/marquee';

export function useSeamlessMarquee(viewportRef, baseRef, items) {
  const [metrics, setMetrics] = useState({
    baseWidth: 0,
    copyCount: 5,
  });

  useEffect(() => {
    const viewportNode = viewportRef.current;
    const baseNode = baseRef.current;

    if (!viewportNode || !baseNode) {
      return undefined;
    }

    const measure = () => {
      const baseWidth = Math.round(baseNode.getBoundingClientRect().width);
      const viewportWidth = Math.round(viewportNode.getBoundingClientRect().width);
      const copyCount = getMarqueeCopies({ baseWidth, viewportWidth });

      setMetrics((current) => {
        if (current.baseWidth === baseWidth && current.copyCount === copyCount) {
          return current;
        }

        return {
          baseWidth,
          copyCount,
        };
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewportNode);
    observer.observe(baseNode);

    return () => observer.disconnect();
  }, [viewportRef, baseRef, items]);

  const renderedCopies = useMemo(
    () => Array.from({ length: metrics.copyCount }, (_, index) => index),
    [metrics.copyCount],
  );

  return {
    baseWidth: metrics.baseWidth,
    renderedCopies,
  };
}
