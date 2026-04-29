const GITHUB_USER = 'AREKKUZZERA';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=50&sort=updated`;

function normalizeRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    fork: repo.fork,
  };
}

export default async function handler(_request, response) {
  try {
    const githubResponse = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio',
      },
    });

    if (!githubResponse.ok) {
      return response.status(githubResponse.status).json({
        error: 'GitHub API request failed',
      });
    }

    const repos = await githubResponse.json();
    const normalizedRepos = repos.map(normalizeRepo);

    response.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    return response.status(200).json(normalizedRepos);
  } catch {
    return response.status(500).json({
      error: 'Failed to load repositories',
    });
  }
}
