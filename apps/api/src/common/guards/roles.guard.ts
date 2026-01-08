import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RequestWithSession, Roles } from '@/common/decorators'

type UserRole = 'OWNER' | 'EMPLOYEE' | 'ADMIN'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }
    const request = context.switchToHttp().getRequest<RequestWithSession>()

    const user = request.session.user
    if (!user) {
      throw new ForbiddenException('User not found.')
    }

    const hasRole = requiredRoles.some((role) => user.role === role)
    if (hasRole) {
      return true
    }

    throw new ForbiddenException('You do not have the necessary permissions.')
  }
}
