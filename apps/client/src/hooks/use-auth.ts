import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import type { LoginInput, RegisterInput } from '@repo/shared'

export function useSession() {
  const { data, isPending, error } = authClient.useSession()
  const user = data?.user

  return {
    user,
    session: data?.session,
    isLoading: isPending,
    isAuthenticated: !!data,
    error,
  }
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      return authClient.signIn.email({
        email: data.email,
        password: data.password,
      })
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      return authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      })
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      return authClient.forgetPassword.emailOtp({
        email,
      })
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ password, token }: { password: string; token: string }) => {
      return authClient.resetPassword({
        newPassword: password,
        token,
      })
    },
  })
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      return authClient.signOut()
    },
  })
}
