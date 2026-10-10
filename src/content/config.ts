import { defineCollection, z } from 'astro:content';

/*
  Blog collection.

  Articles are the durable half of the content strategy: an Instagram Reel is gone in 48 hours,
  but an article keeps earning search traffic. They live here rather than on Medium or Substack
  so the SEO accrues to this domain. See ROADMAP-5 #198.
*/
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Written as YYYY-MM-DD in frontmatter; coerced so sorting is on real dates, not strings.
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Which content pillar this belongs to. Used as the eyebrow label on the card and article.
    pillar: z.enum(['Story', 'Teach', 'N=1', 'Build']),
    // Set false to keep a finished draft out of the index and the build.
    published: z.boolean().default(false),
    // Every article touching biomarkers, hormones or symptoms must carry the disclaimer.
    // Defaults to true so the safe path is the one you get by forgetting.
    disclaimer: z.boolean().default(true),
  }),
});

export const collections = { blog };
