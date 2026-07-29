# Strapi CMS

The content management backend for the NGO website. Runs as a separate service, deployed to Render.

## Local development

```bash
cd cms
npm install
npm run develop
```

Opens the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin).

Local development uses SQLite — no external database needed.

## Deploying to Render

1. Push this repo to GitHub
2. Go to render.com > New Web Service > connect this repo
3. Set root directory to `cms`
4. Build command: `npm run build`
5. Start command: `npm run start`

Set these environment variables in Render:

- `DATABASE_CLIENT` — `postgres`
- `DATABASE_URL` — Supabase Session Pooler URL (Settings > Database > Connection string > Session pooler)
- `ADMIN_JWT_SECRET` — run: `openssl rand -base64 32`
- `API_TOKEN_SALT` — run: `openssl rand -base64 32`
- `APP_KEYS` — run: `openssl rand -base64 32`
- `JWT_SECRET` — run: `openssl rand -base64 32`

**Important:** Use the Supabase **Session Pooler** connection string, not Direct Connection. Direct Connection resolves to IPv6 on Render, causing `ENETUNREACH` errors.

Once deployed, copy the Render URL to `NEXT_PUBLIC_STRAPI_URL` in Netlify env vars.

## Version pinning

All Strapi and dependency versions are pinned (no `^` or `~` ranges). This prevents the failure mode that killed the original WordPress site — auto-updates breaking compatibility silently. Upgrade deliberately using `npm run upgrade:dry` to preview changes.
