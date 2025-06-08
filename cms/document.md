# 共通CRMシステム設計仕様

## システム概要
**目的**: 傾奇ユウヤ・猫空あおば両サイトの共通バックエンドとして、顧客管理・リード獲得・コンテンツ管理・売上管理を統合的に行うCRMシステム。

**設計思想**: 
- キャラクター別ブランディングを保持しながら共通データで効率化
- B2B/B2Cの両方に対応
- 将来的なEC・サブスク対応
- セキュリティ・プライバシー重視

## データベース設計

### 1. 認証・ユーザー管理

```prisma
// schema.prisma - NextAuth v5準拠
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  profile  UserProfile?
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt         DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  createdAt    DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model UserProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  displayName       String?
  bio               String?
  websiteUrl        String?
  twitterHandle     String?
  discordId         String?
  preferredCharacter CharacterType @default(BOTH)
  subscriptionTier  SubscriptionTier @default(FREE)
  totalSpent        Decimal  @default(0)
  lastActivity      DateTime?
  marketingConsent  Boolean  @default(false)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}

enum CharacterType {
  YUYA
  AOBA
  BOTH
}

enum SubscriptionTier {
  FREE
  SUPPORTER
  PREMIUM
}
```

### 2. 顧客・リード管理

```sql
-- リード情報（B2B中心）
leads (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  company VARCHAR(200),
  job_title VARCHAR(100),
  phone VARCHAR(50),
  source ENUM('yuya_site', 'aoba_site', 'referral', 'social', 'direct') NOT NULL,
  source_domain VARCHAR(100), -- 'yuya-kabuki.com' or 'aoba-nekosora.com'
  source_page TEXT, -- 具体的な流入ページ
  lead_type ENUM('b2b_consultation', 'tool_interest', 'collaboration', 'music_licensing', 'other'),
  status ENUM('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost') DEFAULT 'new',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  estimated_value DECIMAL(10,2),
  expected_close_date DATE,
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  gdpr_consent BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- お問い合わせ履歴
inquiries (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  user_id UUID REFERENCES users(id), -- 既存ユーザーの場合
  inquiry_type ENUM('general', 'technical_support', 'business', 'collaboration', 'licensing', 'bug_report'),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  attachments JSONB, -- ファイル情報のJSON配列
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  response_time_sla INTEGER, -- 応答時間SLA（時間）
  first_response_at TIMESTAMP,
  resolved_at TIMESTAMP,
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 顧客企業情報（B2B用）
companies (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  domain VARCHAR(100),
  industry VARCHAR(100),
  size_category ENUM('startup', 'small', 'medium', 'large', 'enterprise'),
  annual_revenue_range VARCHAR(50),
  country VARCHAR(100),
  website_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 企業担当者関連付け
company_contacts (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  role ENUM('primary', 'secondary', 'decision_maker', 'technical', 'financial'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. プロジェクト・案件管理

```sql
-- プロジェクト管理
projects (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  company_id UUID REFERENCES companies(id),
  lead_id UUID REFERENCES leads(id),
  project_type ENUM('ai_development', 'tool_creation', 'consultation', 'music_production', 'collaboration'),
  status ENUM('planning', 'active', 'on_hold', 'completed', 'cancelled') DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  actual_cost DECIMAL(12,2),
  profit_margin DECIMAL(5,2),
  assigned_character ENUM('yuya', 'aoba', 'both'),
  project_manager UUID REFERENCES users(id),
  client_satisfaction INTEGER CHECK (client_satisfaction >= 1 AND client_satisfaction <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- プロジェクト成果物
project_deliverables (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  file_url TEXT,
  delivery_date DATE,
  status ENUM('planned', 'in_progress', 'delivered', 'approved') DEFAULT 'planned',
  created_at TIMESTAMP DEFAULT NOW()
);

-- プロジェクト履歴・ログ
project_activities (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  activity_type ENUM('created', 'updated', 'comment', 'file_upload', 'milestone', 'meeting'),
  description TEXT NOT NULL,
  metadata JSONB, -- 追加データ
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. コンテンツ管理

```sql
-- 共通コンテンツ管理
contents (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  character_owner ENUM('yuya', 'aoba', 'shared') NOT NULL,
  content_type ENUM('blog', 'tool', 'music', 'video', 'documentation', 'case_study'),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0, -- ツールやSTEMの場合
  seo_title VARCHAR(255),
  seo_description TEXT,
  tags JSONB, -- タグ配列
  metadata JSONB, -- 追加メタデータ
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- コンテンツカテゴリ
content_categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  character_scope ENUM('yuya', 'aoba', 'shared') NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES content_categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- コンテンツ-カテゴリ関連付け
content_category_relations (
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  category_id UUID REFERENCES content_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, category_id)
);

-- コンテンツ分析
content_analytics (
  id UUID PRIMARY KEY,
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  event_type ENUM('view', 'like', 'share', 'download', 'comment'),
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. EC・販売管理（将来対応）

```sql
-- 商品管理
products (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  character_owner ENUM('yuya', 'aoba', 'shared') NOT NULL,
  product_type ENUM('digital_tool', 'music_stem', 'consultation', 'subscription', 'merchandise'),
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_interval ENUM('monthly', 'yearly'),
  file_url TEXT, -- デジタル商品の場合
  license_type ENUM('personal', 'commercial', 'extended'),
  status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
  inventory_count INTEGER, -- 在庫数（無制限の場合はNULL）
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 注文管理
orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  status ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255), -- Stripe用
  billing_address JSONB,
  shipping_address JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 注文明細
order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  license_key VARCHAR(255), -- デジタル商品のライセンスキー
  download_count INTEGER DEFAULT 0,
  download_limit INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. 分析・レポート

```sql
-- KPI追跡
kpi_metrics (
  id UUID PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  character_scope ENUM('yuya', 'aoba', 'shared', 'total') NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  metric_date DATE NOT NULL,
  period_type ENUM('daily', 'weekly', 'monthly', 'quarterly', 'yearly') NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 売上分析
revenue_analytics (
  id UUID PRIMARY KEY,
  date DATE NOT NULL,
  character_attribution ENUM('yuya', 'aoba', 'shared') NOT NULL,
  revenue_source ENUM('b2b_project', 'digital_products', 'subscriptions', 'licensing', 'other'),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  customer_count INTEGER,
  new_customer_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API設計

### 1. 認証API

```typescript
// NextAuth v5 設定
interface AuthConfig {
  providers: [
    Discord({ 
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET 
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      // ユーザープロファイル情報を追加
      const profile = await getUserProfile(token.sub);
      return { ...session, user: { ...session.user, profile } };
    }
  }
}

// カスタムミドルウェア
export const authMiddleware = async (req: NextRequest) => {
  const session = await getServerSession(authConfig);
  
  // 管理者権限チェック
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session?.user?.profile?.isAdmin) {
      return NextResponse.redirect('/unauthorized');
    }
  }
  
  // API レート制限
  if (req.nextUrl.pathname.startsWith('/api')) {
    const rateLimitResult = await rateLimit(req);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
  }
};
```

### 2. CRM API エンドポイント

```typescript
// リード管理API
// POST /api/leads
interface CreateLeadRequest {
  email: string;
  name?: string;
  company?: string;
  source: 'yuya_site' | 'aoba_site' | 'referral' | 'social' | 'direct';
  sourceDomain: 'yuya-kabuki.com' | 'aoba-nekosora.com'; // ドメイン別追跡
  leadType: 'b2b_consultation' | 'tool_interest' | 'collaboration' | 'music_licensing' | 'other';
  message: string;
  gdprConsent: boolean;
}

// GET /api/leads?status=new&character=yuya&page=1&limit=20
interface GetLeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    status?: string;
    character?: string;
    priority?: string;
  };
}

