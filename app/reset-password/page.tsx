'use client'

import { useActionState } from 'react'
import Form from 'next/form'
import { resetPassword } from './actions'
import { type ResetPasswordFormState } from './schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const initialState: ResetPasswordFormState = {
  values: { password: '', confirmPassword: '' },
  errors: null,
  success: false,
}

function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    resetPassword,
    initialState
  )

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Set new password
          </CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction}>
            <FieldGroup>
              <Field data-invalid={!!state.errors?.password?.length} data-disabled={pending}>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={8}
                  disabled={pending}
                  aria-invalid={!!state.errors?.password?.length}
                  required
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!state.errors?.confirmPassword?.length} data-disabled={pending}>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  minLength={8}
                  disabled={pending}
                  aria-invalid={!!state.errors?.confirmPassword?.length}
                  required
                />
                {state.errors?.confirmPassword && (
                  <FieldError>{state.errors.confirmPassword[0]}</FieldError>
                )}
              </Field>

              {state.message && (
                <p className="text-sm text-destructive" role="alert">
                  {state.message}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full">
                {pending && <Spinner />}
                Update password
              </Button>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
