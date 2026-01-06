import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export function useSession() {
  const { data, isPending, error } = authClient.useSession()

  return {
    user: data?.user,
    session: data?.session,
    isLoading: isPending,
    isAuthenticated: !!data,
    error,
  }
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      return authClient.signOut()
    },
  })
}
