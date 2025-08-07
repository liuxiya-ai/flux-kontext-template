// @/components/design/sub-components/advanced-settings.tsx
'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DesignState } from '../design-page-content'

interface AdvancedSettingsProps {
  seed: number | null
  onSeedChange: (value: number | null) => void
  numberOfImages: DesignState['numberOfImages']
  onNumberOfImagesChange: (value: DesignState['numberOfImages']) => void
  showSeedInput?: boolean
  showImageCount?: boolean
}

export function AdvancedSettings({
  seed,
  onSeedChange,
  numberOfImages,
  onNumberOfImagesChange,
  showSeedInput = true,
  showImageCount = true,
}: AdvancedSettingsProps) {
  return (
    <div className="space-y-6">
      {showSeedInput && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Seed</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter seed number</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-seed"
              checked={seed !== null}
              onCheckedChange={checked =>
                onSeedChange(checked ? Math.floor(Math.random() * 100000) : null)
              }
            />
            <Input
              type="number"
              placeholder="Enter seed number"
              disabled={seed === null}
              value={seed || ''}
              onChange={e => onSeedChange(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      )}

      {showImageCount && (
        <div>
          <Label className="text-base font-semibold">Number of images*</Label>
          <ToggleGroup
            type="single"
            value={String(numberOfImages)}
            onValueChange={value =>
              value &&
              onNumberOfImagesChange(
                parseInt(value, 10) as DesignState['numberOfImages']
              )
            }
            className="grid grid-cols-4 mt-2"
          >
            <ToggleGroupItem value="1">1</ToggleGroupItem>
            <ToggleGroupItem value="2">2</ToggleGroupItem>
            <ToggleGroupItem value="3">3</ToggleGroupItem>
            <ToggleGroupItem value="4">4</ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}
    </div>
  )
} 