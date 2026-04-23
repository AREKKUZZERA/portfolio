import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import previewBwc from '../assets/portfolio/preview/bwc-prev.png';
import previewDp from '../assets/portfolio/preview/dp-prev.png';
import { loadGithubRepos } from '../lib/githubRepos';
const WorkViewer = lazy(() => import('./WorkViewer'));

const GITHUB_USER = 'AREKKUZZERA';

const T = {
  ru: {
    label: 'Работы',
    behanceTitle1: 'Отобранные',
    behanceTitle2: 'кейсы',
    behanceDesc: 'Проекты с Behance и основного портфолио.',
    githubTitle1: 'GitHub',
    githubTitle2: 'репозитории',
    githubDesc: 'Кодовые проекты, плагины и интерфейсные эксперименты.',
    all: 'Все',
    allRepos: 'Все репозитории на GitHub ↗',
    loading: 'Загрузка с GitHub...',
    empty: 'Не удалось загрузить репозитории.',
    noDesc: 'Описание не указано.',
    openWork: 'Открыть проект',
    openHint: 'Полноэкранный просмотр + zoom',
    hoverHint: 'Нажми, чтобы открыть',
    caseOne: 'BWC — удалённая веб-консоль в виде серверного плагина',
    caseTwo: 'DARK PLEASE! — расширение для браузера, снижающее нагрузку на глаза',
  },
  en: {
    label: 'Works',
    behanceTitle1: 'Selected',
    behanceTitle2: 'cases',
    behanceDesc: 'Click a work to open a fullscreen viewer with zoom.',
    githubTitle1: 'GitHub',
    githubTitle2: 'repositories',
    githubDesc: 'Code projects, plugins, and interface experiments.',
    all: 'All',
    allRepos: 'All repos on GitHub ↗',
    loading: 'Loading from GitHub...',
    empty: 'Could not load repositories.',
    noDesc: 'No description provided.',
    openWork: 'Open project',
    openHint: 'Fullscreen viewer + zoom',
    hoverHint: 'Click to open',
    caseOne: 'BWC — a remote web console provided as a server plugin',
    caseTwo: 'DARK PLEASE! — a browser extension designed to reduce eye strain',
  },
};

const BEHANCE_PROJECTS = [
  {
    id: 'bwc',
    preview: previewBwc,
    imageLoader: () => import('../assets/portfolio/portfolio-bwc.png'),
    accent: 'rgba(242,57,135,0.32)',
  },
  {
    id: 'dark-pink',
    preview: previewDp,
    imageLoader: () => import('../assets/portfolio/portfolio-dp.svg'),
    accent: 'rgba(255,121,176,0.36)',
  },
];

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#ffd43b',
  HTML: '#e34f26',
  CSS: '#563d7c',
  Vue: '#42b883',
  default: '#f23987',
};

function RepoCard({ repo, noDesc }) {
  const [hov, setHov] = useState(false);
  const lc = LANG_COLORS[repo.language] || LANG_COLORS.default;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: hov ? 'var(--s2)' : 'var(--s1)',
        border: `1px solid ${hov ? 'var(--b3)' : 'var(--b1)'}`,
        borderRadius: 8,
        padding: '1.5rem',
        transition: 'all 0.25s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 8px 28px rgba(0,0,0,0.4)' : 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {hov && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--acc), transparent)',
          }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.88rem',
            fontWeight: 600,
            color: hov ? 'var(--acc)' : 'var(--txt)',
            transition: 'color 0.2s',
            flex: 1,
            marginRight: '0.5rem',
            wordBreak: 'break-word',
          }}
        >
          {repo.name}
        </span>
        <span style={{ opacity: hov ? 1 : 0.3, transition: 'opacity 0.2s', fontSize: '0.9rem' }}>↗</span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          lineHeight: 1.6,
          color: 'var(--mut)',
          marginBottom: '1.2rem',
          flex: 1,
        }}
      >
        {repo.description || noDesc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {repo.language && (
            <>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: lc, boxShadow: `0 0 5px ${lc}88` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>{repo.language}</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.9rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>★ {repo.stargazers_count}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>⑂ {repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

function WorkPreviewCard({ project, t, onOpen }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: 0,
        textAlign: 'left',
        display: 'block',
      }}
    >
      <div
        className="work-preview-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 16,
          border: `1px solid ${hov ? 'rgba(242,57,135,0.28)' : 'var(--b1)'}`,
          background: 'rgba(255,255,255,0.01)',
          aspectRatio: '16 / 10',
          boxShadow: hov ? '0 24px 70px rgba(0,0,0,0.34)' : 'none',
          transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
          transform: hov ? 'translateY(-4px)' : 'none',
        }}
      >
        <img
          src={project.preview}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hov ? 'scale(1.035)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, transparent 46%, rgba(8,8,8,0.68) 100%), radial-gradient(circle at top right, ${project.accent}, transparent 36%)`,
          }}
        />
        <div
          className="work-preview-overlay"
          style={{
            position: 'absolute',
            left: '1rem',
            right: '1rem',
            bottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
          }}
        >
          <div className="work-preview-copy">
            <div className="work-preview-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 0.95, color: 'var(--txt)', marginBottom: '0.45rem' }}>
              {project.title}
            </div>
            <div className="work-preview-hint" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.68)' }}>
              {t.openHint}
            </div>
          </div>
          <div
            className="work-preview-cta"
            style={{
              flexShrink: 0,
              padding: '0.42rem 0.7rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: hov ? 'rgba(242,57,135,0.16)' : 'rgba(18,18,18,0.58)',
              color: hov ? 'var(--acc-l)' : 'var(--txt2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.24s ease',
            }}
          >
            {t.openWork}
          </div>
        </div>
        <div
          className="work-preview-badge"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.38rem 0.62rem',
            borderRadius: 999,
            background: 'rgba(15,15,15,0.62)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: hov ? 'var(--acc-l)' : 'var(--txt2)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.08em',
            transition: 'color 0.24s ease, border-color 0.24s ease',
          }}
        >
          {t.hoverHint}
        </div>
      </div>
    </button>
  );
}

