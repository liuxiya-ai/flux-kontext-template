// @/components/design/design-page-content.tsx
'use client'

import { useState } from 'react'
import { designModules, DesignModule } from '@/lib/config/design-modules'
import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'

/**
 * AI 设计生成器页面的核心状态接口
 */
export interface DesignState {
  selectedModule: DesignModule
  inputImage: File | null
  prompt: string
  negativePrompt: string
  inputType: string
  similarityLevel: 'similar' | 'balanced' | 'creative'
  roomType: string
  renderStyle: string
  renderPerformance: number
  seed: number | null
  numberOfImages: 1 | 2 | 3 | 4
  aspectRatio: string // 新增：纵横比状态
  
  // 新增：生成状态管理
  isGenerating: boolean
  generatedImages: string[]
  generationError: string | null
  processingTime: number | null
}

/**
 * 新一代 AI 设计生成器页面的核心客户端组件。
 * 负责管理整个页面的状态和布局。
 */
export function DesignPageContent() {
  // 状态管理：使用一个统一的状态对象来管理所有参数
  const [state, setState] = useState<DesignState>({
    selectedModule: designModules[0],
    inputImage: null,
    prompt: '',
    negativePrompt: '',
    inputType: designModules[0].controls.inputTypes?.[0].value ?? '',
    similarityLevel: 'balanced',
    roomType: designModules[0].controls.roomTypes?.[0].value ?? '',
    renderStyle: designModules[0].controls.renderStyles?.[0].value ?? '',
    renderPerformance: 70,
    seed: null,
    numberOfImages: 1,
    aspectRatio: designModules[0].controls.aspectRatios?.[0].value ?? '1:1', // 新增：初始化纵横比
    
    // 新增：初始化生成状态
    isGenerating: false,
    generatedImages: [],
    generationError: null,
    processingTime: null,
  })

  // 统一的状态更新函数
  const updateState = (newState: Partial<DesignState>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const handleModuleSelect = (module: DesignModule) => {
    updateState({ selectedModule: module });
    // TODO: 未来可能需要根据模块重置某些特定状态
  }

  // 实现 handleGenerate 函数，它将收集所有状态并调用API
  const handleGenerate = async () => {
    console.log('Generating with state:', state)
    
    if (state.selectedModule.id === 'night-scene') {
      if (!state.inputImage) {
        alert('请先上传一张图片！')
        return
      }

      // 重置生成状态
      updateState({
        isGenerating: true,
        generatedImages: [],
        generationError: null,
        processingTime: null,
      })

      // TODO: 将 inputImage 上传到服务器并获取 URL
      const imageUrl = "https://v3.fal.media/files/rabbit/G6U1s3zymtEU2dQ2ieXDo_dee5fde8fabec421af82d94d28e0512c.jpg";

      try {
        console.log('🚀 开始发送夜景生成请求...')
        
        // 创建AbortController来处理超时
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 120000) // 2分钟超时

        const response = await fetch('/api/generate/night-scene', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal, // 添加超时控制
          body: JSON.stringify({
            image_url: imageUrl,
            aspect_ratio: state.aspectRatio,
            seed: state.seed,
            num_images: state.numberOfImages,
          }),
        });

        clearTimeout(timeoutId) // 清除超时定时器

        console.log('📡 收到响应，状态码:', response.status)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: '未知错误' }))
          throw new Error(`API 请求失败，状态码: ${response.status}，错误: ${errorData.error || '未知错误'}`)
        }

        const result = await response.json();
        console.log('✅ 生成成功:', result);
        
        // 更新状态为成功
        updateState({
          isGenerating: false,
          generatedImages: result.images?.map((img: any) => img.url) || [],
          processingTime: result.processingTime,
          generationError: null,
        })
        
      } catch (error: any) {
        console.error('❌ 生成失败:', error);
        
        // 更新状态为失败
        let errorMessage = '生成失败：未知错误'
        
        if (error.name === 'AbortError') {
          errorMessage = '请求超时：生成时间过长，请稍后重试'
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = '网络连接错误：无法连接到服务器，请检查网络连接'
        } else {
          errorMessage = `生成失败：${error.message}`
        }
        
        updateState({
          isGenerating: false,
          generationError: errorMessage,
          generatedImages: [],
          processingTime: null,
        })
      }
    }
    // else if (state.selectedModule.id === 'other-module') { ... }
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
        <h1 className="text-4xl font-bold tracking-tight">AI Room Design</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          ArchiVinci's AI Room Design & Home Designs Rendering module can fill
          empty spaces with furniture, update existing decor, and transform
          entire interiors, delivering enhanced aesthetics and functionality for
          every home.
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
            onGenerate={handleGenerate} // 新增：传递生成函数
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