import { useState } from 'react'
import { MdDashboard, MdLogout, MdMenu, MdSettings } from 'react-icons/md'
import { useSignOut } from '@/hooks/use-auth'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const navLinks = [
  { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
  { name: 'Settings', icon: MdSettings, path: '#' },
]

export const Sidebar = () => {
  const signOut = useSignOut()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut.mutateAsync()
    window.location.reload()
  }

  return (
    <aside className="hidden lg:block h-[98.5vh] w-16 hover:w-56 bg-card border-2 border-t-0 border-l-0 overflow-hidden shrink-0 transition-all duration-300 ease-in-out rounded-br-md group">
      <nav className="h-full flex flex-col py-4 px-2">
        <div>
          <div className="flex items-center gap-4 p-3 rounded-lg overflow-hidden">
            <span className="shrink-0 h-6 w-6 min-w-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              FS
            </span>
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-foreground">
              Fullstack Starter
            </span>
          </div>
          <ul className="list-none flex flex-col gap-2 pt-6 m-0 p-0">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-lg no-underline transition-colors duration-150 text-foreground overflow-hidden',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent',
                  )}
                  to={item.path}
                >
                  <span className="shrink-0 min-w-6">
                    <item.icon size={24} />
                  </span>
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-4 p-3 rounded-lg w-full bg-transparent border-none text-foreground text-base transition-colors duration-150 hover:bg-accent overflow-hidden"
          >
            <span className="shrink-0 min-w-6">
              <MdLogout size={24} />
            </span>
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

export const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const signOut = useSignOut()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut.mutateAsync()
    window.location.reload()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MdMenu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              FS
            </span>
            Fullstack Starter
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg no-underline transition-colors text-foreground',
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent',
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full bg-transparent border-none text-foreground text-base transition-colors hover:bg-accent mt-4 cursor-pointer"
          >
            <MdLogout size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
