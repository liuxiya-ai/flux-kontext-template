// @/components/design/sub-components/prompt-input.tsx
'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

interface PromptInputProps {
  prompt: string
  onPromptChange: (value: string) => void
  negativePrompt: string
  onNegativePromptChange: (value: string) => void
}

export function PromptInput({
  prompt,
  onPromptChange,
  negativePrompt,
  onNegativePromptChange,
}: PromptInputProps) {
  const t = useTranslations('generator.prompt')
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="prompt">{t('label')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('placeholder')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={e => onPromptChange(e.target.value)}
          placeholder={t('placeholder')}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="negative-prompt">{t('negative')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('negativePlaceholder')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="negative-prompt"
          value={negativePrompt}
          onChange={e => onNegativePromptChange(e.target.value)}
          placeholder={t('negativePlaceholder')}
        />
      </div>
    </>
  )
} 