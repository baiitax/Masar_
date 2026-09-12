import { pageMeta } from "@/lib/seo";
import LoginForm from "@/components/ops/LoginForm";

export const metadata = pageMeta({
  title: "Ops sign in",
  path: "/portal/login",
  description: "MASAR Ops portal sign in.",
});

export default function PortalLoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 pt-28">
      <div className="glass-strong rounded-2xl p-8">
        <p className="eyebrow">MASAR Ops</p>
        <h1 className="h-display mt-3 text-2xl font-bold text-ink">Internal sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Restricted to authorized MASAR operators. All actions are audit-logged.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
