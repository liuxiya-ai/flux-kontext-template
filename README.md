# 🎨 AIRender - AI建筑效果图生成平台

## 🚀 最新状态 (2025-01-27)

- **核心变更**: **品牌重塑为AIRender**
- **当前状态**: ✅ **已完成从FluxKontext到AIRender的品牌转换**
- **摘要**: 项目已从通用AI图像生成平台，成功改造为专业的建筑效果图AI生成平台AIRender。

### 本次更新的关键修改
- ✅ **品牌名称**: FluxKontext → AIRender
- ✅ **网站标题**: 更新为"AIRender: The AI Architecture & Interior Design Render Platform"  
- ✅ **业务定位**: 从通用AI图像生成 → 专业建筑/室内设计渲染
- ✅ **目标用户**: 从一般用户 → 建筑师、设计师、房地产开发商
- ✅ **核心功能**: 草图转渲染、设计灵感、后期修改
- ✅ **专业术语**: 全面建筑化的文案和功能描述

### 修改的文件清单
- `src/app/layout.tsx` - 全局metadata配置
- `src/components/Logo.tsx` - 品牌logo组件  
- `src/lib/content/home.json` - 首页内容文案

---

## 🚀 快速上手指南

本项目已经配置为使用 **Supabase** 作为后端数据库和认证服务。要成功在本地运行，请遵循以下步骤：

### 1. 克隆项目
```bash
git clone https://github.com/liuxiya-ai/flux-kontext-template.git
cd flux-kontext-template
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量 (关键步骤)
你需要一个自己的 Supabase 项目来获取必要的环境变量。

- **创建 Supabase 项目**: 访问 [supabase.com](https://supabase.com) 创建一个新项目。
- **获取 API 密钥**: 在你的 Supabase 项目后台，进入 `Project Settings > API`。
- **创建 `.env.local` 文件**: 在项目根目录下，复制 `env.example` 并重命名为 `.env.local`。
- **填入核心变量**: 将以下变量填入你的 `.env.local` 文件，并确保值是**从 Supabase 官网复制的完整值**。

```env
# .env.local

# =============================================================================
# 🚀 核心服务配置
# =============================================================================

# FAL AI API密钥 (用于AI图像生成)
FAL_KEY=your_fal_api_key_here

# =============================================================================
# 🗄️ 数据库与认证配置 (从你的Supabase项目获取)
# =============================================================================

# Supabase 数据库连接字符串 (在 Supabase后台 Project Settings > Database 中找到)
DATABASE_URL=your_supabase_database_connection_string

# Supabase API (在 Supabase后台 Project Settings > API 中找到)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key

# =============================================================================
# 🔐 NextAuth.js 身份认证配置
# =============================================================================

# 你的本地开发URL
NEXTAUTH_URL=http://localhost:3000

# 生成一个安全的随机字符串 (例如: openssl rand -base64 32)
NEXTAUTH_SECRET=your_secure_random_string_for_nextauth

# =============================================================================
# ⚙️ 功能开关
# =============================================================================
NEXT_PUBLIC_AUTH_CREDENTIALS_ENABLED=true
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=false
NEXT_PUBLIC_AUTH_GITHUB_ENABLED=false
```

### 4. 启动本地开发服务器
```bash
npm run dev
```

### 5. 开始使用！
- 访问 `http://localhost:3000/auth/signup` 来注册你的第一个真实用户。
- 检查你的邮箱以获取验证链接。
- 验证后，即可登录并开始使用！

---

## 📖 更新日志

### 2025-07-25 - 真实数据库认证升级
- ✅ **认证系统升级**: 项目从测试账户模式切换到 Supabase 真实用户认证。
- ✅ **修复数据库连接**: 解决了环境变量、本地网络防火墙等一系列问题。

### 2025-01-20 - 测试模式功能添加
- ✅ **新增测试模式功能**: 在 `ArchitectureGenerator.tsx` 中添加了测试模式按钮
- ✅ **绕过网络限制**: 使用 fal.ai 官方测试图片URL (`https://v3.fal.media/files/rabbit/rmgBxhwGYb2d3pl3x9sKf_output.png`) 来绕过 ngrok 访问限制
- ✅ **调试功能增强**: 添加了详细的控制台日志输出，便于调试 API 调用过程
- ✅ **用户体验优化**: 提供了两种生成方式 - 正常模式（使用用户上传图片）和测试模式（使用官方测试图片）

