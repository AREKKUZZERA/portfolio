import { LANG_COLORS } from '../../data/projects';

export default function RepoCard({ repo, noDesc }) {
  const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-card"
    >
      <div className="repo-card__shine" />
      <div className="repo-card__head">
        <span className="repo-card__name">{repo.name}</span>
        <span className="repo-card__arrow">↗</span>
      </div>
      <p className="repo-card__desc">{repo.description || noDesc}</p>
      <div className="repo-card__meta">
        <div className="repo-card__lang">
          {repo.language && (
            <>
              <span className="repo-card__lang-dot" style={{ '--lang-color': langColor }} />
              <span>{repo.language}</span>
            </>
          )}
        </div>
        <div className="repo-card__stats">
          <span>★ {repo.stargazers_count}</span>
          <span>⑂ {repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}
