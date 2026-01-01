import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins'
import { PrismaService } from '@/prisma/prisma.service'
import { sendEmail } from '@/common/services'

const prisma = new PrismaService()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'OWNER',
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: `
          <h1>Reset your password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: false,
  },
  plugins: [
    emailOTP({
      otpLength: 4,
      expiresIn: 300,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'email-verification') {
          await sendEmail({
            to: email,
            subject: 'Verify your email',
            html: `
              <h1>Verify your email</h1>
              <p>Your verification code is:</p>
              <h2 style="font-size: 32px; letter-spacing: 8px; text-align: center;">${otp}</h2>
              <p>This code expires in 5 minutes.</p>
              <p>If you didn't create an account, please ignore this email.</p>
            `,
          })
        } else if (type === 'forget-password') {
          await sendEmail({
            to: email,
            subject: 'Reset your password',
            html: `
              <h1>Reset your password</h1>
              <p>Your password reset code is:</p>
              <h2 style="font-size: 32px; letter-spacing: 8px; text-align: center;">${otp}</h2>
              <p>This code expires in 5 minutes.</p>
              <p>If you didn't request this, please ignore this email.</p>
            `,
          })
        }
      },
    }),
  ],
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  trustedOrigins: ['http://localhost:5173', ...(process.env.CORS_ORIGIN?.split(',') || [])],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
})
