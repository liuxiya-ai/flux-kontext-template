// @/components/design/sub-components/image-uploader.tsx
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UploadCloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface ImageUploaderProps {
  value: File | null
  onChange: (file: File | null) => void
  // 🆕 添加可选的 props 以支持未来扩展，允许空字符串和undefined
  inputTypes?: SelectOption[]
  selectedType?: string | null | undefined
  onTypeChange?: (type: string) => void
}

export function ImageUploader({ 
  value, 
  onChange,
  inputTypes,
  selectedType,
  onTypeChange
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)

  // 当 value (来自父组件的File对象) 变化时，创建或撤销预览 URL
  useEffect(() => {
    if (!value) {
      setPreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(value)
    setPreview(objectUrl)

    // 清理函数：当组件卸载或 value 变化时，释放内存
    return () => URL.revokeObjectURL(objectUrl)
  }, [value])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // 只取第一个文件
      const file = acceptedFiles[0]
      if (file) {
        onChange(file)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    multiple: false,
  })

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation() // 防止触发 onDrop
    onChange(null)
  }

  // 检查是否需要显示类型选择器：需要有 inputTypes、selectedType 非空且有 onTypeChange 函数
  const shouldShowTypeSelector = inputTypes && 
    inputTypes.length > 0 && 
    selectedType !== null && 
    selectedType !== undefined && 
    selectedType !== '' && 
    onTypeChange

  // 如果有图片预览
  if (preview) {
    return (
      <div className="space-y-3">
        {/* 🆕 如果提供了 inputTypes，显示类型选择器 */}
        {shouldShowTypeSelector && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Type</label>
            <select 
              value={selectedType || ''}
              onChange={(e) => onTypeChange!(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {inputTypes!.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={preview}
            alt="Image preview"
            fill
            className="object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full h-7 w-7"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // 如果没有图片预览，显示上传区域
  return (
    <div className="space-y-3">
      {/* 🆕 如果提供了 inputTypes，显示类型选择器 */}
      {shouldShowTypeSelector && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Input Type</label>
          <select 
            value={selectedType || ''}
            onChange={(e) => onTypeChange!(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {inputTypes!.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <Card
        {...getRootProps()}
        className={cn(
          'flex h-48 flex-col items-center justify-center border-2 border-dashed transition-colors',
          isDragActive ? 'border-primary bg-primary/10' : 'bg-transparent'
        )}
      >
        <input {...getInputProps()} />
        <CardContent className="text-center p-6">
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <Button variant="outline" type="button" className="pointer-events-none">
            + UPLOAD IMAGE
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
              Drag 'n' drop or click to upload
          </p>
           <p className="text-xs text-muted-foreground mt-1">
              Max File Size 15MB
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 