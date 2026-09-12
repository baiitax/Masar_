import Link from "next/link";
import Image from "next/image";
import Icon from "./icons";
import Reveal from "./Reveal";
import { BreadcrumbSchema } from "./schema";
import T from "./T";

export function Container({ children, className = "", size = "lg" }) {
  const widths = {
    md: "max-w-4xl",
    lg: "max-w-7xl",
    xl: "max-w-[84rem]",
  };
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`eyebrow mb-3 flex items-center gap-2 ${className}`}>
      <span className="inline-block h-px w-7 bg-gold-500" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, lead, align = "start", className = "", t: tx }) {
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="h-display text-3xl sm:text-[2.6rem] font-bold text-ink">{title}</h2>
      {lead ? <p className="lead mt-5">{lead}</p> : null}
    </Reveal>
  );
}

export function GlassCard({
  as: Tag = "div",
  level = 3,
  className = "",
  hover = false,
  children,
  ...rest
}) {
  const lvl = level === 2 ? "glass-nav" : level === 4 || level === 5 ? "glass-strong" : "glass";
  const rounded = level >= 4 ? "rounded-2xl" : "rounded-xl2";
  return (
    <Tag
      className={`${lvl} ${rounded} ${hover ? "card-hover" : ""} p-6 sm:p-7 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const btnVariants = {
  gold: "btn-gold",
  navy: "btn-navy",
  ghost: "btn-ghost",
};

export function LinkButton({ href, children, variant = "gold", size, className = "", external, ...rest }) {
  const cls = `btn ${btnVariants[variant] || ""} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ children, variant = "gold", size, className = "", type = "button", ...rest }) {
  return (
    <button
      type={type}
      className={`btn ${btnVariants[variant] || ""} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ArrowLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors ${className}`}
    >
      {children}
      <Icon
        name="arrow"
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
      />
    </Link>
  );
}

const pillStyles = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  gold: "text-gold-500",
  muted: "text-muted",
};

export function StatusPill({ tone = "muted", dot = true, children, className = "" }) {
  return (
    <span className={`pill ${className}`}>
      {dot ? <span className={`dot dot-${tone}`} aria-hidden="true" /> : null}
      <span className={pillStyles[tone] || ""}>{children}</span>
    </span>
  );
}

const evidenceTone = {
  VERIFIED: "success",
  SECONDARY: "muted",
  HISTORICAL: "muted",
  ILLUSTRATIVE: "warning",
  TARGET: "gold",
  UNKNOWN: "warning",
};

export function EvidenceTag({ status = "UNKNOWN", label }) {
  const k = `common.evidence.${status}`;
  return (
    <StatusPill tone={evidenceTone[status] || "muted"}>
      {label || <T k={k} />}
    </StatusPill>
  );
}

const vTone = {
  verified: "success",
  pending: "warning",
  review: "warning",
  none: "muted",
};

export function VerificationPill({ status = "none", label }) {
  return (
    <StatusPill tone={vTone[status] || "muted"}>
      {label || <T k={`common.vstatus.${status}`} />}
    </StatusPill>
  );
}

export function CheckList({ items, icon = "check", className = "", tone = "text-gold-500", iconClass = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[0.95rem] text-ink/90">
          <span className={`mt-0.5 flex-none ${tone} ${iconClass}`}>
            <Icon name={icon} size={18} strokeWidth={2} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Disclaim({ children, className = "", title = "Operational guidance", icon = "shield" }) {
  return (
    <aside
      className={`glass rounded-xl2 p-5 sm:p-6 text-sm leading-7 text-muted ${className}`}
      aria-label="Disclaimer"
    >
      <p className="flex items-center gap-2 font-semibold text-ink mb-2">
        <Icon name={icon} size={17} className="text-gold-500" />
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </aside>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-7">
        <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {it.href && !last ? (
                  <Link href={it.href} className="hover:text-gold-500 transition-colors">
                    {it.label}
                  </Link>
                ) : (
                  <span className={last ? "text-ink font-medium" : ""} aria-current={last ? "page" : undefined}>
                    {it.label}
                  </span>
                )}
                {!last ? (
                  <Icon name="chevronRight" size={13} className="rtl:rotate-180 opacity-60" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <BreadcrumbSchema items={items} />
    </>
  );
}

export function PageHero({ eyebrow, title, lead, children, breadcrumbs, visual, className = "" }) {
  return (
    <header className={`relative pt-32 sm:pt-40 pb-14 sm:pb-20 ${className}`}>
      <Container size="lg">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className={visual ? "grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}>
          <Reveal>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="h-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-ink max-w-3xl">
              {title}
            </h1>
            {lead ? <p className="lead mt-6 max-w-2xl text-lg">{lead}</p> : null}
            {children ? <div className="mt-9 flex flex-wrap items-center gap-4">{children}</div> : null}
          </Reveal>
          {visual ? <Reveal delay={0.12}>{visual}</Reveal> : null}
        </div>
      </Container>
    </header>
  );
}

export function EmptyState({ icon = "search", title, children, action }) {
  return (
    <div className="glass rounded-xl2 border-dashed p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line/20 text-gold-500">
        <Icon name={icon} size={22} />
      </div>
      <p className="font-semibold text-ink">{title}</p>
      <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{children}</div>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function ImageFrame({
  src,
  alt,
  caption,
  ratio = "16/9",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 720px",
  evidence,
}) {
  return (
    <figure className={`glass overflow-hidden rounded-2xl ${className}`}>
      <div className="relative" style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" aria-hidden="true" />
        {evidence ? (
          <div className="absolute start-4 top-4">
            <EvidenceTag status={evidence} />
          </div>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="px-5 py-3.5 text-xs leading-5 text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function IconBadge({ name, className = "", size = 22 }) {
  return (
    <span
      className={`inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500 ${className}`}
    >
      <Icon name={name} size={size} />
    </span>
  );
}

export function NumberedStage({ n, title, children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 font-mono text-sm font-semibold text-gold-500">
          {String(n).padStart(2, "0")}
        </span>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
      {children ? <p className="mt-3 text-sm leading-6 text-muted">{children}</p> : null}
    </div>
  );
}