### 2025-01-20 - 网络问题诊断与解决
- ✅ **Ngrok 隧道配置**: 成功配置 ngrok 公共隧道，解决 localhost 无法被外部服务访问的问题
- ✅ **环境变量配置**: 配置 `NEXT_PUBLIC_APP_URL` 环境变量，支持动态 URL 切换
- ✅ **API 路由修复**: 修复了 Next.js App Router 中动态路由参数的使用错误
- ✅ **图片上传下载**: 完善了图片上传和下载的完整流程

### 2025-01-20 - fal.ai API 集成
- ✅ **Flux Kontext API**: 成功集成 fal.ai 的 Flux Pro Kontext API
- ✅ **建筑风格生成**: 支持多种建筑风格和类型的 AI 图像生成
- ✅ **参数配置**: 支持自定义提示词、纵横比、生成质量等参数
- ✅ **错误处理**: 完善的错误处理和用户反馈机制

## 📋 项目概览

**FluxKontext.space** 是一个基于Next.js 15的现代化AI图像生成平台，集成了Cloudflare Turnstile安全验证、Stripe支付系统、Supabase数据库和多语言支持。

### 🏗️ 技术栈
- **前端框架**: Next.js 15 + React 18 + TypeScript
- **UI组件**: Shadcn/ui + Radix UI + Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **支付系统**: Stripe
- **安全验证**: Cloudflare Turnstile
- **AI服务**: Fal.ai (Flux模型)
- **部署平台**: Vercel

### 📊 项目统计
- **总代码文件**: 153个文件
- **主要语言**: TypeScript (95%), JavaScript (5%)
- **代码行数**: 约50,000+行
- **支持语言**: 12种语言 (中文、英文、日文、韩文等)

---

## 📁 项目文件结构详解

### 🔧 根目录配置文件

```
fluxkontext.space/
├── 📄 package.json              # 项目依赖和脚本配置
├── 📄 next.config.js            # Next.js配置 (99行)
├── 📄 middleware.ts             # 中间件路由保护 (149行)
├── 📄 tsconfig.json             # TypeScript配置
├── 📄 tailwind.config.ts        # Tailwind CSS配置 (102行)
├── 📄 vercel.json               # Vercel部署配置 (107行)
├── 📄 env.example               # 环境变量模板 (99行)
├── 📄 .cursorrules              # Cursor编辑器规则 (184行)
├── 📄 biome.json                # 代码格式化配置
├── 📄 eslint.config.mjs         # ESLint配置
└── 📄 components.json           # Shadcn组件配置
```

### 🎯 核心源码目录 (`src/`)

#### 📱 应用路由 (`src/app/`)

**主要页面和布局**
```
src/app/
├── 📄 layout.tsx                # 全局布局组件 (90行)
├── 📄 page.tsx                  # 首页 (32行)
├── 📄 not-found.tsx             # 404页面 (37行)
├── 📄 globals.css               # 全局样式 (363行)
├── 📄 ClientBody.tsx            # 客户端body组件 (32行)
└── 📄 sitemap.ts                # SEO站点地图 (91行)
```

**功能页面目录**
```
├── 📁 auth/                     # 用户认证
│   ├── signin/                  # 登录页面
│   └── signup/                  # 注册页面
├── 📁 dashboard/                # 用户仪表板
├── 📁 generate/                 # 图像生成页面
├── 📁 pricing/                  # 定价页面
├── 📁 admin/                    # 管理员页面
├── 📁 features/                 # 功能介绍页面
├── 📁 resources/                # 资源页面
├── 📁 privacy/                  # 隐私政策
├── 📁 terms/                    # 服务条款
└── 📁 refund/                   # 退款政策
```

**多语言支持目录**
```
├── 📁 zh/                       # 中文版本
├── 📁 en/ (默认)                # 英文版本
├── 📁 ja/                       # 日文版本
├── 📁 ko/                       # 韩文版本
├── 📁 de/                       # 德文版本
├── 📁 fr/                       # 法文版本
├── 📁 es/                       # 西班牙文版本
├── 📁 it/                       # 意大利文版本
├── 📁 nl/                       # 荷兰文版本
├── 📁 pl/                       # 波兰文版本
├── 📁 pt/                       # 葡萄牙文版本
├── 📁 ru/                       # 俄文版本
├── 📁 tr/                       # 土耳其文版本
├── 📁 ar/                       # 阿拉伯文版本
├── 📁 hi/                       # 印地文版本
└── 📁 bn/                       # 孟加拉文版本
```

#### 🔌 API路由 (`src/app/api/`)

