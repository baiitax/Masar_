import Image from "next/image";

/**
 * Pure presentational brand splash — safe to render from server components
 * (app/loading.js) and reused by the client <Preloader /> wrapper.
 * All motion is CSS-only so it animates even before hydration.
 */
export default function PreloaderVisual() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="relative">
        <Image
          src="/brand/logo-mark.png"
          width={84}
          height={84}
          alt=""
          priority
          className="preloader-logo rounded-[24%] shadow-gold"
        />
        <svg
          viewBox="0 0 120 120"
          className="absolute -inset-5 h-[124px] w-[124px]"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgb(var(--line) / 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#C2994B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="80 247"
            className="origin-center animate-spin"
            style={{ animationDuration: "1.1s" }}
          />
        </svg>
      </div>
      <div>
        <p className="font-display text-lg font-extrabold tracking-[0.35em] text-ink">MASAR</p>
        <div className="preloader-rail mt-4" aria-hidden="true">
          <span />
        </div>
        <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted">
          Saudi–Africa trade infrastructure
        </p>
      </div>
    </div>
  );
}
