import Link from "next/link";

type Props = {
  title: string;
  excerpt: string;
  slug: string;
};

export function HeroPost({
  title,
  excerpt,
  slug,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block py-4 border-b hover:opacity-70 transition-opacity duration-200" style={{ borderColor: "var(--blog-border)" }}>
      <h3 className="mb-2 text-xl font-bold leading-tight">
        {title}
      </h3>
      <p className="text-sm leading-relaxed">{excerpt}</p>
    </Link>
  );
}
