'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { REGIONS, type RegionSlug } from '@/lib/regions'

function isAtLeast18(dateOfBirth: string): boolean {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age >= 18
}

function isValidRegion(region: string): region is RegionSlug {
  return REGIONS.some((r) => r.slug === region)
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string
  const dateOfBirth = formData.get('dateOfBirth') as string
  const region = formData.get('region') as string

  // Server-side validation
  if (!email || !password || !displayName || !dateOfBirth || !region) {
    return { error: 'All fields are required.' }
  }

  if (!isValidRegion(region)) {
    return { error: 'Invalid region selected.' }
  }

  if (!isAtLeast18(dateOfBirth)) {
    return { error: 'You must be at least 18 years old to sign up.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        region,
        date_of_birth: dateOfBirth,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}
