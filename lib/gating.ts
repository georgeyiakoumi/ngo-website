import type { RegionSlug } from './regions'

/**
 * Gating metadata attached to Strapi content types (Programme, Application Submission).
 */
export interface GatingMetadata {
  visibility: 'public' | 'member'
  regions: RegionSlug[] | null
  minAge: number | null
  maxAge: number | null
}

/**
 * The member attributes used for gating decisions.
 * Derived from the profiles table + computed age.
 */
export interface MemberContext {
  isLoggedIn: true
  region: RegionSlug
  age: number
}

export type VisitorContext = {
  isLoggedIn: false
}

export type AccessContext = MemberContext | VisitorContext

/**
 * Compute age from date of birth.
 * Age changes on the birthday — never stored as a number.
 */
export function ageFromDob(dateOfBirth: string | Date): number {
  const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

/**
 * Determine whether a member (or visitor) can access a gated item.
 *
 * Rules (from brief §7):
 * - Public items are visible to everyone
 * - Member items require login
 * - If regions is non-empty, member's region must be in the list
 * - If minAge is set, member's age must be >= minAge
 * - If maxAge is set, member's age must be <= maxAge
 */
export function canAccess(item: GatingMetadata, context: AccessContext): boolean {
  // Public content is always accessible
  if (item.visibility === 'public') {
    return true
  }

  // Member-only content requires login
  if (!context.isLoggedIn) {
    return false
  }

  // Region check: if regions is specified and non-empty, member must be in one
  if (item.regions && item.regions.length > 0) {
    if (!item.regions.includes(context.region)) {
      return false
    }
  }

  // Age floor
  if (item.minAge != null && context.age < item.minAge) {
    return false
  }

  // Age ceiling
  if (item.maxAge != null && context.age > item.maxAge) {
    return false
  }

  return true
}

/**
 * Filter an array of gated items to only those the context can access.
 */
export function filterAccessible<T extends GatingMetadata>(
  items: T[],
  context: AccessContext
): T[] {
  return items.filter((item) => canAccess(item, context))
}
