'use client'

import * as React from 'react'
import { useActionState } from 'react'
import Form from 'next/form'
import { toast } from 'sonner'
import { updateProfile } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field'
import { REGIONS } from '@/lib/regions'

interface ProfileFormProps {
  displayName: string
  region: string
  dateOfBirth: string
  email: string
}

type ProfileFormState = {
  error?: string
  success: boolean
}

const initialState: ProfileFormState = { success: false }

export function ProfileForm({
  displayName,
  region,
  dateOfBirth,
  email,
}: ProfileFormProps) {
  const regionLabel =
    REGIONS.find((r) => r.slug === region)?.label ?? region

  const [state, formAction, pending] = useActionState(
    async (
      _prev: ProfileFormState,
      formData: FormData
    ): Promise<ProfileFormState> => {
      const result = await updateProfile(formData)
      if (result.error) return { error: result.error, success: false }
      return { success: true }
    },
    initialState
  )

  React.useEffect(() => {
    if (state.success) {
      toast('Profile updated.')
    }
  }, [state.success])

  return (
    <Form action={formAction}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Editable</FieldLegend>
          <FieldGroup>
            <Field data-disabled={pending}>
              <FieldLabel htmlFor="displayName">Display name</FieldLabel>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                defaultValue={displayName}
                disabled={pending}
                required
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend variant="label">Read-only</FieldLegend>
          <FieldGroup>
            <Field data-disabled>
              <FieldLabel>Email</FieldLabel>
              <Input value={email} disabled />
            </Field>

            <Field data-disabled>
              <FieldLabel>Region</FieldLabel>
              <Input value={regionLabel} disabled />
            </Field>

            <Field data-disabled>
              <FieldLabel>Date of birth</FieldLabel>
              <Input value={dateOfBirth} disabled />
            </Field>
          </FieldGroup>
        </FieldSet>

        {state.error && (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={pending} className="w-full">
          {pending && <Spinner />}
          Save changes
        </Button>
      </FieldGroup>
    </Form>
  )
}
