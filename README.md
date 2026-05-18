# dmbzzr — Portfolio

Personal portfolio for UI/UX, visual identity, web interface, and prototype case studies. Built with **React + Vite** and deployed on Vercel.

## Stack
- React 19
- Vite 8
- ESLint 9
- Vercel Serverless Function for cached GitHub repositories
- Local case-study assets and optimized preview images

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push repo to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Framework: **Vite** (auto-detected)
4. Deploy — done!

> No env vars needed. GitHub repos load through `api/github-repos.js`.
