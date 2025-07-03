import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  // 检查环境变量
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase环境变量未配置，无法创建客户端')
    throw new Error('Supabase环境变量未配置')
  }

  const cookieStore = await cookies()

  // 创建服务器端的Supabase客户端
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 在中间件中调用时可能会失败，这是正常的
          }
        },
      },
    }
  )
}

// 管理员客户端（使用service_role密钥）
export function createAdminClient() {
  // 检查环境变量
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Supabase环境变量未配置，无法创建管理员客户端')
    throw new Error('Supabase环境变量未配置')
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // 管理员客户端不需要设置cookies
        },
      },
    }
  )
} 