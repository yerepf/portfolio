import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';
import type { Locale } from '../i18n';

export type BlogPost = CollectionEntry<'blog'>;
export type BlogPostData = BlogPost['data'];

export interface BlogPostWithSlug extends BlogPost {
  slug: string;
  url: string;
}

function getBlogUrl(slug: string, locale: Locale): string {
  return `/${locale === 'es' ? 'es/' : ''}blog/${slug}/`;
}

export function getPostSlug(post: Pick<BlogPost, 'id'>): string {
  return post.id.replace(/\.(md|mdx|markdown)$/i, '');
}

export async function getBlogPosts(locale: Locale, options?: {
  limit?: number;
  offset?: number;
  category?: string;
  tag?: string;
  includeDrafts?: boolean;
}): Promise<BlogPostWithSlug[]> {
  const allPosts = await getCollection('blog', ({ data }) => {
    if (!options?.includeDrafts && data.draft) return false;
    if (options?.category && data.category !== options.category) return false;
    if (options?.tag && !data.tags?.includes(options.tag)) return false;
    return true;
  });

  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(options?.offset ?? 0, options?.limit ? (options.offset ?? 0) + options.limit : undefined);

  return sortedPosts.map(post => {
    const slug = getPostSlug(post);
    return { ...post, slug, url: getBlogUrl(slug, locale) };
  });
}

export async function getBlogPostBySlug(slug: string, locale: Locale): Promise<BlogPostWithSlug | null> {
  const allPosts = await getCollection('blog');
  const post = allPosts.find(p => getPostSlug(p) === slug);

  if (!post) return null;
  if (post.data.draft) return null;

  return { ...post, slug, url: getBlogUrl(slug, locale) };
}

export function normalizeRef(value: string): string {
  return value.toLowerCase().replace(/\.(md|mdx|markdown)$/i, '');
}

export async function getRelatedPosts(currentSlug: string, locale: Locale, limit = 3): Promise<BlogPostWithSlug[]> {
  const currentPost = await getBlogPostBySlug(currentSlug, locale);
  if (!currentPost) return [];

  const allPosts = await getBlogPosts(locale, { limit: 50 });

  const currentRefs = new Set((currentPost.data.relatedProjects ?? []).map(normalizeRef));

  const related = allPosts
    .filter(p => p.slug !== currentSlug)
    .filter(p => {
      // Same category
      if (currentPost.data.category && p.data.category === currentPost.data.category) return true;
      // Shared tags
      if (currentPost.data.tags?.some(tag => p.data.tags?.includes(tag))) return true;
      // Related projects
      if ((p.data.relatedProjects ?? []).some(rp => currentRefs.has(normalizeRef(rp)))) return true;
      return false;
    })
    .slice(0, limit);

  return related;
}

export async function getProjectsForPost(post: BlogPost): Promise<CollectionEntry<'projects'>[]> {
  const refs = post.data.relatedProjects ?? [];
  if (refs.length === 0) return [];

  const wanted = new Set(refs.map(normalizeRef));
  const projects = await getCollection('projects');

  return projects.filter(project => wanted.has(normalizeRef(project.id)));
}

export async function getAllBlogCategories(locale: Locale): Promise<string[]> {
  const posts = await getBlogPosts(locale, { limit: 1000 });
  const categories = new Set<string>();
  posts.forEach(post => post.data.category && categories.add(post.data.category!));
  return Array.from(categories).sort();
}

export function getLocalizedContent(post: BlogPostData, locale: Locale): string {
  if (typeof post.content === 'string') return post.content;
  return post.content[locale] ?? post.content.en ?? '';
}

export function getLocalizedTitle(post: BlogPostData, locale: Locale): string {
  if (typeof post.title === 'string') return post.title;
  return post.title[locale] ?? post.title.en ?? '';
}

export function getLocalizedDescription(post: BlogPostData, locale: Locale): string {
  if (typeof post.description === 'string') return post.description;
  return post.description[locale] ?? post.description.en ?? '';
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-DO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

const LANGUAGE_LABELS: Record<string, string> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  py: 'python',
  rb: 'ruby',
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  yml: 'yaml',
  md: 'markdown',
  htm: 'html',
  vue: 'vue',
  astro: 'astro',
  text: 'text',
  txt: 'text',
  console: 'shell',
  terminal: 'shell',
  'shell-session': 'shell',
  shellscript: 'shell',
  dockerfile: 'dockerfile',
  cs: 'csharp',
  'c#': 'csharp',
  cpp: 'cpp',
  'c++': 'cpp',
  h: 'c',
  gql: 'graphql',
  plaintext: 'text',
  diff: 'diff',
  patch: 'diff',
  env: 'bash',
  toml: 'toml',
  scss: 'scss',
  sass: 'sass',
  less: 'less',
  http: 'http',
  rest: 'http',
  properties: 'properties',
};

export function renderMarkdown(content: string): string {
  const html = marked.parse(content, { async: false }) as string;

  return html
    .replace(
      /<pre><code class="language-([\w+#-]+)">([\s\S]*?)<\/code><\/pre>/g,
      (_match, lang: string, body: string) => {
        const label = LANGUAGE_LABELS[lang.toLowerCase()] ?? lang.toLowerCase();
        return `<div class="blog-post__code" data-lang="${label}"><pre><code class="language-${lang}">${body}</code></pre></div>`;
      }
    )
    .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_match, body: string) => {
      return `<div class="blog-post__code" data-lang="text"><pre><code>${body}</code></pre></div>`;
    })
    .replace(/<table>/g, '<div class="blog-post__table-wrapper"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

export async function getBlogStaticPaths(): Promise<{ params: { slug: string }; props: { post: BlogPost } }[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return posts.map(post => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/[#*`\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
}

