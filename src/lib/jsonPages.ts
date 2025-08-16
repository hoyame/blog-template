import fs from "fs";
import path from "path";

export type JsonPage = {
  id: string;
  projectId?: string;
  meta: {
    title: string;
    description?: string;
    slug: string;
    h1?: string;
    canonical_url?: string;
  };
  outline?: Array<{ h2?: string }>;
  body?: Array<{ p?: string }>;
  faq?: Array<{ question: string; answer: string }>;
  howto?: Array<{ step: string; detail?: string }>;
  qna?: Array<{ question: string; answer: string }>;
  local_landing?: Array<{ p: string }>;
  schema_org?: unknown;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

export function getAllJsonSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function readJsonPageBySlug(slug: string): JsonPage | null {
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  try {
    return JSON.parse(raw) as JsonPage;
  } catch {
    const objects = extractJsonObjects(raw);
    const parsed = objects
      .map((txt) => {
        try {
          return JSON.parse(txt) as JsonPage;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as JsonPage[];
    if (parsed.length === 0) return null;
    const byId = parsed.find((p) => p.id === slug);
    return byId ?? parsed[0];
  }
}

export function getAllJsonPages(): JsonPage[] {
  return getAllJsonSlugs()
    .map((s) => readJsonPageBySlug(s))
    .filter(Boolean) as JsonPage[];
}

function extractJsonObjects(input: string): string[] {
  const results: string[] = [];
  let depth = 0;
  let inString = false;
  let escape = false;
  let start = -1;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        results.push(input.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return results;
}

export function getAllJsonPageObjects(): JsonPage[] {
  const files = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"))
    : [];
  const pages: JsonPage[] = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
    const objs = extractJsonObjects(raw);
    for (const obj of objs) {
      try {
        pages.push(JSON.parse(obj) as JsonPage);
      } catch {}
    }
  }
  return pages;
}

function normalizeSlug(value?: string): string | null {
  if (!value) return null;
  return value.replace(/^\/+/, "").trim();
}

export function getJsonPageByMetaSlug(metaSlug: string): JsonPage | null {
  const target = normalizeSlug(metaSlug);
  if (!target) return null;
  const pages = getAllJsonPageObjects();
  return (
    pages.find((p) => normalizeSlug(p.meta?.slug || p.id) === target) || null
  );
}

export function getAllMetaSlugs(): string[] {
  return getAllJsonPageObjects()
    .map((p) => normalizeSlug(p.meta?.slug || p.id))
    .filter((s): s is string => !!s);
}


