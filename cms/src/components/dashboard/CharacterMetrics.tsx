import { Eye, Download, MessageSquare, DollarSign } from 'lucide-react'

interface CharacterMetricsProps {
  character: 'YUYA' | 'AOBA'
}

type YuyaMetrics = {
  pageViews: number
  toolDownloads: number
  b2bLeads: number
  revenue: number
}

type AobaMetrics = {
  pageViews: number
  musicPlays: number
  stemDownloads: number
  revenue: number
}

export default function CharacterMetrics({ character }: CharacterMetricsProps) {
  // TODO: 実際のデータを取得
  const mockData = {
    YUYA: {
      name: '傾奇ユウヤ',
      domain: 'yuya-kabuki.com',
      metrics: {
        pageViews: 12500,
        toolDownloads: 342,
        b2bLeads: 28,
        revenue: 450000,
      } as YuyaMetrics,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    AOBA: {
      name: '猫空あおば',
      domain: 'aoba-nekosora.com',
      metrics: {
        pageViews: 8900,
        musicPlays: 1250,
        stemDownloads: 89,
        revenue: 120000,
      } as AobaMetrics,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
    },
  }

  const data = mockData[character]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cms-text">{data.name}</h3>
        <span className="text-sm text-cms-text-muted">{data.domain}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
            <span className="text-sm text-cms-text-muted">ページビュー</span>
          </div>
          <span className="font-medium text-cms-text">
            {data.metrics.pageViews.toLocaleString()}
          </span>
        </div>

        {character === 'YUYA' ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
                <span className="text-sm text-cms-text-muted">ツールDL数</span>
              </div>
              <span className="font-medium text-cms-text">
                {(data.metrics as YuyaMetrics).toolDownloads}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
                <span className="text-sm text-cms-text-muted">B2Bリード</span>
              </div>
              <span className="font-medium text-cms-text">
                {(data.metrics as YuyaMetrics).b2bLeads}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
                <span className="text-sm text-cms-text-muted">楽曲再生数</span>
              </div>
              <span className="font-medium text-cms-text">
                {(data.metrics as AobaMetrics).musicPlays}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
                <span className="text-sm text-cms-text-muted">STEM DL数</span>
              </div>
              <span className="font-medium text-cms-text">
                {(data.metrics as AobaMetrics).stemDownloads}
              </span>
            </div>
          </>
        )}

        <div className="pt-4 border-t border-cms-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
              <span className="text-sm text-cms-text-muted">月間収益</span>
            </div>
            <span className={`font-bold text-lg ${data.color}`}>
              ¥{data.metrics.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 