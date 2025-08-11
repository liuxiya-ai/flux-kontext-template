import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// 创建 next-intl 中间件
const intlMiddleware = createIntlMiddleware(routing);

// 简单的内存速率限制器 (生产环境建议使用Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  
  const record = rateLimitMap.get(ip)
  
  if (!record || record.lastReset < windowStart) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 强制HTTPS重定向 (生产环境)
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto')
    if (proto === 'http') {
      return NextResponse.redirect(`https://fluxkontext.space${pathname}`, 301)
    }
  }
  
  // API路由处理 - 跳过国际化，直接处理
  if (pathname.startsWith('/api/')) {
    // API v1 路由重写 - 将文档中的API端点映射到实际实现
    if (pathname.startsWith('/api/v1/')) {
      let newPath = '/api/flux-kontext'
      let action = ''
      
      // 根据URL路径确定action类型
      if (pathname.includes('/text-to-image/pro')) {
        action = 'text-to-image-pro'
      } else if (pathname.includes('/text-to-image/max')) {
        action = 'text-to-image-max'
      } else if (pathname.includes('/image-edit/pro')) {
        action = 'edit-image-pro'
      } else if (pathname.includes('/image-edit/max')) {
        action = 'edit-image-max'
      }
      
      // 创建新的URL并添加action参数
      const url = request.nextUrl.clone()
      url.pathname = newPath
      
      // 如果确定了action，添加到查询参数中
      if (action) {
        url.searchParams.set('action', action)
      }
      
      const response = NextResponse.rewrite(url)
      
      // 添加安全头
      addSecurityHeaders(response)
      
      return response
    }
    
    // API路由速率限制
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') ?? 
               '127.0.0.1'
    
    // 不同API端点不同的限制
    let limit = 10
    let windowMs = 60000 // 1分钟
    
    if (pathname.includes('/auth/')) {
      limit = 5 // 认证相关更严格
      windowMs = 300000 // 5分钟
    } else if (pathname.includes('/payment/')) {
      limit = 3 // 支付相关最严格
      windowMs = 600000 // 10分钟
    }
    
    if (!rateLimit(ip, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
    
    const response = NextResponse.next()
    addSecurityHeaders(response)
    return response
  }
  
  // 对于非API路由，使用国际化中间件
  const response = intlMiddleware(request);
  
  // 添加安全头到国际化响应
  if (response) {
    addSecurityHeaders(response)
  }
  
  return response;
}

// 添加安全头的辅助函数
function addSecurityHeaders(response: NextResponse) {
  // 添加安全头
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  
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
  )
}

export const config = {
  // 匹配所有路径，但排除特定的系统路径
  matcher: [
    // 跳过内部Next.js文件和静态资源，但包含API路由进行速率限制
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 