```
src/app/api/
├── 📁 auth/                     # 认证相关API
├── 📁 generate/                 # 图像生成API
├── 📁 payment/                  # 支付相关API
├── 📁 user/                     # 用户管理API
├── 📁 admin/                    # 管理员API
├── 📁 verify-turnstile/         # Turnstile验证API
│   └── route.ts                 # 安全验证路由 (203行)
└── 📁 webhook/                  # Webhook处理
```

#### 🧩 React组件 (`src/components/`)

**核心业务组件**
```
src/components/
├── 📄 FluxKontextGenerator.tsx  # 🎯 主图像生成组件 (2987行) ⭐
├── 📄 StandardTurnstile.tsx     # 🛡️ 安全验证组件 (515行) ⭐
├── 📄 Navigation.tsx            # 导航栏组件 (339行)
├── 📄 PricingContent.tsx        # 定价页面内容 (403行)
├── 📄 SignUpContent.tsx         # 注册页面内容 (354行)
├── 📄 SignInContent.tsx         # 登录页面内容 (310行)
└── 📄 CreditDisplay.tsx         # 积分显示组件 (255行)
```

**功能性组件**
```
├── 📄 StructuredData.tsx        # SEO结构化数据 (388行)
├── 📄 ApiDocumentation.tsx      # API文档组件 (577行)
├── 📄 ResourcesContent.tsx      # 资源页面内容 (382行)
├── 📄 SmartImagePreview.tsx     # 智能图片预览 (215行)
├── 📄 UpgradePrompt.tsx         # 升级提示组件 (220行)
├── 📄 GoogleOneTap.tsx          # Google一键登录 (186行)
├── 📄 TwitterShowcase.tsx       # Twitter展示组件 (177行)
└── 📄 Analytics.tsx             # 分析统计组件 (126行)
```

**UI基础组件**
```
├── 📄 HomeContent.tsx           # 首页内容 (115行)
├── 📄 HomeContentSimple.tsx     # 简化首页内容 (140行)
├── 📄 Footer.tsx                # 页脚组件 (137行)
├── 📄 Logo.tsx                  # Logo组件 (112行)
├── 📄 LanguageSwitcher.tsx      # 语言切换器 (127行)
├── 📄 KeyFeatures.tsx           # 关键功能展示 (89行)
├── 📄 HowToSteps.tsx            # 使用步骤说明 (107行)
└── 📄 FAQ.tsx                   # 常见问题 (85行)
```

**UI组件库 (`src/components/ui/`)**
```
├── 📁 ui/                       # Shadcn UI组件
│   ├── button.tsx               # 按钮组件
│   ├── input.tsx                # 输入框组件
│   ├── textarea.tsx             # 文本域组件
│   ├── card.tsx                 # 卡片组件
│   ├── dialog.tsx               # 对话框组件
│   ├── progress.tsx             # 进度条组件
│   └── [其他UI组件...]
```

**提供者组件 (`src/components/providers/`)**
```
├── 📁 providers/                # React Context提供者
└── 📁 animations/               # 动画组件
```

#### 🔧 工具库 (`src/lib/`)

**核心业务逻辑**
```
src/lib/
├── 📄 flux-kontext.ts           # 🎯 AI图像生成核心逻辑 (848行) ⭐
├── 📄 payment-security.ts       # 🔐 支付安全处理 (540行) ⭐
├── 📄 auth.ts                   # 🔑 认证逻辑 (346行) ⭐
├── 📄 database.ts               # 🗄️ 数据库操作 (794行) ⭐
├── 📄 payment.ts                # 💳 支付处理 (550行) ⭐
├── 📄 user-tiers.ts             # 👤 用户等级管理 (249行)
├── 📄 auth-supabase.ts          # Supabase认证 (90行)
├── 📄 stripe-client.ts          # Stripe客户端 (52行)
└── 📄 utils.ts                  # 通用工具函数 (7行)
```

**服务模块 (`src/lib/services/`)**
```
├── 📁 services/                 # 外部服务集成
├── 📁 content-safety/           # 内容安全检查
├── 📁 i18n/                     # 国际化配置
├── 📁 content/                  # 内容管理
├── 📁 seo/                      # SEO优化
├── 📁 payment/                  # 支付相关
├── 📁 supabase/                 # Supabase配置
├── 📁 config/                   # 配置文件
├── 📁 tasks/                    # 任务处理
├── 📁 utils/                    # 工具函数
└── 📁 types/                    # 类型定义
```

