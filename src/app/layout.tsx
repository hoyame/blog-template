import Header from "@/app/_components/header";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { getBlogConfig, extractGoogleFontFamily, resolveColors } from "@/lib/readConfig";

import "./globals.css";

 

export async function generateMetadata(): Promise<Metadata> {
  const blog = getBlogConfig();
  const metadataBase = blog.siteUrl ? new URL(blog.siteUrl) : undefined;
  return {
    title: blog.title,
    description: blog.description,
    metadataBase,
    openGraph: {
      url: blog.siteUrl || undefined,
      title: blog.title,
      description: blog.description,
      images: [HOME_OG_IMAGE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [HOME_OG_IMAGE_URL],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blog = getBlogConfig();
  const theme = resolveColors(blog);
  const background = theme.light.background;
  const text = theme.light.text;
  const accent = theme.light.accent;
  const fontUrl = blog.fonts.googleFontsUrl;
  const fontFamily = extractGoogleFontFamily(fontUrl) ?? undefined;

  return (
    <html lang={blog.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {fontUrl && <link rel="stylesheet" href={fontUrl} />}
        {blog.favicon && <link rel="icon" href={blog.favicon} />}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content={background} />
        
        <style>{`:root{--blog-bg:${background};--blog-text:${text};--blog-accent:${accent};--blog-border:${theme.light.border};}
        .dark:root{--blog-bg:${theme.dark.background};--blog-text:${theme.dark.text};--blog-accent:${theme.dark.accent};--blog-border:${theme.dark.border};}`}</style>
        {fontFamily && (
          <style>{`:root{--blog-font:'${fontFamily}', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';}`}</style>
        )}
      </head>
      <body>
        <Header />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
