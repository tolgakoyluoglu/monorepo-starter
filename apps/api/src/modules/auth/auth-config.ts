import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/db/schema'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool, { schema })

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      account: schema.accounts,
      session: schema.sessions,
      verification: schema.verifications,
    },
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'OWNER',
        input: false,
      },
      superAdmin: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  trustedOrigins: ['http://localhost:5173', ...(process.env.CORS_ORIGIN?.split(',') || [])],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
})
