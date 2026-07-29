'use client'

import { useActionState } from 'react'
import { forgotPassword } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    async (
      _prev: { error?: string; success?: string } | null,
      formData: FormData
    ) => {
      return await forgotPassword(formData)
    },
    null
  )

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
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
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
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
              {pending ? 'Sending...' : 'Send reset link'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Back to login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
