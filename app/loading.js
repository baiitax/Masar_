import PreloaderVisual from "@/components/PreloaderVisual";

/**
 * Root route-transition fallback (Next wraps every route in a Suspense
 * boundary with this file as the fallback). Full-viewport branded splash,
 * consistent with the first-load <Preloader />.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      role="status"
      aria-live="polite"
    >
      <PreloaderVisual />
    </div>
  );
}
