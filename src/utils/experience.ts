import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type ExperienceEntry = CollectionEntry<'experience'>;
export type ExperienceData = ExperienceEntry['data'];

const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-DO',
};

export async function getExperiences(): Promise<ExperienceEntry[]> {
  const entries = await getCollection('experience');

  return entries.sort((a, b) => {
    const aOrder = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.data.order ?? Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) return aOrder - bOrder;

    return b.data.startDate.getTime() - a.data.startDate.getTime();
  });
}

export function getWorkModeLabel(
  workMode: ExperienceData['workMode'],
  locale: Locale
): string {
  const labels: Record<ExperienceData['workMode'], Record<Locale, string>> = {
    remote: { en: 'Remote', es: 'Remoto' },
    hybrid: { en: 'Hybrid', es: 'Híbrido' },
    onsite: { en: 'On-site', es: 'Presencial' },
  };

  return labels[workMode][locale];
}

export function formatMonthYear(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateRange(
  data: ExperienceData,
  locale: Locale,
  presentLabel: string
): string {
  const start = formatMonthYear(data.startDate, locale);
  const end = data.endDate && !data.current
    ? formatMonthYear(data.endDate, locale)
    : presentLabel;

  return `${start} — ${end}`;
}

function formatUnit(count: number, unit: 'year' | 'month', locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'unit',
    unit,
    unitDisplay: 'long',
  }).format(count);
}

export function formatDuration(data: ExperienceData, locale: Locale): string {
  const end = data.endDate && !data.current ? data.endDate : new Date();

  // Frontmatter dates are parsed as UTC midnight, so local getters would read
  // the previous month for anyone west of Greenwich.
  const startTotal = data.startDate.getUTCFullYear() * 12 + data.startDate.getUTCMonth();
  const endTotal = end.getUTCFullYear() * 12 + end.getUTCMonth();

  let months = endTotal - startTotal;
  if (end.getUTCDate() < data.startDate.getUTCDate()) months -= 1;
  months = Math.max(months, 0);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(formatUnit(years, 'year', locale));
  if (remainingMonths > 0) parts.push(formatUnit(remainingMonths, 'month', locale));
  if (parts.length === 0) parts.push(formatUnit(0, 'month', locale));

  return parts.join(' ');
}