function SectionHeading({ title1, title2, desc }) {
  return (
    <div style={{ marginBottom: '1.8rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 400, lineHeight: 0.94, letterSpacing: '-0.02em', marginBottom: '0.9rem', color: 'var(--txt)' }}>
        {title1} <em style={{ fontStyle: 'italic', color: 'var(--acc)' }}>{title2}</em>
      </h3>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--mut)', maxWidth: 620 }}>
        {desc}
      </p>
    </div>
  );
}

export default function Projects({ lang }) {
  const t = T[lang];
  const sectionRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [shouldLoadRepos, setShouldLoadRepos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [activeWork, setActiveWork] = useState(null);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setLoading(true);
        setError(null);
        setShouldLoadRepos(true);
        observer.disconnect();
      },
      { rootMargin: '400px 0px' },
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadRepos) return undefined;

    let cancelled = false;

    loadGithubRepos()
      .then((data) => {
        if (cancelled) return;
        setRepos(data);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoadRepos]);

  const activeFilter = filter ?? t.all;
  const langs = [t.all, ...new Set(repos.map((repo) => repo.language).filter(Boolean))];
  const shown = activeFilter === t.all ? repos : repos.filter((repo) => repo.language === activeFilter);
  const behanceProjects = BEHANCE_PROJECTS.map((project) => ({
    ...project,
    title: project.id === 'bwc' ? t.caseOne : t.caseTwo,
  }));

  return (
    <>
      <section ref={sectionRef} id="projects" className="page-section" style={{ padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>
        <SectionHeading title1={t.behanceTitle1} title2={t.behanceTitle2} desc={t.behanceDesc} />
        <div className="work-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.15rem', marginBottom: '5rem' }}>
          {behanceProjects.map((project) => (
            <WorkPreviewCard key={project.id} project={project} t={t} onOpen={setActiveWork} />
          ))}
        </div>

        <SectionHeading title1={t.githubTitle1} title2={t.githubTitle2} desc={t.githubDesc} />

        {!loading && !error && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {langs.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  padding: '0.28rem 0.85rem',
                  border: `1px solid ${activeFilter === item ? 'var(--acc)' : 'var(--b2)'}`,
                  background: activeFilter === item ? 'var(--acc-d)' : 'transparent',
                  color: activeFilter === item ? 'var(--acc)' : 'var(--mut)',
                  borderRadius: 5,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s',
                }}
              >
                {item}
              </button>
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
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid rgba(242,57,135,0.25)',
              borderRadius: 8,
              color: 'var(--acc)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              background: 'var(--acc-d)',
            }}
          >
            {t.empty}
          </div>
        )}
        {!loading && !error && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.2rem' }}>
              {shown.map((repo) => <RepoCard key={repo.id} repo={repo} noDesc={t.noDesc} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="btn-ghost">
                {t.allRepos}
              </a>
            </div>
          </>
        )}
      </section>

      {activeWork && (
        <Suspense fallback={null}>
          <WorkViewer key={activeWork.id} work={activeWork} lang={lang} onClose={() => setActiveWork(null)} />
        </Suspense>
      )}
    </>
  );
}
