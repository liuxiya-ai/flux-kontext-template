"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQSchema } from "@/components/StructuredData"
import { useTranslations } from 'next-intl'

export function FAQ() {
  // 使用翻译
  const t = useTranslations('faq');
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <FAQSchema faqs={t.raw('items')} />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('description')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {t.raw('items').map((item: any, index: number) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-6">
                <span className="text-lg font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