// PUT /api/leads/:id/status
interface UpdateLeadStatusRequest {
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  notes?: string;
  assignedTo?: string;
}

// お問い合わせAPI
// POST /api/inquiries
interface CreateInquiryRequest {
  type: 'general' | 'technical_support' | 'business' | 'collaboration' | 'licensing';
  subject: string;
  message: string;
  attachments?: File[];
  leadInfo?: {
    email: string;
    name: string;
    company?: string;
  };
}

// 分析API
// GET /api/analytics/leads?period=monthly&character=yuya
interface LeadAnalyticsResponse {
  totalLeads: number;
  conversionRate: number;
  leadsBySource: Record<string, number>;
  leadsByStatus: Record<string, number>;
  trendsData: Array<{
    date: string;
    count: number;
    value: number;
  }>;
}

// GET /api/analytics/content?type=blog&character=aoba
interface ContentAnalyticsResponse {
  totalViews: number;
  popularContent: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
  trafficSources: Record<string, number>;
}
```

### 3. 管理画面API

```typescript
// プロジェクト管理
// GET /api/admin/projects
interface ProjectsListResponse {
  projects: Array<{
    id: string;
    name: string;
    status: string;
    assignedCharacter: 'yuya' | 'aoba' | 'both';
    budget: number;
    progress: number;
    dueDate: string;
    client: {
      name: string;
      company: string;
    };
  }>;
}

