'use server'

import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const displayName = formData.get('displayName') as string

  if (!displayName) {
    return { error: 'Display name is required.' }
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ display_name: displayName })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Profile updated.' }
}
