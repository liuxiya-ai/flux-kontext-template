// @/components/design/left-panel.tsx
'use client'

import Image from 'next/image'
import { designModules, DesignModule } from '@/lib/config/design-modules'
import { DesignState } from './design-page-content'
import { cn } from '@/lib/utils'

// 导入所有需要的 Shadcn UI 组件
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Info, Loader2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ImageUploader } from './sub-components/image-uploader'
import { PromptInput } from './sub-components/prompt-input'
import { SimilaritySelector } from './sub-components/similarity-selector'
import { RoomTypeSelector } from './sub-components/room-type-selector'
import { StyleSelector } from './sub-components/style-selector'
import { PerformanceSlider } from './sub-components/performance-slider'
import { AdvancedSettings } from './sub-components/advanced-settings'
import { AspectRatioSelector } from './sub-components/aspect-ratio-selector'

interface LeftPanelProps {
  state: DesignState
  setState: (newState: Partial<DesignState>) => void
  onModuleSelect: (module: DesignModule) => void
  onGenerate: () => void
}

/**
 * 左侧参数控制面板，现在包含所有真实的UI控件
 */
export function LeftPanel({
  state,
  setState,
  onModuleSelect,
  onGenerate, // 新增：接收生成函数
}: LeftPanelProps) {
  const { selectedModule } = state

  // 渲染下拉菜单的函数
  const renderSelect = (
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    options: { value: string; label: string }[]
  ) => (
    <div>
      <Label className="text-base font-semibold">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="mt-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* 模块选择器 */}
      <div>
        <Label className="text-lg font-semibold">Select module*</Label>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {designModules.map(module => (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module)}
              className={cn(
                'group relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 p-0 transition-all hover:border-primary',
                selectedModule.id === module.id
                  ? 'border-primary shadow-lg'
                  : 'border-border'
              )}
            >
              <Image
                src={module.image}
                alt={module.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                <p className="text-sm font-bold text-white">{module.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- 分割线 --- */}
      <div className="border-t border-border" />

      {/* 动态参数区域 */}
      <div className="space-y-6">
        {/* 根据选定模块的配置动态渲染控件 */}

        {/* 图片上传 */}
        {selectedModule.controls.requiresInputImage && (
          <div className="space-y-2">
            <Label className="text-base font-semibold">Upload image*</Label>
            {state.isUploading && (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            )}
              <ImageUploader 
                value={state.inputImage}
                onChange={file => setState({ inputImage: file })}
              inputTypes={selectedModule.controls.inputTypes}
              selectedType={state.inputType}
              onTypeChange={type => setState({ inputType: type })}
              />
          </div>
        )}

        {/* 提示词输入 */}
        {!selectedModule.controls.hidePromptInput && (
          <PromptInput
            prompt={state.prompt}
            onPromptChange={p => setState({ prompt: p })}
            negativePrompt={state.negativePrompt}
            onNegativePromptChange={np => setState({ negativePrompt: np })}
          />
        )}

        {/* 相似度 */}
        {selectedModule.controls.requiresSimilarityLevel && (
          <SimilaritySelector
              value={state.similarityLevel}
            onChange={value => setState({ similarityLevel: value })}
          />
        )}

        {/* 房间类型 */}
        {selectedModule.controls.roomTypes && (
          renderSelect(
            'Room type*',
            state.roomType,
            value => setState({ roomType: value }),
            selectedModule.controls.roomTypes
          )
          )}

        {/* 渲染风格 */}
        {selectedModule.controls.renderStyles && (
          renderSelect(
            'Render style*',
            state.renderStyle,
            value => setState({ renderStyle: value }),
            selectedModule.controls.renderStyles
          )
          )}

        {/* 渲染性能 */}
        {selectedModule.controls.requiresRenderPerformance && (
          <PerformanceSlider
            value={state.renderPerformance}
            onChange={value => setState({ renderPerformance: value })}
            />
        )}

        {/* 新增：纵横比选择器 */}
        {selectedModule.controls.aspectRatios && (
          <div>
            <Label className="text-base font-semibold">Select the Aspect Ratio</Label>
            <Select value={state.aspectRatio} onValueChange={value => setState({ aspectRatio: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectedModule.controls.aspectRatios.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 高级设置 (种子, 图片数量等) */}
        {(selectedModule.controls.requiresAdvancedSettings ||
          selectedModule.controls.requiresSeedInput ||
          selectedModule.controls.requiresImageCount) && (
          <AdvancedSettings
            seed={state.seed}
            onSeedChange={s => setState({ seed: s })}
            numberOfImages={state.numberOfImages}
            onNumberOfImagesChange={n => setState({ numberOfImages: n })}
            // 根据配置决定是否显示控件
            showSeedInput={selectedModule.controls.requiresSeedInput ?? selectedModule.controls.requiresAdvancedSettings}
            showImageCount={selectedModule.controls.requiresImageCount ?? selectedModule.controls.requiresAdvancedSettings}
          />
        )}
      </div>

      {/* 生成按钮 */}
        <div className="border-t border-border pt-6">
        <Button
          size="lg"
          className="w-full text-lg font-bold"
          onClick={onGenerate}
          disabled={state.isGenerating} // 生成时禁用按钮
        >
          {state.isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
          </Button>
      </div>
    </div>
  )
} 