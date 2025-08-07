// @/components/design/sub-components/performance-slider.tsx
'use client'

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface PerformanceSliderProps {
  value: number
  onChange: (value: number) => void
}

export function PerformanceSlider({ value, onChange }: PerformanceSliderProps) {
  return (
    <div>
      <Label className="text-base font-semibold">Render performance</Label>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="my-4"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Fast render</span>
        <span>Best quality</span>
      </div>
    </div>
  )
} 