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
      title: 'Flux Kontext AI - 专业AI图像生成平台 | 创建令人惊艳的图像',
      description: '使用我们尖端的AI技术将您的想法转化为专业图像。从文本生成图像，编辑现有图像，并使用Flux Kontext AI的强大功能处理多张图像。',
      keywords: 'AI图像生成, 文本转图像, 图像编辑, Flux Kontext, 人工智能, 专业图像',
      openGraph: {
        title: 'Flux Kontext AI - 专业AI图像生成平台',
        description: '使用我们尖端的AI技术将您的想法转化为专业图像。',
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
      title: 'Flux Kontext AI - Professional AI Image Generation Platform',
      description: 'Best AI architecture rendering platform. Powered by artificial intelligence. Create stunning images from text, edit existing images, and process multiple images with advanced AI technology.',
      keywords: 'AI image generation, text to image, image editing, Flux Kontext, artificial intelligence, professional images',
      openGraph: {
        title: 'Flux Kontext AI - Professional AI Image Generation Platform',
        description: 'Best AI architecture rendering platform. Powered by artificial intelligence.',
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