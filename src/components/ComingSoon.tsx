'use client';

import { useTranslations } from 'next-intl';

const ComingSoon = () => {
  const t = useTranslations('comingSoon');

  type Feature = {
    title: string;
    description: string;
    statusKey: 'inProgress' | 'planned';
  };

  const features: Feature[] = t.raw('features');

  const getStatusProps = (statusKey: 'inProgress' | 'planned') => {
    const text = t(statusKey);
    const styles = {
      inProgress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      planned: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    };
    return { text, className: styles[statusKey] };
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column: Title and Description */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-lg text-white/70">
              {t('description')}
            </p>
          </div>

          {/* Right Column: Features Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {features.map((feature, index) => {
              const status = getStatusProps(feature.statusKey);
              return (
                <div key={index} className="flex flex-col gap-3">
                  <div>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${status.className}`}>
                      {status.text}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;

