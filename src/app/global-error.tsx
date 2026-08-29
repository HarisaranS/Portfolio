'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f17] text-white font-mono min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-3xl bg-[#181825] border border-[#f38ba8]/40 max-w-md text-center">
          <h2 className="text-xl font-bold text-[#f38ba8] mb-2">Global System Error</h2>
          <p className="text-xs text-[#a6adc8] mb-6">
            {error.message || 'Fatal desktop exception.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-xl bg-[#cba6f7] text-[#1e1e2e] font-bold text-xs"
          >
            Reload Desktop
          </button>
        </div>
      </body>
    </html>
  );
}
