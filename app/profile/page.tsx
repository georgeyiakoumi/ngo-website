import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url, region, date_of_birth')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/login')
  }

  const initials = (profile.display_name || user.email || '?')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center">
          <Avatar className="size-20">
            <AvatarImage
              src={profile.avatar_url ?? undefined}
              alt={profile.display_name ?? 'Profile'}
            />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {profile.display_name || 'Your profile'}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <ProfileForm
            displayName={profile.display_name ?? ''}
            region={profile.region}
            dateOfBirth={profile.date_of_birth}
            email={user.email ?? ''}
          />
        </CardContent>
      </Card>
    </div>
  )
}
