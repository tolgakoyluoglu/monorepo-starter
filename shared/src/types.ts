export type UserRole = 'OWNER' | 'STAFF' | 'CONSUMER'

export type User = {
  id: string
  email: string
  name: string
  emailVerified: boolean
  image?: string
  role: UserRole
  businessId?: string | null
  createdAt: Date
  updatedAt: Date
}

export type Session = {
  id: string
  userId: string
  expiresAt: Date
  token: string
  ipAddress?: string
  userAgent?: string
}

export type AuthResponse = {
  user: User
  session: Session
}

export type LoginResponse = AuthResponse

export type RegisterResponse = AuthResponse

export type ApiResponse<T = unknown> = {
  data: T
  error?: string
}

export type ApiError = {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
