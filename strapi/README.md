# Strapi CMS

This subfolder contains the Strapi CMS instance for this project.

## Local setup

```bash
cd strapi
npx create-strapi-app@latest . --quickstart
```

## Deploying to Render

1. Push this repo to GitHub
2. Go to render.com → New Web Service → connect this repo
3. Set root directory to `strapi`
4. Build command: `npm run build`
5. Start command: `npm run start`

Set these environment variables in Render:
- `DATABASE_URL` — Supabase Session Pooler URL (Settings → Database → Connection string → Session pooler)
- `ADMIN_JWT_SECRET` — run: openssl rand -base64 32
- `API_TOKEN_SALT`   — run: openssl rand -base64 32
- `APP_KEYS`         — run: openssl rand -base64 32
- `JWT_SECRET`       — run: openssl rand -base64 32

Once deployed, copy the Render URL to NEXT_PUBLIC_STRAPI_URL in Netlify env vars.
