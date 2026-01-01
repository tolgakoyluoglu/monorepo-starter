import { createAuthClient } from 'better-auth/react'
import { emailOTPClient } from 'better-auth/client/plugins'
import type { User } from '@repo/shared'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  plugins: [emailOTPClient()],
})

export type { User }

export type Session = typeof authClient.$Infer.Session & {
  user: User
}
