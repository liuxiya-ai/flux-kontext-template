// 多语言系统核心逻辑
// 支持动态语言切换和类型安全

import homeData from './home.json'
import generatorData from './generator.json'
import pricingData from './pricing.json'
import authData from './auth.json'
import commonData from './common.json'
import seoData from './seo.json'

// 中文翻译文件
import homeDataZh from './home-zh.json'
import commonDataZh from './common-zh.json'
import authDataZh from './auth-zh.json'
import generatorDataZh from './generator-zh.json'

// 支持的语言列表 - 14种语言
export const SUPPORTED_LOCALES = [
  'zh',  // 中文 (默认)
  'en',  // English
  'de',  // Deutsch
  'es',  // Español
  'fr',  // Français
  'it',  // Italiano
  'ja',  // 日本語
  'ko',  // 한국어
  'nl',  // Nederlands
  'pl',  // Polski
  'pt',  // Português
  'ru',  // Русский
  'tr',  // Türkçe
  'ar',  // العربية
  'hi',  // हिन्दी
  'bn'   // বাংলা
] as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

// 默认语言
export const DEFAULT_LOCALE: SupportedLocale = 'zh'

// 语言显示名称
export const LOCALE_NAMES = {
  'en': 'English',
  'zh': '中文',
  'de': 'Deutsch',
  'es': 'Español',
  'fr': 'Français',
  'it': 'Italiano',
  'ja': '日本語',
  'ko': '한국어',
  'nl': 'Nederlands',
  'pl': 'Polski',
  'pt': 'Português',
  'ru': 'Русский',
  'tr': 'Türkçe',
  'ar': 'العربية',
  'hi': 'हिन्दी',
  'bn': 'বাংলা'
} as const

// 语言标志
export const LOCALE_FLAGS = {
  'en': '🇺🇸',
  'zh': '🇨🇳',
  'de': '🇩🇪',
  'es': '🇪🇸',
  'fr': '🇫🇷',
  'it': '🇮🇹',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'nl': '🇳🇱',
  'pl': '🇵🇱',
  'pt': '🇵🇹',
  'ru': '🇷🇺',
  'tr': '🇹🇷',
  'ar': '🇸🇦',
  'hi': '🇮🇳',
  'bn': '🇧🇩'
} as const

// 默认内容映射 (英语)
const defaultContentMap = {
  home: homeData,
  generator: generatorData,
  pricing: pricingData,
  auth: authData,
  common: commonData,
  seo: seoData
} as const

// 中文内容映射
const zhContentMap = {
  home: homeDataZh,
  generator: generatorDataZh,
  pricing: pricingData, // 暂时使用英文，后续补充
  auth: authDataZh,
  common: commonDataZh,
  seo: seoData // 暂时使用英文，后续补充
} as const

/**
 * 获取指定语言的文案内容
 * @param locale 语言代码
 * @returns 对应语言的文案对象
 */
export function getContent(locale: string = DEFAULT_LOCALE) {
  // 类型安全检查
  const validLocale = SUPPORTED_LOCALES.includes(locale as SupportedLocale) 
    ? (locale as SupportedLocale)
    : DEFAULT_LOCALE
    
  // 根据语言返回对应的内容
  switch (validLocale) {
    case 'zh':
      return zhContentMap
    case 'en':
      return defaultContentMap
    default:
      // 其他语言暂时使用默认英语内容
      return defaultContentMap
  }
}

/**
 * 检查是否为支持的语言
 * @param locale 语言代码
 * @returns 是否支持该语言
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

/**
 * 从URL路径中提取语言代码
 * @param pathname URL路径
 * @returns 语言代码
 */
export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  
  return isSupportedLocale(potentialLocale) ? potentialLocale : DEFAULT_LOCALE
}

/**
 * 生成带语言前缀的URL
 * @param path 路径
 * @param locale 语言代码
 * @returns 完整的URL路径
 */
export function getLocalizedPath(path: string, locale: SupportedLocale = DEFAULT_LOCALE): string {
  // 如果是默认语言（中文），不添加前缀
  if (locale === DEFAULT_LOCALE) {
    return path
  }
  
  // 确保路径以/开头
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

/**
 * 移除路径中的语言前缀
 * @param pathname 完整路径
 * @returns 不带语言前缀的路径
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  
  if (isSupportedLocale(potentialLocale)) {
    return '/' + segments.slice(2).join('/')
  }
  
  return pathname
}

/**
 * 获取语言的文本方向 (LTR/RTL)
 * @param locale 语言代码
 * @returns 文本方向
 */
export function getTextDirection(locale: SupportedLocale): 'ltr' | 'rtl' {
  // 阿拉伯语使用从右到左的文本方向
  return locale === 'ar' ? 'rtl' : 'ltr'
}

/**
 * 获取语言的字体族
 * @param locale 语言代码
 * @returns CSS字体族
 */
export function getFontFamily(locale: SupportedLocale): string {
  switch (locale) {
    case 'zh':
      return '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    case 'ja':
      return '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif'
    case 'ko':
      return '"Noto Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif'
    case 'ar':
      return '"Noto Sans Arabic", "Tahoma", sans-serif'
    case 'hi':
      return '"Noto Sans Devanagari", "Mangal", sans-serif'
    case 'bn':
      return '"Noto Sans Bengali", "Vrinda", sans-serif'
    default:
      return 'system-ui, -apple-system, sans-serif'
  }
}

// 导出类型定义
export type ContentData = typeof defaultContentMap
export type HomeContent = typeof homeData
export type GeneratorContent = typeof generatorData
export type PricingContent = typeof pricingData
export type AuthContent = typeof authData
export type CommonContent = typeof commonData
export type SEOContent = typeof seoData

// 默认导出当前内容（可以通过Context动态切换）
export default getContent() 