/**
 * The 8 regions members can belong to.
 * Used in signup dropdown, profile display, and content gating.
 */
export const REGIONS = [
  { slug: 'uk', label: 'United Kingdom' },
  { slug: 'usa', label: 'United States' },
  { slug: 'greece', label: 'Greece' },
  { slug: 'new-zealand', label: 'New Zealand' },
  { slug: 'south-africa', label: 'South Africa' },
  { slug: 'canada', label: 'Canada' },
  { slug: 'rest-of-europe', label: 'Rest of Europe' },
  { slug: 'rest-of-africa', label: 'Rest of Africa' },
] as const

export type RegionSlug = (typeof REGIONS)[number]['slug']
