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
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="prompt">Prompt</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Describe the image, e.g. modern villa, wooden facade...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={e => onPromptChange(e.target.value)}
          placeholder="Describe the image, e.g. modern villa, wooden facade..."
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="negative-prompt">Negative prompt</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from final render, e.g. rainy, straight lines, ...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="negative-prompt"
          value={negativePrompt}
          onChange={e => onNegativePromptChange(e.target.value)}
          placeholder="Remove from final render, e.g. rainy, straight lines, ..."
        />
      </div>
    </>
  )
} 