"use client"

import Image from "next/image"; // 导入Next.js的Image组件
import { Link } from "@/i18n/navigation"; // 使用i18n导航Link
import { Button } from "@/components/ui/button"; // 导入按钮组件
import { useTranslations } from 'next-intl'; // 导入翻译hook
import { useRef } from 'react'; // 导入useRef用于滚动控制

/**
 * @name KeyFeatures
 * @description 首页核心功能展示区，重点展示夜景渲染功能，支持左右滑动交互，完全遵循Next-intl最佳实践
 */
export function KeyFeatures() {
  // 使用翻译 - 采用命名空间分离的方式，更符合Next-intl最佳实践
  const t = useTranslations('features.nightScene');

  // 滚动容器引用
  const scrollRef = useRef<HTMLDivElement>(null);

  // 图片数据 - 更新为三张图片
  const featureImages = [
    {
      id: 1,
      src: "/images/features/interior-ai-render-main.webp",
      alt: t('imageAlts.output')
    },
    {
      id: 2,
      src: "/images/examples/night-scene-input.webp",
      alt: t('imageAlts.input')
    },
    {
      id: 3,
      src: "/images/modules/night-scene.webp",
      alt: t('imageAlts.process')
    }
  ];

  // 滚动函数 - 更新为按图片宽度滚动
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth; // 每次滚动一个图片的宽度

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-4 relative z-20">
      <div className="container mx-auto">

        {/* 核心功能主展示区 - 新设计 */}
        <div className="mb-16">
          {/* 主标题 - 居中，增大一个字号 */}
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
            {t('title')}
          </h2>

          {/* 左右分栏布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* 左侧 - 特性列表 */}
            <div className="space-y-6">
              {t('subtitle').split('\n').map((line, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {/* 带圈的✓ */}
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {/* 白色文字 */}
                  <span className="text-lg md:text-xl text-white leading-relaxed">
                    {line.replace('✓ ', '')}
                  </span>
                </div>
              ))}
            </div>

            {/* 右侧 - 可滑动图片展示区 */}
            <div className="relative w-full flex justify-center items-center">

              {/* 左滑动按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 p-0 border-2 border-white/30 bg-black/40 text-white hover:bg-primary/30 hover:border-primary/60 backdrop-blur-sm shadow-lg rounded-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>

              {/* 右滑动按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 p-0 border-2 border-white/30 bg-black/40 text-white hover:bg-primary/30 hover:border-primary/60 backdrop-blur-sm shadow-lg rounded-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>

              {/* 图片容器 - 限制宽度并居中 */}
              <div className="w-full max-w-xl lg:max-w-2xl mx-auto">
                {/* 横向滑动容器 */}
                <div
                  ref={scrollRef}
                  className="overflow-x-auto scrollbar-hide rounded-xl flex scroll-snap-type-x-mandatory"
                >
                  {featureImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex-none w-full aspect-[4/3] relative rounded-xl overflow-hidden scroll-snap-align-center"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transform scale-150" // 图片放大1.5倍
                        sizes="(max-width: 1280px) 100vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* 滚动提示文字 */}
                <div className="flex items-center justify-center mt-4 space-x-2 text-white/70 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>滚动探索更多</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
