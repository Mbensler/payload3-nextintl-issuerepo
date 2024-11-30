// Styles & fonts
import './styles/globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

// React & Nextjs
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

// Payload
import { PayloadProviders } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// next-intl
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'

// Utils
import { cn } from '@/utilities/cn'

// Static page generation
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { isEnabled } = await draftMode()

  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all translations to the client side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <PayloadProviders>
          <NextIntlClientProvider messages={messages}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <LivePreviewListener />

            <main className="overflow-hidden">{children}</main>
          </NextIntlClientProvider>
        </PayloadProviders>
      </body>
    </html>
  )
}
