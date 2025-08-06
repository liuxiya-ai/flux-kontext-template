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
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ImageUploader } from './sub-components/image-uploader'

interface LeftPanelProps {
  state: DesignState
  setState: (newState: Partial<DesignState>) => void
  onModuleSelect: (module: DesignModule) => void
}

/**
 * 左侧参数控制面板，现在包含所有真实的UI控件
 */
export function LeftPanel({ state, setState, onModuleSelect }: LeftPanelProps) {
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
        {selectedModule.controls.requiresInputImage && (
          <div>
            <Label className="text-base font-semibold">Input image*</Label>
            <div className="mt-2">
              <ImageUploader 
                value={state.inputImage}
                onChange={file => setState({ inputImage: file })}
              />
            </div>
          </div>
        )}

        {selectedModule.controls.inputTypes &&
          renderSelect(
            'Input type*',
            state.inputType,
            value => setState({ inputType: value }),
            selectedModule.controls.inputTypes
          )}

        {selectedModule.controls.requiresSimilarityLevel && (
          <div>
            <Label className="text-base font-semibold">Similarity level*</Label>
            <ToggleGroup
              type="single"
              value={state.similarityLevel}
              onValueChange={(value: DesignState['similarityLevel']) =>
                value && setState({ similarityLevel: value })
              }
              className="grid grid-cols-3 mt-2"
            >
              <ToggleGroupItem value="similar" aria-label="Similar">
                Similar
              </ToggleGroupItem>
              <ToggleGroupItem value="balanced" aria-label="Balanced">
                Balanced
              </ToggleGroupItem>
              <ToggleGroupItem value="creative" aria-label="Creative">
                Creative
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xs text-muted-foreground mt-1">
              <b>Precise:</b> Attention to uploaded image. <br/>
              <b>Creative:</b> Generates flexible options.
            </p>
          </div>
        )}

        {selectedModule.controls.roomTypes &&
          renderSelect(
            'Room type*',
            state.roomType,
            value => setState({ roomType: value }),
            selectedModule.controls.roomTypes
          )}

        {selectedModule.controls.renderStyles &&
          renderSelect(
            'Render style*',
            state.renderStyle,
            value => setState({ renderStyle: value }),
            selectedModule.controls.renderStyles
          )}

        {selectedModule.controls.requiresRenderPerformance && (
           <div>
            <Label className="text-base font-semibold">Render performance</Label>
            <Slider
                value={[state.renderPerformance]}
                onValueChange={([value]) => setState({ renderPerformance: value })}
                className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast render</span>
                <span>Best quality</span>
            </div>
          </div>
        )}

        {/* Prompt 输入 */}
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Label htmlFor="prompt">Prompt</Label>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground"/></TooltipTrigger>
                        <TooltipContent><p>Describe the image, e.g. modern villa, wooden facade...</p></TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
            </div>
            <Textarea 
                id="prompt"
                value={state.prompt}
                onChange={e => setState({ prompt: e.target.value })}
                placeholder="Describe the image, e.g. modern villa, wooden facade..."
            />
        </div>
        
        {/* Negative Prompt 输入 */}
        <div className="space-y-2">
           <div className="flex items-center gap-2">
                <Label htmlFor="negative-prompt">Negative prompt</Label>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground"/></TooltipTrigger>
                        <TooltipContent><p>Remove from final render, e.g. rainy, straight lines, ...</p></TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
            </div>
            <Textarea
                id="negative-prompt"
                value={state.negativePrompt}
                onChange={e => setState({ negativePrompt: e.target.value })}
                placeholder="Remove from final render, e.g. rainy, straight lines, ..."
            />
        </div>

        {selectedModule.controls.requiresAdvancedSettings && (
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label>Seed</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground"/></TooltipTrigger>
                            <TooltipContent><p>Enter seed number</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="use-seed" checked={state.seed !== null} onCheckedChange={checked => setState({ seed: checked ? 12345 : null })}/>
                    <Input 
                        type="number"
                        placeholder="Enter seed number" 
                        disabled={state.seed === null}
                        value={state.seed || ''}
                        onChange={e => setState({ seed: parseInt(e.target.value, 10) })}
                    />
                </div>
            </div>
            <div>
              <Label className="text-base font-semibold">Number of images*</Label>
               <ToggleGroup
                type="single"
                value={String(state.numberOfImages)}
                onValueChange={(value) => value && setState({ numberOfImages: parseInt(value, 10) as DesignState['numberOfImages'] })}
                className="grid grid-cols-4 mt-2"
              >
                <ToggleGroupItem value="1">1</ToggleGroupItem>
                <ToggleGroupItem value="2">2</ToggleGroupItem>
                <ToggleGroupItem value="3">3</ToggleGroupItem>
                <ToggleGroupItem value="4">4</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        )}

        {/* --- 生成按钮 --- */}
        <div className="border-t border-border pt-6">
          <Button size="lg" className="w-full text-lg font-bold">
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
} 