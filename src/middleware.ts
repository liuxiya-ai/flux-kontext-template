import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing
});

export const config = {
  // 匹配所有不以 `api`, `_next/static`, `_next/image`, 或 `favicon.ico` 开头的路径
  // 这可以有效地将中间件的范围限定在实际的页面路由上
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

