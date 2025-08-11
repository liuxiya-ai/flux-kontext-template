"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

// 支持的语言配置
const LOCALES = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const

type Locale = typeof LOCALES[number]['code']

interface LanguageSwitcherIntlProps {
  variant?: "dropdown" | "toggle"
  className?: string
}

export function LanguageSwitcherIntl({ 
  variant = "dropdown", 
  className = "" 
}: LanguageSwitcherIntlProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // 从路径名获取当前语言
  const getCurrentLocale = (): Locale => {
    // next-intl的路径结构: /zh/xxx 或 /en/xxx 或 /xxx (默认中文)
    const segments = pathname.split('/')
    const potentialLocale = segments[1]
    
    // 如果第一段是支持的语言代码，返回它
    if (LOCALES.some(locale => locale.code === potentialLocale)) {
      return potentialLocale as Locale
    }
    
    // 否则返回默认语言（中文）
    return 'zh'
  }
  
  const currentLocale = getCurrentLocale()
  const currentLocaleInfo = LOCALES.find(locale => locale.code === currentLocale)!
  
  if (variant === "toggle") {
    // 简单的切换模式 - 在中英文之间切换
    const otherLocale = currentLocale === 'zh' ? 'en' : 'zh'
    const otherLocaleInfo = LOCALES.find(locale => locale.code === otherLocale)!
    
    return (
      <Link href={pathname} locale={otherLocale}>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-2 transition-all duration-200 hover:font-semibold active:scale-95 ${className}`}
          title={`切换到 ${otherLocaleInfo.name}`}
        >
          <span>{otherLocaleInfo.flag}</span>
          <span>{otherLocaleInfo.name}</span>
        </Button>
      </Link>
    )
  }

  // 下拉菜单模式
  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:font-semibold active:scale-95 transition-all duration-200"
      >
        <span>{currentLocaleInfo.flag}</span>
        <span>{currentLocaleInfo.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-background border border-border rounded-lg shadow-lg py-2 z-[9999]">
          {LOCALES.map((locale) => (
            <Link
              key={locale.code}
              href={pathname}
              locale={locale.code}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-accent ${
                locale.code === currentLocale ? 'bg-accent text-primary font-medium' : ''
              }`}
            >
              <span>{locale.flag}</span>
              <span>{locale.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// 简化版本 - 只显示当前语言，点击切换
export function SimpleLanguageSwitcherIntl({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  
  const getCurrentLocale = (): Locale => {
    const segments = pathname.split('/')
    const potentialLocale = segments[1]
    
    if (LOCALES.some(locale => locale.code === potentialLocale)) {
      return potentialLocale as Locale
    }
    
    return 'zh'
  }
  
  const currentLocale = getCurrentLocale()
  const otherLocale = currentLocale === 'zh' ? 'en' : 'zh'
  const currentLocaleInfo = LOCALES.find(locale => locale.code === currentLocale)!
  const otherLocaleInfo = LOCALES.find(locale => locale.code === otherLocale)!
  
  return (
    <Link href={pathname} locale={otherLocale}>
      <button
        className={`flex items-center space-x-2 transition-all duration-200 hover:font-semibold active:scale-95 ${className}`}
        title={`切换到 ${otherLocaleInfo.name}`}
      >
        <span>{currentLocaleInfo.flag}</span>
        <span>{currentLocaleInfo.name}</span>
      </button>
    </Link>
  )
} 