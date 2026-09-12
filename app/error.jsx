"use client";

import Brand from "@/components/Brand";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Brand />
      <div className="glass max-w-lg rounded-2xl p-10">
        <h1 className="h-display text-2xl font-bold text-ink">
          Something interrupted the transaction request.
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          We could not complete the request. Your information has not been submitted unless a
          confirmation is shown. Please try again, or contact MASAR if the problem continues.
        </p>
        <button type="button" onClick={() => reset?.()} className="btn btn-gold mt-7">
          Try again
        </button>
      </div>
    </div>
  );
}
