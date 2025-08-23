## i18n 体系总览

### 理论方法
- 基于 next-intl 标准方案，使用 App Router 顶层动态段 `[locale]` 承载语言。
- 中间件负责协商语言与路由改写，默认前缀策略 `localePrefix: 'always'`，保证路径稳定（`/zh/...`、`/en/...`）。
- 服务器组件在布局/页面中配合：
  - `generateStaticParams` 枚举语言，启用静态渲染。
  - `setRequestLocale(locale)` 注入当前请求语言上下文。
- 客户端组件通过 `NextIntlClientProvider` 获取上下文；文案读取使用 `useTranslations(namespace)`。
- 导航使用 next-intl 提供的封装 `@/i18n/navigation`（`Link/usePathname/useRouter`），URL 自动带语言前缀。
- SEO 元数据在 `generateMetadata` 中按 `locale` 生成；必要时在布局/页面传入 `params` 并异步处理。

### 目录与核心文件
- `src/i18n/routing.ts`：定义语言、默认语言与前缀策略。
- `src/i18n/navigation.ts`：创建带 i18n 语义的 `Link/usePathname` 等。
- `src/i18n/request.ts`：按请求载入 `messages/{locale}.json`。
- `middleware.ts`：`createMiddleware(routing, {localeDetection:false})` + 自定义安全头。
- `src/app/[locale]/layout.tsx`：校验 `locale`，`setRequestLocale`，注入 `NextIntlClientProvider`。
- `messages/zh.json`、`messages/en.json`：所有文案来源。

## 已完成的关键改造

### 路由和基础能力
- 启用 `[locale]` 路由段与中间件改写；根路径 `/` 服务端重定向到 `/zh`（默认语言）。
- 统一导航：全站 `Link` 改用 `@/i18n/navigation`，避免无前缀/重复前缀导致的 404。
- 移除历史冲突路由；删除 `src/app/resources/*`（按需求去除资源页）。

### 首页与通用组件
- `KeyFeatures.tsx`：改为从 `features` 命名空间读取列表数据（`title/subtitle/items[]`）。
- 统一客户端组件使用 `useTranslations`，删除零散硬编码。

### 生成页（Generate）完整国际化
- 左侧面板 `src/components/design/left-panel.tsx`
  - 模块卡片标题：使用短名 `generator.moduleNames.{id}`（避免英文溢出重叠）；长说明仍在 `generator.modules.*`。
  - 选项映射：在渲染层将配置 `value` 映射为翻译文案（不改配置结构）：
    - `generator.options.inputTypes.{photo,sketch,3d-model}`
    - `generator.options.roomTypes.{living-room,bedroom,kitchen,bathroom,office}`
    - `generator.options.renderStyles.{no-style,modern,minimalist,scandinavian,bohemian,industrial}`
    - `generator.options.aspectRatios.{default}`（数字比例保持原样）
  - 上传、提示词、相似度、渲染风格、渲染性能全部接入：
    - `generator.left`（含 `selectModule/uploadImage/uploading/roomType/renderStyle/aspectRatio/generate/generating`）
    - `generator.prompt`（提示词/反向提示词及占位）
    - `generator.uploader`（上传按钮与说明）
    - `generator.left.similarity`（相似度标题/三个选项及说明）
    - `generator.left.performance/fast/quality`
- 右侧面板 `src/components/design/right-panel.tsx`
  - 默认展示与示例标题、生成中/失败/结果等文案全部接入 `generator.right` 与 `generator.modules.*`。
- 公共子组件
  - `image-uploader.tsx`、`prompt-input.tsx`、`similarity-selector.tsx`、`room-type-selector.tsx`、`style-selector.tsx`、`performance-slider.tsx` 均接入对应命名空间。

### SEO 与兼容
- 每个页面 `generateStaticParams` 覆盖 `zh/en`。
- `generateMetadata` 按 `locale` 返回不同 title/description/openGraph/alternates。
- 根布局移除硬编码 `lang`，避免与 `[locale]/layout` 冲突。

