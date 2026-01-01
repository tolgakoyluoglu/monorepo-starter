import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ErrorStateProps = {
  title?: string
  message?: string
  cta?: string
  ctaUrl?: string
}

export const ErrorState = ({
  title = 'Något gick fel',
  message = 'Försök igen senare eller kontakta support',
  cta = '',
  ctaUrl = '',
}: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle size={24} className="text-destructive" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{message}</p>
        </div>
        {cta && (
          <Button className="mt-2" onClick={() => (window.location.href = ctaUrl)}>
            {cta}
          </Button>
        )}
      </div>
    </div>
  )
}
