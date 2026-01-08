import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { FaExclamationCircle } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

interface EmailVerificationDialogProps {
  email: string
  onVerified: () => void
}

export const EmailVerificationDialog = ({ email, onVerified }: EmailVerificationDialogProps) => {
  const [code, setCode] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendCode = async () => {
    setIsSending(true)
    setError(null)
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
      })
      if (result.error) {
        setError(result.error.message || 'Failed to send verification code')
      } else {
        setCodeSent(true)
      }
    } catch {
      setError('Failed to send verification code')
    } finally {
      setIsSending(false)
    }
  }

  const handleVerify = async () => {
    if (code.length !== 4) {
      setError('Please enter a 4-digit code')
      return
    }
    setIsVerifying(true)
    setError(null)
    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      })
      if (result.error) {
        setError(result.error.message || 'Invalid verification code')
      } else {
        onVerified()
      }
    } catch {
      setError('Failed to verify code')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            We need to verify your email address <strong>{email}</strong> before you can continue.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <FaExclamationCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!codeSent ? (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-sm text-muted-foreground text-center">
                Click the button below to receive a 4-digit verification code.
              </p>
              <Button onClick={handleSendCode} disabled={isSending} className="w-full">
                {isSending ? 'Sending...' : 'Send code'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground text-center">
                Enter the 4-digit code sent to your email.
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={4} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying || code.length !== 4}
                  className="w-full"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSendCode}
                  disabled={isSending}
                  className="w-full"
                >
                  {isSending ? 'Sending...' : 'Resend code'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
