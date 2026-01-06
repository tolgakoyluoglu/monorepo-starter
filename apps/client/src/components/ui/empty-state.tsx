import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  icon?: React.ElementType
  className?: string
  iconClassName?: string
  action?: React.ReactNode
}

export function EmptyState({
  title,
  icon: Icon,
  className,
  iconClassName,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'p-8 py-12 text-center border rounded-lg bg-card text-card-foreground flex flex-col items-center justify-center',
        className,
      )}
    >
      {Icon && (
        <Icon
          strokeWidth={1.25}
          className={cn('w-12 h-12 mx-auto mb-4 text-muted-foreground', iconClassName)}
        />
      )}
      {title && <p className="text-muted-foreground mb-4">{title}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
