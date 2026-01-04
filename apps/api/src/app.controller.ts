import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DbService } from '@/db'
import { sql } from 'drizzle-orm'

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Get('health')
  async getHealth() {
    const startTime = Date.now()
    let dbStatus = 'disconnected'
    let dbResponseTime = 0

    try {
      const dbStart = Date.now()
      await this.dbService.db.execute(sql`SELECT 1`)
      dbResponseTime = Date.now() - dbStart
      dbStatus = 'connected'
    } catch {
      dbStatus = 'error'
    }

    return {
      status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus,
        responseTime: `${dbResponseTime}ms`,
      },
      memory: {
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
      },
      responseTime: `${Date.now() - startTime}ms`,
    }
  }
}
