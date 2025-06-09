// 画像パスの定数管理
export const IMAGE_PATHS = {
  // ベースパス
  BASE: "/images",

  // キャラクター画像
  CHARACTER: {
    YUYA_HERO: "/images/yuya-hero.jpg",
  },

  // 記事サムネイル
  ARTICLES: {
    GPT4_VISION: "/images/article-gpt4v.jpg",
    CHATGPT_BASICS: "/images/article-chatgpt-basics.jpg",
    GEMINI: "/images/article-gemini.jpg",
    PROMPT: "/images/article-prompt.jpg",
    LANGCHAIN: "/images/article-langchain.jpg",
    ETHICS: "/images/article-ethics.jpg",
    // ホームページ用
    GPT4_VISION_HOME: "/images/articles/gpt4-vision.jpg",
    NEXTJS_SERVER_ACTIONS: "/images/articles/nextjs-server-actions.jpg",
    LANGCHAIN_AGENT: "/images/articles/langchain-agent.jpg",
  },

  // ツール画像
  TOOLS: {
    GH_RELEASE: "/images/tool-gh-release.jpg",
    SNIPPET: "/images/tool-snippet.jpg",
    JSON: "/images/tool-json.jpg",
    MOCK: "/images/tool-mock.jpg",
    TERMINAL: "/images/tool-terminal.jpg",
    MD2PDF: "/images/tool-md2pdf.jpg",
    // ホームページ用
    TOOL_1: "/images/tool-1.jpg",
  },

  // チュートリアル画像
  TUTORIALS: {
    NEXTJS: "/images/tutorial-nextjs.jpg",
    TYPESCRIPT: "/images/tutorial-typescript.jpg",
    HOOKS: "/images/tutorial-hooks.jpg",
    MICROSERVICES: "/images/tutorial-microservices.jpg",
    GIT: "/images/tutorial-git.jpg",
    FULLSTACK: "/images/tutorial-fullstack.jpg",
    // ホームページ用
    TUTORIAL_1: "/images/tutorial-1.jpg",
  },

  // ライブ配信関連
  LIVE: {
    THUMBNAIL: "/images/live-thumbnail.jpg",
  },

  // アーカイブ画像
  ARCHIVE: {
    ARCHIVE_1: "/images/archive-1.jpg",
    ARCHIVE_2: "/images/archive-2.jpg",
    ARCHIVE_3: "/images/archive-3.jpg",
    ARCHIVE_4: "/images/archive-4.jpg",
    ARCHIVE_5: "/images/archive-5.jpg",
    ARCHIVE_6: "/images/archive-6.jpg",
  },

  // ASMR画像
  ASMR: {
    ASMR_1: "/images/asmr-1.jpg",
    ASMR_2: "/images/asmr-2.jpg",
    ASMR_3: "/images/asmr-3.jpg",
    ASMR_4: "/images/asmr-4.jpg",
    ASMR_5: "/images/asmr-5.jpg",
    ASMR_6: "/images/asmr-6.jpg",
  },

  // クライアントロゴ
  CLIENTS: {
    CLIENT_1: "/images/client-1.png",
    CLIENT_2: "/images/client-2.png",
    CLIENT_3: "/images/client-3.png",
    CLIENT_4: "/images/client-4.png",
  },

  // コンテンツ画像
  CONTENT: {
    ARTICLE_1: "/images/article-1.jpg",
  },
} as const;

// 画像パス生成ヘルパー関数
export const getImagePath = (category: keyof typeof IMAGE_PATHS, key?: string): string => {
  if (!key) {
    return IMAGE_PATHS.BASE;
  }
  
  const categoryPaths = IMAGE_PATHS[category];
  if (typeof categoryPaths === "string") {
    return categoryPaths;
  }
  
  if (typeof categoryPaths === "object" && categoryPaths !== null) {
    return (categoryPaths as Record<string, string>)[key] || IMAGE_PATHS.BASE;
  }
  
  return IMAGE_PATHS.BASE;
};

// 動的画像パス生成
export const createImagePath = (category: string, filename: string): string => {
  return `${IMAGE_PATHS.BASE}/${category}/${filename}`;
};

// サムネイル画像用のヘルパー
export const getThumbnailPath = (category: "articles" | "tools" | "tutorials" | "archive" | "asmr", id: string | number): string => {
  return `${IMAGE_PATHS.BASE}/${category}/${id}.jpg`;
};

// 型安全な画像パス取得
export type ImageCategory = keyof typeof IMAGE_PATHS;
export type ImageKey<T extends ImageCategory> = T extends "CHARACTER" 
  ? keyof typeof IMAGE_PATHS.CHARACTER
  : T extends "ARTICLES"
  ? keyof typeof IMAGE_PATHS.ARTICLES
  : T extends "TOOLS"
  ? keyof typeof IMAGE_PATHS.TOOLS
  : T extends "TUTORIALS"
  ? keyof typeof IMAGE_PATHS.TUTORIALS
  : T extends "LIVE"
  ? keyof typeof IMAGE_PATHS.LIVE
  : T extends "ARCHIVE"
  ? keyof typeof IMAGE_PATHS.ARCHIVE
  : T extends "ASMR"
  ? keyof typeof IMAGE_PATHS.ASMR
  : T extends "CLIENTS"
  ? keyof typeof IMAGE_PATHS.CLIENTS
  : T extends "CONTENT"
  ? keyof typeof IMAGE_PATHS.CONTENT
  : never; 