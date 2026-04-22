const REPOS_API_URL = '/api/github-repos';

export async function loadGithubRepos(fetchImpl = fetch) {
  const response = await fetchImpl(REPOS_API_URL);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return data
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export { REPOS_API_URL };
