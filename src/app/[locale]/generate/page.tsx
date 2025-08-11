import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DesignPageContent } from '@/components/design/design-page-content'

// 静态渲染支持
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

interface GeneratePageProps {
  params: Promise<{locale: string}>;
}

export default async function GeneratePage({ params }: GeneratePageProps) {
  const { locale } = await params;
  
  // 启用静态渲染
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <DesignPageContent />
      </main>

      <Footer />
    </div>
  )
}

// 生成动态元数据
export async function generateMetadata({ params }: GeneratePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'zh') {
    return {
      title: 'AI房间设计 - Flux Kontext | 专业室内外设计',
      description: '使用AI生成、修改和转换室内外设计。使用Flux Kontext从照片或文字描述创建令人惊艳的视觉效果。',
      keywords: [
        'AI房间设计',
        '室内设计AI',
        '外观设计生成器',
        '家庭设计渲染',
        'Flux Kontext',
        'AI建筑',
        '房间修改',
        '家具摆放AI',
        '房屋设计AI',
      ].join(', '),
      openGraph: {
        title: 'AI房间设计 - Flux Kontext | 专业室内外设计',
        description: '使用AI生成、修改和转换室内外设计。',
        url: 'https://fluxkontext.space/generate',
        siteName: 'Flux Kontext',
        locale: 'zh_CN',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space/generate',
        languages: {
          'zh': 'https://fluxkontext.space/generate',
          'en': 'https://fluxkontext.space/en/generate',
        }
      }
    };
  } else {
    return {
      title: 'AI Room Design - Flux Kontext | Professional Interior & Exterior Design',
      description: 'Use AI to generate, modify, and transform interior and exterior designs. Create stunning visuals from photos or text descriptions with Flux Kontext.',
      keywords: [
        'AI room design',
        'interior design AI',
        'exterior design generator',
        'home design rendering',
        'Flux Kontext',
        'AI architecture',
        'room modification',
        'furniture placement AI',
        'house design AI',
      ].join(', '),
      openGraph: {
        title: 'AI Room Design - Flux Kontext | Professional Interior & Exterior Design',
        description: 'Use AI to generate, modify, and transform interior and exterior designs.',
        url: 'https://fluxkontext.space/en/generate',
        siteName: 'Flux Kontext',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space/en/generate',
        languages: {
          'zh': 'https://fluxkontext.space/generate',
          'en': 'https://fluxkontext.space/en/generate',
        }
      }
    };
  }
} 