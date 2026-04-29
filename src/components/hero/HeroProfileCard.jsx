import { GitBranch, Send, Sparkles } from 'lucide-react';
import { HERO_LINKS } from '../../data/hero';

export default function HeroProfileCard({ t }) {
  return (
    <aside className="hero-side-card">
      <div>
        <div className="hero-profile-name">{t.name}</div>
        <p className="hero-profile-desc">{t.sideDesc}</p>
      </div>

      <div className="hero-link-row">
        <a href={HERO_LINKS.telegram} target="_blank" rel="noreferrer" className="btn-primary hero-link-button">
          <Send size={16} strokeWidth={2.2} />
          {t.telegram}
        </a>
        <a href={HERO_LINKS.behance} target="_blank" rel="noreferrer" className="btn-ghost hero-link-button">
          <Sparkles size={16} strokeWidth={2.2} />
          {t.behance}
        </a>
        <a href={HERO_LINKS.github} target="_blank" rel="noreferrer" className="btn-ghost hero-link-button">
          <GitBranch size={16} strokeWidth={2.2} />
          {t.github}
        </a>
      </div>

      <div className="hero-tag-row">
        {t.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <div className="hero-stats-row">
        {t.stats.map((stat) => (
          <div key={stat.label}>
            <div>{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
