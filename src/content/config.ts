import { defineCollection, z } from 'astro:content';

const bilingualString = z.union([z.string(), z.object({ en: z.string(), es: z.string() })]);

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: bilingualString,
    description: bilingualString,
    image: z.string().optional(),
    link: z.string().optional(),
    github: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
  }),
});

const certifications = defineCollection({
  type: 'content',
  schema: z.object({
    title: bilingualString,
    issuer: z.string(),
    description: bilingualString.optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    expirationDate: z.date().optional(),
    credentialId: z.string().optional(),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    role: bilingualString,
    company: bilingualString,
    location: bilingualString,
    workMode: z.enum(['remote', 'hybrid', 'onsite']),
    startDate: z.date(),
    endDate: z.date().optional(),
    current: z.boolean().default(false),
    summary: bilingualString,
    highlights: z.array(bilingualString).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: bilingualString,
    description: bilingualString,
    content: bilingualString,
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.enum(['project-deep-dive', 'tutorial', 'opinion', 'news']).optional(),
    relatedProjects: z.array(z.string()).optional(),
    date: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().default('Yeremy Pujols'),
    readingTime: z.number().optional(),
    shortId: z
      .string()
      .regex(
        /^[a-z0-9](?:[a-z0-9-]{0,18}[a-z0-9])?$/,
        'shortId debe ser minusculas, sin espacios, 1-20 caracteres (ej: crash)'
      )
      .optional(),
  }),
});

export const collections = {
  projects,
  certifications,
  experience,
  blog,
};