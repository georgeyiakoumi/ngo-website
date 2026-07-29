import { createClient } from '@/lib/supabase/server'
import { ageFromDob, type AccessContext } from '@/lib/gating'
import type { RegionSlug } from '@/lib/regions'

/**
 * Get the current user's access context for gating decisions.
 * Call this in Server Components and Route Handlers.
 *
 * Returns MemberContext if logged in with a valid profile,
 * or VisitorContext if not logged in.
 */
export async function getAccessContext(): Promise<AccessContext> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isLoggedIn: false }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('region, date_of_birth')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return { isLoggedIn: false }
  }

  return {
    isLoggedIn: true,
    region: profile.region as RegionSlug,
    age: ageFromDob(profile.date_of_birth),
  }
}
