# CONTEXT.md — Project context for AI tools

This file is read by `shadcn/improve` and other AI audit tools to avoid
re-flagging decisions that were intentional. Update it as the project evolves.

## What this project is

Rebuild of an NGO website from scratch with modern tooling. Content site with
member sign-up, role-based staff editing, and content gated by member attributes
(region, 18+ signup floor). Example/portfolio project — not production.

## Phase 0 — Configuration decisions

- **Component system:** shadcn/ui — Base UI (default backend)
- **Storybook:** No
- **Icon set:** Lucide React
- **Animation system:** GSAP (primary), possibly Framer Motion as secondary — confirm before first animation

## Stack decisions

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui — Base UI
- **Icons:** Lucide React
- **CMS:** Strapi (self-hosted on Render, always-on)
- **Database:** Supabase (Postgres + Auth)
- **Frontend hosting:** Netlify
- **Backend hosting:** Render

## Intentional trade-offs

<!-- List decisions that look like issues but are deliberate. -->
<!-- Format: "We did X instead of Y because Z." -->
<!-- Pull from the Notion decisions log. -->

## Out of scope

<!-- Features or patterns explicitly excluded from this project. -->
<!-- Pull from Notion scope → Out of scope section. -->

## Known tech debt

<!-- Things we know are imperfect and have accepted for now. -->
<!-- Update when a decision is made to defer a fix. -->
