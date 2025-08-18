import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {HomeContent} from '@/components/HomeContent';

// 静态渲染支持
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

interface HomePageProps {
  params: Promise<{locale: string}>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // 启用静态渲染
  setRequestLocale(locale);

  return <HomeContent />;
}

// 生成动态元数据
export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  
  // 根据语言设置不同的元数据
  if (locale === 'zh') {
    return {
      title: 'Flux Kontext AI - 专业建筑效果图渲染平台 | AI建筑渲染，重塑想象',
      description: '率先体验强大的AI夜景渲染引擎。上传您的日间模型，告别繁琐打光，一键生成氛围感十足的最终效果图。',
      keywords: 'AI建筑渲染, 夜景渲染, 建筑效果图, 日转夜, Flux Kontext, 人工智能, 专业渲染',
      openGraph: {
        title: 'Flux Kontext AI - 专业建筑效果图渲染平台',
        description: '率先体验强大的AI夜景渲染引擎。上传您的日间模型，告别繁琐打光，一键生成氛围感十足的最终效果图。',
        url: 'https://fluxkontext.space',
        siteName: 'Flux Kontext',
        locale: 'zh_CN',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space',
        languages: {
          'zh': 'https://fluxkontext.space',
          'en': 'https://fluxkontext.space/en',
        }
      }
    };
  } else {
    return {
      title: 'Flux Kontext AI - Professional Architectural Rendering Platform',
      description: 'Experience powerful AI night scene rendering engine. Upload your daytime models, eliminate tedious lighting work, and generate atmospheric final renderings with one click.',
      keywords: 'AI architectural rendering, night scene rendering, architectural visualization, day to night, Flux Kontext, artificial intelligence, professional rendering',
      openGraph: {
        title: 'Flux Kontext AI - Professional Architectural Rendering Platform',
        description: 'Experience powerful AI night scene rendering engine. Upload your daytime models, eliminate tedious lighting work.',
        url: 'https://fluxkontext.space/en',
        siteName: 'Flux Kontext',
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://fluxkontext.space/en',
        languages: {
          'zh': 'https://fluxkontext.space',
          'en': 'https://fluxkontext.space/en',
        }
      }
    };
  }
} 