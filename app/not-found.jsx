import Link from "next/link";
import Brand from "@/components/Brand";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Brand />
      <div className="glass max-w-lg rounded-2xl p-10">
        <p className="font-mono text-sm tracking-[0.3em] text-gold-500">404</p>
        <h1 className="h-display mt-3 text-2xl font-bold text-ink">This route is not on the corridor map.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          The page you requested does not exist or may have moved. Navigate to an active corridor
          section below.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">Return home</Link>
          <Link href="/corridors" className="btn btn-ghost">Trade corridors</Link>
          <Link href="/contact" className="btn btn-ghost">Contact MASAR</Link>
        </div>
      </div>
    </div>
  );
}