#### 🎣 React Hooks (`src/hooks/`)

```
src/hooks/
├── 📄 useAuth.ts                # 认证状态管理
├── 📄 useCredits.ts             # 积分管理
├── 📄 useImageGeneration.ts     # 图像生成状态
└── [其他自定义hooks...]
```

#### 📝 类型定义 (`src/types/`)

```
src/types/
├── 📄 auth.ts                   # 认证相关类型
├── 📄 payment.ts                # 支付相关类型
├── 📄 database.ts               # 数据库类型
├── 📄 api.ts                    # API响应类型
└── [其他类型定义...]
```

### 📁 静态资源 (`public/`)

```
public/
├── 📁 images/                   # 图片资源
├── 📁 icons/                    # 图标文件
├── 📄 favicon.ico               # 网站图标
├── 📄 robots.txt                # 搜索引擎爬虫规则
└── 📄 manifest.json             # PWA配置
```

### 🔧 脚本目录 (`scripts/`)

```
scripts/
├── 📄 quick-setup.js            # 快速设置脚本
├── 📄 check-config.js           # 配置检查脚本
├── 📄 check-supabase.js         # Supabase连接检查
├── 📄 performance-check.js      # 性能检查脚本
├── 📄 check-seo.js              # SEO检查脚本
└── 📄 test-api.js               # API测试脚本
```

---

## 🔐 安全验证系统分析

### 🛡️ 核心安全文件

#### 1. **StandardTurnstile.tsx** (515行)
```typescript
// 🎯 主要功能
- Cloudflare Turnstile集成
- 自动重试机制
- 主题适配 (light/dark/auto)
- 响应式尺寸支持
- 异步脚本加载
- 详细的错误处理和日志记录

// 🔧 核心方法
- loadTurnstileScript(): 动态加载验证脚本
- renderTurnstile(): 渲染验证组件
- handleRetry(): 重试机制
- verifyToken(): Token验证
```

#### 2. **verify-turnstile API路由** (203行)
```typescript
// 🎯 主要功能
- 服务器端Token验证
- Cloudflare API集成
- 错误处理和日志记录
- 安全响应处理

// 🔧 验证流程
1. 接收客户端Token
2. 调用Cloudflare验证API
3. 验证响应处理
4. 返回验证结果
```

#### 3. **payment-security.ts** (540行)
```typescript
// 🎯 主要功能
- 支付安全验证
- 用户权限检查
- 积分系统安全
- 防刷机制

// 🔧 安全措施
- Token验证集成
- 用户等级检查
- 支付状态验证
- 异常行为检测
```

---

## 📊 文件重要性评估

### ⭐ **核心文件 (不可删除)**

1. **FluxKontextGenerator.tsx** (2987行)
   - 🎯 **作用**: 主图像生成组件，整个应用的核心功能
   - 🔧 **功能**: AI图像生成、用户交互、状态管理
   - ❌ **删除影响**: 应用核心功能完全失效

2. **StandardTurnstile.tsx** (515行)
   - 🎯 **作用**: 安全验证组件，防止滥用和攻击
   - 🔧 **功能**: Cloudflare Turnstile集成、安全验证
   - ❌ **删除影响**: 安全防护失效，可能遭受攻击

3. **flux-kontext.ts** (848行)
   - 🎯 **作用**: AI图像生成核心逻辑
   - 🔧 **功能**: Fal.ai API集成、图像处理
   - ❌ **删除影响**: 图像生成功能完全失效

4. **payment-security.ts** (540行)
   - 🎯 **作用**: 支付安全处理
   - 🔧 **功能**: 支付验证、安全检查
   - ❌ **删除影响**: 支付系统安全风险

5. **database.ts** (794行)
   - 🎯 **作用**: 数据库操作核心
   - 🔧 **功能**: Supabase集成、数据CRUD
   - ❌ **删除影响**: 数据存储功能失效

### 🟡 **重要文件 (谨慎删除)**

1. **Navigation.tsx** (339行)
   - 🎯 **作用**: 网站导航栏
   - 🔧 **功能**: 页面导航、用户菜单
   - ⚠️ **删除影响**: 用户体验下降

2. **PricingContent.tsx** (403行)
   - 🎯 **作用**: 定价页面内容
   - 🔧 **功能**: 价格展示、套餐选择
   - ⚠️ **删除影响**: 无法展示定价信息

3. **StructuredData.tsx** (388行)
   - 🎯 **作用**: SEO结构化数据
   - 🔧 **功能**: 搜索引擎优化
   - ⚠️ **删除影响**: SEO效果下降

