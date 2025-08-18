"use client"

import Image from "next/image"; // 导入Next.js的Image组件
import { Link } from "@/i18n/navigation"; // 使用i18n导航Link
import { Button } from "@/components/ui/button"; // 导入按钮组件
import { useTranslations } from 'next-intl'; // 导入翻译hook

/**
 * @name KeyFeatures
 * @description 首页核心功能展示区，重点展示夜景渲染功能，完全遵循Next-intl最佳实践
 */
export function KeyFeatures() {
  // 使用翻译 - 采用命名空间分离的方式，更符合Next-intl最佳实践
  const t = useTranslations('features.nightScene');

  return (
    <section className="py-16 px-4 relative z-20">
      <div className="container mx-auto">
        
        {/* 夜景功能主展示区 */}
        <div className="text-center mb-16">
          {/* 主标题 - 使用和"AI图像生成展示"相同的样式 */}
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            {t('title')}
          </h2>
          
          {/* 副标题 - 三行特性左对齐 */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="text-lg md:text-xl text-foreground/90 leading-relaxed space-y-3">
              {t('subtitle').split('\n').map((line, index) => (
                <div key={index} className="text-left">
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 三张图片竖向排列 */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 图片1 - 夜景输入示例 */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full max-w-3xl aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/features/interior-ai-render-main.webp"
                  alt={t('imageAlts.input')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-8 py-4 text-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {t('cta')}
                </Button>
              </Link>
            </div>

            {/* 图片2 - 夜景渲染过程 */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full max-w-3xl aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/features/interior-ai-render-main.webp"
                  alt={t('imageAlts.process')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-8 py-4 text-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {t('cta')}
                </Button>
              </Link>
            </div>

            {/* 图片3 - 夜景输出效果 */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full max-w-3xl aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/features/interior-ai-render-main.webp"
                  alt={t('imageAlts.output')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-8 py-4 text-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {t('cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
