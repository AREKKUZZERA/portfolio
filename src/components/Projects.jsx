import { lazy, Suspense, useRef, useState } from 'react';
import sakuraUrl from '../assets/webp/sakura.webp';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { BEHANCE_PROJECTS, GITHUB_USER, PROJECTS_TEXT } from '../data/projects';
import ScrollParallaxImage from './ScrollParallaxImage';
import RepoCard from './projects/RepoCard';
import SectionHeading from './projects/SectionHeading';
import WorkPreviewCard from './projects/WorkPreviewCard';

const WorkViewer = lazy(() => import('./WorkViewer'));

export default function Projects({ lang }) {
  const t = PROJECTS_TEXT[lang];
  const sectionRef = useRef(null);
  const { error, loading, repos } = useGithubRepos(sectionRef);
  const [filter, setFilter] = useState(null);
  const [activeWork, setActiveWork] = useState(null);

  const activeFilter = filter ?? t.all;
  const langs = [t.all, ...new Set(repos.map((repo) => repo.language).filter(Boolean))];
  const shown = activeFilter === t.all ? repos : repos.filter((repo) => repo.language === activeFilter);
  const behanceProjects = BEHANCE_PROJECTS.map((project) => ({
    ...project,
    htmlUrl: project.htmlUrls?.[lang] ?? project.htmlUrl,
    title: t[project.titleKey],
    shortTitle: t[project.shortTitleKey],
  }));
  const activeWorkForLang = activeWork
    ? {
        ...activeWork,
        htmlUrl: activeWork.htmlUrls?.[lang] ?? activeWork.htmlUrl,
      }
    : null;

  return (
    <>
      <section ref={sectionRef} id="projects" className="page-section" style={{ position: 'relative', isolation: 'isolate', padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <ScrollParallaxImage
          src={sakuraUrl}
          className="sakura-parallax--github"
          speed={0.85}
          distance={150}
          xDistance={-24}
          rotateDistance={6}
          rotate={13}
        />
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>
        <SectionHeading title1={t.behanceTitle1} title2={t.behanceTitle2} desc={t.behanceDesc} />
        <div className="work-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.15rem', marginBottom: '5rem' }}>
          {behanceProjects.map((project) => (
            <WorkPreviewCard key={project.id} project={project} t={t} onOpen={setActiveWork} />
          ))}
        </div>

        <div className="github-section-anchor" style={{ position: 'relative', isolation: 'isolate' }}>
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
        </div>
      </section>

      {activeWorkForLang && (
        <Suspense fallback={null}>
          <WorkViewer key={`${activeWorkForLang.id}-${lang}`} work={activeWorkForLang} lang={lang} onClose={() => setActiveWork(null)} />
        </Suspense>
      )}
    </>
  );
}
