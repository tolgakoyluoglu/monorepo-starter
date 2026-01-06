import { useSession } from '@/hooks/use-auth'
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Link, Navigate } from 'react-router-dom'
import { signInWithGithub, signInWithGoogle, signInWithMicrosoft } from '@/lib/auth-client'

export const LoginPage = () => {
  const { user } = useSession()

  if (user) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-primary border-r p-10 text-white dark:border-r">
        <div className="absolute inset-0 bg-linear-to-br from-primary-900 via-primary-800 to-black" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Monorepo Starter
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in or create an account to get started
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-2 h-12 text-base"
            >
              <FaGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => signInWithMicrosoft()}
              className="w-full flex items-center justify-center gap-2 h-12 text-base"
            >
              <FaMicrosoft className="h-5 w-5" />
              <span>Continue with Microsoft</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => signInWithGithub()}
              className="w-full flex items-center justify-center gap-2 h-12 text-base"
            >
              <FaGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>
            <Button variant="link" asChild>
              <Link to="/">Go back</Link>
            </Button>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
