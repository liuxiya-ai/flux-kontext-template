import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import SessionProvider from "@/components/providers/SessionProvider";
import { ThemeProvider } from '@/components/ThemeProvider'; // 导入新的ThemeProvider
import { Analytics } from '@/components/Analytics';
import { GoogleOneTap } from '@/components/GoogleOneTap';
import { GoogleOneTapTrigger } from '@/components/GoogleOneTapTrigger';

// 静态渲染支持 - 生成所有支持的语言参数
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // 确保传入的 `locale` 有效
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 启用静态渲染
  setRequestLocale(locale);
  
  // 加载翻译消息
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          {children}
          <Analytics />
          <GoogleOneTap />
          <GoogleOneTapTrigger />
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
} 