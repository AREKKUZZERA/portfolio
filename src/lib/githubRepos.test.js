import test from 'node:test';
import assert from 'node:assert/strict';

import { loadGithubRepos } from './githubRepos.js';

test('loadGithubRepos uses local api route and normalizes repos', async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);

    return {
      ok: true,
      async json() {
        return [
          { id: 1, name: 'forked', fork: true, stargazers_count: 100 },
          { id: 2, name: 'low-stars', fork: false, stargazers_count: 1 },
          { id: 3, name: 'top-stars', fork: false, stargazers_count: 50 },
        ];
      },
    };
  };

  const repos = await loadGithubRepos(fetchImpl);

  assert.deepEqual(calls, ['/api/github-repos']);
  assert.deepEqual(
    repos.map((repo) => repo.name),
    ['top-stars', 'low-stars'],
  );
});

test('loadGithubRepos throws on api failure', async () => {
  await assert.rejects(
    () =>
      loadGithubRepos(async () => ({
        ok: false,
        status: 500,
      })),
    /API error: 500/,
  );
});
