"use client"

import Image from "next/image"; // 导入Next.js的Image组件
import { Link } from "@/i18n/navigation"; // 使用i18n导航Link
import { Button } from "@/components/ui/button"; // 导入按钮组件
import { useTranslations } from 'next-intl'; // 导入翻译hook

/**
 * @name KeyFeatures
 * @description 首页核心功能展示区，重点展示夜景渲染功能
 */
export function KeyFeatures() {
  // 使用翻译
  const t = useTranslations('features');
  const nightScene = t.raw('nightScene') as {title: string; subtitle: string; cta: string};

  return (
    <section className="py-16 px-4 relative z-20">
      <div className="container mx-auto">
        
        {/* 夜景功能主展示区 */}
        <div className="text-center mb-16">
          {/* 主标题 - 使用和"AI图像生成展示"相同的样式 */}
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            {nightScene.title}
          </h2>
          
          {/* 副标题 - 三行特性并列居中 */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="text-lg md:text-xl text-foreground/90 leading-relaxed space-y-2">
              {nightScene.subtitle.split('\n').map((line, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 三张并列图片及按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 图片1 - 夜景输入示例 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/examples/night-scene-input.webp"
                  alt="夜景渲染输入示例"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3 text-base"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {nightScene.cta}
                </Button>
              </Link>
            </div>

            {/* 图片2 - 夜景渲染过程 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/examples/inspire-input.webp"
                  alt="夜景渲染过程示例"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3 text-base"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {nightScene.cta}
                </Button>
              </Link>
            </div>

            {/* 图片3 - 夜景输出效果 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/examples/inspire-output.webp"
                  alt="夜景渲染输出效果"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <Link href="/generate">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 px-6 py-3 text-base"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {nightScene.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
