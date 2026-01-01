import { Navigate } from 'react-router-dom'
import { useSession } from '@/hooks/use-auth'
import { EmailVerificationDialog } from './email-verification-dialog'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isAuthenticated } = useSession()

  if (isLoading) {
    return <>Loading</>
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
