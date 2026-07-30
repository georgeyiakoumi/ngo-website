'use client'

import * as React from 'react'
import { useActionState } from 'react'
import Form from 'next/form'
import { toast } from 'sonner'
import { submitApplication } from './actions'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface ApplicationFormProps {
  formTitle: string
  visibility: string
  regions: string[] | null
  minAge: number | null
  maxAge: number | null
}

type ApplicationFormState = {
  error?: string
  success: boolean
}

const initialState: ApplicationFormState = { success: false }

export function ApplicationForm({
  formTitle,
  visibility,
  regions,
  minAge,
  maxAge,
}: ApplicationFormProps) {
  const [state, formAction, pending] = useActionState(
    async (
      _prev: ApplicationFormState,
      formData: FormData
    ): Promise<ApplicationFormState> => {
      const result = await submitApplication(formData)
      if (result.error) return { error: result.error, success: false }
      return { success: true }
    },
    initialState
  )

  React.useEffect(() => {
    if (state.success) {
      toast('Application submitted successfully.')
    }
  }, [state.success])

  return (
    <Form action={formAction}>
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

      <FieldGroup>
        <Field data-disabled={pending}>
          <FieldLabel htmlFor="motivation">
            Why are you interested in this programme?
          </FieldLabel>
          <Textarea
            id="motivation"
            name="motivation"
            rows={5}
            disabled={pending}
            required
            placeholder="Tell us about your interest and what you hope to gain..."
          />
        </Field>

        {state.error && (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={pending || state.success}>
          {pending && <Spinner />}
          Submit application
        </Button>
      </FieldGroup>
    </Form>
  )
}