// POST /api/admin/projects
interface CreateProjectRequest {
  name: string;
  description: string;
  companyId?: string;
  leadId?: string;
  projectType: 'ai_development' | 'tool_creation' | 'consultation' | 'music_production';
  budget: number;
  assignedCharacter: 'yuya' | 'aoba' | 'both';
  startDate: string;
  endDate: string;
}

// KPI ダッシュボード
// GET /api/admin/dashboard
interface DashboardResponse {
  overview: {
    totalLeads: number;
    activeProjects: number;
    monthlyRevenue: number;
    conversionRate: number;
  };
  siteMetrics: {
    yuya: {
      domain: 'yuya-kabuki.com';
      pageViews: number;
      toolDownloads: number;
      b2bLeads: number;
    };
    aoba: {
      domain: 'aoba-nekosora.com';
      pageViews: number;
      musicPlays: number;
      stemDownloads: number;
    };
  };
  crossSiteMetrics: {
    crossReferrals: number; // サイト間の相互流入
    sharedUserBase: number; // 両サイトを利用するユーザー
  };
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    character?: 'yuya' | 'aoba';
    sourceDomain?: string;
  }>;
}
```

## セキュリティ仕様

### 1. データ保護

```typescript
// データ暗号化
interface EncryptionConfig {
  // 機密データの暗号化
  encryptedFields: ['email', 'phone', 'notes', 'message'];
  encryptionKey: string; // 環境変数から
  algorithm: 'aes-256-gcm';
}

// 個人情報マスキング
export const maskPersonalData = (data: any, userRole: string) => {
  if (userRole !== 'admin') {
    return {
      ...data,
      email: data.email?.replace(/(.{2}).*(@.*)/, '$1***$2'),
      phone: data.phone?.replace(/(\d{3}).*(\d{4})/, '$1-***-$2'),
      notes: data.notes ? '[REDACTED]' : null
    };
  }
  return data;
};

// GDPR 対応
export const gdprCompliance = {
  // データ削除権
  deleteUserData: async (userId: string) => {
    await prisma.$transaction(async (tx) => {
      await tx.userProfile.deleteMany({ where: { userId } });
      await tx.contentAnalytics.deleteMany({ where: { userId } });
      // 関連データの匿名化
      await tx.lead.updateMany({
        where: { userId },
        data: { email: '[DELETED]', name: '[DELETED]' }
      });
    });
  },
  
  // データ移植権
  exportUserData: async (userId: string) => {
    const userData = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        profile: true,
        orders: true,
        inquiries: true
      }
    });
    return userData;
  }
};
```

### 2. アクセス制御

```typescript
// ロールベースアクセス制御
enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPPORT = 'support',
  USER = 'user'
}

interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  conditions?: Record<string, any>;
}

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    { resource: '*', action: 'create' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'update' },
    { resource: '*', action: 'delete' }
  ],
  [UserRole.MANAGER]: [
    { resource: 'leads', action: 'read' },
    { resource: 'leads', action: 'update' },
    { resource: 'projects', action: 'create' },
    { resource: 'projects', action: 'read' },
    { resource: 'projects', action: 'update' }
  ],
  [UserRole.SUPPORT]: [
    { resource: 'inquiries', action: 'read' },
    { resource: 'inquiries', action: 'update' },
    { resource: 'users', action: 'read' }
  ],
  [UserRole.USER]: [
    { resource: 'own_data', action: 'read' },
    { resource: 'own_data', action: 'update' }
  ]
};

// 権限チェック関数
export const checkPermission = (
  userRole: UserRole, 
  resource: string, 
  action: string,
  conditions?: Record<string, any>
): boolean => {
  const permissions = rolePermissions[userRole];
  return permissions.some(permission => 
    (permission.resource === '*' || permission.resource === resource) &&
    permission.action === action &&
    (!permission.conditions || matchesConditions(permission.conditions, conditions))
  );
};
```

### 3. クロスドメイン連携対応

```typescript
// クロスドメインでのユーザートラッキング
interface CrossDomainTracking {
  // 共通識別子による連携
  unifiedUserId: string;
  domains: ['yuya-kabuki.com', 'aoba-nekosora.com'];
  
