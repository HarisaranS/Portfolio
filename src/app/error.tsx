'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col items-center justify-center p-6 font-mono">
      <div className="p-8 rounded-3xl glass-panel border border-[#f38ba8]/40 max-w-md text-center">
        <h2 className="text-xl font-bold text-[#f38ba8] mb-2">System Error Caught</h2>
        <p className="text-xs text-[#a6adc8] mb-6">
          {error.message || 'An unexpected error occurred in the desktop environment.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-[#cba6f7] text-[#1e1e2e] font-bold text-xs hover:bg-[#b4befe] transition-colors"
        >
          Reboot Desktop View
        </button>
      </div>
    </div>
  );
}
