import { getBlogConfig } from "@/lib/readConfig";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function robots() {
  const blog = getBlogConfig();
  const host = blog.siteUrl?.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: host ? `${host}/sitemap.xml` : undefined,
    host: host || undefined,
  };
}


