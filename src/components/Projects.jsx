import { lazy, Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import sakuraUrl from '../assets/webp/sakura.webp';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { BEHANCE_PROJECTS, GITHUB_USER, PROJECTS_TEXT } from '../data/projects';
import ScrollParallaxImage from './ScrollParallaxImage';
import RepoCard from './projects/RepoCard';
import SectionHeading from './projects/SectionHeading';
import WorkPreviewCard from './projects/WorkPreviewCard';

const WorkViewer = lazy(() => import('./WorkViewer'));
const VIEWER_LOCK_CLASS = 'work-viewer-page-lock';

export default function Projects({ lang }) {
  const t = PROJECTS_TEXT[lang];
  const sectionRef = useRef(null);
  const { error, loading, repos, retry } = useGithubRepos(sectionRef);
  const [filter, setFilter] = useState(null);
  const [activeWork, setActiveWork] = useState(null);

  const activeFilter = filter ?? t.all;
  const langs = useMemo(
    () => [t.all, ...new Set(repos.map((repo) => repo.language).filter(Boolean))],
    [repos, t.all],
  );
  const shown = useMemo(
    () => (activeFilter === t.all ? repos : repos.filter((repo) => repo.language === activeFilter)),
    [activeFilter, repos, t.all],
  );
  const hasRepos = repos.length > 0;
  const hasShownRepos = shown.length > 0;
  const behanceProjects = useMemo(
    () => BEHANCE_PROJECTS.map((project) => ({
      ...project,
      htmlUrl: project.htmlUrls?.[lang] ?? project.htmlUrl,
      previewDesc: project.previewDesc?.[lang] ?? project.previewDesc,
      result: project.result?.[lang] ?? project.result,
      role: project.role?.[lang] ?? project.role,
      title: t[project.titleKey],
      shortTitle: t[project.shortTitleKey],
    })),
    [lang, t],
  );
  const activeWorkForLang = useMemo(
    () => (activeWork
      ? {
        ...activeWork,
        htmlUrl: activeWork.htmlUrls?.[lang] ?? activeWork.htmlUrl,
      }
      : null),
    [activeWork, lang],
  );
  const openWork = useCallback((project) => {
    setActiveWork(project);
  }, []);
  const closeWork = useCallback(() => {
    setActiveWork(null);
  }, []);

  useLayoutEffect(() => {
    if (!activeWork) return undefined;

    document.documentElement.classList.add(VIEWER_LOCK_CLASS);
    document.body.classList.add(VIEWER_LOCK_CLASS);

    return () => {
      document.documentElement.classList.remove(VIEWER_LOCK_CLASS);
      document.body.classList.remove(VIEWER_LOCK_CLASS);
    };
  }, [activeWork]);

  return (
    <>
      <section ref={sectionRef} id="projects" className="page-section projects-section">
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
        <SectionHeading title1={t.behanceTitle1} title2={t.behanceTitle2} desc={t.behanceDesc} />
        <div className="work-preview-grid">
          {behanceProjects.map((project) => (
            <WorkPreviewCard key={project.id} project={project} t={t} onOpen={openWork} />
          ))}
        </div>

        <div className="github-section-anchor">
          <SectionHeading title1={t.githubTitle1} title2={t.githubTitle2} desc={t.githubDesc} />

          {!loading && !error && hasRepos && (
            <div className="project-filter-row">
              {langs.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={activeFilter === item}
                  className={`project-filter-button${activeFilter === item ? ' project-filter-button--active' : ''}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="github-loading" role="status" aria-live="polite">
              <div className="github-loading__mark">◌</div>
              {t.loading}
            </div>
          )}
          {error && (
            <div className="github-error" role="alert">
              <span>{t.empty}</span>
              <button type="button" className="btn-ghost github-retry-button" onClick={retry}>
                {t.retryRepos}
              </button>
            </div>
          )}
          {!loading && !error && (
            <>
              {hasShownRepos ? (
                <div className="repo-grid">
                  {shown.map((repo) => <RepoCard key={repo.id} repo={repo} noDesc={t.noDesc} />)}
                </div>
              ) : (
                <div className="github-empty" role="status">
                  {t.noRepos}
                </div>
              )}
              <div className="github-repo-action">
                <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="btn-ghost">
                  {t.allRepos}
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {activeWorkForLang && (
        <Suspense fallback={<div className="work-viewer-loading" role="status">{t.loading}</div>}>
          <WorkViewer key={`${activeWorkForLang.id}-${lang}`} work={activeWorkForLang} lang={lang} onClose={closeWork} />
        </Suspense>
      )}
    </>
  );
}
