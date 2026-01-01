import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import type { RequestWithSession, UserSession } from '@/common'
import { auth } from '@/modules/auth/auth-config'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>()
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      throw new UnauthorizedException('No valid session')
    }

    request.session = session as UserSession

    return true
  }
}
