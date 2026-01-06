import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authClient } from '@/lib/auth-client'
import { Loading } from './ui/loading'

export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function checkSession() {
      const session = await authClient.getSession()
      if (!cancelled) {
        setIsAuthenticated(!!session.data)
        setIsLoading(false)
      }
    }
    checkSession()
    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) {
    return <Loading fullPage />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
