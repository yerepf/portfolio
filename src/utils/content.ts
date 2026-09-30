import type { Locale } from '../i18n';

export type BilingualString = string | { en: string; es: string };

export function getLocalizedText(field: BilingualString, locale: Locale): string {
  if (typeof field === 'string') {
    return field;
  }
  return field[locale] ?? field.en ?? '';
}