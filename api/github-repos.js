const GITHUB_USER = 'AREKKUZZERA';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=50&sort=updated`;

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

    response.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    return response.status(200).json(repos);
  } catch {
    return response.status(500).json({
      error: 'Failed to load repositories',
    });
  }
}
