import { Module } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { ZodValidationPipe } from 'nestjs-zod'
import { loggerConfig } from './config'
import { HttpExceptionFilter, SanitizePipe } from './common'
import { AppController } from './app.controller'
import { DbModule } from './db'
import { AuthModule } from './modules/auth/auth-module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    DbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: SanitizePipe,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
