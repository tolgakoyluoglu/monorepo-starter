import { Navigate } from 'react-router-dom'
import { useSession } from '@/hooks/use-auth'
import { Loading } from './ui/loading'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useSession()

  if (isLoading) {
    return <Loading fullPage />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
