import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
import { getClientIp } from "@/lib/utils/ip"
import { getIsoTimestr } from "@/lib/utils/time"
import { getUuid } from "@/lib/utils/hash"
import { saveUser } from "@/lib/services/user"
import { User } from "@/lib/types/user"
import { createClient } from '@supabase/supabase-js'

const providers: any[] = []

// Google Auth (如果配置了)
if (
  process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" &&
  process.env.GOOGLE_ID &&
  process.env.GOOGLE_SECRET
) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  )
}

// Github Auth (如果配置了)
if (
  process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" &&
  process.env.AUTH_GITHUB_ID &&
  process.env.AUTH_GITHUB_SECRET
) {
  providers.push(
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  )
}

// 🔥 简化的邮箱登录 - 只使用Supabase认证
if (process.env.NEXT_PUBLIC_AUTH_CREDENTIALS_ENABLED === "true") {
  providers.push(
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 🚀 生产环境：使用Supabase认证（自带邮箱验证）
        // 只有在配置了Supabase时才尝试使用
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          )

          // 🔐 Supabase登录验证（自动检查邮箱验证状态）
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.log('登录失败:', error.message)
            return null
          }

          if (!data.user) {
            console.log('用户不存在')
            return null
          }

          // ✅ 检查邮箱验证状态
          if (!data.user.email_confirmed_at) {
            console.log('邮箱未验证')
            return null
          }

          // 🎉 登录成功
          return {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || data.user.email!,
          }

        } catch (error) {
          console.error('Supabase认证错误:', error)
          return null
        }
        }

        // 如果没有配置Supabase或者认证失败，返回null
        return null
      },
    })
  )
}

export const providerMap = providers
  .map((provider: any) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  // 🍪 Cookie安全配置 - 优化以支持Google One Tap
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',        // 🔧 设置为lax而非strict，支持第三方登录
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // 🔧 移除域名限制，让NextAuth自动处理
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',        // 🔧 支持跨站点回调
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // 🔧 移除域名限制
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',        // 🔧 支持CSRF保护但允许第三方登录
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // 🔧 移除域名限制
      },
    },
    // 🔧 添加状态Cookie配置以支持Google One Tap
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900, // 15分钟
        // 🔧 移除域名限制
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900, // 15分钟
        // 🔧 移除域名限制
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 🎯 signIn回调的职责是：
      // 1. 记录登录事件
      // 2. 对于第三方登录(如Google)，确保我们的公共users表里有对应记录。
      // 对于邮箱密码登录，认证已在authorize步骤完成，这里只需放行。
      
      console.log('🔍 signIn回调触发:', { 
        user: user, 
        account: account?.provider, 
        profile: profile?.email 
      })
      
      // 对于'credentials'（邮箱密码）登录，authorize步骤已经处理了所有验证，
      // 所以我们在这里直接允许通过。
      if (account?.provider === 'credentials') {
        console.log('✅ 邮箱密码登录，直接通过signIn。')
        return true
      }

      // --- 对于OAuth登录 (如Google, GitHub) 的处理逻辑 ---
      // (这部分逻辑在未来的开发中可以被启用和完善)

      // try {
      //   if (user?.email) {
      //     // ... 这里可以保留或完善创建/更新第三方登录用户的逻辑 ...
      //     // ... 例如, 将Google登录的用户信息同步到 public.users 表 ...
      //   }
      // } catch (error) {
      //   console.error('❌ OAuth用户处理失败:', error)
      //   // 即使数据库操作失败，也应允许用户登录，避免影响体验
      // }

      console.log('✅ signIn回调完成，返回true允许登录。')
      return true
    },
    async redirect({ url, baseUrl }) {
      // 🎯 修改重定向逻辑 - 优先跳转到generate页面
      
      // 如果URL包含callbackUrl参数，使用该参数
      if (url.includes('callbackUrl=')) {
        const urlParams = new URLSearchParams(url.split('?')[1])
        const callbackUrl = urlParams.get('callbackUrl')
        if (callbackUrl) {
          // 解码callbackUrl
          const decodedCallback = decodeURIComponent(callbackUrl)
          if (decodedCallback.startsWith("/")) return `${baseUrl}${decodedCallback}`
          else if (new URL(decodedCallback).origin === baseUrl) return decodedCallback
        }
      }
      
      // 如果是相对路径，添加baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      // 如果是同域名的完整URL，直接返回
      if (new URL(url).origin === baseUrl) return url
      
      // 🎯 默认跳转到generate页面（主功能页面）而非dashboard
      return `${baseUrl}/generate`
    },
    async session({ session, token }) {
      // 🎯 会话信息处理
      return session
    },
    async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
      // 🎯 JWT token 处理
      if (user) {
        token.user = user as any
      }
      return token
    },
  },
}

// 检测用户地理位置的函数
async function detectUserLocation(): Promise<string> {
  try {
    // 这里可以使用IP地理位置检测服务
    // 暂时返回默认值，实际项目中可以集成 ipapi.co 等服务
    return "US" // 默认为美国
  } catch (error) {
    console.error("地理位置检测失败:", error)
    return "US"
  }
} 