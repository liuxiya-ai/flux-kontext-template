"use client"

import { Link } from "@/i18n/navigation"
import Script from "next/script"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { TwitterShowcase } from "@/components/TwitterShowcase"
import { KeyFeatures } from "@/components/KeyFeatures"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema } from "@/components/StructuredData"
import { useTranslations } from 'next-intl'

export function HomeContent() {
  // 使用翻译
  const t = useTranslations('hero');
  const tButtons = useTranslations('buttons');
  
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* 结构化数据 - Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />

      {/* JSON-LD 应用程序数据 */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Flux Kontext AI",
            "description": "Professional AI image generation platform",
            "url": "https://fluxkontext.space",
            "applicationCategory": "ImageEditingApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Professional AI image generation and editing"
            },
            "creator": {
              "@type": "Organization",
              "name": "Flux Kontext AI"
            }
          })
        }}
      />

      {/* Hero Section - 左右分栏布局 */}
      <section className="pt-24 pb-16 px-4 relative">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-20 lg:gap-28 items-center min-h-[600px]">
            
            {/* 左侧内容区域 - 占2列，更靠左 */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-8 lg:-ml-16">
              {/* Badge 已移除 */}
              
              {/* 主标题 - 字体小一号，支持换行符显示，行间距加大 */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold gradient-text whitespace-pre-line" style={{lineHeight: '1.5'}}>
                {t('title')}
              </h1>
              
              {/* 副标题描述 - 改为白色 */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                {t('description')}
              </p>
              
              {/* 按钮区域 - 只保留主要按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/generate">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-8 py-4 text-lg font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                    </svg>
                    {t('cta.primary')}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="hover:scale-105 active:scale-95 transition-all duration-200 px-8 py-4 text-lg border-primary/30 text-primary hover:bg-primary/10"
                  >
                    {t('cta.secondary')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* 右侧图片区域 - 占4列，图片向右移动 */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end lg:mr-0 lg:ml-16">
              <div className="relative w-full max-w-xl lg:max-w-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
                  <Image
                    src="/images/features/interior-ai-render-main.webp"
                    alt={t('title')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                    priority
                  />
                  {/* 图片上的装饰效果 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* 浮动装饰元素 */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <KeyFeatures />

      {/* Twitter展示区域 */}
      <TwitterShowcase />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* 推特脚本 - 确保推特内容正常加载 */}
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
      />
    </div>
  )
} 