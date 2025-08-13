// @/components/design/sub-components/similarity-selector.tsx
'use client'

import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DesignState } from '../design-page-content'
import { useTranslations } from 'next-intl'

interface SimilaritySelectorProps {
  value: DesignState['similarityLevel']
  onChange: (value: DesignState['similarityLevel']) => void
}

export function SimilaritySelector({ value, onChange }: SimilaritySelectorProps) {
  const t = useTranslations('generator.left')
  return (
    <div>
      <Label className="text-base font-semibold">{t('similarity')}</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v: DesignState['similarityLevel']) => v && onChange(v)}
        className="grid grid-cols-3 mt-2"
      >
        <ToggleGroupItem value="similar" aria-label="Similar">
          {t('similar')}
        </ToggleGroupItem>
        <ToggleGroupItem value="balanced" aria-label="Balanced">
          {t('balanced')}
        </ToggleGroupItem>
        <ToggleGroupItem value="creative" aria-label="Creative">
          {t('creative')}
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-xs text-muted-foreground mt-1">
        <b>{t('preciseLabel')}</b> {t('preciseDesc')} <br />
        <b>{t('creativeLabel')}</b> {t('creativeDesc')}
      </p>
    </div>
  )
} 