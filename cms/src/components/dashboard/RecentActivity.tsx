import { Clock, User, FileText, MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

// TODO: 実際のデータを取得
const mockActivities = [
  {
    id: '1',
    type: 'lead',
    description: '新規リード獲得',
    detail: '株式会社テックコーポレーション - AI開発相談',
    character: 'YUYA',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
    icon: User,
    color: 'text-cms-primary',
  },
  {
    id: '2',
    type: 'content',
    description: 'コンテンツ公開',
    detail: 'AI画像生成ツールの使い方解説',
    character: 'YUYA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
    icon: FileText,
    color: 'text-cms-secondary',
  },
  {
    id: '3',
    type: 'inquiry',
    description: '問い合わせ対応',
    detail: '楽曲ライセンスに関する問い合わせ',
    character: 'AOBA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5時間前
    icon: MessageSquare,
    color: 'text-cms-info',
  },
]

export default function RecentActivity() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cms-text">最近のアクティビティ</h3>
        <Clock className="w-5 h-5 text-cms-text-muted" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-cms-surface-hover ${activity.color}`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cms-text">
                  {activity.description}
                </p>
                <p className="text-sm text-cms-text-muted truncate">
                  {activity.detail}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activity.character === 'YUYA' 
                      ? 'bg-purple-400/20 text-purple-400' 
                      : 'bg-pink-400/20 text-pink-400'
                  }`}>
                    {activity.character === 'YUYA' ? '傾奇ユウヤ' : '猫空あおば'}
                  </span>
                  <span className="text-xs text-cms-text-muted">
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true,
                      locale: ja 
                    })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-cms-border">
        <a 
          href="/activities" 
          className="text-sm text-cms-primary hover:text-cms-primary-hover transition-colors duration-200"
        >
          すべてのアクティビティを見る →
        </a>
      </div>
    </div>
  )
} 