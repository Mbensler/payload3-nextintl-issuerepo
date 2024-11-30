import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['da', 'en'],
  // Used when no locale matches
  defaultLocale: 'da',
  localePrefix: 'as-needed',

  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    '/': '/',

    // If locales use different paths, you can
    // specify each external path per locale
    '/about': {
      da: '/about',
      en: '/ueber-uns',
    },

    // Dynamic params are supported via square brackets
    '/news/[articleSlug]-[articleId]': {
      da: '/news/[articleSlug]-[articleId]',
      en: '/neuigkeiten/[articleSlug]-[articleId]',
    },

    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    '/news/just-in': {
      da: '/news/just-in',
      en: '/neuigkeiten/aktuell',
    },

    // Also (optional) catch-all segments are supported
    '/categories/[...slug]': {
      da: '/categories/[...slug]',
      en: '/kategorien/[...slug]',
    },
  },
})

export type Locale = (typeof routing.locales)[number]

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
