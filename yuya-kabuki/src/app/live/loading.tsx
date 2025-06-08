export default function Loading() {
  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー部分のスケルトン */}
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-vampire-shadow/50 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 w-96 bg-vampire-shadow/50 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* 現在配信中セクションのスケルトン */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-32 bg-vampire-shadow/50 rounded-lg animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-5 w-24 bg-vampire-shadow/50 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-vampire-shadow/50 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-vampire-shadow/50 rounded-xl animate-pulse"></div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="h-6 w-full bg-vampire-shadow/50 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-vampire-shadow/50 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-vampire-shadow/50 rounded animate-pulse"></div>
                <div className="h-12 w-40 bg-vampire-accent/30 rounded-full animate-pulse mt-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* カテゴリーカードのスケルトン */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-vampire-shadow/30 border border-vampire-accent/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-vampire-accent/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-7 w-32 bg-vampire-shadow/50 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-full bg-vampire-shadow/50 rounded mb-4 animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-vampire-shadow/50 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-vampire-shadow/50 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 