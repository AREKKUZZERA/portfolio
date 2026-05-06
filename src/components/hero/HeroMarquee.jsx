import { useEffect, useRef } from 'react';
import { useSeamlessMarquee } from '../../hooks/useSeamlessMarquee';
import {
  getMarqueeItemStyle,
  getMarqueeTrackStyle,
  getMarqueeViewportStyle,
  MARQUEE_ITEMS,
} from '../../lib/marquee';

export default function HeroMarquee() {
  const marqueeViewportRef = useRef(null);
  const marqueeBaseRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const { baseWidth, renderedCopies } = useSeamlessMarquee(
    marqueeViewportRef,
    marqueeBaseRef,
    MARQUEE_ITEMS,
  );

  useEffect(() => {
    const viewportNode = marqueeViewportRef.current;
    const trackNode = marqueeTrackRef.current;

    if (!viewportNode || !trackNode || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      trackNode.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });

    observer.observe(viewportNode);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={marqueeViewportRef} style={getMarqueeViewportStyle()}>
      <div ref={marqueeTrackRef} style={getMarqueeTrackStyle(baseWidth)}>
        {renderedCopies.map((copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? marqueeBaseRef : undefined}
            className="hero-marquee-copy"
          >
            {MARQUEE_ITEMS.map((item, itemIndex) => {
              const itemKey = `${copyIndex}-${itemIndex}`;
              const isAccent = itemIndex % MARQUEE_ITEMS.length === 0;

              return (
                <span
                  key={itemKey}
                  className={`hero-marquee-item${isAccent ? ' hero-marquee-item--accent' : ''}`}
                  style={getMarqueeItemStyle()}
                >
                  {item}{itemIndex % 3 === 0 ? ' ✦' : ' ·'}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
