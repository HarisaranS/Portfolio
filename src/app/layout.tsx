import type { Metadata } from 'next';
import './globals.css';
import { Preloader } from '@/components/Preloader';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Harisaran S — Cybersecurity Engineer',
  description: 'Penetration Tester · CTF Champion · Security Researcher',
  keywords: 'cybersecurity, penetration testing, CTF, security researcher, portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body className="antialiased w-screen overflow-x-hidden">
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
