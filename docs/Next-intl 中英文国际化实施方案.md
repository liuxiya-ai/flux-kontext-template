# 🌐 Next-intl 中英文国际化实施方案

## 📋 **项目现状分析**

### ✅ **现有优势**
1. **项目基础完备**: Next.js 15 + App Router + TypeScript
2. **多语言架构预备**: 已有14种语言目录结构 (`src/app/zh/`, `src/app/de/`等)
3. **自建语言系统**: 已有 `src/lib/content/locale.ts` 和 `LanguageSwitcher.tsx` 组件
4. **内容管理**: 已有 JSON 格式的内容配置文件

### ⚠️ **存在问题**
1. **缺少 next-intl 依赖**: package.json 中未发现 next-intl
2. **中间件冲突**: 现有 middleware.ts 主要处理安全和API路由，需重构
3. **路由架构不匹配**: 当前多语言路由与 next-intl 的 `[locale]` 模式不符
4. **内容系统混乱**: 硬编码中文内容与动态加载系统并存

## 🎯 **实施目标**

- **主要目标**: 实现中英文双语切换，默认语言为中文
- **路由策略**:
  - 中文 (默认): `/` `/generate` `/pricing`
  - 英文: `/en` `/en/generate` `/en/pricing`
- **保持兼容**: 不破坏现有功能和用户体验
- **SEO优化**: 完整的 hreflang 和 canonical 链接配置

## 📊 **技术方案对比**

| 方案 | 优势 | 劣势 | 推荐度 |
|------|------|------|--------|
| **方案A: 完全采用 next-intl** | 标准化、功能完整、社区支持好 | 需重构现有系统、学习成本高 | ⭐⭐⭐⭐⭐ |
| **方案B: 改造现有系统** | 改动最小、快速实现 | 非标准、后续扩展困难 | ⭐⭐⭐ |
| **方案C: 混合方案** | 渐进式迁移、风险可控 | 系统复杂度增加 | ⭐⭐⭐⭐ |

## 🚀 **推荐方案: 完全采用 next-intl (方案A)**

基于官方文档指导和项目长远发展考虑，推荐完全采用 next-intl 标准化方案。

## 📝 **详细实施步骤**

### **第一阶段: 环境准备与依赖安装**

#### 步骤 1.1: 安装依赖
```bash
npm install next-intl
```

#### 步骤 1.2: 备份现有多语言系统
```bash
# 创建备份目录
mkdir -p backup/
cp -r src/app/zh backup/
cp -r src/app/de backup/
cp -r src/lib/content backup/
cp -r src/components/LanguageSwitcher.tsx backup/
```

### **第二阶段: 核心配置文件创建**

#### 步骤 2.1: 创建 i18n 配置目录
```
src/
├── i18n/
│   ├── routing.ts      # 路由配置
│   ├── navigation.ts   # 导航API
│   └── request.ts      # 请求配置
```

#### 步骤 2.2: 创建消息文件目录
```
messages/
├── zh.json            # 中文翻译 (默认)
└── en.json            # 英文翻译
```

#### 步骤 2.3: 修改 Next.js 配置
更新 `next.config.js` 以支持 next-intl 插件

#### 步骤 2.4: 重构中间件
替换现有 `middleware.ts` 以支持 i18n 路由

#### 关键配置说明：`publicRoutes` 的正确使用

在 `middleware.ts` 中，`publicRoutes` 数组的配置至关重要。此数组用于定义**完全不需要**国际化处理的路径。

- **应该放入 `publicRoutes` 的路径**:
  - `/api/...`: 所有 API 路由，因为它们不直接面向用户，不需要语言前缀。
  - `/webhooks/...`: 用于接收第三方服务的 Webhook，路径必须固定。

- **不应该放入 `publicRoutes` 的路径**:
  - `/auth/signin`, `/auth/signup`: 用户认证页面。根据本方案，这些页面需要被国际化，因此它们必须位于 `src/app/[locale]/auth/...` 目录下，并通过 `/zh/auth/signin` 等路径访问。将它们放入 `publicRoutes` 会导致中间件跳过处理，从而引发 404 错误。

**错误示例 (导致 404)**:
```typescript
export default createMiddleware({
  // ...
  publicRoutes: ['/auth/signin', '/auth/signup'] // 错误！这会阻止国际化
});
```

**正确示例**:
```typescript
export default createMiddleware({
  // ...
  publicRoutes: ['/api/webhooks/stripe'] // 正确，只包含非页面路由
});
```


### **第三阶段: 应用结构重构**

#### 步骤 3.1: 创建 `[locale]` 动态路由
```
src/app/
└── [locale]/
    ├── layout.tsx      # 新的本地化布局
    ├── page.tsx        # 首页
    ├── generate/
    │   └── page.tsx    # 生成页面
    ├── pricing/
    │   └── page.tsx    # 定价页面
    └── auth/
        ├── signin/
        │   └── page.tsx
        └── signup/
            └── page.tsx
```

#### 步骤 3.2: 迁移现有页面
将当前页面文件移动到 `[locale]` 目录下，并添加 next-intl 支持

#### 步骤 3.3: 更新布局文件
- 根布局 (`src/app/layout.tsx`) 配置全局设置
- 本地化布局 (`src/app/[locale]/layout.tsx`) 处理语言特定配置

### **第四阶段: 内容国际化**

