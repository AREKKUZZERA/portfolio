import { useRef, useState } from 'react';
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
  const [hoveredMarqueeIndex, setHoveredMarqueeIndex] = useState(null);
  const { baseWidth, renderedCopies } = useSeamlessMarquee(
    marqueeViewportRef,
    marqueeBaseRef,
    MARQUEE_ITEMS,
  );

  return (
    <div ref={marqueeViewportRef} style={getMarqueeViewportStyle()}>
      <div
        style={getMarqueeTrackStyle(baseWidth)}
        onMouseLeave={() => setHoveredMarqueeIndex(null)}
      >
        {renderedCopies.map((copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? marqueeBaseRef : undefined}
            className="hero-marquee-copy"
          >
            {MARQUEE_ITEMS.map((item, itemIndex) => {
              const itemKey = `${copyIndex}-${itemIndex}`;
              const isAccent = itemIndex % MARQUEE_ITEMS.length === 0;
              const isHovered = hoveredMarqueeIndex === itemKey;

              return (
                <span
                  key={itemKey}
                  onMouseEnter={() => setHoveredMarqueeIndex(itemKey)}
                  style={getMarqueeItemStyle({ isAccent, isHovered })}
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
