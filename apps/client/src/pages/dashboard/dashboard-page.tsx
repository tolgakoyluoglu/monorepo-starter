import { useSession } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const DashboardPage = () => {
  const { user, isLoading } = useSession()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 h-full">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-9 w-9 rounded-lg mb-3" />
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className={'grid gap-4 ' + (user?.businessId ? 'lg:grid-cols-3' : 'lg:grid-cols-1')}>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </CardTitle>
            <CardDescription className="text-base">
              Here's an overview of your business
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
