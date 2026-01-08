import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const resetSchema = z
  .object({
    otp: z.string().length(4, 'Code must be 4 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type EmailInput = z.infer<typeof emailSchema>
type ResetInput = z.infer<typeof resetSchema>

export const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otp, setOtp] = useState('')

  const emailForm = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const resetForm = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: '', password: '', confirmPassword: '' },
  })

  const handleSendCode = async (data: EmailInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await authClient.forgetPassword.emailOtp({ email: data.email })
      if (result.error) {
        setError(result.error.message || 'Failed to send reset code')
      } else {
        setEmail(data.email)
        setStep('reset')
      }
    } catch {
      setError('Failed to send reset code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async (data: ResetInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await authClient.emailOtp.resetPassword({
        email,
        otp: data.otp,
        password: data.password,
      })
      if (result.error) {
        setError(result.error.message || 'Failed to reset password')
      } else {
        navigate('/login')
      }
    } catch {
      setError('Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await authClient.forgetPassword.emailOtp({ email })
    } catch {
      setError('Failed to resend code')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'email') {
    return (
      <div className="flex flex-col gap-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={emailForm.handleSubmit(handleSendCode)}>
          <FieldGroup>
            <Field data-invalid={!!emailForm.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...emailForm.register('email')}
              />
              <FieldError>{emailForm.formState.errors.email?.message}</FieldError>
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <p className="text-sm text-muted-foreground text-center">
        Enter the 4-digit code sent to <strong>{email}</strong>
      </p>
      <form onSubmit={resetForm.handleSubmit((data) => handleReset({ ...data, otp }))}>
        <FieldGroup>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Field data-invalid={!!resetForm.formState.errors.password}>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...resetForm.register('password')}
            />
            <FieldError>{resetForm.formState.errors.password?.message}</FieldError>
          </Field>

          <Field data-invalid={!!resetForm.formState.errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...resetForm.register('confirmPassword')}
            />
            <FieldError>{resetForm.formState.errors.confirmPassword?.message}</FieldError>
          </Field>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleResendCode}
            disabled={isLoading}
          >
            Resend Code
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
