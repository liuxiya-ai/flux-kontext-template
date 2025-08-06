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
}

/**
 * 新一代 AI 设计生成器页面的核心客户端组件。
 * 负责管理整个页面的状态和布局。
 */
export function DesignPageContent() {
  // 状态管理：使用一个统一的状态对象来管理所有参数
  const [designState, setDesignState] = useState<DesignState>({
    selectedModule: designModules.find(m => m.id === 'interior') || designModules[0],
    inputImage: null,
    prompt: '',
    negativePrompt: '',
    inputType: 'photo',
    similarityLevel: 'balanced',
    roomType: 'living-room',
    renderStyle: 'no-style',
    renderPerformance: 50, // 默认值，50代表中间位置
    seed: null,
    numberOfImages: 1,
  })

  // 统一的状态更新函数
  const updateState = (newState: Partial<DesignState>) => {
    setDesignState(prevState => ({ ...prevState, ...newState }))
  }

  const handleModuleSelect = (module: DesignModule) => {
    updateState({ selectedModule: module });
    // TODO: 未来可能需要根据模块重置某些特定状态
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
            state={designState}
            setState={updateState}
            onModuleSelect={handleModuleSelect}
          />
        </div>

        {/* 右侧面板 */}
        <div className="lg:col-span-2 bg-card border rounded-xl shadow-lg">
          <RightPanel selectedModule={designState.selectedModule} />
        </div>
      </div>
    </div>
  )
} 