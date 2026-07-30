import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormState = {
  values?: { password: string; confirmPassword: string }
  errors: null | Partial<Record<'password' | 'confirmPassword', string[]>>
  message?: string
  success: boolean
}
