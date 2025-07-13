# 🚀 Vercel 环境变量配置清单

请在 Vercel Dashboard → Settings → Environment Variables 中添加以下环境变量：

## 🔐 基础认证配置
```
NEXTAUTH_SECRET = your-production-secret-key-make-it-long-and-random-32-chars-minimum
NEXTAUTH_URL = https://flux-kontext-template-4cgwrwes0-liuxiya-ais-projects.vercel.app
```

## 🎯 核心AI服务配置  
```
FAL_KEY = fe9c60c9-6daf-4f5e-ad29-e7b9aa4d8f62
```

## ☁️ R2存储配置（模板预配置，可直接使用）
```
NEXT_PUBLIC_ENABLE_R2 = true
R2_ACCOUNT_ID = e9678a567f24c2f41ae40df77744e97e
R2_ACCESS_KEY_ID = 669b0c4703363bb9dd6ca0f7ddf66816
R2_SECRET_ACCESS_KEY = 63958dfaf0875c064bd0465a77388f29affea407d457cc278bdf26f20c1166f8
R2_BUCKET_NAME = scriptovideo
R2_PUBLIC_URL = https://pub-12f91b2f5d5d4412a751b7664f66fbb4.r2.dev
```

## 🌐 站点配置
```
NEXT_PUBLIC_WEB_URL = https://flux-kontext-template-4cgwrwes0-liuxiya-ais-projects.vercel.app
NEXT_PUBLIC_PROJECT_NAME = FluxKontext.space
NEXT_PUBLIC_SITE_URL = https://flux-kontext-template-4cgwrwes0-liuxiya-ais-projects.vercel.app
NEXT_PUBLIC_APP_URL = https://flux-kontext-template-4cgwrwes0-liuxiya-ais-projects.vercel.app
```

## 🔧 基础配置
```
NODE_ENV = production
NEXT_PUBLIC_DEFAULT_THEME = dark
ADMIN_EMAILS = admin@fluxkontext.space
```

## 📧 认证配置
```
NEXT_PUBLIC_AUTH_CREDENTIALS_ENABLED = true
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED = false
NEXT_PUBLIC_AUTH_GITHUB_ENABLED = false
```

## 💳 支付配置（暂时禁用）
```
NEXT_PUBLIC_ENABLE_STRIPE = false
NEXT_PUBLIC_ENABLE_CREEM = false
```

## 🎬 演示资源配置
```
NEXT_PUBLIC_DEMO_VIDEOS_URL = https://pub-49364ecf52e344d3a722a3c5bca11271.r2.dev
```

---

## 📝 配置步骤：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择 `flux-kontext-template` 项目
3. 进入 Settings → Environment Variables
4. 逐个添加上述环境变量
5. 选择 `Production` 环境
6. 保存后自动重新部署

## 🎯 最重要的配置：
- `FAL_KEY` - AI图像生成核心功能
- `NEXTAUTH_SECRET` - 用户认证安全
- `NEXTAUTH_URL` - 认证回调地址  
- R2存储配置 - 图像存储功能

配置完成后项目将具备完整功能！ 