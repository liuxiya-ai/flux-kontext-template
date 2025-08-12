"use client"

import { Link } from "@/i18n/navigation"
import Script from "next/script"
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="hero-gradient absolute inset-0 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-6">
              {t('badge')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {t('cta.primary')}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="hover:scale-105 active:scale-95 transition-all duration-200 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                >
                  {t('cta.secondary')}
                </Button>
              </Link>
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