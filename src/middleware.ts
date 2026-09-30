import { defineMiddleware } from 'astro:middleware';

const defaultLocale = 'en';
const secondaryLocales = ['es'];

function getPreferredLocale(acceptLanguage: string): string | null {
  if (!acceptLanguage) return null;

  const languages = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().toLowerCase())
    .map((lang) => lang.split('-')[0]);

  for (const lang of languages) {
    if (lang === defaultLocale || secondaryLocales.includes(lang)) {
      return lang;
    }
  }
  return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;
  const pathname = url.pathname;

  // English is the default locale and is served without a prefix.
  // Canonicalize /en and /en/* to the unprefixed equivalent.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || '/';
    const targetUrl = new URL(stripped, url.origin);
    targetUrl.search = url.search;
    return redirect(targetUrl.toString(), 302);
  }

  // Only the root path gets language auto-detection. Any other unprefixed
  // path (e.g. /blog/) must stay untouched so routing resolves normally.
  if (pathname === '/' || pathname === '') {
    const acceptLanguage = request.headers.get('accept-language');
    const preferredLocale = getPreferredLocale(acceptLanguage ?? '');

    if (preferredLocale && preferredLocale !== defaultLocale) {
      const targetUrl = new URL(`/${preferredLocale}/`, url.origin);
      targetUrl.search = url.search;
      return redirect(targetUrl.toString(), 302);
    }
  }

  return next();
});
