import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API documentation for the application')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter your bearer token',
      in: 'header',
    },
    'access-token',
  )
  .addTag('Users', 'User management endpoints')
  .addTag('Auth', 'Authentication endpoints')
  .build()
