import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
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

export const collections = {
  projects,
  certifications,
};
