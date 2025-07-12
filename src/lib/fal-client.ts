"use client"

import { createFalClient } from "@fal-ai/client"

export const fal = createFalClient({
  credentials: () => {
    // 从环境变量获取API密钥（仅在服务器端有效）
    if (typeof process !== "undefined" && process.env.FAL_KEY) {
      return process.env.FAL_KEY
    }
    // 从localStorage获取API密钥（仅在客户端有效）
    if (typeof localStorage === "object") {
      return localStorage.getItem("falKey") as string
    }
    return undefined
  },
  proxyUrl: "/api/fal", // 使用我们创建的API代理
})

// 建筑效果图生成相关的模型配置
export const ARCHITECTURE_ENDPOINTS = [
  {
    endpointId: "fal-ai/flux-pro/kontext",
    label: "建筑效果图基础版",
    description: "专业建筑效果图生成，支持从方案模型到效果图的转换",
    category: "image",
    creditsRequired: 15
  },
  {
    endpointId: "fal-ai/flux-pro/kontext/max",
    label: "建筑效果图高级版",
    description: "高质量建筑效果图生成，更好的细节和真实感",
    category: "image",
    creditsRequired: 30
  }
]

// 支持的纵横比选项
export const ASPECT_RATIOS = [
  { value: "1:1", label: "正方形 (1:1)" },
  { value: "4:3", label: "标准 (4:3)" },
  { value: "16:9", label: "宽屏 (16:9)" },
  { value: "21:9", label: "超宽 (21:9)" },
  { value: "3:4", label: "竖向标准 (3:4)" },
  { value: "9:16", label: "竖向宽屏 (9:16)" },
  { value: "9:21", label: "竖向超宽 (9:21)" }
]

// 建筑风格选项 - 用于提示词生成
export const ARCHITECTURE_STYLES = [
  "现代简约",
  "北欧风格",
  "工业风",
  "新中式",
  "地中海风格",
  "日式极简",
  "美式乡村",
  "后现代主义",
  "生态可持续",
  "高科技风格"
]

// 建筑类型选项 - 用于提示词生成
export const BUILDING_TYPES = [
  "住宅建筑",
  "商业建筑",
  "办公建筑",
  "文化建筑",
  "教育建筑",
  "酒店建筑",
  "医疗建筑",
  "工业建筑",
  "景观设计",
  "室内设计"
]

// 生成建筑效果图的提示词模板
export const generateArchitecturePrompt = (
  style: string,
  buildingType: string,
  customPrompt: string
): string => {
  return `高质量${style}风格的${buildingType}效果图，${customPrompt}，4k超高清渲染，专业建筑摄影，完美照明，精细材质，逼真细节`
} 