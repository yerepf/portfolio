---
title:
  en: "Why Astro 5 + TailwindCSS 4 is My New Favorite Stack for Portfolios"
  es: "Por qué Astro 5 + TailwindCSS 4 es Mi Stack Favorito para Portafolios"
description:
  en: "After migrating from Next.js, here's why Astro's island architecture, zero-JS default, and TailwindCSS 4's new engine make the perfect combination for developer portfolios."
  es: "Después de migrar desde Next.js, aquí está por qué la arquitectura de islas de Astro, el enfoque zero-JS por defecto y el nuevo motor de TailwindCSS 4 hacen la combinación perfecta para portafolios de desarrolladores."
content:
  en: |
    ## The Migration Story

    My portfolio started as a Next.js 13 app with the App Router. It worked, but:
    - **Bundle size**: ~180KB JS for a mostly static site
    - **Hydration**: Unnecessary client-side React for content pages
    - **Build times**: 45+ seconds on Vercel
    - **Complexity**: Overkill for a portfolio

    Switched to **Astro 5 + TailwindCSS 4**. Results:
    - **Bundle size**: ~12KB JS (93% reduction)
    - **Build time**: 8 seconds
    - **Lighthouse**: 100/100/100/100
    - **Dev experience**: Incredible

    ## Why Astro 5?

    ### 1. Islands Architecture = Partial Hydration
    Only interactive components load JavaScript. Everything else is static HTML.

    ```astro
    --- // BlogPost.astro - Zero JS by default
    const { content } = Astro.props;
    ---
    <article class="prose">
      {content} <!-- Pure HTML, no hydration -->
    </article>

    --- // Interactive component
    import ThemeToggle from './ThemeToggle.astro';
    ---
    <ThemeToggle client:visible /> <!-- Only this hydrates -->
    ```

    ### 2. Content Collections = Type-Safe Markdown
    First-class content layer with Zod validation:

    ```typescript
    // src/content/config.ts
    const blog = defineCollection({
      schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
      }),
    });
    ```

    Type-safe frontmatter access:
    ```typescript
    const posts = await getCollection('blog');
    posts[0].data.title // Fully typed!
    ```

    ### 3. Built-in i18n Routing
    File-based routing with locale prefixes:
    ```text
    src/pages/
    ├── index.astro        → /
    ├── es/
    │   └── index.astro    → /es/
    └── blog/
        ├── [slug].astro   → /blog/:slug
        └── es/
            └── [slug].astro → /es/blog/:slug
    ```

    ### 4. Image Optimization (Zero Config)
    ```astro
    import { Image } from 'astro:assets';
    import hero from './hero.png';

    <Image src={hero} alt="Hero" width={800} format="avif" />
    ```

    ## Why TailwindCSS 4?

    ### 1. New Engine: Lightning CSS
    - **10x faster** builds (Rust-based)
    - **No PostCSS config** needed
    - **Native CSS cascade layers**
    - **CSS-first configuration**

    ```css
    /* src/styles/global.css - Full config in CSS */
    @import "tailwindcss";

    @theme {
      --color-primary: #c7ff6b;
      --color-surface: #0f0f0f;
      --font-mono: "VT323", monospace;
    }

    @layer base {
      html { @apply scroll-smooth; }
    }
    ```

    ### 2. OKLCH Color Space
    Perceptually uniform colors that work across all gamuts:

    ```css
    @theme {
      --color-accent: oklch(0.85 0.15 140);
      --color-muted: oklch(0.45 0.02 260);
    }
    ```

    ### 3. Container Queries & Modern CSS
    Native support without plugins:
    ```css
    .card {
      @apply container;
    }
    @container (min-width: 400px) {
      .card-content { @apply grid grid-cols-2; }
    }
    ```

    ## The VHS Aesthetic (My Design System)

    This portfolio uses a retro CRT/VHS aesthetic:
    - **Scanline overlays** on navigation
    - **Glitch text effects** on hover
    - **Phosphor green** accent (#c7ff6b)
    - **Monospace fonts** (VT323)
    - **Dark surfaces** (#0a0a0a, #0f0f0f)

    All implemented with pure CSS + Tailwind utilities - zero runtime JS for animations.

    ## Performance Wins

    | Metric | Next.js 13 | Astro 5 |
    |--------|------------|---------|
    | JS Bundle | 180 KB | 12 KB |
    | Build Time | 45s | 8s |
    | FCP | 1.2s | 0.6s |
    | LCP | 1.8s | 0.9s |
    | TBT | 180ms | 0ms |

    ## Developer Experience

    ```bash
    # New project
    npm create astro@latest -- --template minimal

    # Add TailwindCSS 4
    npm install -D @tailwindcss/vite
    ```

    **Astro's CLI is exceptional:**
    - `astro add tailwind` - One command setup
    - `astro check` - TypeScript validation across .astro files
    - `astro sync` - Content collection types
    - `astro dev` - Hot module replacement that actually works

    ## When NOT to Use Astro

    - **Highly interactive apps** (dashboards, real-time collab)
    - **Complex client state** (heavy forms, wizards)
    - **Teams unfamiliar with static-first mindset**

    For those cases, Next.js/Remix/SvelteKit are better fits.

    ## Conclusion

    Astro 5 + TailwindCSS 4 delivers:
    - **Performance** by default (not opt-in)
    - **Type safety** across content and components
    - **Modern CSS** without build complexity
    - **Flexibility** to add interactivity where needed

    For content-heavy sites (portfolios, blogs, docs, marketing), it's the best DX/UX balance in 2025.

    ---

    *This site is built with Astro 5 + TailwindCSS 4. [View source →](https://github.com/yerepf/portfolio)*
  es: |
    ## La Historia de la Migración

    Mi portafolio comenzó como una app Next.js 13 con App Router. Funcionaba, pero:
    - **Tamaño del bundle**: ~180KB JS para un sitio mayormente estático
    - **Hidratación**: React del lado del cliente innecesario para páginas de contenido
    - **Tiempos de build**: 45+ segundos en Vercel
    - **Complejidad**: Excesivo para un portafolio

    Cambié a **Astro 5 + TailwindCSS 4**. Resultados:
    - **Tamaño del bundle**: ~12KB JS (93% reducción)
    - **Tiempo de build**: 8 segundos
    - **Lighthouse**: 100/100/100/100
    - **Experiencia de desarrollo**: Increíble

    ## Por Qué Astro 5?

    ### 1. Arquitectura de Islas = Hidratación Parcial
    Solo los componentes interactivos cargan JavaScript. Todo lo demás es HTML estático.

    ### 2. Content Collections = Markdown con Tipos
    Capa de contenido de primera clase con validación Zod.

    ### 3. i18n Routing Integrado
    Routing basado en archivos con prefijos de locale.

    ### 4. Optimización de Imágenes (Zero Config)

    ## Por Qué TailwindCSS 4?

    ### 1. Nuevo Motor: Lightning CSS
    - **10x más rápido** builds (basado en Rust)
    - **Sin config PostCSS** necesario
    - **Capas de cascada CSS nativas**
    - **Configuración CSS-first**

    ### 2. Espacio de Color OKLCH
    Colores perceptualmente uniformes que funcionan en todos los gamuts.

    ### 3. Container Queries & CSS Moderno
    Soporte nativo sin plugins.

    ## La Estética VHS (Mi Design System)

    Este portafolio usa una estética retro CRT/VHS:
    - **Overlays de scanlines** en navegación
    - **Efectos glitch en texto** al hover
    - **Verde fósforo** acento (#c7ff6b)
    - **Fuentes monoespaciadas** (VT323)
    - **Superficies oscuras** (#0a0a0a, #0f0f0f)

    Todo implementado con CSS puro + utilidades Tailwind - cero JS runtime para animaciones.

    ## Ganancias de Rendimiento

    | Métrica | Next.js 13 | Astro 5 |
    |---------|------------|---------|
    | JS Bundle | 180 KB | 12 KB |
    | Build Time | 45s | 8s |
    | FCP | 1.2s | 0.6s |
    | LCP | 1.8s | 0.9s |
    | TBT | 180ms | 0ms |

    ## Experiencia de Desarrollador

    ```bash
    # Nuevo proyecto
    npm create astro@latest -- --template minimal

    # Agregar TailwindCSS 4
    npm install -D @tailwindcss/vite
    ```

    **El CLI de Astro es excepcional:**
    - `astro add tailwind` - Setup en un comando
    - `astro check` - Validación TypeScript en archivos .astro
    - `astro sync` - Tipos de content collections
    - `astro dev` - HMR que realmente funciona

    ## Cuándo NO Usar Astro

    - **Apps altamente interactivas** (dashboards, colaboración en tiempo real)
    - **Estado cliente complejo** (formularios pesados, wizards)
    - **Equipos no familiarizados con mentalidad static-first**

    Para esos casos, Next.js/Remix/SvelteKit son mejores opciones.

    ## Conclusión

    Astro 5 + TailwindCSS 4 entrega:
    - **Rendimiento** por defecto (no opt-in)
    - **Seguridad de tipos** entre contenido y componentes
    - **CSS moderno** sin complejidad de build
    - **Flexibilidad** para agregar interactividad donde se necesite

    Para sitios con mucho contenido (portafolios, blogs, docs, marketing), es el mejor balance DX/UX en 2025.

    ---

    *Este sitio está construido con Astro 5 + TailwindCSS 4. [Ver código →](https://github.com/yerepf/portfolio)*
image: "/astro.svg"
tags: ["Astro", "TailwindCSS", "Performance", "Web Development", "Frontend", "Architecture"]
category: "opinion"
date: 2026-05-20
author: "Yeremy Pujols"
readingTime: 8
---