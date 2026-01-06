interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  fullPage?: boolean
  text?: string
}

const sizeClasses = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-[3px]',
  lg: 'w-14 h-14 border-4',
}

export const Loading = ({ size = 'md', fullPage = false, text }: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-primary rounded-full animate-spin`}
      ></div>
      {text && <p className="text-sm animate-pulse">{text}</p>}
    </div>
  )

  if (fullPage) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center">{content}</div>
    )
  }

  return content
}
