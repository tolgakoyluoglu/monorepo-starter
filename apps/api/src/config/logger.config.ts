import { Params } from 'nestjs-pino'

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'info',
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.confirmPassword',
        'req.body.currentPassword',
        'req.body.newPassword',
      ],
      censor: '[REDACTED]',
    },
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss.l',
              ignore: 'pid,hostname',
              singleLine: true,
            },
          }
        : undefined,
    customProps: () => ({
      context: 'HTTP',
    }),
    serializers: {
      req(req: { id?: unknown; method?: unknown; url?: unknown }) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
        }
      },
      res(res: { statusCode?: unknown }) {
        return {
          statusCode: res.statusCode,
        }
      },
    },
    autoLogging: {
      ignore: (req: { url?: string }) => req.url === '/health',
    },
  },
  forRoutes: ['*path'],
}