### 🟢 **可选文件 (可以删除)**

1. **TwitterShowcase.tsx** (177行)
   - 🎯 **作用**: Twitter展示组件
   - 🔧 **功能**: 社交媒体展示
   - ✅ **删除影响**: 轻微，主要功能不受影响

2. **FAQ.tsx** (85行)
   - 🎯 **作用**: 常见问题页面
   - 🔧 **功能**: 用户帮助信息
   - ✅ **删除影响**: 轻微，可用其他方式提供帮助

3. **HowToSteps.tsx** (107行)
   - 🎯 **作用**: 使用步骤说明
   - 🔧 **功能**: 用户指导
   - ✅ **删除影响**: 轻微，可简化用户引导

### 🔴 **冗余文件 (建议删除)**

1. **HomeContentSimple.tsx** (140行)
   - 🎯 **问题**: 与HomeContent.tsx功能重复
   - 🔧 **建议**: 合并到HomeContent.tsx或删除
   - ✅ **删除收益**: 减少代码冗余

2. **GoogleOneTapTrigger.tsx** (61行)
   - 🎯 **问题**: 功能可能已集成到GoogleOneTap.tsx
   - 🔧 **建议**: 检查是否还在使用，未使用则删除
   - ✅ **删除收益**: 减少维护成本

---

## 🚀 优化建议

### 📈 **性能优化**

1. **代码分割**
   - 将FluxKontextGenerator.tsx (2987行) 拆分为更小的组件
   - 使用React.lazy()进行懒加载
   - 减少首屏加载时间

2. **组件优化**
   - 合并功能相似的组件
   - 删除未使用的组件
   - 优化重复渲染

### 🧹 **代码清理**

1. **删除冗余文件**
   ```
   建议删除:
   - HomeContentSimple.tsx (如果未使用)
   - GoogleOneTapTrigger.tsx (如果已集成)
   - 未使用的多语言目录
   ```

2. **合并相似功能**
   ```
   建议合并:
   - SignInContent.tsx + SignUpContent.tsx
   - HomeContent.tsx + HomeContentSimple.tsx
   ```

### 🔧 **架构优化**

1. **模块化改进**
   - 将大型文件拆分为功能模块
   - 提取公共逻辑到hooks
   - 优化import/export结构

2. **类型安全**
   - 完善TypeScript类型定义
   - 减少any类型使用
   - 增强类型检查

---

## 🎯 总结

FluxKontext.space是一个功能完整的AI图像生成平台，具有：

### ✅ **优势**
- 完整的用户认证和支付系统
- 强大的安全验证机制
- 多语言支持
- 现代化的技术栈
- 详细的SEO优化

### ⚠️ **需要改进**
- 部分组件过于庞大，需要拆分
- 存在一些冗余文件
- 可以进一步优化性能

### 🎯 **核心价值**
项目的核心价值在于FluxKontextGenerator.tsx和相关的AI图像生成功能，配合完整的用户管理和支付系统，形成了一个商业化的AI服务平台。

---

## 📞 技术支持

如需技术支持或有任何问题，请查看：
- 📄 PAYMENT_SECURITY_GUIDE.md - 支付安全指南
- 📄 env.example - 环境变量配置示例
- 📁 scripts/ - 各种检查和设置脚本 

## 🏗️ 建筑效果图生成功能

本项目新增了建筑效果图生成功能，可以将建筑方案模型图片转换为高质量的建筑效果图。

### 功能特点

- 支持上传建筑方案模型图片
- 提供多种建筑风格和类型选择
- 支持自定义描述和参数调整
- 提供基础版和高级版两种生成质量
- 支持生成结果的下载和分享

### 技术实现

- 使用fal.ai的flux-pro/kontext模型进行图像转换
- 实现了安全的API代理层，保护API密钥
- 支持用户认证和权限控制
- 提供简洁直观的用户界面

### 使用方法

1. 访问 `/generate/architecture` 页面
2. 上传建筑方案模型图片
3. 选择建筑风格、类型和其他参数
4. 点击"生成效果图"按钮
5. 等待10-30秒，查看生成结果
6. 下载或分享生成的效果图

### 环境配置

需要在`.env.local`文件中添加以下配置：

```
FAL_KEY=your_fal_api_key_here
FAL_SECRET_KEY=your_fal_secret_key_here
```

可以在[fal.ai](https://fal.ai)注册账户并获取API密钥。 