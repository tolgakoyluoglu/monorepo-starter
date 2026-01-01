import { NestFastifyApplication } from '@nestjs/platform-fastify'
import rateLimit from '@fastify/rate-limit'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

export async function setupFastifyPlugins(
  app: NestFastifyApplication,
  corsOrigin?: string[],
  nodeEnv?: string,
) {
  await app.register(cors, {
    origin: corsOrigin || ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
  })

  await app.register(helmet, {
    contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })

  await app.register(rateLimit, {
    global: true,
    max: (req) => {
      if (req.url.startsWith('/api/auth')) {
        return 100
      }
      return 200
    },
    timeWindow: 1000 * 60,
    keyGenerator: (req) => req.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
    }),
  })
}
