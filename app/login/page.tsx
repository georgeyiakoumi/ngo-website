'use client'

import { useActionState } from 'react'
import Form from 'next/form'
import { login } from './actions'
import { type LoginFormState } from './schema'
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

const initialState: LoginFormState = {
  values: { email: '', password: '' },
  errors: null,
  success: false,
}

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Log in
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
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

              <Field data-invalid={!!state.errors?.password?.length} data-disabled={pending}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  disabled={pending}
                  aria-invalid={!!state.errors?.password?.length}
                  required
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              {state.message && (
                <p className="text-sm text-destructive" role="alert">
                  {state.message}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full">
                {pending && <Spinner />}
                Log in
              </Button>

              <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                <Link
                  href="/forgot-password"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return <LoginForm />
}
