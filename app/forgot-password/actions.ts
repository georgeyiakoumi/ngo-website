'use server'

import { createClient } from '@/lib/supabase/server'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormState,
} from './schema'

export async function forgotPassword(
  _prev: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const values = {
    email: formData.get('email') as string,
  }

  const result = forgotPasswordSchema.safeParse(values)

  if (!result.success) {
    return {
      values,
      errors: result.error.flatten().fieldErrors,
      success: false,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
    }
  )

  if (error) {
    return {
      values,
      errors: null,
      message: error.message,
      success: false,
    }
  }

  return {
    errors: null,
    message: 'Check your email for a password reset link.',
    success: true,
  }
}
