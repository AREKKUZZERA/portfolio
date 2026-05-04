import { useState } from 'react';

import { BADGE_COLORS } from '../../data/stack';
import { getToolVisual } from '../../lib/toolVisual';

export default function ToolCard(tool) {
  const { name, badge, large } = tool;
  const badgeColor = BADGE_COLORS[badge] || BADGE_COLORS.Mid;
  const visual = getToolVisual(tool);
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = visual.kind === 'image' && !imageFailed;

  return (
    <div className={`card tool-card ${large ? 'tool-card--large' : ''}`}>
      {large && <div className="tool-card__accent" />}
      <div
        className={`tool-card__visual ${visual.wide ? 'tool-card__visual--wide' : ''}`}
        style={{
          '--tool-bg': visual.background,
          '--tool-color': visual.color,
        }}
      >
        {showImage ? (
          <img
            className={`tool-card__image ${visual.wide ? 'tool-card__image--wide' : ''}`}
            src={visual.src}
            alt={visual.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : visual.label}
      </div>
      <div className="tool-card__body">
        <div className="tool-card__name">{name}</div>
        <span
          className="tool-card__badge"
          style={{
            '--badge-bg': badgeColor.bg,
            '--badge-color': badgeColor.color,
            '--badge-border': badgeColor.border,
          }}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}
