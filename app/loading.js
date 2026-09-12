import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-7 px-6 text-center" role="status" aria-live="polite">
      <div className="relative">
        <Image src="/brand/logo-mark.png" width={72} height={72} alt="" className="rounded-[24%] shadow-gold" />
        <svg viewBox="0 0 120 120" className="absolute -inset-4 h-[104px] w-[104px]" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(var(--line))" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 8" />
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
        <p className="font-display text-lg font-semibold text-ink">Preparing your trade intelligence…</p>
        <p className="mt-1 text-sm text-muted">Securing the transaction workflow.</p>
      </div>
    </div>
  );
}
