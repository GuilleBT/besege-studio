import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { DimensionalBackground } from './components/DimensionalBackground';
import { PrehomeIntro } from './components/PrehomeIntro';
import { MuseumNavbar } from './components/MuseumNavbar';
import { PortalEntrance } from './components/PortalEntrance';
import { ManifestoSection } from './components/ManifestoSection';
import { AnatomyExplosion } from './components/AnatomyExplosion';
import { KineticMarquee } from './components/KineticMarquee';
import { HorizontalRunway } from './components/HorizontalRunway';
import { LaboratorySection } from './components/LaboratorySection';
import { PrivateVisitsSection } from './components/PrivateVisitsSection';
import { ArtworkModal } from './components/ArtworkModal';
import { MuseumFooter } from './components/MuseumFooter';
import { Artwork } from './data/museumData';

export const App: React.FC = () => {
  const [showPrehome, setShowPrehome] = useState<boolean>(true);
  const [activeRoom, setActiveRoom] = useState<string>('atrio');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [inquirySubject, setInquirySubject] = useState<string>('');

  // Setup silky smooth Lenis scroll for museum exhibition momentum
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Intersection Observer to detect current active museum room
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveRoom(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToRoom = (roomId: string) => {
    const element = document.getElementById(roomId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromArtwork = (artwork: Artwork) => {
    setSelectedArtwork(null);
    setInquirySubject(artwork.title);
    scrollToRoom('visita');
  };

  return (
    <div className="relative min-h-screen bg-besege-canvas text-besege-black selection:bg-besege-violet selection:text-white overflow-x-clip">
      {/* Three.js Ethereal Spores & Particle Field in 3D Space */}
      <DimensionalBackground />

      {/* Paper Grain Overlay for physical museum texture */}
      <div className="paper-grain" />

      {/* Spectacular Pre-Home Cinematic Intro */}
      {showPrehome && (
        <PrehomeIntro onEnter={() => setShowPrehome(false)} />
      )}

      {/* High-Agency Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Island Navigation */}
      <MuseumNavbar
        activeRoom={activeRoom}
        onNavigate={scrollToRoom}
      />

      {/* Main Museum Dimensional Journey */}
      <main className="relative z-10">
        {/* Sala 00: 3D Dimensional Portal & Atrium Zoom */}
        <PortalEntrance onEnter={() => scrollToRoom('manifiesto')} />

        {/* Sala 01: El Manifiesto & Tesis UDIT */}
        <ManifestoSection />

        {/* 3D Scroll Scrubbing: Anatomy Layer Explosion (Piel, Seda, Joyas) */}
        <AnatomyExplosion />

        {/* Kinetic Velocity Marquee Banner */}
        <KineticMarquee text="FOR TODAY'S GODDESSES, MERMAIDS AND FAIRIES · BESEGÉ STUDIO · EL CUERPO COMO LIENZO · BÁRBARA SÁNCHEZ-GUERRERO · " />

        {/* Sala 02: Horizontal Pinned Dimensional Runway with Velocity Skew */}
        <HorizontalRunway onSelectArtwork={(art) => setSelectedArtwork(art)} />

        {/* Second Kinetic Marquee (Reverse Direction) */}
        <KineticMarquee
          reverse
          text="ORFEBRERÍA TEXTIL · COLECCIÓN FIN DE GRADO UDIT · ALTA COSTURA MADRID · NO TAPAR EL CUERPO SINO DECORARLO · "
        />

        {/* Sala 03: Laboratorio de Materia & Dumps de Instagram */}
        <LaboratorySection />

        {/* Sala 04: Cita Privada & Libro de Registro Curatorial */}
        <PrivateVisitsSection initialSubject={inquirySubject} />
      </main>

      {/* Curatorial Footer */}
      <MuseumFooter onBackToTop={() => scrollToRoom('atrio')} />

      {/* Fullscreen Artwork Modal with 2x Macro-Inspection */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onInquire={handleInquireFromArtwork}
      />
    </div>
  );
};

export default App;
