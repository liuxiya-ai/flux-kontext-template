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

## 本项目已完成的关键改造

### 路由和基础能力
- 启用 `[locale]` 路由段与中间件改写；根路径 `/` 服务端重定向到 `/zh`（默认语言）。
- 统一导航：全站 `Link` 改用 `@/i18n/navigation`，避免无前缀/重复前缀导致的 404。
- 移除旧多语言目录与旧静态路由冲突；删除 `src/app/resources/*`（按你的要求去除资源页）。

### 首页与通用组件
- `KeyFeatures.tsx`：改为从 `features` 命名空间读取列表数据（`title/subtitle/items[]`）。
- 统一客户端组件使用 `useTranslations`，删除零散硬编码。

### 生成页（Generate）完整国际化
- 左侧面板 `src/components/design/left-panel.tsx`
  - 模块卡片标题：使用短名 `generator.moduleNames.{id}`（避免英文溢出重叠）；长说明仍在 `generator.modules.*`。
  - 选项映射：在渲染层将配置中的 `value` 映射为翻译文案（不改配置结构）：
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
- 根布局 `src/app/layout.tsx` 移除硬编码 `lang="zh"`，避免与 `[locale]/layout` 冲突。

## 未来“新增内容”的规范与步骤

### A. 新增页面/路由
1. 在 `src/app/[locale]/` 下添加页面文件（服务器组件优先）。
2. 如需客户端交互，将交互拆到客户端子组件。
3. 页面顶部处理：
   - `export function generateStaticParams() { return routing.locales.map(l => ({locale:l})) }`
   - 页面或布局函数中 `setRequestLocale(locale)`。
4. 导航/跳转统一使用 `@/i18n/navigation`。

### B. 新增模块/选项（生成页为例）
1. 在配置 `src/lib/config/design-modules.ts` 中新增模块（仅维护 `id/value` 与默认英文 `label` 即可）。
2. 在 `messages/en.json` 与 `messages/zh.json` 补充翻译：
   - 短名展示（卡片名）：`generator.moduleNames.{new-id}`
   - 长说明（右侧说明用）：`generator.modules.{new-id}.title/description`
   - 若新增控件枚举，补 `generator.options.{group}.{value}`，如：
     - `inputTypes.custom-type`
     - `roomTypes.studio`
     - `renderStyles.brutalist`
     - `aspectRatios.square-plus`
3. 无需改组件逻辑：`left-panel.tsx` 会自动用 `value` 对应的翻译键替换 label；找不到翻译时回退配置内的 `label`。

示例（在两种语言文件都同步添加）
```json
// en.json（片段）
"generator": {
  "moduleNames": {
    "studio-design": "Studio"
  },
  "modules": {
    "studio-design": {
      "title": "Studio Design",
      "description": "Upload a studio photo or model, pick style and similarity, then render instantly."
    }
  },
  "options": {
    "roomTypes": {
      "studio": "Studio"
    },
    "renderStyles": {
      "brutalist": "Brutalist"
    }
  }
}
```

```json
// zh.json（片段）
"generator": {
  "moduleNames": {
    "studio-design": "工作室"
  },
  "modules": {
    "studio-design": {
      "title": "工作室设计",
      "description": "上传工作室照片或模型，选择风格与相似度，即刻渲染。"
    }
  },
  "options": {
    "roomTypes": {
      "studio": "工作室"
    },
    "renderStyles": {
      "brutalist": "粗野主义"
    }
  }
}
```

### C. 新增普通文案
- 选择语义清晰的命名空间：例如 `navigation/footer/cta/features/faq/...`
- 在 `messages/{locale}.json` 中添加键值。
- 组件中使用 `useTranslations('namespace')` 获取 `t(key)`。
- 列表型数据（如 features items）建议使用 `t.raw('items')` 读取数组。

### D. 新增 SEO 文案
- 在相应页面 `generateMetadata` 中按 `locale` 返回不同 `title`、`description`、`openGraph`、`alternates`。
- 若 SEO 文案复用频繁，可抽到 `messages`，用 `getTranslations` 在服务器组件中读取。

## 开发注意事项与常见坑

- 路由
  - 禁用自动语言检测：`localeDetection:false`，防止不必要跳转。
  - 保持前缀一致：`localePrefix:'always'`，避免裸路径导致的 404。
- 客户端/服务器边界
  - 不能在服务器组件中使用客户端 hook（如 `useTranslations`）；服务器侧用 `getTranslations` 或在客户端子组件使用 `useTranslations`。
- 导航
  - 统一使用 `@/i18n/navigation` 的 `Link/usePathname/useRouter`，不要混用 `next/link` 与 `next/navigation` 原始 API。
- 文案管理
  - 选项映射永远以“值（value）”为 key，新增 value 一定要同步在 `messages` 中补键，避免界面出现英文。
  - 模块卡片标题使用短名 `generator.moduleNames`，避免英文长句溢出叠字。
- 元数据/结构化数据
  - 每个 `[locale]` 页面实现 `generateStaticParams` 与 `setRequestLocale`，配合 metadata 保证静态化与 SEO 正确。
- 资源页
  - 已按要求删除 `src/app/resources/*`；未来若重建，请按本手册新增流程执行。

## 快速检查清单（PR 自检）

- [ ] 新页面在 `[locale]` 下实现；`generateStaticParams` 与 `setRequestLocale` 正确。
- [ ] 所有跳转/链接使用 `@/i18n/navigation` 的 `Link`。
- [ ] 新增文案同时补 `messages/en.json` 与 `messages/zh.json`。
- [ ] 新增配置枚举（如 `value`）均有对应 `generator.options.*.{value}` 翻译键。
- [ ] 模块卡片名使用 `generator.moduleNames.{id}`；右侧说明使用 `generator.modules.{id}.*`。
- [ ] 服务器组件未使用客户端 hook；客户端组件避免硬编码英文。
- [ ] `generateMetadata` 按语言返回一致的 `alternates` 与 `openGraph`。

## 参考代码片段

### 读取数组型文案
```tsx
const t = useTranslations('features');
const items = t.raw('items') as Array<{title: string; description: string}>;
```

### 服务器侧读取文案（SEO）
```tsx
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'pageMeta'});
  return { title: t('title'), description: t('description') };
}
```

