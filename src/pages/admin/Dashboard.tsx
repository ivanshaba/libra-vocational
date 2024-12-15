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
import { AdminStats } from '@/types/admin'

export function Dashboard() {
  const { data: stats = defaultStats } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: api.getAdminStats,
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Posts"
          value={stats.posts}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard
          title="Coaches"
          value={stats.coaches}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Gallery Items"
          value={stats.galleryItems}
          icon={<Image className="h-6 w-6" />}
        />
        <StatsCard
          title="Facilities"
          value={stats.facilities}
          icon={<Building2 className="h-6 w-6" />}
        />
        <StatsCard
          title="Programs"
          value={stats.programs}
          icon={<Dumbbell className="h-6 w-6" />}
        />
        <StatsCard
          title="Registrations"
          value={stats.registrations}
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
            {stats.recentActivity.map((activity: AdminStats['recentActivity'][0]) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <span className="text-sm">{activity.type}</span>
              </div>
            ))}
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

const defaultStats = {
  posts: 0,
  coaches: 0,
  galleryItems: 0,
  facilities: 0,
  programs: 0,
  registrations: 0,
  recentActivity: [],
}
