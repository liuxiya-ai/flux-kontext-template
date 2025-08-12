"use client"

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'

export default function TestPage() {
  const params = useParams()
  const locale = params.locale as string
  
  // 使用翻译
  const t = useTranslations('hero')
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">测试页面</h1>
      <p className="mb-4">当前语言: <strong>{locale}</strong></p>
      <p className="mb-4">翻译标题: <strong>{t('title')}</strong></p>
      <p className="mb-4">翻译描述: <strong>{t('description')}</strong></p>
      
      <div className="mt-8 space-x-4">
        <Link href="/test" locale="zh" className="px-4 py-2 bg-blue-500 text-white rounded">
          切换到中文
        </Link>
        <Link href="/test" locale="en" className="px-4 py-2 bg-red-500 text-white rounded">
          Switch to English
        </Link>
      </div>
    </div>
  )
} 