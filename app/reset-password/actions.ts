'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { resetPasswordSchema, type ResetPasswordFormState } from './schema'

export async function resetPassword(
  _prev: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  const values = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const result = resetPasswordSchema.safeParse(values)

  if (!result.success) {
    return {
      values,
      errors: result.error.flatten().fieldErrors,
      success: false,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
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
