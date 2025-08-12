import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // 支持的语言列表 - 中文为默认，英文为备选
  locales: ['zh', 'en'],
 
  // 默认语言为中文
  defaultLocale: 'zh',
  
  // 路径前缀策略 - 始终显示语言前缀，避免默认语言无前缀导致的404
  localePrefix: 'always'
});

// 导出类型定义供其他文件使用
export type Locale = typeof routing.locales[number]; 