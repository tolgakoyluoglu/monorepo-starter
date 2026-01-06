import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  basePath: '/api/auth',
})

export const signInWithGoogle = () => {
  return authClient.signIn.social({
    provider: 'google',
    callbackURL: `${window.location.origin}/dashboard`,
  })
}

export const signInWithMicrosoft = () => {
  return authClient.signIn.social({
    provider: 'microsoft',
    callbackURL: `${window.location.origin}/dashboard`,
  })
}

export const signInWithGithub = () => {
  return authClient.signIn.social({
    provider: 'github',
    callbackURL: `${window.location.origin}/dashboard`,
  })
}
