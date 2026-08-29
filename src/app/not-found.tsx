import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col items-center justify-center p-6 font-mono">
      <div className="p-8 rounded-3xl glass-panel border border-[#cba6f7]/40 max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#cba6f7] mb-2">404 - Page Not Found</h2>
        <p className="text-xs text-[#a6adc8] mb-6">
          The requested workspace route does not exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-[#cba6f7] text-[#1e1e2e] font-bold text-xs hover:bg-[#b4befe] transition-colors inline-block"
        >
          Return to Desktop
        </Link>
      </div>
    </div>
  );
}
