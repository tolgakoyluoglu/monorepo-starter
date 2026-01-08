import { Link } from 'react-router-dom'
import { LoginForm } from './login-form'
import { FaChevronLeft } from 'react-icons/fa'

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-primary to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtMnYtNGgydi0ySDI0djJoMnY0aC0ydjJoMnY0aC0ydjJoMTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">Welcome back!</h1>
            <p className="text-lg opacity-80 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <Link
            to="/"
            className="p-4 lg:p-8 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-foreground transition-colors"
          >
            <FaChevronLeft size={16} />
            Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-sm">
            <div className="mb-6 text-center lg:text-left space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center text-sm space-y-2">
              <Link
                to="/forgot-password"
                className="text-muted-foreground no-underline hover:text-primary transition-colors"
              >
                Forgot your password?
              </Link>
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary font-medium no-underline hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
