// @/components/design/sub-components/performance-slider.tsx
'use client'

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'

interface PerformanceSliderProps {
  value: number
  onChange: (value: number) => void
}

export function PerformanceSlider({ value, onChange }: PerformanceSliderProps) {
  const t = useTranslations('generator.left')
  return (
    <div>
      <Label className="text-base font-semibold">{t('performance')}</Label>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="my-4"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t('fast')}</span>
        <span>{t('quality')}</span>
      </div>
    </div>
  )
} 