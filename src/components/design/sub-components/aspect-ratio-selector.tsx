// @/components/design/sub-components/aspect-ratio-selector.tsx
'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectOption } from '@/lib/config/design-modules'

interface AspectRatioSelectorProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}

export function AspectRatioSelector({
  options,
  value,
  onChange,
}: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">Aspect Ratio*</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an aspect ratio" />
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
} 