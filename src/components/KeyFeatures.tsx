import { keyFeatures } from "@/lib/config/features"; // 导入新的功能数据
import Image from "next/image"; // 导入Next.js的Image组件
import Link from "next/link"; // 导入Next.js的Link组件
import { Button } from "@/components/ui/button"; // 导入按钮组件
import { common } from "@/lib/content"; // 导入通用文案

/**
 * @name KeyFeatures
 * @description 首页核心功能展示区 (静态版)，一个服务器组件，负责渲染所有核心功能。
 */
export function KeyFeatures() {
  return (
    <section className="py-8 px-4 relative z-20">
      <div className="container mx-auto">
        <div className="space-y-16">
          {keyFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center max-w-4xl mx-auto"
            >
              {/* 主标题 */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
              
              {/* 副标题/描述 */}
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    {feature.description}
                  </p>
              
              {/* 示例图片 */}
              <div className="relative mb-8">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={1280}
                  height={720}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl mx-auto"
                />
                </div>
              
              {/* 按钮 - 移到图片下方 */}
              <div className="text-center">
                <Link href="/generate">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                    </svg>
                    {common.buttons.startCreating}
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
