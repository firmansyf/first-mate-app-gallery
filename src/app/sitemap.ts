import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post
    .findMany({
      select: { id: true, createdAt: true, mediaUrl: true, mediaType: true },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/post/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.6,
    images:
      p.mediaUrl && p.mediaType === "image" ? [p.mediaUrl] : undefined,
  }));

  return [...staticPages, ...postPages];
}
