import Link from 'next/link'
import type { Route } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MobileNav } from './mobile-nav'
import { LogoutButton } from './logout-button'

const publicLinks: { href: Route; label: string }[] = [
  { href: '/about', label: 'About' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isLoggedIn = !!user

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          NGO
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile nav */}
        <MobileNav isLoggedIn={isLoggedIn} links={publicLinks} />
      </div>
    </header>
  )
}
