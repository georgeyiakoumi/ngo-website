'use client'

import * as React from 'react'
import { useActionState } from 'react'
import Form from 'next/form'
import { toast } from 'sonner'
import { forgotPassword } from './actions'
import { type ForgotPasswordFormState } from './schema'
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
import Link from 'next/link'

const initialState: ForgotPasswordFormState = {
  values: { email: '' },
  errors: null,
  success: false,
}

function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPassword,
    initialState
  )

  React.useEffect(() => {
    if (state.success && state.message) {
      toast(state.message)
    }
  }, [state.success, state.message])

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Reset your password
          </CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction}>
            <FieldGroup>
              <Field data-invalid={!!state.errors?.email?.length} data-disabled={pending}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.values?.email}
                  disabled={pending}
                  aria-invalid={!!state.errors?.email?.length}
                  required
                />
                {state.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>

              {state.message && !state.success && (
                <p className="text-sm text-destructive" role="alert">
                  {state.message}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full">
                {pending && <Spinner />}
                Send reset link
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Back to login
                </Link>
              </p>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
