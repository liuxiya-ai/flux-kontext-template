import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// 使用 next-intl 官方写法创建中间件
const intlMiddleware = createMiddleware(routing);

// 添加安全头的辅助函数
function addSecurityHeaders(response: NextResponse) {
  // 添加安全头
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  
  // 内容安全策略 - 修复Google OAuth和TrustedScript问题
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com 'wasm-unsafe-eval'; " +
    "script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https: http:; " +
    "media-src 'self' blob: https:; " +
    "connect-src 'self' https://challenges.cloudflare.com https://accounts.google.com https://www.google-analytics.com https://api.stripe.com https://*.supabase.co https://*.supabase.in wss://*.supabase.co wss://*.supabase.in https://fal.ai https://*.fal.ai https://v3.fal.media https://fal.media; " +
    "frame-src 'self' https://challenges.cloudflare.com https://accounts.google.com https://js.stripe.com; " +
    "worker-src 'self' blob:; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self' https:; " +
    "frame-ancestors 'self';"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 强制HTTPS重定向 (生产环境)
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    if (proto === 'http') {
      return NextResponse.redirect(`https://fluxkontext.space${pathname}`, 301);
    }
  }
  
  // API路由处理 - 跳过国际化，直接处理
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }
  
  // 对于非API路由，使用国际化中间件
  const response = intlMiddleware(request);
  
  // 添加安全头到国际化响应
  if (response) {
    addSecurityHeaders(response);
    return response;
  }
  
  // 回退：未被i18n处理的请求继续
  return NextResponse.next();
}

export const config = {
  // 官方推荐：匹配除 api、trpc、_next、_vercel 以及包含点的静态资源外的所有路径
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}; 