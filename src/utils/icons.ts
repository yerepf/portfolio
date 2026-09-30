const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons';

export function getTechIconUrl(techName: string): string {
  const iconName = techName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\./g, '');

  return `${ICON_CDN}/${iconName}.svg`;
}
