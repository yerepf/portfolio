// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @param {string} filePath */
function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

/**
 * Builds the short-link routes (yere.my/crash) straight from the
 * `shortId` field of each blog post, so adding a short link never
 * requires touching a separate redirect manifest.
 *
 * @returns {Record<string, string>}
 */
function collectShortRedirects() {
  const blogDir = path.resolve(__dirname, 'src/content/blog');
  if (!fs.existsSync(blogDir)) return {};

  /** @type {Record<string, string>} */
  const redirects = {};
  /** @type {Map<string, string>} */
  const claimed = new Map();

  for (const file of fs.readdirSync(blogDir).sort()) {
    if (!/\.mdx?$/.test(file)) continue;

    const frontmatter = readFrontmatter(path.join(blogDir, file));
    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

    const shortId = frontmatter.match(/^shortId:\s*['"]?([^'"\r\n]+?)['"]?\s*$/m)?.[1];
    if (!shortId) continue;

    const owner = claimed.get(shortId);
    if (owner) {
      throw new Error(
        `shortId duplicado "${shortId}": lo usan "${owner}" y "${file}". Debe ser unico.`
      );
    }
    claimed.set(shortId, file);

    const slug = file.replace(/\.(md|mdx|markdown)$/i, '');
    redirects[`/${shortId}`] = `/blog/${slug}/`;
    redirects[`/es/${shortId}`] = `/es/blog/${slug}/`;
  }

  return redirects;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://yere.my',
  redirects: collectShortRedirects(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@i18n': path.resolve(__dirname, 'src/i18n'),
        '@content': path.resolve(__dirname, 'src/content'),
      }
    }
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  }
});
