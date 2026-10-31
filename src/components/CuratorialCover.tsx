import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface CuratorialCoverProps {
  onEnter: () => void;
}

export const CuratorialCover: React.FC<CuratorialCoverProps> = ({ onEnter }) => {
  // Prevent any scrolling while the cover is active
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Allow keyboard Space / Enter / Down Arrow to enter naturally
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        handleEnter();
      }
    };

    // Allow mouse wheel to trigger enter smoothly
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleEnter = () => {
    museumAudio.playChime(528, 1.8);
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.9,
          ease: [0.32, 0.72, 0, 1], // Emil Kowalski physics curve
        },
      }}
      className="fixed inset-0 z-[100] bg-besege-canvas flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none border-b border-besege-black/10 shadow-2xl"
    >
      {/* Subtle paper grain and background lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-besege-violet/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-besege-rose/20 blur-3xl pointer-events-none" />

      {/* Top Header: Monograph Meta */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono tracking-widest text-besege-muted border-b border-besege-black/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
          <span className="text-besege-black font-semibold uppercase">BESEGÉ STUDIO</span>
          <span className="text-besege-muted">|</span>
          <span className="hidden sm:inline">Pabellón Digital & Archivo Curatorial</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="hidden md:inline">MADRID · 40°25&apos;N</span>
          <span className="px-2.5 py-0.5 rounded-full bg-besege-violet/10 text-besege-violet font-semibold">
            UDIT 2024
          </span>
        </div>
      </div>

      {/* Central Haute Monograph Showcase */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 py-4">
        {/* Left: Tactile Monograph Cover Plate */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={handleEnter}
          className="relative cursor-pointer group flex-shrink-0 w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-3xl bg-white p-3 border border-besege-black/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          data-cursor="ABRIR"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-besege-canvas-dark">
            <img
              src="/assets/art-look-tfg-collection.png"
              alt="BESEGÉ Monografía de Alta Costura"
              className="w-full h-full object-cover transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-besege-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="font-mono text-[9px] uppercase tracking-widest text-besege-violet-soft font-bold">
                Colección Fin de Grado
              </span>
              <span className="font-serif italic text-lg leading-tight">
                Aura Drapeada & Cadenas
              </span>
            </div>
          </div>

          {/* Golden Corner Stamp */}
          <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-besege-violet text-white flex items-center justify-center font-display font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
            BSG
          </div>
        </motion.div>

        {/* Right: Curatorial Narrative & Invitation */}
        <div className="text-center md:text-left space-y-5 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-besege-rose/25 text-besege-black font-serif italic text-sm">
            <Sparkles size={13} className="text-besege-violet" />
            <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-black text-4xl sm:text-6xl text-besege-black tracking-tight leading-none">
              BESEGÉ <span className="font-serif font-normal italic text-besege-violet text-3xl sm:text-5xl">studio</span>
            </h1>
            <p className="font-mono text-xs text-besege-muted uppercase tracking-[0.2em]">
              Bárbara Sánchez-Guerrero · Grado en Diseño de Moda
            </p>
          </div>

          <blockquote className="font-serif italic font-light text-xl sm:text-2xl text-besege-charcoal/90 leading-snug border-l-2 md:border-besege-violet md:pl-4">
            &ldquo;{MUSEUM_METADATA.manifestoCore}&rdquo;
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-besege-charcoal/70 leading-relaxed">
            Una experiencia museística concebida para contemplar la orfebrería sobre el cuerpo humano a través de un viaje interactivo tridimensional.
          </p>

          {/* Clear, Unmistakable Entry CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-besege-black text-white font-mono text-xs tracking-widest uppercase hover:bg-besege-violet transition-all duration-300 shadow-xl hover:shadow-museum-hover hover:-translate-y-0.5 active:translate-y-0 font-semibold"
              data-cursor="ENTRAR"
            >
              <span>Abrir Exposición</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                <ArrowDown size={13} />
              </div>
            </button>

            <span className="font-mono text-[11px] text-besege-muted">
              o haz scroll hacia abajo ↓
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Museum Footprint */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-besege-muted border-t border-besege-black/10 pt-4">
        <div className="flex items-center gap-2">
          <Compass size={13} className="text-besege-violet" />
          <span>Atelier de Creación: Madrid, España</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>06 Esculturas Textiles</span>
          <span>·</span>
          <span>08 Reliquias de Laboratorio</span>
          <span>·</span>
          <span className="text-besege-black font-semibold">TFG UDIT 2024</span>
        </div>
      </div>
    </motion.div>
  );
};
