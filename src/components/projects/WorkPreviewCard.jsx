import { memo } from 'react';

function WorkPreviewCard({ project, t, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="work-preview-button"
      aria-label={`${t.openWork}: ${project.title}`}
      style={{ '--work-accent': project.accent }}
    >
      <div className="work-preview-card">
        <img
          className="work-preview-card__image"
          src={project.previewCard ?? project.preview}
          srcSet={project.previewCard ? `${project.previewCard} 1008w, ${project.preview} 1672w` : undefined}
          sizes="(max-width: 760px) calc(100vw - 3rem), 340px"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="work-preview-card__scrim" />
        <div className="work-preview-overlay">
          <div className="work-preview-copy">
            <div className="work-preview-title">
              {project.shortTitle}
            </div>
            <div className="work-preview-desc">
              {project.previewDesc}
            </div>
            <div className="work-preview-meta">
              <span>{project.role}</span>
              <span>{project.result}</span>
            </div>
          </div>
          <div className="work-preview-cta">
            {t.openWork}
          </div>
        </div>
        <div className="work-preview-badge">
          {t.hoverHint}
        </div>
      </div>
    </button>
  );
}

export default memo(WorkPreviewCard);
