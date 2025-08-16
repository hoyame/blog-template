export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: "var(--blog-border)" }}>
      <div className="container mx-auto px-5 py-8 text-sm opacity-80">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
}


