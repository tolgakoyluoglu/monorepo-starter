import { Reflector } from '@nestjs/core'
import { UserRole } from '@repo/shared'

export const Roles = Reflector.createDecorator<UserRole[]>()
