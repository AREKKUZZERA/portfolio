import { useCallback, useEffect, useState } from 'react';
import { loadGithubRepos } from '../lib/githubRepos';

export function useGithubRepos(sectionRef) {
  const [repos, setRepos] = useState([]);
  const [shouldLoadRepos, setShouldLoadRepos] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestRepos = useCallback(() => {
    setError(null);
    setLoading(true);
    setShouldLoadRepos(true);
    setRequestId((current) => current + 1);
  }, []);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        requestRepos();
        observer.disconnect();
      },
      { rootMargin: '400px 0px' },
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, [requestRepos, sectionRef]);

  useEffect(() => {
    if (!shouldLoadRepos || requestId === 0) return undefined;

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
  }, [requestId, shouldLoadRepos]);

  return {
    error,
    loading,
    repos,
    retry: requestRepos,
  };
}
