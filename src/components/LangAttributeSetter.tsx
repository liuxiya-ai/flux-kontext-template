"use client"

import { useEffect } from 'react'

interface LangAttributeSetterProps {
  locale: string
}

export function LangAttributeSetter({ locale }: LangAttributeSetterProps) {
  useEffect(() => {
    if (document.documentElement) {
      document.documentElement.lang = locale
      document.documentElement.dir = 'ltr'
    }
  }, [locale])

  return null
} 