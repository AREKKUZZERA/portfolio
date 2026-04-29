import { useEffect, useState } from 'react';
import { loadGithubRepos } from '../lib/githubRepos';

export function useGithubRepos(sectionRef) {
  const [repos, setRepos] = useState([]);
  const [shouldLoadRepos, setShouldLoadRepos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, [sectionRef]);

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

  return {
    error,
    loading,
    repos,
  };
}
