import { NextRequest, NextResponse } from 'next/server'

// 临时使用内存存储上传的图片URL
// 在实际生产环境中，应该使用云存储服务如S3、Cloudinary等
declare global {
  var UPLOADED_IMAGES: Record<string, string> | undefined
}

// 确保在多个文件间共享同一个实例
global.UPLOADED_IMAGES = global.UPLOADED_IMAGES || {}

export async function GET(
  request: NextRequest,
  context: { params: { fileName: string } }
) {
  const fileName = context.params.fileName

  try {
    if (!fileName) {
      return NextResponse.json({ error: '缺少文件名' }, { status: 400 })
    }

    const dataUrl = global.UPLOADED_IMAGES?.[fileName]

    if (!dataUrl) {
      console.error(`❌ 在内存存储中找不到图片: ${fileName}`)
      return NextResponse.json({ error: '找不到图片文件' }, { status: 404 })
    }

    console.log(`✅ 找到图片: ${fileName}, 准备发送...`)
    
    // 从 data: URL 中分离出MIME类型和base64数据
    const parts = dataUrl.split(';base64,')
    const mimeType = parts[0].split(':')[1]
    const base64Data = parts[1]

    // 将base64解码为Buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // 返回图片响应
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error(`获取图片 ${fileName} 出错:`, error)
    return NextResponse.json({ error: '获取图片失败' }, { status: 500 })
  }
} 