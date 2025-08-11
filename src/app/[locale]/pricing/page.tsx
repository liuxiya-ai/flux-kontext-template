import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server';
import { PricingContent } from '@/components/PricingContent'

// 静态渲染支持
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

interface PricingPageProps {
  params: Promise<{locale: string}>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  
  // 启用静态渲染
  setRequestLocale(locale);

  return <PricingContent />
}

// 生成动态元数据
export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'zh') {
    return {
      title: '定价方案 - Flux Kontext AI图像生成 | 实惠的AI艺术',
      description: '为您的AI图像生成需求选择完美的方案。Flux Kontext提供灵活的专业AI图像创建、编辑和处理定价。',
      keywords: [
        'flux kontext 定价',
        'ai图像生成定价',
        'flux ai 方案',
        'ai艺术定价',
        '专业ai图像成本',
        'flux kontext 订阅',
        'ai图像生成器方案',
        '实惠ai艺术'
      ].join(', '),
      openGraph: {
        title: '定价方案 - Flux Kontext AI图像生成',
        description: '为您的AI图像生成需求选择完美的方案。',
        url: 'https://fluxkontext.space/pricing',
        siteName: 'Flux Kontext',
        locale: 'zh_CN',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space/pricing',
        languages: {
          'zh': 'https://fluxkontext.space/pricing',
          'en': 'https://fluxkontext.space/en/pricing',
        }
      }
    };
  } else {
    return {
      title: 'Pricing Plans - Flux Kontext AI Image Generation | Affordable AI Art',
      description: 'Choose the perfect plan for your AI image generation needs. Flux Kontext offers flexible pricing for professional AI image creation, editing, and processing.',
      keywords: [
        'flux kontext pricing',
        'ai image generation pricing',
        'flux ai plans',
        'ai art pricing',
        'professional ai images cost',
        'flux kontext subscription',
        'ai image generator plans',
        'affordable ai art'
      ].join(', '),
      openGraph: {
        title: 'Pricing Plans - Flux Kontext AI Image Generation',
        description: 'Choose the perfect plan for your AI image generation needs.',
        url: 'https://fluxkontext.space/en/pricing',
        siteName: 'Flux Kontext',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space/en/pricing',
        languages: {
          'zh': 'https://fluxkontext.space/pricing',
          'en': 'https://fluxkontext.space/en/pricing',
        }
      }
    };
  }
} 