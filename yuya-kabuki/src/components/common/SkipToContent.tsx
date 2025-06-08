"use client";

export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-vampire-accent focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-vampire-accent focus:ring-offset-2 focus:ring-offset-vampire-night"
    >
      メインコンテンツへスキップ
    </a>
  );
}; 