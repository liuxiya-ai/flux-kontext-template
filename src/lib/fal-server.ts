import { fal } from "@fal-ai/client"

// 配置服务器端FAL客户端
if (process.env.FAL_KEY) {
  fal.config({
    credentials: process.env.FAL_KEY
  })
  console.log(`✅ FAL服务器端客户端已配置，密钥前缀: ${process.env.FAL_KEY.substring(0, 4)}...`)
} else {
  console.error('❌ FAL_KEY环境变量未找到，API调用将失败')
}

// 定义API端点常量
export const ARCHITECTURE_ENDPOINTS = {
  // Kontext 图像编辑端点（image-to-image）
  KONTEXT_PRO: "fal-ai/flux-pro/kontext",
  KONTEXT_MAX: "fal-ai/flux-pro/kontext/max"
}

// 定义类型接口
export interface ArchitectureGenerationInput {
  prompt: string;
  image_url: string;
  aspect_ratio?: "21:9" | "16:9" | "4:3" | "3:2" | "1:1" | "2:3" | "3:4" | "9:16" | "9:21";
  seed?: number;
  guidance_scale?: number;
  num_images?: number;
  safety_tolerance?: "1" | "2" | "3" | "4" | "5" | "6";
  output_format?: "jpeg" | "png";
}

export interface GeneratedImage {
  url: string;
  width?: number;
  height?: number;
  content_type?: string;
}

export interface GenerationResult {
  images: GeneratedImage[];
  seed?: number;
  prompt?: string;
}

/**
 * 验证并处理图片URL，确保它符合fal.ai的要求
 */
function validateAndProcessImageUrl(url: string): string {
  console.log(`🔍 验证图片URL: ${url}`)
  
  // 1. 确保URL是完整的URL（以http或https开头）
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error('图片URL必须以http://或https://开头')
  }
  
  // 2. 如果是data URL，则不允许使用
  if (url.startsWith('data:')) {
    throw new Error('不支持data URL格式的图片，请使用HTTP(S)链接')
  }
  
  // 3. 如果是本地开发环境的URL，可能需要特殊处理
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    console.warn('⚠️ 检测到本地URL，fal.ai可能无法访问此URL')
  }
  
  return url
}

// 建筑效果图生成服务
export class ArchitectureGenerationService {
  /**
   * 生成建筑效果图 - 基础版
   */
  static async generateBasic(input: ArchitectureGenerationInput): Promise<GenerationResult> {
    try {
      console.log(`🚀 开始生成基础版建筑效果图，提示词: ${input.prompt.substring(0, 100)}...`)
      
      // 验证并处理图片URL
      const processedImageUrl = validateAndProcessImageUrl(input.image_url)
      
      // 构造请求体，确保可选参数存在时才添加
      const payload: any = {
        prompt: input.prompt,
        image_url: processedImageUrl,
        aspect_ratio: input.aspect_ratio || "16:9", // 添加缺失的参数并提供默认值
        guidance_scale: input.guidance_scale || 7.5,
        num_images: input.num_images || 1,
        safety_tolerance: input.safety_tolerance || "2",
        output_format: input.output_format || "jpeg"
      };

      if (input.seed) {
        payload.seed = input.seed;
      }
      
      // 打印完整请求负载以便调试
      console.log("📤 发送到FAL的请求数据:", JSON.stringify(payload, null, 2));

      const result = await fal.subscribe(ARCHITECTURE_ENDPOINTS.KONTEXT_PRO, {
        input: payload,
        logs: true,
        onQueueUpdate: (update) => {
          console.log(`📊 队列更新:`, {
            status: update.status,
            position: (update as any).queue_position,
          })
        },
      })

      if (!result.data || !result.data.images) {
        throw new Error('FAL API返回数据格式错误')
      }

      return result.data as GenerationResult
    } catch (error: any) {
      console.error("❌ 建筑效果图生成错误:", error)
      
      // 增强错误日志，显示详细的错误信息
      if (error.body) {
        try {
          console.error("📛 API错误详情:", JSON.stringify(error.body, null, 2))
        } catch (e) {
          console.error("📛 API错误详情:", error.body)
        }
      }
      
      throw error
    }
  }

  /**
   * 生成建筑效果图 - 高级版
   */
  static async generateAdvanced(input: ArchitectureGenerationInput): Promise<GenerationResult> {
    try {
      console.log(`🚀 开始生成高级版建筑效果图，提示词: ${input.prompt.substring(0, 100)}...`)
      
      // 验证并处理图片URL
      const processedImageUrl = validateAndProcessImageUrl(input.image_url)
      
      // 构造请求体，确保可选参数存在时才添加
      const payload: any = {
        prompt: input.prompt,
        image_url: processedImageUrl,
        aspect_ratio: input.aspect_ratio || "16:9", // 添加缺失的参数并提供默认值
        guidance_scale: input.guidance_scale || 7.5,
        num_images: input.num_images || 1,
        safety_tolerance: input.safety_tolerance || "2",
        output_format: input.output_format || "jpeg"
      };

      if (input.seed) {
        payload.seed = input.seed;
      }
      
      // 打印完整请求负载以便调试
      console.log("📤 发送到FAL的请求数据:", JSON.stringify(payload, null, 2));

      const result = await fal.subscribe(ARCHITECTURE_ENDPOINTS.KONTEXT_MAX, {
        input: payload,
        logs: true,
        onQueueUpdate: (update) => {
          console.log(`📊 队列更新:`, {
            status: update.status,
            position: (update as any).queue_position,
          })
        },
      })

      if (!result.data || !result.data.images) {
        throw new Error('FAL API返回数据格式错误')
      }

      return result.data as GenerationResult
    } catch (error: any) {
      console.error("❌ 建筑效果图生成错误:", error)
      
      // 增强错误日志，显示详细的错误信息
      if (error.body) {
        try {
          console.error("📛 API错误详情:", JSON.stringify(error.body, null, 2))
        } catch (e) {
          console.error("📛 API错误详情:", error.body)
        }
      }
      
      throw error
    }
  }
}

// 导出配置好的fal客户端
export { fal } 