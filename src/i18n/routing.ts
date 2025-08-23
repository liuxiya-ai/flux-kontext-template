import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // 支持的语言列表 - 中文为默认，英文为备选
  locales: ['zh', 'en'],
 
  // 默认语言为中文
  defaultLocale: 'zh',
  
  // 路径前缀策略 - 根据需要添加语言前缀 (默认语言不显示前缀)
  localePrefix: 'as-needed'
});

// 导出类型定义供其他文件使用
export type Locale = typeof routing.locales[number]; 