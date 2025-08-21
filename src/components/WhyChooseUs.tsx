'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const WhyChooseUs = () => {
  const t = useTranslations('whyChooseUs');

  // Manually construct the features array for type safety and clarity
  const features = Array.from({ length: 4 }, (_, i) => ({
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
    imageSrc: t(`features.${i}.imageSrc`),
    imageAlt: t(`features.${i}.imageAlt`),
  }));

  return (
    <section className="pb-16 px-4 relative z-10">
      <div className="container mx-auto">
        {/* Title with gradient matching KeyFeatures */}
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('title')}
        </h2>

        {/* Zig-zag layout content */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-lg text-white/80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

