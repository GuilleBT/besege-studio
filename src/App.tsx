import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { MuseumNavbar } from './components/MuseumNavbar';
import { AtriumHero } from './components/AtriumHero';
import { ManifestoSection } from './components/ManifestoSection';
import { SculpturesGallery } from './components/SculpturesGallery';
import { LaboratorySection } from './components/LaboratorySection';
import { PrivateVisitsSection } from './components/PrivateVisitsSection';
import { ArtworkModal } from './components/ArtworkModal';
import { MuseumFooter } from './components/MuseumFooter';
import { Artwork } from './data/museumData';

export const App: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<string>('atrio');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [inquirySubject, setInquirySubject] = useState<string>('');

  // Setup silky smooth Lenis scroll for museum exhibition momentum
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
      { threshold: 0.3 }
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
    <div className="relative min-h-screen bg-besege-canvas text-besege-black selection:bg-besege-violet selection:text-white">
      {/* Paper Grain Overlay for physical museum texture */}
      <div className="paper-grain" />

      {/* High-Agency Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Island Navigation */}
      <MuseumNavbar
        activeRoom={activeRoom}
        onNavigate={scrollToRoom}
      />

      {/* Museum Exhibition Rooms */}
      <main>
        {/* Sala 00: Atrio de Entrada */}
        <AtriumHero onEnter={() => scrollToRoom('manifiesto')} />

        {/* Sala 01: El Manifiesto & Tesis UDIT */}
        <ManifestoSection />

        {/* Sala 02: Esculturas Textiles & Joyería Corporal */}
        <SculpturesGallery onSelectArtwork={(art) => setSelectedArtwork(art)} />

        {/* Sala 03: Laboratorio de Materia & Dumps de Instagram */}
        <LaboratorySection />

        {/* Sala 04: Cita Privada & Libro de Registro */}
        <PrivateVisitsSection initialSubject={inquirySubject} />
      </main>

      {/* Curatorial Footer */}
      <MuseumFooter onBackToTop={() => scrollToRoom('atrio')} />

      {/* Fullscreen Artwork Modal with Macro-Inspection */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onInquire={handleInquireFromArtwork}
      />
    </div>
  );
};

export default App;
