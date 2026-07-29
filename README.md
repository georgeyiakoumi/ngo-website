# ngo-website

Rebuild of an NGO website from scratch with modern tooling. A content site with member sign-up, role-based staff editing, and content gated by member attributes (region, 18+ signup floor).

This is an example/portfolio project — built to a workable state rather than run in production with real users.

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI) |
| Icons | Lucide React |
| CMS | Strapi (self-hosted on Render, always-on) |
| Database | Supabase (Postgres + Auth) |
| Frontend hosting | Netlify |

## Getting started

```bash
cp .env.example .env.local   # fill in your credentials
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. Key values:

- **Supabase** — `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Settings > API in your Supabase project
- **Strapi** — `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN`, set once Strapi is deployed to Render
- **Database** — `DATABASE_URL` must use the Supabase **Session Pooler** (not Direct Connection — see `.env.example` for details)

## Deployment

### Frontend (Netlify)

1. Push the repo to GitHub
2. Go to [netlify.com](https://netlify.com) > Add new site > Import from GitHub
3. Add environment variables (see `.env.example`)
4. Deploy

### Strapi CMS (Render)

See [`strapi/README.md`](strapi/README.md) for full setup instructions.

## Repo structure

```
app/              Next.js App Router pages and layouts
components/ui/    shadcn/ui components
lib/              Utilities (cn helper, future Supabase clients)
strapi/           Strapi CMS subfolder (deployed separately to Render)
e2e/              Playwright end-to-end tests
scripts/          Build and setup scripts
public/           Static assets
.claude/          Claude Code assistant config and design reference files
```

## Adding shadcn components

```bash
npx shadcn add button
npx shadcn add card dialog select table tabs
```

Components land in `components/ui/` and inherit your brand tokens from `app/globals.css`.

## Applying your brand

Update the `@theme inline` block in `app/globals.css` — oklch values for `--primary`, `--accent`, `--radius`, and other shadcn tokens. Both `:root` (light) and `.dark` variants are pre-wired.

Add font imports to `app/layout.tsx` using `next/font`.