  // CORS設定
  corsConfig: {
    allowedOrigins: ['https://yuya-kabuki.com', 'https://aoba-nekosora.com'];
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'];
    allowCredentials: true;
  };
  
  // クロスドメインセッション管理
  sessionSync: {
    sharedCookieDomain: '.nekosora.com'; // 共通ドメインがない場合はJWT利用
    tokenSharing: 'jwt'; // JWTでクロスドメイン認証
  };
}

// サイト間遷移トラッキング
export const crossSiteTracking = {
  // ユーザーのサイト間移動を追跡
  trackCrossSiteNavigation: async (fromDomain: string, toDomain: string, userId: string) => {
    await prisma.crossSiteActivity.create({
      data: {
        userId,
        fromDomain,
        toDomain,
        timestamp: new Date(),
        sessionId: generateSessionId()
      }
    });
  },
  
  // 共通ユーザー識別
  linkUserAccounts: async (email: string) => {
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });
    
    if (existingUser) {
      // 既存ユーザーと紐付け
      return existingUser;
    } else {
      // 新規ユーザー作成
      return await createUnifiedUser(email);
    }
  }
};
```

```typescript
// 監査ログテーブル
interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  status: 'success' | 'failure';
}

// 監査ログ記録
export const auditLogger = {
  log: async (params: Omit<AuditLog, 'id' | 'timestamp'>) => {
    await db.insert(auditLogs).values({
      ...params,
      id: crypto.randomUUID(),
      timestamp: new Date()
    });
  },
  
  // 重要操作の自動ログ
  middleware: (req: NextRequest, res: NextResponse) => {
    const sensitiveActions = ['DELETE', 'PUT'];
    const sensitiveResources = ['/api/users', '/api/leads', '/api/projects'];
    
    if (sensitiveActions.includes(req.method!) && 
        sensitiveResources.some(resource => req.url.includes(resource))) {
      auditLogger.log({
        userId: req.auth?.user?.id,
        action: req.method!,
        resource: req.url,
        changes: req.body,
        ipAddress: req.ip,
        userAgent: req.headers.get('user-agent') || '',
        status: res.status < 400 ? 'success' : 'failure'
      });
    }
  }
};
```

## 運用・監視

### 1. ヘルスチェック

```typescript
// /api/health エンドポイント
export const healthCheck = async () => {
  const checks = await Promise.allSettled([
    // データベース接続
    db.execute(sql`SELECT 1`),
    
    // 外部API接続
    fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    }),
    
    // メール送信
    testEmailConnection(),
    
    // ファイルストレージ
    testStorageConnection()
  ]);
  
  return {
    status: checks.every(check => check.status === 'fulfilled') ? 'healthy' : 'degraded',
    services: {
      database: checks[0].status,
      openai: checks[1].status,
      email: checks[2].status,
      storage: checks[3].status
    },
    timestamp: new Date().toISOString()
  };
};
```

### 2. パフォーマンス監視

```typescript
// レスポンス時間監視
export const performanceMiddleware = (req: NextRequest) => {
  const start = Date.now();
  
  return (res: NextResponse) => {
    const duration = Date.now() - start;
    
    // 遅いクエリの記録
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.url} - ${duration}ms`);
    }
    
    // メトリクス収集
    collectMetric('api_response_time', duration, {
      method: req.method,
      endpoint: req.url,
      status: res.status
    });
  };
};

// バッチ処理監視
export const batchJobs = {
  // 日次レポート生成
  dailyReport: cron('0 9 * * *', async () => {
    const report = await generateDailyReport();
    await sendReportEmail(report);
  }),
  
  // データクリーンアップ
  dataCleanup: cron('0 2 * * 0', async () => {
    await cleanupOldLogs();
    await optimizeDatabase();
  }),
  
  // バックアップ
  backup: cron('0 3 * * *', async () => {
    await createDatabaseBackup();
  })
};
```

この共通CRM仕様により、両キャラクターサイトが効率的に顧客管理・ビジネス展開を行いながら、将来的な拡張にも対応できる設計になっています。