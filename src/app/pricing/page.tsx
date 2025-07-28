import type { Metadata } from 'next'
import { PricingContent } from '@/components/PricingContent'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = generateMultilingualMetadata({
  title: '定价方案 - Flux Kontext AI建筑效果图生成 | 实惠的AI建筑图像',
  description: '为您的AI建筑效果图生成需求选择完美的方案。Flux Kontext为专业的AI建筑图像创建、编辑和处理提供灵活的定价。',
  keywords: [
    'flux kontext 定价',
    'ai建筑效果图定价', 
    'flux ai方案',
    'ai建筑图像定价',
    '专业ai建筑图像费用',
    'flux kontext订阅',
    'ai建筑效果图生成器方案',
    '实惠的ai建筑图像'
  ],
  path: '/pricing',
  images: ['/og-pricing.png'],
})

export default function PricingPage() {
  return <PricingContent />
} 