#### 步骤 4.1: 创建翻译文件
- `messages/zh.json`: 中文内容 (从现有 JSON 文件迁移)
- `messages/en.json`: 英文内容 (从现有 JSON 文件迁移)

#### 步骤 4.2: 更新组件
将所有硬编码文本替换为 `useTranslations` 或 `getTranslations` 调用

#### 步骤 4.3: 创建新的语言切换器
基于 next-intl 的导航 API 创建中英文切换组件

### **第五阶段: 路由和导航更新**

#### 步骤 5.1: 更新导航组件
使用 next-intl 的 `Link` 组件替换 Next.js 原生 `Link`

#### 步骤 5.2: 更新重定向规则
配置从旧路由到新路由的重定向

#### 步骤 5.3: SEO 优化
- 配置 canonical 链接
- 设置 hreflang 标签
- 更新 sitemap.xml

### **第六阶段: 静态渲染优化**

#### 步骤 6.1: 添加 `generateStaticParams`
为所有页面和布局添加静态参数生成

#### 步骤 6.2: 配置 `setRequestLocale`
在所有页面组件中启用静态渲染

#### 步骤 6.3: 元数据国际化
更新所有页面的 metadata 支持多语言

### **第七阶段: 测试和验证**

#### 步骤 7.1: 功能测试
- 语言切换功能
- 路由正确性
- 内容显示正确性

#### 步骤 7.2: SEO 验证
- canonical 链接检查
- hreflang 配置验证
- sitemap 正确性

#### 步骤 7.3: 性能测试
- 静态渲染验证
- 页面加载速度
- 构建时间

## 📁 **文件创建清单**

### **新增文件**
1. `src/i18n/routing.ts` - 路由配置
2. `src/i18n/navigation.ts` - 导航API
3. `src/i18n/request.ts` - 请求配置
4. `messages/zh.json` - 中文翻译
5. `messages/en.json` - 英文翻译
6. `src/app/[locale]/layout.tsx` - 本地化布局
7. `src/components/LanguageSwitcherIntl.tsx` - 新语言切换器

### **修改文件**
1. `package.json` - 添加 next-intl 依赖
2. `next.config.js` - 添加 next-intl 插件
3. `middleware.ts` - 重构支持 i18n
4. `src/app/layout.tsx` - 更新根布局
5. 所有页面组件 - 添加翻译支持

### **删除/移动文件**
1. `src/app/zh/` → 合并到 `[locale]`
2. `src/app/de/` → 临时保留备份
3. `src/lib/content/locale.ts` → 重构整合
4. `src/components/LanguageSwitcher.tsx` → 重构为新组件

## ⚠️ **风险评估和缓解策略**

### **高风险项**
1. **路由重构**: 可能影响现有用户访问
   - **缓解**: 配置完整的重定向规则
   - **回滚**: 保留现有路由作为备用

2. **中间件冲突**: 可能影响安全功能
   - **缓解**: 分步骤合并现有中间件功能
   - **测试**: 全面测试安全头和API限制

3. **SEO 影响**: URL 变更可能影响搜索排名
   - **缓解**: 301 重定向 + canonical 链接
   - **监控**: 使用 Google Search Console 监控

### **中风险项**
1. **组件破坏**: 翻译替换可能导致组件错误
   - **缓解**: 分组件逐步替换
   - **测试**: 每个组件完成后立即测试

2. **构建失败**: 新配置可能导致构建问题
   - **缓解**: 本地充分测试后再部署
   - **回滚**: 保留可工作的 git commit

## 📊 **时间估算**

| 阶段 | 估算时间 | 依赖关系 |
|------|----------|----------|
| 阶段1: 环境准备 | 0.5天 | 无 |
| 阶段2: 核心配置 | 1天 | 阶段1 |
| 阶段3: 结构重构 | 2天 | 阶段2 |
| 阶段4: 内容国际化 | 2天 | 阶段3 |
| 阶段5: 路由导航 | 1天 | 阶段4 |
| 阶段6: 静态优化 | 1天 | 阶段5 |
| 阶段7: 测试验证 | 1天 | 阶段6 |
| **总计** | **8.5天** | 线性依赖 |

## 🎯 **成功标准**

### **功能要求**
- ✅ 中英文切换正常工作
- ✅ 默认语言为中文
- ✅ 所有页面支持双语
- ✅ URL 结构符合 SEO 最佳实践

### **性能要求**
- ✅ 静态渲染正常工作
- ✅ 页面加载时间 < 3秒
- ✅ 构建时间增加 < 20%

### **SEO 要求**
- ✅ canonical 链接正确配置
- ✅ hreflang 标签完整
- ✅ sitemap 包含所有语言版本

## 📚 **后续优化计划**

1. **扩展语言支持**: 基于现有14种语言架构
2. **内容管理系统**: 集成 CMS 进行翻译管理
3. **自动翻译**: 集成 AI 翻译服务
4. **A/B 测试**: 测试不同语言版本的转化率

---

## 💡 **工程师执行建议**

1. **务必备份**: 开始前完整备份现有代码
2. **分支开发**: 在专门的 feature branch 进行开发
3. **渐进部署**: 可以先在测试环境验证全流程
4. **监控指标**: 关注页面性能和用户体验指标
5. **用户沟通**: 提前告知用户可能的短暂影响

这个方案基于 next-intl 官方最佳实践，确保了标准化、可维护性和未来扩展性。建议先在开发环境完整测试后再部署到生产环境。
