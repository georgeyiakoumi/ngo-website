import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

export type LoginFormState = {
  values?: z.infer<typeof loginSchema>
  errors: null | Partial<Record<keyof z.infer<typeof loginSchema>, string[]>>
  message?: string
  success: boolean
}
