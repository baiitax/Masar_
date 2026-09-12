import Link from "next/link";
import Image from "next/image";

export function LogoMark({ size = 40, className = "" }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      priority
      className={`flex-none rounded-[24%] shadow-gold ${className}`}
    />
  );
}

export default function Brand({ compact = false, className = "" }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="MASAR — home"
    >
      <LogoMark size={compact ? 34 : 40} />
      <span className="leading-none">
        <span className="block font-display text-[1.18rem] font-extrabold tracking-[0.2em] text-ink">
          MASAR
        </span>
        <span className="mt-1.5 hidden text-[0.56rem] font-semibold uppercase tracking-[0.3em] text-muted sm:block">
          Trusted trade · Seamless futures
        </span>
      </span>
    </Link>
  );
}
