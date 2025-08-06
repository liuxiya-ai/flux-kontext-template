// @/components/design/right-panel.tsx
'use client'

import Image from 'next/image'
import { DesignModule } from '@/lib/config/design-modules'
import { CheckCircle } from 'lucide-react'

// 定义 RightPanel 组件的 props 类型
interface RightPanelProps {
  selectedModule: DesignModule
}

/**
 * 右侧预览/结果面板。
 */
export function RightPanel({ selectedModule }: RightPanelProps) {
  // 将描述文本按句点分割，用于列表展示
  const descriptionPoints = selectedModule.description
    .split('. ')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold tracking-tight">
        {selectedModule.title}
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
              <p className="text-sm font-medium text-center">Input Image</p>
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
              <p className="text-sm font-medium text-center">Realistic Render</p>
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
            <p className="text-muted-foreground">Example images will be shown here.</p>
        </div>
      )}
    </div>
  )
} 