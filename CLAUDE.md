# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint`
- `npm run typecheck` / `npm test` — `tsc --noEmit` / Vitest unit tests (in `tests/`, `@` alias → `app/`)
- `npm run analyze` — bundle analysis build (`ANALYZE=true`)
- `npm run optimize:screenshots` — runs `scripts/optimize-screenshots.mjs` on showcase images

Yarn is the package manager (`yarn.lock` only). CI runs typecheck, lint, tests and build.

## Architecture

Next.js 15 App Router portfolio (React 18, Tailwind, framer-motion). The `@/*` import alias maps to `./app/*` (not the repo root).

**Content-driven:** nearly all site copy, projects, skills, experience, navigation, and SEO fields live in `content/portfolio.json`. It is typed by `app/lib/portfolio-types.ts` and imported as the `portfolio` singleton from `app/lib/portfolio.ts`. When adding a new content field, update the type, the zod schema in `app/lib/portfolio-schema.ts` (checked against the type at compile time and validated at build), the JSON, and the Decap CMS schema in `public/admin/config.yml` together.

**Decap CMS:** `/admin/` (static files in `public/admin`) edits `portfolio.json` by committing to GitHub. `app/api/cms/auth` and `app/api/cms/callback` implement the GitHub OAuth handshake, using a signed state from `app/lib/oauth-state.ts`. Requires `GITHUB_OAUTH_CLIENT_ID/SECRET`.

**API routes (`app/api`):**
- `chat` — AI chat ("Ask me anything"), OpenAI-compatible client in `lib/openaiClient.ts`, system prompt in `lib/prompt.ts`. Env: `OPENAI_API_KEY`, `OPENAI_URL`, optional `OPENAI_MODEL`/`CHAT_SESSION_SECRET`. Input is validated in `lib/chat-validation.ts`; the question limit lives in a signed httpOnly cookie (`lib/chat-session.ts`) plus a per-IP limit (`lib/rate-limit.ts`, in-memory).
- `contact` — contact form via Resend. Env: `RESEND_API_KEY`, `TO_EMAIL`.

**UI layout (`app/components`):** `hero/` (incl. GitHub contribution calendar, fed by `lib/github-data.ts`), `portfolio/` (page sections; `Server` vs `WithAnimation` variants split server-rendered and animated client versions), `showcase/` (laptop/mobile device frames and screenshot carousel for featured projects, typed by `showcase/types.ts`), `ui/` (shadcn-style primitives, see `components.json`).

Image/performance conventions are documented in `PERFORMANCE_OPTIMIZATIONS.md`; env vars are listed in `.env.example` and the README.
