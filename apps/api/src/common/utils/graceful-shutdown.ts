import { INestApplication } from '@nestjs/common'
import { Logger } from 'nestjs-pino'

export function setupGracefulShutdown(app: INestApplication): void {
  app.enableShutdownHooks()

  let isShuttingDown = false

  const shutdown = async (signal: string) => {
    if (isShuttingDown) return
    isShuttingDown = true

    const logger = app.get(Logger)
    logger.log(`Received ${signal}, closing server gracefully...`)

    const forceExit = setTimeout(() => {
      logger.warn('Forced shutdown after timeout')
      process.exit(1)
    }, 500)

    try {
      await app.close()
      clearTimeout(forceExit)
      logger.log('Server closed successfully')
      process.exit(0)
    } catch (error) {
      clearTimeout(forceExit)
      logger.error('Error during shutdown', error)
      process.exit(1)
    }
  }

  process.on('SIGTERM', () => void shutdown('SIGTERM'))
  process.on('SIGINT', () => void shutdown('SIGINT'))
  process.on('SIGHUP', () => void shutdown('SIGHUP'))
}
