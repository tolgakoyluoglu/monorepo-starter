import { Navigate } from 'react-router-dom'
import { useSession } from '@/hooks/use-auth'
import { EmailVerificationDialog } from './email-verification-dialog'
import { Loading } from './ui/loading'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isAuthenticated } = useSession()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-200">
        <Loading />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user?.emailVerified && user?.email) {
    return (
      <>
        {children}
        <EmailVerificationDialog email={user.email} onVerified={() => window.location.reload()} />
      </>
    )
  }

  return <>{children}</>
}
