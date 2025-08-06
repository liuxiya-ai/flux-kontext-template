import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'
import { DesignPageContent } from '@/components/design/design-page-content'

export const metadata: Metadata = generateMultilingualMetadata({
  title: 'AI Room Design - ArchiVinci | Professional Interior & Exterior Design',
  description:
    'Use AI to generate, modify, and transform interior and exterior designs. Create stunning visuals from photos or text descriptions with ArchiVinci.',
  keywords: [
    'AI room design',
    'interior design AI',
    'exterior design generator',
    'home design rendering',
    'ArchiVinci',
    'AI architecture',
    'room modification',
    'furniture placement AI',
    'house design AI',
  ],
  path: '/generate',
  images: ['/og-generate-design.png'],
})

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <DesignPageContent />
      </main>

      <Footer />
    </div>
  )
} 