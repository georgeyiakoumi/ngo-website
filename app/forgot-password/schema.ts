import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
})

export type ForgotPasswordFormState = {
  values?: z.infer<typeof forgotPasswordSchema>
  errors: null | Partial<
    Record<keyof z.infer<typeof forgotPasswordSchema>, string[]>
  >
  message?: string
  success: boolean
}
