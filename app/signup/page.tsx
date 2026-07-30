'use client'

import { useActionState } from 'react'
import Form from 'next/form'
import { signup } from './actions'
import { type SignupFormState } from './schema'
import { REGIONS } from '@/lib/regions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const initialState: SignupFormState = {
  values: {
    displayName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    region: '',
  },
  errors: null,
  success: false,
}

function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState)

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up to access member content and programmes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction}>
            <FieldGroup>
              <Field data-invalid={!!state.errors?.displayName?.length} data-disabled={pending}>
                <FieldLabel htmlFor="displayName">Display name</FieldLabel>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  defaultValue={state.values?.displayName}
                  disabled={pending}
                  aria-invalid={!!state.errors?.displayName?.length}
                  required
                />
                {state.errors?.displayName && (
                  <FieldError>{state.errors.displayName[0]}</FieldError>
                )}
              </Field>

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
                  minLength={8}
                  disabled={pending}
                  aria-invalid={!!state.errors?.password?.length}
                  required
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!state.errors?.dateOfBirth?.length} data-disabled={pending}>
                <FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  defaultValue={state.values?.dateOfBirth}
                  disabled={pending}
                  aria-invalid={!!state.errors?.dateOfBirth?.length}
                  required
                />
                {state.errors?.dateOfBirth ? (
                  <FieldError>{state.errors.dateOfBirth[0]}</FieldError>
                ) : (
                  <FieldDescription>
                    You must be at least 18 years old to sign up.
                  </FieldDescription>
                )}
              </Field>

              <Field data-invalid={!!state.errors?.region?.length} data-disabled={pending}>
                <FieldLabel htmlFor="region">Region</FieldLabel>
                <Select
                  name="region"
                  defaultValue={state.values?.region || undefined}
                  disabled={pending}
                  required
                >
                  <SelectTrigger
                    id="region"
                    aria-invalid={!!state.errors?.region?.length}
                  >
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r.slug} value={r.slug}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state.errors?.region && (
                  <FieldError>{state.errors.region[0]}</FieldError>
                )}
              </Field>

              {state.message && (
                <p className="text-sm text-destructive" role="alert">
                  {state.message}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full">
                {pending && <Spinner />}
                Sign up
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Log in
                </Link>
              </p>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignupPage() {
  return <SignupForm />
}
