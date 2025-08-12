// @/components/design/right-panel.tsx
'use client'

import Image from 'next/image'
import { DesignModule } from '@/lib/config/design-modules'
import { CheckCircle, Loader2, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

// 定义 RightPanel 组件的 props 类型
interface RightPanelProps {
  selectedModule: DesignModule
  isGenerating?: boolean
  generatedImages?: string[]
  generationError?: string | null
  processingTime?: number | null
  onCancelGeneration?: () => void
}

/**
 * 右侧预览/结果面板。
 */
export function RightPanel({ 
  selectedModule, 
  isGenerating = false,
  generatedImages = [],
  generationError = null,
  processingTime = null,
  onCancelGeneration 
}: RightPanelProps) {
  const tRight = useTranslations('generator.right')
  const tModules = useTranslations('generator.modules')

  const moduleTitle = tModules(`${selectedModule.id}.title`)
  const moduleDescription = tModules(`${selectedModule.id}.description`)

  // 将描述文本按句点分割，用于列表展示
  const descriptionPoints = moduleDescription
    .split('. ')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  // 如果正在生成，显示加载状态
  if (isGenerating) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3 mb-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg font-medium">{tRight('generating')}</span>
        </div>
        
        <p className="text-muted-foreground text-center mb-6">
          {tRight('generatingNote')}
        </p>
        
        {onCancelGeneration && (
          <Button 
            variant="outline" 
            onClick={onCancelGeneration}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>{tRight('cancel')}</span>
          </Button>
        )}
      </div>
    )
  }

  // 如果有生成错误，显示错误状态
  if (generationError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3 mb-4 text-destructive">
          <X className="h-6 w-6" />
          <span className="text-lg font-medium">{tRight('failed')}</span>
        </div>
        
        <p className="text-muted-foreground text-center mb-6">
          {generationError}
        </p>
        
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          {tRight('tryAgain')}
        </Button>
      </div>
    )
  }

  // 如果有生成的图片，显示结果
  if (generatedImages.length > 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {tRight('results')}
            </h2>
            {processingTime && (
              <p className="text-sm text-muted-foreground mt-1">
                {tRight('generatedIn', { seconds: Math.round(processingTime / 1000) })}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {generatedImages.map((imageUrl, index) => (
            <div key={index} className="space-y-3">
              <div className="relative group">
                <Image
                  src={imageUrl}
                  alt={`Generated ${selectedModule.name} ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full rounded-lg border bg-muted object-cover"
                />
                
                {/* 悬浮下载按钮 */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = imageUrl
                      link.download = `night-scene-${index + 1}.jpg`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 默认状态：显示模块信息和示例
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold tracking-tight">
        {moduleTitle}
      </h2>

      <ul className="mt-6 space-y-4 text-muted-foreground">
        {descriptionPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
            <span>{point.endsWith('.') ? point : `${point}.`}</span>
          </li>
        ))}
      </ul>

      {/* 示例图片展示 */}
      {selectedModule.examples.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            {/* Input Image */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">{tRight('input')}</p>
              <Image
                src={selectedModule.examples[0].input}
                alt={`${selectedModule.name} - Input Example`}
                width={300}
                height={300}
                className="w-full rounded-lg border bg-muted"
              />
            </div>

            {/* Output Image */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">{tRight('output')}</p>
              <Image
                src={selectedModule.examples[0].output}
                alt={`${selectedModule.name} - Output Example`}
                width={300}
                height={300}
                className="w-full rounded-lg border bg-muted"
              />
            </div>
          </div>
        </div>
      )}

       {/* 如果没有示例图，显示一个占位符 */}
      {selectedModule.examples.length === 0 && (
        <div className="mt-8 flex items-center justify-center h-60 w-full rounded-lg border-2 border-dashed bg-muted">
            <p className="text-muted-foreground">{tRight('examplePlaceholder')}</p>
        </div>
      )}
    </div>
  )
} 