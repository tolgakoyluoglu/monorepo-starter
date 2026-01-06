import { Reflector } from '@nestjs/core'
import { UserRole } from './current-user.decorator'

export const Roles = Reflector.createDecorator<UserRole[]>()
