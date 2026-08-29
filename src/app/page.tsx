'use client';

import { useStore, THEMES } from '@/store/portfolioStore';
import { useEffect } from 'react';
import { ThemeRipple } from '@/components/ThemeRipple';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TimelineSection } from '@/components/TimelineSection';
import { CertsSection } from '@/components/CertsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ContactSection } from '@/components/ContactSection';
import { InteractiveConsole } from '@/components/InteractiveConsole';
import { CommandPalette } from '@/components/CommandPalette';
import { CustomCursor } from '@/components/CustomCursor';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  const { theme, setActiveSection } = useStore();
  const t = THEMES[theme] || THEMES.clean;

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <PageTransition>
      <main className="font-sans" style={{ backgroundColor: t.bg, color: t.textPrimary }}>
        <ThemeRipple />
        <CustomCursor />
        <Navbar />

        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <AchievementsSection />
        <CertsSection />
        <ContactSection />

        <InteractiveConsole />
        <CommandPalette />
      </main>
    </PageTransition>
  );
}
