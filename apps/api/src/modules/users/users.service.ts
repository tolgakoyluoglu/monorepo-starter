import { BadRequestException, Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(UsersService.name)
  }

  async findOne(id: string) {
    this.logger.info({ userId: id }, 'Finding user by ID %s', id)

    const user = await this.usersRepository.findById(id)

    if (!user) {
      this.logger.warn({ userId: id }, 'User not found')
      throw new BadRequestException('User not found')
    }

    return user
  }

  async update(id: string, data: { name?: string; email?: string; image?: string }) {
    this.logger.info({ userId: id, data }, 'Updating user')

    const user = await this.usersRepository.update(id, data)

    if (!user) {
      this.logger.warn({ userId: id }, 'User not found for update')
      throw new BadRequestException('User not found')
    }

    this.logger.info({ userId: id }, 'User updated successfully')

    return user
  }
}
