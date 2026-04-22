import { useEffect, useState } from 'react';
import { loadGithubRepos } from '../lib/githubRepos';

const GITHUB_USER = 'AREKKUZZERA';

const T = {
  ru: {
    label: 'Работы',
    title1: 'GitHub', title2: 'репозитории',
    desc: 'Код — как дополнительный инструмент. Здесь собраны проекты, где я применяю дизайн-навыки на практике.',
    all: 'Все',
    allRepos: 'Все репозитории на GitHub ↗',
    loading: 'Загрузка с GitHub...',
    empty: 'Не удалось загрузить репозитории.',
    noDesc: 'Описание не указано.',
  },
  en: {
    label: 'Works',
    title1: 'GitHub', title2: 'repositories',
    desc: 'Code as an additional tool. Here are projects where I apply design skills in practice.',
    all: 'All',
    allRepos: 'All repos on GitHub ↗',
    loading: 'Loading from GitHub...',
    empty: 'Could not load repositories.',
    noDesc: 'No description provided.',
  },
};

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#ffd43b',
  HTML: '#e34f26', CSS: '#563d7c', Vue: '#42b883', default: '#f23987',
};

function RepoCard({ repo, noDesc }) {
  const [hov, setHov] = useState(false);
  const lc = LANG_COLORS[repo.language] || LANG_COLORS.default;
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        background: hov ? 'var(--s2)' : 'var(--s1)',
        border: `1px solid ${hov ? 'var(--b3)' : 'var(--b1)'}`,
        borderRadius: 8,
        padding: '1.5rem',
        transition: 'all 0.25s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 8px 28px rgba(0,0,0,0.4)' : 'none',
        cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
      }}>
      {hov && <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--acc), transparent)',
      }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: '0.88rem', fontWeight: 600,
          color: hov ? 'var(--acc)' : 'var(--txt)',
          transition: 'color 0.2s', flex: 1, marginRight: '0.5rem',
          wordBreak: 'break-word',
        }}>{repo.name}</span>
        <span style={{ opacity: hov ? 1 : 0.3, transition: 'opacity 0.2s', fontSize: '0.9rem' }}>↗</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        lineHeight: 1.6, color: 'var(--mut)', marginBottom: '1.2rem', minHeight: '2.4rem',
      }}>
        {repo.description || noDesc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {repo.language && <>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: lc, boxShadow: `0 0 5px ${lc}88` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>{repo.language}</span>
          </>}
        </div>
        <div style={{ display: 'flex', gap: '0.9rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>★ {repo.stargazers_count}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>⑂ {repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

export default function Projects({ lang }) {
  const t = T[lang];
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadGithubRepos()
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const langs = [t.all, ...new Set(repos.map(r => r.language).filter(Boolean))];
  const shown = filter === t.all ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" style={{ padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>
      <p style={{
        fontFamily: 'var(--font-ui)', fontSize: '0.9rem',
        lineHeight: 1.7, color: 'var(--mut)',
        maxWidth: 520, marginBottom: '2.5rem', marginTop: '-1.5rem',
      }}>{t.desc}</p>

      {!loading && !error && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {langs.map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{
              padding: '0.28rem 0.85rem',
              border: `1px solid ${filter === l ? 'var(--acc)' : 'var(--b2)'}`,
              background: filter === l ? 'var(--acc-d)' : 'transparent',
              color: filter === l ? 'var(--acc)' : 'var(--mut)',
              borderRadius: 5, fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem', letterSpacing: '0.08em',
              cursor: 'none', transition: 'all 0.2s',
            }}>{l}</button>
          ))}
        </div>
      )}

      {loading && (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--mut)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>◌</div>
          {t.loading}
        </div>
      )}
      {error && (
        <div style={{
          padding: '1.5rem', border: '1px solid rgba(242,57,135,0.25)',
          borderRadius: 8, color: 'var(--acc)', fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem', background: 'var(--acc-d)',
        }}>{t.empty}</div>
      )}
      {!loading && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.2rem' }}>
            {shown.map(r => <RepoCard key={r.id} repo={r} noDesc={t.noDesc} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="btn-ghost">
              {t.allRepos}
            </a>
          </div>
        </>
      )}
    </section>
  );
}
