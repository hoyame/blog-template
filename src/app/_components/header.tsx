import Link from "next/link";
import { getBlogConfig } from "@/lib/readConfig";

const Header = () => {
  const blog = getBlogConfig();
  const hasLogo = !!blog.logo.svg;
  const isExternal = /^https?:\/\//i.test(blog.siteUrl);

  return (
    <header className="w-full mb-12">
      <div className="container mx-auto px-5 flex items-center justify-between py-6">
                <div className="flex items-center gap-3">
          {hasLogo ? (
            <Link href="/" aria-label={blog.logo.alt} className="blog-logo inline-flex items-center" prefetch={false}>
              <span dangerouslySetInnerHTML={{ __html: blog.logo.svg || "" }} />
            </Link>
          ) : (
            <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
              {blog.title}
            </Link>
          )}
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/articles" 
            prefetch={false} 
            className="relative px-6 py-2.5 transition-all duration-300 ease-out hover:scale-110 group overflow-hidden"
            style={{ color: "var(--blog-text)", fontFamily: "var(--blog-font)" }}
          >
            <span className="relative z-10 group-hover:opacity-80 transition-opacity duration-300">Articles</span>
          </Link>
          <Link 
            href={blog.redirectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 py-2.5 transition-all duration-300 ease-out hover:scale-110 group overflow-hidden"
            style={{ color: "var(--blog-text)", fontFamily: "var(--blog-font)" }}
          >
            <span className="relative z-10 group-hover:opacity-80 transition-opacity duration-300">Site Web</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
