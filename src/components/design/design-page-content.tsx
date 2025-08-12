// @/components/design/design-page-content.tsx
'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { designModules, DesignModule } from '@/lib/config/design-modules'
import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'

/**
 * AI 设计生成器页面的核心状态接口
 */
export interface DesignState {
  selectedModule: DesignModule
  inputImage: File | null
  uploadedImageUrl: string | null // 👈 新增
  prompt: string
  negativePrompt: string
  inputType: string
  similarityLevel: 'similar' | 'balanced' | 'creative'
  roomType: string
  renderStyle: string
  renderPerformance: number
  seed: number | null
  numberOfImages: 1 | 2 | 3 | 4
  aspectRatio: string
  
  // 生成状态管理
  isGenerating: boolean
  generatedImages: string[]
  generationError: string | null
  processingTime: number | null
  isUploading: boolean // 👈 新增
}

/**
 * 新一代 AI 设计生成器页面的核心客户端组件。
 * 负责管理整个页面的状态和布局。
 */
export function DesignPageContent() {
  const locale = useLocale()
  // 状态管理：使用一个统一的状态对象来管理所有参数
  const [state, setState] = useState<DesignState>({
    selectedModule: designModules[0],
    inputImage: null,
    prompt: '',
    negativePrompt: '',
    inputType: designModules[0].controls.inputTypes?.[0]?.value || '', // 🔧 修复：添加可选链和默认值
    similarityLevel: 'balanced',
    roomType: designModules[0].controls.roomTypes?.[0]?.value || '', // 🔧 修复：添加可选链
    renderStyle: designModules[0].controls.renderStyles?.[0]?.value || '', // 🔧 修复：添加可选链
    renderPerformance: 70,
    seed: null,
    numberOfImages: 1,
    aspectRatio: designModules[0].controls.aspectRatios?.[0]?.value || 'default', // 🔧 修复：添加可选链
    
    // 新增：初始化生成状态
    isGenerating: false,
    generatedImages: [],
    generationError: null,
    processingTime: null,
    uploadedImageUrl: null, // 👈 新增
    isUploading: false, // 👈 新增
  })

  // 统一的状态更新函数
  const updateState = (newState: Partial<DesignState>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const handleModuleSelect = (module: DesignModule) => {
    // 切换模块时，不仅更新模块本身，还重置所有相关参数
    setState(prevState => ({
      ...prevState, // 保留一些通用状态，如用户信息等（如果未来有的话）
      selectedModule: module,
      inputImage: null,
      uploadedImageUrl: null,
      prompt: '',
      negativePrompt: '',
      inputType: module.controls.inputTypes?.[0]?.value || '', // 🔧 修复：添加可选链
      similarityLevel: 'balanced',
      roomType: module.controls.roomTypes?.[0]?.value || '', // 🔧 修复：添加可选链
      renderStyle: module.controls.renderStyles?.[0]?.value || '', // 🔧 修复：添加可选链
      renderPerformance: 70,
      seed: null,
      numberOfImages: 1,
      aspectRatio: module.controls.aspectRatios?.[0]?.value || 'default', // 🔧 修复：添加可选链
      // 重置生成结果
      isGenerating: false,
      generatedImages: [],
      generationError: null,
      processingTime: null,
      isUploading: false,
    }))
  }

  // 实现 handleGenerate 函数，它将收集所有状态并调用API
  const handleGenerate = async () => {
    // 步骤1：检查是否选择了本地文件
    if (!state.inputImage) {
      alert('Please upload an image first!')
      return
    }

    // 步骤2：开始上传和生成流程
    updateState({
      isGenerating: true,
      isUploading: true, // 同时标记为上传中
      generationError: null,
      generatedImages: [],
    })

    let imageUrl = ''

    try {
      // 步骤2.1：上传图片
      const formData = new FormData()
      formData.append('file', state.inputImage)
      
      const uploadResponse = await fetch('/api/flux-kontext', {
        method: 'PUT',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error(`Image upload failed: ${uploadResponse.status}`)
      }

      const uploadResult = await uploadResponse.json()
      imageUrl = uploadResult.url
      updateState({ uploadedImageUrl: imageUrl, isUploading: false })

      // 步骤2.2：使用上传后的URL调用生成API
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000)

      const generateResponse = await fetch('/api/generate/night-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          image_url: imageUrl,
          aspect_ratio: state.aspectRatio,
          seed: state.seed,
          num_images: state.numberOfImages,
        }),
      });

      clearTimeout(timeoutId)

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json().catch(() => ({}))
        throw new Error(`API Error: ${generateResponse.status} - ${errorData.error || 'Unknown'}`)
      }

      const generateResult = await generateResponse.json()
      updateState({
        isGenerating: false,
        generatedImages: generateResult.images?.map((img: any) => img.url) || [],
        processingTime: generateResult.processingTime,
      })

    } catch (error: any) {
      let errorMessage = 'Process failed'
      if (state.isUploading) {
        errorMessage = `Image upload error: ${error.message}`
      } else if (error.name === 'AbortError') {
        errorMessage = 'Generation request timed out'
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error'
      } else {
        errorMessage = error.message
      }
      
      updateState({ 
        isGenerating: false, 
        isUploading: false,
        generationError: errorMessage 
      })
    }
  }

  // 取消生成函数
  const handleCancelGeneration = () => {
    updateState({
      isGenerating: false,
      generationError: '用户取消了生成',
      generatedImages: [],
      processingTime: null,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面主标题和描述 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          {locale === 'zh' ? 'AI 室内外设计' : 'AI Room Design'}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {locale === 'zh'
            ? 'ArchiVinci 的 AI 室内外设计渲染模块可以为空间添加家具、更新现有装饰，并改造整个室内环境，为每个家带来更好的美学与功能体验。'
            : "ArchiVinci's AI Room Design & Home Designs Rendering module can fill empty spaces with furniture, update existing decor, and transform entire interiors, delivering enhanced aesthetics and functionality for every home."}
        </p>
      </div>

      {/* 双栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 左侧面板 */}
        <div className="lg:col-span-1 bg-card border rounded-xl shadow-lg sticky top-24">
          <LeftPanel
            state={state}
            setState={updateState}
            onModuleSelect={handleModuleSelect}
            onGenerate={handleGenerate}
          />
        </div>

        {/* 右侧面板 */}
        <div className="lg:col-span-2 bg-card border rounded-xl shadow-lg">
          <RightPanel 
            selectedModule={state.selectedModule} 
            isGenerating={state.isGenerating}
            generatedImages={state.generatedImages}
            generationError={state.generationError}
            processingTime={state.processingTime}
            onCancelGeneration={handleCancelGeneration}
          />
        </div>
      </div>
    </div>
  )
} 