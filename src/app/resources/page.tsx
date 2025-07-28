import type { Metadata } from 'next'
import { ResourcesContent } from '@/components/ResourcesContent'

export const metadata: Metadata = {
  title: 'AI建筑效果图生成资源 - Flux Kontext | 免费工具和指南',
  description: 'Flux Kontext提供的免费AI建筑效果图生成资源和工具。学习如何使用AI创建专业的建筑图像。教程、指南和AI建筑图像创作技巧。',
  keywords: [
    'flux kontext 资源',
    'ai建筑效果图指南', 
    'flux ai教程',
    '免费ai建筑工具',
    'ai建筑图像创作指南',
    'flux kontext教程',
    'ai建筑效果图生成技巧',
    '专业ai建筑资源'
  ],
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'AI建筑效果图生成资源 - Flux Kontext',
    description: 'Flux Kontext提供的免费AI建筑效果图生成资源和工具。学习如何使用AI创建专业的建筑图像。',
    url: '/resources',
    images: [
      {
        url: '/og-resources.png',
        width: 1200,
        height: 630,
        alt: 'Flux Kontext AI建筑效果图生成资源',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI建筑效果图生成资源 - Flux Kontext',
    description: 'Flux Kontext提供的免费AI建筑效果图生成资源和工具',
    images: ['/twitter-resources.png'],
  },
}

export default function ResourcesPage() {
  return <ResourcesContent />
} 