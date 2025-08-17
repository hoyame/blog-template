import Container from "@/app/_components/container";
import Link from "next/link";
import { getAllJsonPages } from "@/lib/jsonPages";
import { getBlogConfig } from "@/lib/readConfig";

export default function ArticlesIndex() {
  const jsonPages = getAllJsonPages();
  const blog = getBlogConfig();

  return (
    <main>
      <Container>
        <section>
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ letterSpacing: '-2px', textAlign: 'start' }}>
            Bienvenue sur le blog de {blog.title}, votre source d'informations et d'actualités sur nos services et solutions professionnelles
          </h1>
          <div className="space-y-0 mb-32">
            {jsonPages.map((p) => (
              <Link
                key={p.id}
                href={(p.meta.slug || `/${p.id}`).replace(/^\/+/, "/")}
                className="block py-4 hover:opacity-70 transition-opacity duration-200"
              >
                <h3 className="mb-2 text-xl font-bold leading-tight" style={{ color: "var(--blog-accent)" }}>
                  {(p.meta.title ?? "").replace(/^"|"$/g, "")}
                </h3>
                {p.meta.description && (
                  <p className="text-sm leading-relaxed">{p.meta.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}


