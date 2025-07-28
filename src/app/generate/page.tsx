import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { FluxKontextGenerator } from '@/components/FluxKontextGenerator'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = {
  title: 'AI建筑效果图生成器 - 专业建筑可视化平台 | Flux Kontext',
  description: '使用先进的AI技术生成专业建筑效果图。从文本描述创建建筑设计图像，编辑现有建筑图片，为建筑师和设计师提供强大的可视化工具。',
  keywords: [
    'AI建筑效果图',
    '建筑可视化',
    '建筑设计图像生成',
    '建筑AI工具',
    '效果图制作',
    '建筑渲染',
    '专业建筑图像',
    'AI建筑设计',
    '建筑可视化平台',
    '智能建筑效果图',
    '建筑图像生成器'
  ],
  openGraph: {
    title: 'AI建筑效果图生成器 - 专业建筑可视化平台',
    description: '使用先进的AI技术生成专业建筑效果图',
    url: 'https://fluxkontext.space/generate',
    siteName: 'Flux Kontext',
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fluxkontext.space/generate',
    languages: {
      'en': 'https://fluxkontext.space/en/generate',
      'zh': 'https://fluxkontext.space/generate'
    }
  }
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <FluxKontextGenerator />
      </main>

      <Footer />
    </div>
  )
} 