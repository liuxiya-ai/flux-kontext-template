"use client"

import Image from "next/image"; // 导入Next.js的Image组件
import { Link } from "@/i18n/navigation"; // 使用i18n导航Link
import { Button } from "@/components/ui/button"; // 导入按钮组件
import { useTranslations } from 'next-intl'; // 导入翻译hook

/**
 * @name KeyFeatures
 * @description 首页核心功能展示区，使用 i18n 文案
 */
export function KeyFeatures() {
  // 使用翻译
  const t = useTranslations('features');
  const items = (t.raw('items') as Array<{title: string; description: string}>) || [];

  return (
    <section className="py-8 px-4 relative z-20">
      <div className="container mx-auto">

        {/* 特性列表 */}
        <div className="space-y-16">
          {items.map((feature, index) => (
            <div key={index} className="text-center max-w-4xl mx-auto">
              {/* 主标题 */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>

              {/* 副标题/描述 */}
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {feature.description}
              </p>

              {/* 示例图片（占位） */}
              <div className="relative mb-8">
                <Image
                  src={'/images/features/interior-ai-render-main.webp'}
                  alt={feature.title}
                  width={1280}
                  height={720}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl mx-auto"
                />
              </div>

              {/* 行动按钮 */}
              <div className="text-center">
                <Link href="/generate">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                    {/* 图标 */}
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                    </svg>
                    Start Creating
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
