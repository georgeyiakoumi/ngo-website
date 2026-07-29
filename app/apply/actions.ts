'use server'

import { createClient } from '@/lib/supabase/server'
import { getAccessContext } from '@/lib/auth'
import { canAccess, ageFromDob, type GatingMetadata } from '@/lib/gating'
import { strapiPost } from '@/lib/strapi'
import type { RegionSlug } from '@/lib/regions'

/**
 * Submit an application form.
 * Re-validates eligibility server-side — a crafted POST cannot bypass gating.
 */
export async function submitApplication(formData: FormData) {
  const formTitle = formData.get('formTitle') as string
  const motivation = formData.get('motivation') as string

  // Gating metadata for this form (passed as hidden fields)
  const visibility = (formData.get('visibility') as string) || 'member'
  const regionsRaw = formData.get('regions') as string
  const minAgeRaw = formData.get('minAge') as string
  const maxAgeRaw = formData.get('maxAge') as string

  const gating: GatingMetadata = {
    visibility: visibility as 'public' | 'member',
    regions: regionsRaw ? JSON.parse(regionsRaw) : null,
    minAge: minAgeRaw ? parseInt(minAgeRaw, 10) : null,
    maxAge: maxAgeRaw ? parseInt(maxAgeRaw, 10) : null,
  }

  // Re-check eligibility
  const context = await getAccessContext()
  if (!canAccess(gating, context)) {
    return { error: 'You are not eligible to submit this application.' }
  }

  if (!context.isLoggedIn) {
    return { error: 'You must be logged in.' }
  }

  if (!formTitle || !motivation) {
    return { error: 'All fields are required.' }
  }

  // Get the user's details for the submission record
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, region, date_of_birth')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return { error: 'Profile not found.' }
  }

  try {
    await strapiPost('/application-submissions', {
      formTitle,
      submittedBy: profile.display_name || user.email,
      submittedEmail: user.email,
      submittedRegion: profile.region as RegionSlug,
      submittedAge: ageFromDob(profile.date_of_birth),
      responses: { motivation },
      status: 'pending',
      visibility: gating.visibility,
      regions: gating.regions,
      minAge: gating.minAge,
      maxAge: gating.maxAge,
    })
  } catch {
    return { error: 'Failed to submit application. Please try again.' }
  }

  return { success: 'Application submitted successfully.' }
}
