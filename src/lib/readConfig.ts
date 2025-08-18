import fs from "fs";
import path from "path";

export interface Colors {
  background?: string;
  text?: string;
  accent?: string;
  border?: string;
}

export interface BlogConfig {
  title?: string;
  description?: string;
  siteUrl?: string;
  og_image_url?: string;
  logo?: {
    svg?: string;
    alt?: string;
  };
  favicon?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  colors?:
    | Colors
    | {
        light?: Colors;
        dark?: Colors;
      };
  fonts?: {
    googleFontsUrl?: string;
  };
  redirectionUrl?: string;
  language?: string;
}

export interface RootConfig {
  blog?: BlogConfig;
}

export function readRootConfig(): RootConfig | null {
  try {
    const configPath = path.join(process.cwd(), "config.json");
    const raw = fs.readFileSync(configPath, "utf8");
    return JSON.parse(raw) as RootConfig;
  } catch {
    return null;
  }
}

export function getBlogConfig(): Required<Required<RootConfig>["blog"]> {
  const cfg = readRootConfig()?.blog ?? {};
  return {
    title: cfg.title ?? "Blog",
    description: cfg.description ?? "",
    siteUrl: cfg.siteUrl ?? "/",
    og_image_url: cfg.og_image_url ?? "/favicon/apple-touch-icon.png",
    logo: {
      svg: cfg.logo?.svg ?? "",
      alt: cfg.logo?.alt ?? "Logo",
    },
    favicon: cfg.favicon ?? "",
    contact: {
      email: cfg.contact?.email ?? "contact@hoxtio.fr",
      phone: cfg.contact?.phone ?? "0970705603",
    },
    colors: (cfg.colors as any) ?? {},
    fonts: {
      googleFontsUrl: cfg.fonts?.googleFontsUrl ?? "",
    },
    redirectionUrl: cfg.redirectionUrl ?? "https://hoxtio.fr/solutions",
    language: cfg.language ?? "fr",
  };
}

export function extractGoogleFontFamily(googleFontsUrl?: string): string | null {
  try {
    if (!googleFontsUrl) return null;
    const url = new URL(googleFontsUrl);
    const familyParam = url.searchParams.get("family");
    if (!familyParam) return null;
    const family = familyParam.split(":")[0].replace(/\+/g, " ");
    return family || null;
  } catch {
    return null;
  }
}

type RequiredColors = Required<Pick<Colors, "background" | "text" | "accent" | "border">>;

export function resolveColors(blog: BlogConfig | Required<BlogConfig>): {
  light: RequiredColors;
  dark: RequiredColors;
} {
  const defaultSingle: RequiredColors = {
    background: (blog.colors as Colors)?.background ?? "#ffffff",
    text: (blog.colors as Colors)?.text ?? "#1a1a1a",
    accent: (blog.colors as Colors)?.accent ?? "#3b82f6",
    border: (blog.colors as Colors)?.border ?? ((blog.colors as Colors)?.text ?? "#1a1a1a"),
  };

  if (
    blog.colors &&
    typeof blog.colors === "object" &&
    (blog.colors as any).light !== undefined
  ) {
    const light = (blog.colors as { light?: Colors; dark?: Colors }).light ?? {};
    const dark = (blog.colors as { light?: Colors; dark?: Colors }).dark ?? {};
    return {
      light: {
        background: light.background ?? defaultSingle.background,
        text: light.text ?? defaultSingle.text,
        accent: light.accent ?? defaultSingle.accent,
        border: light.border ?? defaultSingle.border,
      },
      dark: {
        background: dark.background ?? "#0f172a",
        text: dark.text ?? "#94a3b8",
        accent: dark.accent ?? defaultSingle.accent,
        border: dark.border ?? (dark.text ?? "#94a3b8"),
      },
    };
  }

  return { light: defaultSingle, dark: {
    background: "#0f172a",
    text: "#94a3b8",
    accent: defaultSingle.accent,
    border: "#334155",
  }};
}


