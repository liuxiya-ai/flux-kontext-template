import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/database'
import { ArchitectureGenerationService } from '@/lib/fal-server'

// 生成建筑效果图API
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 开始建筑效果图生成请求:', new Date().toISOString())
    
    // 解析请求体
    const body = await request.json()
    console.log('📝 请求参数:', {
      prompt: body.prompt?.substring(0, 100) + '...',
      hasImage: !!body.image_url,
      tier: body.tier || 'basic',
      timestamp: new Date().toISOString()
    })

    // 验证请求参数
    if (!body.prompt || !body.image_url) {
      return NextResponse.json(
        { error: '缺少必要参数：提示词和图片URL是必需的' },
        { status: 400 }
      )
    }

    // 验证用户身份
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '请先登录再开始创建！立即注册可获得100个免费积分。' },
        { status: 401 }
      )
    }

    // 获取用户信息 - 增加容错处理
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
    } catch (dbError) {
      console.warn("⚠️ 数据库查询失败，可能未配置数据库。在测试模式下将继续执行:", dbError);
    }
    
    if (!user) {
      console.warn(`⚠️ 在数据库中找不到用户 ${session.user.email}，或数据库未连接。在测试模式下将继续...`);
      // 在生产环境中，这里应该返回错误
      // return NextResponse.json(
      //   { error: '找不到用户，请重新登录' },
      //   { status: 404 }
      // )
    }

    // 检查用户积分（可选）
    // const userCredits = user.credits || 0
    // const requiredCredits = body.tier === 'advanced' ? 30 : 15
    // if (userCredits < requiredCredits) {
    //   return NextResponse.json(
    //     { error: `积分不足，需要${requiredCredits}积分，当前只有${userCredits}积分` },
    //     { status: 402 }
    //   )
    // }

    // 创建生成记录 - 注释掉以避免模型不存在的错误
    // 在实际项目中，需要先创建相应的数据库模型
    let generationId = null
    // try {
    //   // 检查是否存在image_generations表
    //   if(user) { // 只有在找到用户时才尝试创建记录
    //      const generation = await prisma.imageGeneration.create({
    //        data: {
    //          userId: user.id,
    //          prompt: body.prompt,
    //          status: 'processing',
    //        }
    //      })
    //      generationId = generation.id
    //   }
    // } catch (err: any) {
    //   console.log('⚠️ 创建生成记录失败，但继续处理:', err.message)
    // }

    // 调用生成服务
    let result
    if (body.tier === 'advanced') {
      result = await ArchitectureGenerationService.generateAdvanced({
        prompt: body.prompt,
        image_url: body.image_url,
        aspect_ratio: body.aspect_ratio,
        guidance_scale: body.guidance_scale,
        num_images: body.num_images || 1,
        seed: body.seed
      })
    } else {
      result = await ArchitectureGenerationService.generateBasic({
        prompt: body.prompt,
        image_url: body.image_url,
        aspect_ratio: body.aspect_ratio,
        guidance_scale: body.guidance_scale,
        num_images: body.num_images || 1,
        seed: body.seed
      })
    }

    // 更新生成记录 - 注释掉以避免模型不存在的错误
    // if (generationId) {
    //   try {
    //     await prisma.imageGeneration.update({
    //       where: { id: generationId },
    //       data: {
    //         status: 'completed',
    //         outputUrl: result.images[0]?.url,
    //         completedAt: new Date()
    //       }
    //     })
    //   } catch (err: any) {
    //     console.log('⚠️ 更新生成记录失败，但继续处理:', err.message)
    //   }
    // }

    // 扣除积分（可选）
    // const requiredCredits = body.tier === 'advanced' ? 30 : 15
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { credits: { decrement: requiredCredits } }
    // }).catch((err: any) => {
    //   console.log('⚠️ 扣除积分失败，但继续处理:', err.message)
    // })

    // 计算处理时间
    const processingTime = Date.now() - startTime
    console.log(`✅ 建筑效果图生成完成，处理时间: ${processingTime}ms`)

    // 返回结果
    return NextResponse.json({
      success: true,
      images: result.images,
      processingTime,
      generationId
    })

  } catch (error) {
    console.error('❌ 建筑效果图生成错误:', error)
    
    return NextResponse.json(
      { 
        error: '生成过程中发生错误',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
} 