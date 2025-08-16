import { getAllJsonPages } from "@/lib/jsonPages";
import { getBlogConfig } from "@/lib/readConfig";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function sitemap() {
  const blog = getBlogConfig();
  const base = blog.siteUrl?.replace(/\/$/, "") || "";
  const pages = getAllJsonPages();

  const urls = [
    {
      url: `${base}/`,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${base}/articles`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    ...pages.map((p) => ({
      url: `${base}${(p.meta.slug || `/${p.id}`).replace(/^\/+/, "/")}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return urls;
}


