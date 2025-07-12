import { route } from "@fal-ai/server-proxy/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/database"

// 速率限制配置
const limiter = {
  perMinute: 10,
  perHour: 30, 
  perDay: 100
}

export const POST = async (req: NextRequest) => {
  try {
    // 1. 用户认证检查
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "需要登录才能使用此功能" },
        { status: 401 }
      )
    }

    // 2. 获取用户信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "用户不存在，请重新登录" },
        { status: 404 }
      )
    }

    // 3. 积分检查
    // 此处可以添加积分检查逻辑
    // const userCredits = user.credits || 0
    // if (userCredits < 1) {
    //   return NextResponse.json(
    //     { error: "积分不足，请充值" },
    //     { status: 402 }
    //   )
    // }

    // 4. 转发到 fal.ai
    return route.POST(req)
  } catch (error) {
    console.error("FAL API代理错误:", error)
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    )
  }
}

export const { GET, PUT } = route 