import { Users, FileText, Calendar, TrendingUp } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    totalLeads: number
    publishedContent: number
    upcomingStreams: number
    conversionRate: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'リード総数',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-cms-primary',
      bgColor: 'bg-cms-primary/10',
    },
    {
      title: '公開コンテンツ',
      value: stats.publishedContent,
      icon: FileText,
      color: 'text-cms-secondary',
      bgColor: 'bg-cms-secondary/10',
    },
    {
      title: '予定配信',
      value: stats.upcomingStreams,
      icon: Calendar,
      color: 'text-cms-info',
      bgColor: 'bg-cms-info/10',
    },
    {
      title: 'コンバージョン率',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-cms-success',
      bgColor: 'bg-cms-success/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cms-text-muted">{stat.title}</p>
                <p className="text-2xl font-bold text-cms-text mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 