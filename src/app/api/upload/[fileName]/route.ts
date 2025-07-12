import { NextRequest, NextResponse } from 'next/server'

// 引用同一个内存存储
declare global {
  var UPLOADED_IMAGES: Record<string, string> | undefined
}

// 获取上传的图片
export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  try {
    const fileName = params.fileName

    console.log(`🔍 请求图片文件: ${fileName}`)

    // 从内存中获取图片数据
    const UPLOADED_IMAGES = global.UPLOADED_IMAGES || {}
    
    if (!fileName || !UPLOADED_IMAGES[fileName]) {
      console.log(`❌ 图片不存在: ${fileName}`)
      console.log(`📋 可用的图片文件:`, Object.keys(UPLOADED_IMAGES))
      return new NextResponse('图片不存在', { status: 404 })
    }

    const dataUrl = UPLOADED_IMAGES[fileName]
    const [meta, base64] = dataUrl.split(',')
    const contentType = meta.split(':')[1].split(';')[0]
    
    const buffer = Buffer.from(base64, 'base64')
    
    console.log(`✅ 成功返回图片: ${fileName}, 类型: ${contentType}, 大小: ${buffer.length}字节`)
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    console.error('获取图片失败:', error)
    return new NextResponse('服务器错误', { status: 500 })
  }
} 