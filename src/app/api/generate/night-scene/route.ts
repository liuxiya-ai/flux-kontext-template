import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { NightSceneGenerationService } from '@/lib/fal-server'

// 夜景生成API
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 开始夜景生成请求:', new Date().toISOString())
    
    const body = await request.json()
    console.log('📝 请求参数 (夜景):', {
      hasImage: !!body.image_url,
      aspect_ratio: body.aspect_ratio,
      seed: body.seed,
      num_images: body.num_images,
      timestamp: new Date().toISOString()
    })

    if (!body.image_url) {
      return NextResponse.json(
        { error: '缺少必要参数：图片URL是必需的' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '请先登录再开始创建！立即注册可获得100个免费积分。' },
        { status: 401 }
      )
    }

    // 注意：这里的数据库操作和积分检查暂时被注释掉了，
    // 因为这部分逻辑与 architecture API 类似，可以根据未来的需求再启用。

    const result = await NightSceneGenerationService.generate({
      image_url: body.image_url,
      aspect_ratio: body.aspect_ratio,
      seed: body.seed,
      num_images: body.num_images,
    })

    const processingTime = Date.now() - startTime
    console.log(`✅ 夜景生成完成，处理时间: ${processingTime}ms`)

    return NextResponse.json({
      success: true,
      images: result.images,
      processingTime,
    })

  } catch (error) {
    console.error('❌ 夜景生成错误:', error)
    
    return NextResponse.json(
      { 
        error: '生成过程中发生错误',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
} 