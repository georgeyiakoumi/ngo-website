'use client'

import { useActionState } from 'react'
import { updateProfile } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REGIONS } from '@/lib/regions'

interface ProfileFormProps {
  displayName: string
  region: string
  dateOfBirth: string
  email: string
}

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
      _prev: { error?: string; success?: string } | null,
      formData: FormData
    ) => {
      return await updateProfile(formData)
    },
    null
  )

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Editable
        </h3>

        <div className="flex flex-col gap-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            defaultValue={displayName}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Read-only
        </h3>

        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input value={email} disabled />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Region</Label>
          <Input value={regionLabel} disabled />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Date of birth</Label>
          <Input value={dateOfBirth} disabled />
        </div>
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

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
}
