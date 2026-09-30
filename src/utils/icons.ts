const ICON_ALIASES: Record<string, string> = {
  'c++': 'cplusplus',
  java: 'openjdk',
  nextjs: 'vercel',
  nodejs: 'nodedotjs',
  scss: 'sass',
  'tailwind-css': 'tailwindcss',
  threejs: 'threedotjs',
};

const ICON_SLUGS = new Set([
  'angular',
  'astro',
  'axios',
  'bootstrap',
  'cesium',
  'cisco',
  'cplusplus',
  'docker',
  'fastapi',
  'figma',
  'git',
  'javascript',
  'kotlin',
  'linux',
  'mapbox',
  'nodedotjs',
  'openjdk',
  'postgresql',
  'react',
  'sass',
  'supabase',
  'tailwindcss',
  'threedotjs',
  'typescript',
  'vercel',
]);

export function getTechIconId(techName: string): string | null {
  const key = techName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  const slug = ICON_ALIASES[key] ?? key;

  return ICON_SLUGS.has(slug) ? `si-${slug}` : null;
}
