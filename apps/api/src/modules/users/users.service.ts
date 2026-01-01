import { BadRequestException, Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(UsersService.name)
  }

  async findOne(id: string) {
    this.logger.info({ userId: id }, 'Finding user by ID %s', id)

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      this.logger.warn({ userId: id }, 'User not found')
      throw new BadRequestException('User not found')
    }

    return user
  }

  async update(id: string, data: { name?: string; email?: string; image?: string }) {
    this.logger.info({ userId: id, data }, 'Updating user')

    const user = await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    this.logger.info({ userId: id }, 'User updated successfully')

    return user
  }
}
