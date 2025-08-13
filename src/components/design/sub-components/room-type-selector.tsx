// @/components/design/sub-components/room-type-selector.tsx
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
import { useTranslations } from 'next-intl'

interface RoomTypeSelectorProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}

export function RoomTypeSelector({
  options,
  value,
  onChange,
}: RoomTypeSelectorProps) {
  const t = useTranslations('generator.left')
  return (
    <div>
      <Label className="text-base font-semibold">{t('roomType')}</Label>
      <Select value={value} onValueChange={onChange}>
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
} 