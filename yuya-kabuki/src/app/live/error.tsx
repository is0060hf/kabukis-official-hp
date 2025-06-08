"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Live page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-vampire-night flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex p-4 rounded-full bg-red-500/20 text-red-500 mb-4">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-2">配信ページでエラーが発生しました</h1>
          <p className="text-text-secondary">
            申し訳ございません。配信情報の取得中に問題が発生しました。
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-vampire-accent text-white rounded-lg hover:bg-vampire-accent/90 transition-colors"
          >
            再試行する
          </button>
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-vampire-accent/30 text-vampire-accent rounded-lg hover:bg-vampire-accent/10 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-text-secondary cursor-pointer hover:text-text-primary">
              エラーの詳細
            </summary>
            <pre className="mt-2 p-4 bg-vampire-shadow rounded-lg text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
} 