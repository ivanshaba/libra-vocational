import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import {
  FileText,
  Users,
  Image,
  Building2,
  Dumbbell,
  ClipboardList,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from "date-fns"
import { Stats } from '@/types/admin'

export function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: api.getStats,
  })

  // Use loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (!stats) {
    return <div>No stats found</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Posts"
          value={stats?.counts.posts || 0}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard
          title="Coaches"
          value={stats?.counts.coaches || 0}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Gallery Items"
          value={stats?.counts.galleryItems || 0}
          icon={<Image className="h-6 w-6" />}
        />
        <StatsCard
          title="Facilities"
          value={stats?.counts.facilities || 0}
          icon={<Building2 className="h-6 w-6" />}
        />
        <StatsCard
          title="Programs"
          value={stats?.counts.programs || 0}
          icon={<Dumbbell className="h-6 w-6" />}
        />
        <StatsCard
          title="Registrations"
          value={stats?.counts.registrations || 0}
          icon={<ClipboardList className="h-6 w-6" />}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentActivities.map(
              (activity: Stats['data']['recentActivities'][0]) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(activity.createdAt, 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.user?.email.split('@')[0] || 'System'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.ipAddress}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.userAgent}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.entityType} {activity.entityId}
                  </p>
                <span className="text-sm">{activity.type}</span>
              </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
