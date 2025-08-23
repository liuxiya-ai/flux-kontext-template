import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// API 路由和认证回调等路径不应被国际化
const publicPages = [
  '/api/webhooks/stripe',
  '/api/webhooks/lemonsqueezy'
];

export default createMiddleware({
  ...routing,
  publicRoutes: publicPages
});

export const config = {
  // 匹配除了包含 `.` (例如静态文件) 或 `_next` (Next.js 内部资源) 的所有路径
  matcher: ['/((?!_next|.*\..*).*)']
};

