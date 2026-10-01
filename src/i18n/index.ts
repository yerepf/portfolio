import { ui as uiEn } from './ui.en.ts';
import { ui as uiEs } from './ui.es.ts';

export type Locale = 'en' | 'es';

export interface UITranslations {
  nav: {
    home: string;
    experience: string;
    projects: string;
    certifications: string;
    blog: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    eyebrow: string;
    cta: string;
    imageAlt: string;
  };
  projects: {
    title: string;
    view: string;
    github: string;
    readPost: string;
  };
  experience: {
    title: string;
    present: string;
    techStack: string;
  };
  certifications: {
    title: string;
    credentialId: string;
    viewCredential: string;
  };
  blog: {
    title: string;
    subtitle: string;
    categories: string;
    tags: string;
    allCategories: string;
    viewAllTags: string;
    search: string;
    searchPlaceholder: string;
    searchResults: string;
    clearSearch: string;
    page: string;
    of: string;
    olderPosts: string;
    newerPosts: string;
    noPosts: string;
    relatedPosts: string;
    relatedProjects: string;
    relatedProjectsDesc: string;
    share: string;
    readTime: string;
    readMore: string;
    by: string;
    shareTwitter: string;
    shareLinkedIn: string;
    shareEmail: string;
  };
  layout: {
    title: string;
    description: string;
  };
  aria: {
    openMenu: string;
    openLinktree: string;
    switchLanguage: string;
    toggleTheme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
  };
}

export function getTranslation(locale: Locale): UITranslations {
  if (locale === 'es') {
    return uiEs as UITranslations;
  }
  return uiEn as UITranslations;
}

export function getTranslationSync(locale: Locale): UITranslations {
  if (locale === 'es') {
    return uiEs as UITranslations;
  }
  return uiEn as UITranslations;
}

export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

export function getOtherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'es') return 'es';
  return 'en';
}

export function getCategoryLabel(category: string, locale: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    'project-deep-dive': { en: 'Deep Dive', es: 'Análisis Profundo' },
    'tutorial': { en: 'Tutorial', es: 'Tutorial' },
    'opinion': { en: 'Opinion', es: 'Opinión' },
    'news': { en: 'News', es: 'Noticias' },
  };
  return labels[category]?.[locale] ?? category;
}