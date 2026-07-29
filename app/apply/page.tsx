import { redirect } from 'next/navigation'
import { getAccessContext } from '@/lib/auth'
import { canAccess, type GatingMetadata } from '@/lib/gating'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ApplicationForm } from './application-form'

/**
 * Example gated application form.
 *
 * In production, this metadata would come from Strapi — the form's
 * gating fields determine who can see and submit it. For now, this
 * is hardcoded as a demonstration of the gating system.
 */
const EXAMPLE_FORM: GatingMetadata & { title: string; description: string } = {
  title: 'Youth Leadership Programme',
  description:
    'Apply to join the Youth Leadership Programme. Open to members aged 23–30 in all regions.',
  visibility: 'member',
  regions: null, // all regions
  minAge: 23,
  maxAge: 30,
}

export default async function ApplyPage() {
  const context = await getAccessContext()

  // Not logged in — redirect to login
  if (!context.isLoggedIn) {
    redirect('/login')
  }

  // Check eligibility
  const eligible = canAccess(EXAMPLE_FORM, context)

  if (!eligible) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Not eligible
            </CardTitle>
            <CardDescription>
              You are not eligible for this programme based on your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {EXAMPLE_FORM.title}
          </CardTitle>
          <CardDescription>{EXAMPLE_FORM.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm
            formTitle={EXAMPLE_FORM.title}
            visibility={EXAMPLE_FORM.visibility}
            regions={EXAMPLE_FORM.regions}
            minAge={EXAMPLE_FORM.minAge}
            maxAge={EXAMPLE_FORM.maxAge}
          />
        </CardContent>
      </Card>
    </div>
  )
}
