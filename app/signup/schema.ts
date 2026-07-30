import { z } from 'zod'
import { REGIONS } from '@/lib/regions'

const regionSlugs = REGIONS.map((r) => r.slug) as [string, ...string[]]

export const signupSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  dateOfBirth: z.string().min(1, 'Date of birth is required.'),
  region: z.enum(regionSlugs, {
    errorMap: () => ({ message: 'Select a region.' }),
  }),
})

export type SignupFormState = {
  values?: z.infer<typeof signupSchema>
  errors: null | Partial<Record<keyof z.infer<typeof signupSchema>, string[]>>
  message?: string
  success: boolean
}