## 未来新增内容规范

### A. 新增页面/路由
### A. 页面存放位置指南：国际化 vs. 非国际化

在添加新页面时，首先要判断该页面是否需要国际化。这决定了它在 `src/app/` 目录下的存放位置。

- **国际化页面 (需要翻译)**:
  - **存放位置**: `src/app/[locale]/your-page-name/page.tsx`
  - **适用场景**: 所有面向用户的页面，如首页、定价页、功能介绍页、登录/注册页等。
  - **URL 结构**: `/{locale}/your-page-name` (例如 `/zh/pricing`)

- **非国际化页面 (不需要翻译)**:
  - **存放位置**: `src/app/your-page-name/page.tsx`
  - **适用场景**: 仅限那些路径固定且不面向普通用户的特殊页面，例如管理员后台 (`/admin`) 或仪表盘 (`/dashboard`)。
  - **URL 结构**: `/your-page-name` (例如 `/dashboard`)
  - **重要**: 如果创建了非国际化页面，**必须**在 `middleware.ts` 的 `publicRoutes` 数组中将其路径排除，否则中间件仍会尝试添加语言前缀，导致路由错误。


1. 在 `src/app/[locale]/` 下添加页面文件（服务器组件优先）。
2. 如需客户端交互，将交互拆到客户端子组件。
3. 页面顶部处理：
   - `export function generateStaticParams() { return routing.locales.map(l => ({locale:l})) }`
   - 页面或布局函数中 `setRequestLocale(locale)`。
4. 导航/跳转统一使用 `@/i18n/navigation`。

### B. 新增模块/选项（生成页为例）
1. 在配置 `src/lib/config/design-modules.ts` 新增模块（仅维护 `id/value` 与默认英文 `label`）。
2. 在 `messages/en.json` 与 `messages/zh.json` 补翻译：
   - 短名（卡片名）：`generator.moduleNames.{new-id}`
   - 长说明（右侧文案）：`generator.modules.{new-id}.title/description`
   - 新枚举项：`generator.options.{group}.{value}`（如 `roomTypes.studio`、`renderStyles.brutalist`）。
3. 无需改组件逻辑：`left-panel.tsx` 会自动用 `value` 的翻译键替换 label；缺失时回退配置内 `label`。

### C. 新增普通文案
- 选择语义清晰命名空间：`navigation/footer/cta/features/faq/...`
- 在 `messages/{locale}.json` 添加键值；组件里 `useTranslations('namespace')` 获取文案。
- 列表数据建议 `t.raw('items')` 读取数组。

### D. 新增 SEO 文案
- 在页面 `generateMetadata` 中按 `locale` 返回不同 `title/description/openGraph/alternates`。
- 若复用频繁，可抽到 `messages`，服务器侧用 `getTranslations` 读取。

## 开发注意事项
- 路由：`localeDetection:false`，`localePrefix:'always'`。
- 导航：统一 `@/i18n/navigation` 的 `Link/usePathname/useRouter`。
- 组件边界：服务器组件不用客户端 hook；客户端组件避免硬编码。
- 文案管理：新增 value 一定要补 `messages` 翻译键；模块卡片名使用 `generator.moduleNames`，右侧说明用 `generator.modules`。
- 每个 `[locale]` 页面实现 `generateStaticParams` 与 `setRequestLocale`。

## 自检清单（PR 前）
- [ ] 新页面在 `[locale]` 下，`generateStaticParams/setRequestLocale` 正确。
- [ ] 所有链接用 i18n 导航。
- [ ] 新增文案双语同步补齐。
- [ ] 新枚举 value 对应的 `generator.options.*` 已补齐。
- [ ] 模块卡片名用 `generator.moduleNames.{id}`；右侧说明用 `generator.modules.{id}.*`。
- [ ] 服务器/客户端边界正确；无硬编码英文。
- [ ] `generateMetadata` 多语言一致性良好。