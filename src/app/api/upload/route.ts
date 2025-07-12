import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

// 临时使用内存存储上传的图片URL
// 在实际生产环境中，应该使用云存储服务如S3、Cloudinary等
declare global {
  var UPLOADED_IMAGES: Record<string, string> | undefined
}

global.UPLOADED_IMAGES = global.UPLOADED_IMAGES || {}

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '请先登录再上传图片' },
        { status: 401 }
      )
    }

    // 解析multipart/form-data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: '没有找到上传的文件' },
        { status: 400 }
      )
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只允许上传图片文件' },
        { status: 400 }
      )
    }

    // 验证文件大小 (限制为10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小不能超过10MB' },
        { status: 400 }
      )
    }

    // 读取文件内容
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 生成唯一文件名，确保扩展名正确
    const originalExt = file.name.split('.').pop()?.toLowerCase() || 'png'
    const fileName = `${uuidv4()}-${Date.now()}.${originalExt}`
    
    // 在实际应用中，这里应该将文件上传到云存储
    // 例如使用AWS S3、Cloudinary等
    // 以下代码仅用于演示，将文件转为base64并存储在内存中
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`
    
    // 存储在全局内存中（仅用于演示）
    global.UPLOADED_IMAGES![fileName] = dataUrl
    
    console.log(`📁 图片上传成功: ${fileName}, 大小: ${file.size}字节, 类型: ${file.type}`)

    // 构建访问URL
    const imageUrl = `/api/upload/${fileName}`

    // 返回上传成功的响应
    return NextResponse.json({
      success: true,
      url: imageUrl,
      fileName,
        contentType: file.type,
      size: file.size
    })

  } catch (error) {
    console.error('文件上传错误:', error)
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    )
  }
} 