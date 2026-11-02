This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scripts

| Command | Purpose |
| --- | --- |
| `yarn dev` | Dev server (Turbopack) |
| `yarn build` / `yarn start` | Production build / serve |
| `yarn lint` | ESLint (`next lint`) |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn test` | Unit tests (Vitest) |
| `yarn analyze` | Bundle analysis build |

CI (`.github/workflows/ci.yml`) runs typecheck, lint, tests and a build on every push and PR.

## Environment Variables

Copy [`.env.example`](./.env.example) to `.env.local` and fill in what you need. Everything is optional; features whose variables are missing are disabled.

| Variable | Used by |
| --- | --- |
| `OPENAI_API_KEY`, `OPENAI_URL`, `OPENAI_MODEL` | AI chat (`/api/chat`). `OPENAI_URL` accepts any OpenAI-compatible endpoint (e.g. Ollama at `http://localhost:11434/v1`). |
| `CHAT_SESSION_SECRET` | Signs the chat session cookie (falls back to `OPENAI_API_KEY`). |
| `RESEND_API_KEY`, `TO_EMAIL` | Contact form (`/api/contact`). |
| `GITHUB_TOKEN` | Optional, server-side only. Lets the contribution calendar use GitHub's GraphQL API. |
| `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `GITHUB_OAUTH_SCOPE` | Decap CMS login. |

Notes:

- Rate limits (contact form, chat) are held in memory per server instance. They deter abuse but are not a hard guarantee on multi-instance or serverless hosting; use a shared store such as Upstash Redis if you need that.

## Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

The image is a multi-stage build using Next.js standalone output and runs as a non-root user.

## Content admin (Decap CMS)

Site copy, projects, skills, navigation, SEO fields, and contact details live in **`content/portfolio.json`**. You can edit that file in Git, or use the free **[Decap CMS](https://decapcms.org/)** UI at **`/admin/`** on your deployed site (for example `https://your-domain.com/admin/`).

1. Copy [`.env.example`](./.env.example) variables into `.env.local` (and add the same secrets in your host’s environment for production).
2. Create a [GitHub OAuth App](https://github.com/settings/developers): set **Authorization callback URL** to `https://YOUR_DOMAIN/api/cms/callback` (add `http://localhost:3000/api/cms/callback` if you use the CMS locally).
3. In [`public/admin/config.yml`](./public/admin/config.yml), set **`backend.repo`** to `your-username/your-repo` and **`backend.base_url`** to the exact origin where the site is served (must match the domain used in the OAuth callback, without a trailing slash).
4. Deploy, open `/admin/`, sign in with GitHub (the account needs push access to the repo). Saving in the CMS creates a commit on your default branch; your host rebuilds the site so changes go live after the deploy finishes.

## Features

- **Decap CMS**: Git-backed admin at `/admin/` for `content/portfolio.json`
- **AI Chat**: Interactive chat interface powered by OpenAI (defaults to `gpt-4o-mini`)
- **Responsive Design**: Mobile-first design with smooth animations
- **Contact Form**: Email contact form with Resend integration
- **Dark/Light Theme**: Theme toggle functionality
- **GitHub Integration**: GitHub calendar and activity display

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
