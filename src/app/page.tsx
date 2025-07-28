import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

// 中文页面SEO元数据
export const metadata: Metadata = {
  title: 'Flux Kontext AI - 专业AI建筑效果图生成平台 | 创建令人惊艳的建筑图像',
  description: '使用我们尖端的AI技术将您的建筑想法转化为专业效果图。从文本生成建筑图像，编辑现有建筑图片，并使用Flux Kontext AI的强大功能处理多张建筑图像。',
  keywords: 'AI建筑效果图生成, 建筑可视化, 建筑设计图像, Flux Kontext, 人工智能建筑, 专业建筑效果图',
  openGraph: {
    title: 'Flux Kontext AI - 专业AI建筑效果图生成平台',
    description: '使用我们尖端的AI技术将您的建筑想法转化为专业效果图。',
    url: 'https://fluxkontext.space',
    siteName: 'Flux Kontext',
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fluxkontext.space',
    languages: {
      'en': 'https://fluxkontext.space/en',
      'de': 'https://fluxkontext.space/de',
      'es': 'https://fluxkontext.space/es',
      'fr': 'https://fluxkontext.space/fr',
      'it': 'https://fluxkontext.space/it',
      'ja': 'https://fluxkontext.space/ja',
      'ko': 'https://fluxkontext.space/ko',
      'nl': 'https://fluxkontext.space/nl',
      'pl': 'https://fluxkontext.space/pl',
      'pt': 'https://fluxkontext.space/pt',
      'ru': 'https://fluxkontext.space/ru',
      'tr': 'https://fluxkontext.space/tr',
      'ar': 'https://fluxkontext.space/ar',
      'hi': 'https://fluxkontext.space/hi',
      'bn': 'https://fluxkontext.space/bn',
      'zh': 'https://fluxkontext.space'
    }
  }
}

// 中文内容字典 - 针对建筑效果图站优化
const zhDictionary = {
  hero: {
    badge: "专业AI建筑效果图生成平台",
    title: "使用AI创建令人惊艳的建筑效果图",
    subtitle: "Flux Kontext AI",
    description: "使用我们尖端的AI技术将您的建筑想法转化为专业效果图。从文本描述生成建筑图像，编辑现有建筑图片，为建筑师和设计师提供强大的可视化工具。",
    cta: {
      primary: "开始创建效果图",
      secondary: "查看价格"
    }
  },
  features: {
    title: "Flux Kontext AI建筑可视化平台的主要功能",
    subtitle: "我们的Flux Kontext AI结合尖端技术，在一个无缝平台中提供专业的建筑效果图生成和编辑。",
    items: [
      {
        title: "建筑文本转图像生成",
        description: "使用先进的AI技术将您的建筑设计描述转换为令人惊艳的高质量建筑效果图。"
      },
      {
        title: "专业建筑图像编辑",
        description: "使用自然语言指令编辑现有建筑图像，实现精确的设计修改和风格调整。"
      },
      {
        title: "多建筑图像处理",
        description: "同时处理多张建筑图像，保持一致的建筑风格和设计质量。"
      }
    ]
  },
  faq: {
    title: "常见问题",
    subtitle: "找到关于我们Flux Kontext AI建筑可视化平台及其强大建筑效果图生成功能的常见问题答案。",
    items: [
      {
        question: "什么是Flux Kontext AI建筑效果图生成器？",
        answer: "Flux Kontext AI是一个专为建筑行业设计的先进效果图生成平台，使用尖端人工智能从文本描述创建令人惊艳的建筑图像，编辑现有建筑图片，并同时处理多张建筑设计图。"
      },
      {
        question: "建筑文本转图像生成是如何工作的？",
        answer: "我们的AI分析您的建筑设计文本描述，并使用先进的Flux Pro和Max模型生成高质量建筑效果图。只需描述您想要的建筑风格、材料和设计元素，我们的AI就会在几秒钟内创建专业级建筑可视化图像。"
      }
    ]
  },
  cta: {
    title: "准备创建令人惊艳的建筑效果图了吗？",
    subtitle: "加入成千上万使用Flux Kontext AI将建筑想法变为现实的建筑师和设计师。",
    button: "立即开始创建"
  },
  footer: {
    brand: {
      name: "Flux Kontext",
      description: "专业AI建筑效果图生成平台。从文本创建令人惊艳的建筑图像，编辑现有建筑图片，并使用先进的AI技术处理多张建筑设计图。",
      copyright: "© 2025 Flux Kontext. 保留所有权利。"
    },
    contact: {
      title: "联系我们",
      email: "support@fluxkontext.space"
    },
    legal: {
      title: "法律条款",
      terms: "服务条款",
      privacy: "隐私政策",
      refund: "退款政策"
    },
    languages: {
      title: "语言"
    },
    social: {
      builtWith: "用❤️为全世界的建筑师和设计师打造",
      followUs: "关注我们"
    }
  }
}

export default function ChinesePage() {
  return <HomeContentSimple dictionary={zhDictionary} />
} 