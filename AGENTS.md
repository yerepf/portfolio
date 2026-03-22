# AGENTS.md

## Project Overview

This is an Astro portfolio website for Yeremy Pujols, a fullstack developer. The project uses:
- **Framework**: Astro 5.x with TypeScript
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Content**: Astro Content Collections with Zod schema validation
- **Language**: Site content is in Spanish (es_DO locale)

---

## Build, Lint, and Test Commands

### Development
```bash
npm run dev           # Start dev server at localhost:4321
```

### Build & Preview
```bash
npm run build         # Build production site to ./dist/
npm run preview       # Preview production build locally
npm run astro -- --help  # Get help using Astro CLI
```

### Astro CLI Commands
```bash
npm run astro add <integration>  # Add Astro integrations
npm run astro check            # Run Astro type checking
npm run astro sync             # Sync content collections types
```

### Note on Testing
This project has no automated tests configured. Verify functionality by:
1. Running `npm run dev` and checking the browser
2. Running `npm run build` to ensure production builds succeed
3. Using `npm run astro check` for TypeScript validation

---

## Code Style Guidelines

### File Structure
```
src/
├── components/     # .astro components (UI)
├── layouts/         # .astro layout files
├── pages/          # .astro pages (routing)
├── content/
│   ├── config.ts   # Content collection schemas
│   ├── projects/   # Markdown project files
│   └── certifications/  # Markdown certification files
└── styles/
    └── global.css  # Global styles (Tailwind + custom)
```

### Astro Components (.astro files)

#### Frontmatter (Component Script)
- Place all logic in the frontmatter block between `---`
- Import dependencies at the top
- Define TypeScript interfaces for props above component logic
- Access props via `Astro.props` or destructure directly

```astro
---
import type { MarkdownInstance } from 'astro';
import SomeComponent from './SomeComponent.astro';

interface Props {
  title: string;
  limit?: number;
}

const { title, limit = 10 } = Astro.props;
const data = await fetchSomething();
---
```

#### Template Section
- Use 2-space indentation
- Prefer JSX-like syntax for expressions: `{variable}`
- Use `map()` for lists, not template literals
- Use explicit `alt` attributes on all images
- Always use `aria-label` on links with icons only

#### Style Section
- Use scoped `<style>` blocks for component-specific styles
- Use class names without hash-based scoping when possible
- Follow mobile-first responsive design
- Breakpoints: `480px`, `768px`, `1200px`

### TypeScript

#### Type Annotations
- Use strict TypeScript (extends `astro/tsconfigs/strict`)
- Explicitly type function parameters and return types
- Use `interface` for object shapes, `type` for unions/aliases

```typescript
interface Props {
  title: string;
  count?: number;
}

const getData = async (id: string): Promise<Data> => { ... };
```

#### Content Collections
- Define schemas in `src/content/config.ts` using Zod
- Use descriptive field names matching frontmatter keys
- Mark optional fields appropriately

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
  }),
});

const certifications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    expirationDate: z.date().optional(),
    credentialId: z.string().optional(),
  }),
});
```

### CSS and Tailwind

#### Global CSS (src/styles/global.css)
- Import Tailwind with `@import "tailwindcss";`
- Define CSS custom properties (variables) in `:root`
- Use `box-sizing: border-box` globally

#### Component Styles
- Use BEM-like class naming convention: `.block__element--modifier`
- Use Tailwind utility classes for layout/flexbox/spacing
- Use custom CSS for complex animations and effects
- Use hex colors matching the VHS aesthetic theme:
  - Background: `#0a0a0a`, `#050505`
  - Cream: `#f2e8d5`, `#e0c28b`
  - Accent: `#c7ff6b`

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `Hero.astro`, `Projects.astro`, `Certifications.astro` |
| Props | camelCase | `imageUrl`, `isVisible` |
| CSS Classes | kebab-case | `.project-card`, `.btn-primary` |
| Content Fields | camelCase | `frontmatter.date`, `frontmatter.github` |
| Collections | camelCase | `projects`, `certifications` |
| Variables | camelCase | `sortedProjects`, `siteTitle` |
| Constants | UPPER_SNAKE | `MAX_ITEMS`, `API_URL` |

### HTML Standards
- Always include `lang="es"` on `<html>` element (Spanish site)
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`
- Include `<meta>` tags for SEO (title, description, OG tags)
- Use proper `alt` text for accessibility
- External links should use `target="_blank" rel="noopener noreferrer"`

### Error Handling
- For optional values, use optional chaining (`?.`) and nullish coalescing (`??`)
- Handle missing images gracefully with `onerror` handlers
- Validate content schema at build time via Zod
- Use try/catch for async operations that might fail

### Imports
- Use path aliases if configured (check tsconfig.json)
- Import Astro types with `import type { ... }` for type-only imports
- Group imports: 1) Astro built-ins, 2) External packages, 3) Internal components, 4) Local utils

```astro
---
// 1. Astro built-ins
import type { MarkdownInstance } from 'astro';

// 2. External packages
import { z } from 'astro:content';

// 3. Internal components
import Hero from '../components/Hero.astro';
import Layout from '../layouts/Layout.astro';

// 4. Local styles
import '../styles/global.css';
---
```

### Accessibility
- Always provide `alt` attributes for images
- Use `aria-label` when visual content has no text alternative
- Ensure keyboard navigation works for interactive elements
- Use `focus-visible` styles for keyboard users
- Maintain color contrast ratios for text readability

---

## Development Workflow

1. **Create components** in `src/components/` with `.astro` extension
2. **Add pages** in `src/pages/` for routing
3. **Define content schemas** in `src/content/config.ts`
4. **Add content** as Markdown files in `src/content/<collection>/`
5. **Test locally** with `npm run dev`
6. **Verify build** with `npm run build` before committing

---

## Configuration Files

- `astro.config.mjs` - Astro configuration (site URL, Vite plugins)
- `tsconfig.json` - TypeScript config (extends `astro/tsconfigs/strict`)
- `package.json` - Dependencies and scripts
- `.astro/` - Astro type definitions and sync cache
