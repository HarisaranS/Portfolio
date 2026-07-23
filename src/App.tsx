import BackgroundMesh from './components/BackgroundMesh';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen text-slate-100 bg-[#030308] font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      {/* Neural network background */}
      <BackgroundMesh />

      {/* Grid Overlay for cyber aesthetic */}
      <div className="fixed inset-0 cyber-dots pointer-events-none z-1 opacity-60" />

      {/* Foreground components */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
