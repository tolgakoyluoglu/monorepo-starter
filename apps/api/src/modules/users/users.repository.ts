import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { User, users, DbService } from '@/db'

@Injectable()
export class UsersRepository {
  constructor(private readonly dbService: DbService) {}

  async findById(id: string): Promise<Omit<User, 'role' | 'superAdmin'> | null> {
    const result = await this.dbService.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return result[0] ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return result[0] ?? null
  }

  async update(
    id: string,
    data: Partial<Pick<User, 'name' | 'email' | 'image'>>,
  ): Promise<Omit<User, 'role' | 'superAdmin'> | null> {
    const result = await this.dbService.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })

    return result[0] ?? null
  }

  async delete(id: string): Promise<void> {
    await this.dbService.db.delete(users).where(eq(users.id, id))
  }
}
