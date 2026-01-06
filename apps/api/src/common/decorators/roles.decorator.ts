import { Reflector } from '@nestjs/core'

type UserRole = 'OWNER' | 'EMPLOYEE' | 'ADMIN'
export const Roles = Reflector.createDecorator<UserRole[]>()
