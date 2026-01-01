import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { ModeToggle } from '../mode-toggle'
import { MobileNav } from './sidebar'
import { cn } from '@/lib/utils'

export function Header({ fullWidth }: { fullWidth?: boolean }) {
  const { data: session } = authClient.useSession()

  return (
    <nav
      className={cn(
        'bg-card border-2 p-4',
        fullWidth ? 'mr-0 rounded-none' : 'lg:mr-4 rounded-md rounded-t-none',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {session && <MobileNav />}
          <Link to={session ? '/dashboard' : '/'} className="flex items-center gap-2 no-underline">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              B
            </div>
            <span className="font-semibold text-lg text-foreground">Fullstack Starter</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {session ? (
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {session.user?.email}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="hidden sm:inline-flex">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
