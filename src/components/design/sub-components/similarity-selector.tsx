// @/components/design/sub-components/similarity-selector.tsx
'use client'

import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DesignState } from '../design-page-content'

interface SimilaritySelectorProps {
  value: DesignState['similarityLevel']
  onChange: (value: DesignState['similarityLevel']) => void
}

export function SimilaritySelector({ value, onChange }: SimilaritySelectorProps) {
  return (
    <div>
      <Label className="text-base font-semibold">Similarity level*</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v: DesignState['similarityLevel']) => v && onChange(v)}
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
        <b>Precise:</b> Attention to uploaded image. <br />
        <b>Creative:</b> Generates flexible options.
      </p>
    </div>
  )
} 