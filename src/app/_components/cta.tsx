import Link from "next/link";

type IconName = "arrow" | "phone" | "mail";

type Props = {
  href: string;
  text: string;
  variant?: "solid" | "ghost" | "link";
  size?: "lg" | "sm";
  icon?: IconName;
  className?: string;
};

function Icon({ name }: { name: IconName }) {
  if (name === "phone")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.33 1.7.62 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.17a2 2 0 0 1 2.11-.45c.8.29 1.64.5 2.5.62A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  if (name === "mail")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h16v16H4z" fill="none"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7"/>
      <path d="M7 7h10v10"/>
    </svg>
  );
}

export function Cta({ href, text, variant = "solid", size = "lg", icon = "arrow", className = "" }: Props) {
  const base = "inline-flex items-center justify-center gap-2 select-none transition-all duration-200 ease-out";
  const radius = "rounded-2xl";
  const padding = size === "lg" ? "px-5 py-2.5 text-base" : "px-3 py-1.5 text-sm";
  const styleSolid = {
    background: "linear-gradient(135deg,#3a3a3a 0%, #000 100%)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties;
  let classes = `${base} ${radius} ${padding}`;
  let style: React.CSSProperties = {};

  if (variant === "solid") {
    classes += " shadow-md hover:-translate-y-0.5";
    style = styleSolid;
  } else if (variant === "ghost") {
    classes += " border hover:opacity-85";
    style = { borderColor: "var(--blog-border)", color: "var(--blog-text)" } as React.CSSProperties;
  } else {
    classes += " hover:opacity-75";
    style = { background: "transparent", color: "var(--blog-accent)" } as React.CSSProperties;
  }

  return (
    <Link prefetch={false} href={href} className={`${classes} ${className}`} style={style}>
      <Icon name={icon} />
      {text}
    </Link>
  );
}


