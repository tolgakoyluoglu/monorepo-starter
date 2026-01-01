import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { validateEnv, swaggerConfig } from './config'
import { setupAuthHandler } from './modules/auth/auth.handler'
import { setupFastifyPlugins, setupGracefulShutdown } from './common'

validateEnv()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      bodyLimit: 10485760,
    }),
    { bufferLogs: true },
  )

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3000)
  const host = configService.get<string>('HOST', '0.0.0.0')
  const nodeEnv = configService.get<string>('NODE_ENV', 'development')
  const corsOrigin = configService.get<string>('CORS_ORIGIN')?.split(',')

  app.useLogger(app.get(Logger))
  app.setGlobalPrefix('api')

  await setupFastifyPlugins(app, corsOrigin, nodeEnv)
  setupAuthHandler(app)

  if (nodeEnv !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: 'API Documentation',
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showRequestHeaders: true,
      },
    })
  }

  setupGracefulShutdown(app)
  await app.listen(port, host)

  const logger = app.get(Logger)
  const appUrl = await app.getUrl()
  logger.log(`Application running on: ${appUrl}`)
  logger.log(`Environment: ${nodeEnv}`)
  if (nodeEnv !== 'production') {
    logger.log(`API Docs: ${appUrl}/docs`)
  }
}

void bootstrap()
