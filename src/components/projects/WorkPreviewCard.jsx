export default function WorkPreviewCard({ project, t, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="work-preview-button"
      style={{ '--work-accent': project.accent }}
    >
      <div className="work-preview-card">
        <img
          className="work-preview-card__image"
          src={project.preview}
          alt={project.title}
          loading="lazy"
          decoding="async"
        />
        <div className="work-preview-card__scrim" />
        <div className="work-preview-overlay">
          <div className="work-preview-copy">
            <div className="work-preview-title">
              {project.shortTitle}
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
