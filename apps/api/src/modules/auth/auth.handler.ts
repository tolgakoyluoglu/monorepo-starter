import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { auth } from './auth-config'

export function setupAuthHandler(app: NestFastifyApplication) {
  app
    .getHttpAdapter()
    .getInstance()
    .all('/api/auth/*', async (request, reply) => {
      const protocol =
        (request.headers['x-forwarded-proto'] as string) || request.protocol || 'http'
      const host = request.hostname || request.headers.host || 'localhost'
      const url = new URL(request.url, `${protocol}://${host}`)

      const response = await auth.handler(
        new Request(url, {
          method: request.method,
          headers: new Headers(request.headers as HeadersInit),
          body:
            request.method !== 'GET' && request.method !== 'HEAD'
              ? JSON.stringify(request.body)
              : undefined,
        }),
      )

      reply.status(response.status)
      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })
      const body = await response.text()
      return reply.send(body)
    })
}
