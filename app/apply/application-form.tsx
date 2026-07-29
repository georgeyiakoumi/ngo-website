'use client'

import { useActionState } from 'react'
import { submitApplication } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ApplicationFormProps {
  formTitle: string
  visibility: string
  regions: string[] | null
  minAge: number | null
  maxAge: number | null
}

export function ApplicationForm({
  formTitle,
  visibility,
  regions,
  minAge,
  maxAge,
}: ApplicationFormProps) {
  const [state, formAction, pending] = useActionState(
    async (
      _prev: { error?: string; success?: string } | null,
      formData: FormData
    ) => {
      return await submitApplication(formData)
    },
    null
  )

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Hidden gating metadata for server-side re-validation */}
      <input type="hidden" name="formTitle" value={formTitle} />
      <input type="hidden" name="visibility" value={visibility} />
      <input
        type="hidden"
        name="regions"
        value={regions ? JSON.stringify(regions) : ''}
      />
      <input
        type="hidden"
        name="minAge"
        value={minAge != null ? String(minAge) : ''}
      />
      <input
        type="hidden"
        name="maxAge"
        value={maxAge != null ? String(maxAge) : ''}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="motivation">
          Why are you interested in this programme?
        </Label>
        <Textarea
          id="motivation"
          name="motivation"
          rows={5}
          required
          placeholder="Tell us about your interest and what you hope to gain..."
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}

      {state?.success && (
        <p className="text-sm text-muted-foreground" role="status">
          {state.success}
        </p>
      )}

      <Button type="submit" disabled={pending || !!state?.success}>
        {pending ? 'Submitting...' : 'Submit application'}
      </Button>
    </form>
  )
}
