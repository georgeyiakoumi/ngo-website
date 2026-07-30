import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const legalLinks = [
  { href: '/privacy' as const, label: 'Privacy Policy' },
  { href: '/cookies' as const, label: 'Cookie Policy' },
  { href: '/accessibility' as const, label: 'Accessibility' },
]

const siteLinks = [
  { href: '/about' as const, label: 'About' },
  { href: '/programmes' as const, label: 'Programmes' },
  { href: '/news' as const, label: 'News' },
  { href: '/contact' as const, label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">NGO</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Supporting communities across 8 regions worldwide.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Site</p>
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Legal</p>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} NGO. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
