'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signupSchema, type SignupFormState } from './schema'

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

export async function signup(
  _prev: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const values = {
    displayName: formData.get('displayName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    dateOfBirth: formData.get('dateOfBirth') as string,
    region: formData.get('region') as string,
  }

  const result = signupSchema.safeParse(values)

  if (!result.success) {
    return {
      values,
      errors: result.error.flatten().fieldErrors,
      success: false,
    }
  }

  if (!isAtLeast18(result.data.dateOfBirth)) {
    return {
      values,
      errors: { dateOfBirth: ['You must be at least 18 years old to sign up.'] },
      success: false,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        display_name: result.data.displayName,
        region: result.data.region,
        date_of_birth: result.data.dateOfBirth,
      },
    },
  })

  if (error) {
    return {
      values,
      errors: null,
      message: error.message,
      success: false,
    }
  }

  redirect('/')
}
