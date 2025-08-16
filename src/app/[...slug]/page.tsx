import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { getAllMetaSlugs, getJsonPageByMetaSlug } from "@/lib/jsonPages";
import markdownToHtml from "@/lib/markdownToHtml";
import { Cta } from "@/app/_components/cta";
import { getBlogConfig } from "@/lib/readConfig";

type Params = { params: Promise<{ slug: string[] }> };

export default async function CatchAllJson(props: Params) {
  const { slug } = await props.params;
  const path = slug.join("/");
  const page = getJsonPageByMetaSlug(path);
  if (!page) return notFound();
  const blog = getBlogConfig();

  const renderedBody = await Promise.all(
    (page.body ?? []).map(async (it) => ({
      html: it.p ? await markdownToHtml(it.p) : "",
    })),
  );

  const combinedQA = [
    ...((page.faq ?? []).map((f) => ({ question: f.question, answer: f.answer }))),
    ...((page.qna ?? []).map((q) => ({ question: q.question, answer: q.answer }))),
  ];

  return (
    <main>
      <Container>
        <article>
          
          <h1 className="mb-6 text-3xl font-bold" style={{ color: "var(--blog-accent)" }}>
            {(page.meta.h1 ?? page.meta.title).replace(/^"|"$/g, "")}
          </h1>

          <div className="flex items-center gap-3 mt-4 mb-6">
            <Cta href={blog.siteUrl} text="Visiter" variant="link" size="sm" icon="arrow" />
            <Cta href={`tel:${blog.contact.phone}`} text="Appeler" variant="link" size="sm" icon="phone" />
            <Cta href={`mailto:${blog.contact.email}`} text="Écrire" variant="link" size="sm" icon="mail" />
          </div>

          {(page.outline ?? []).map((it, idx) => (
            <section key={`sec-${idx}`} className="mb-6">
              {it.h2 ? (
                <h2 className="text-2xl font-bold mb-3">{it.h2}</h2>
              ) : null}
              {renderedBody[idx]?.html ? (
                <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: renderedBody[idx].html }} />
              ) : null}
              {idx % 2 === 1 ? (
                <Cta href={blog.siteUrl} text="Consulter notre site" variant="link" size="sm" icon="arrow" className="mt-4" />
              ) : null}
            </section>
          ))}
          {renderedBody.slice((page.outline ?? []).length).map((it, i) => (
            <div key={`rest-${i}`} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: it.html }} />
          ))}

          {combinedQA.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Questions et réponses</h2>
              {combinedQA.map((qa, i) => (
                <div key={`qa-${i}`} className="mb-4">
                  <p className="font-bold" style={{ color: "var(--blog-accent)" }}>{qa.question}</p>
                  <p>{qa.answer}</p>
                </div>
              ))}
            </section>
          ) : null}

          <div className="my-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--blog-accent)" }}>Besoin d’un accompagnement ?</h2>
            <p className="mb-4 opacity-90">Parlez‑nous de votre besoin, on vous répond rapidement.</p>
            <div className="flex flex-wrap gap-3">
              <Cta href={`mailto:${blog.contact.email}`} text="Écrire" variant="link" size="sm" icon="mail" />
              <Cta href={`tel:${blog.contact.phone}`} text="Appeler" variant="link" size="sm" icon="phone" />
              <Cta href={blog.siteUrl} text="Visiter" variant="link" size="sm" icon="arrow" />
            </div>
          </div>

          {page.schema_org ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_org) }} />
          ) : null}
        </article>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  return getAllMetaSlugs().map((s) => ({ slug: s.split("/") }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const path = slug.join("/");
  const page = getJsonPageByMetaSlug(path);
  if (!page) return {};
  return {
    title: (page.meta.title ?? "").replace(/^"|"$/g, ""),
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical_url },
  } satisfies Metadata;
}


