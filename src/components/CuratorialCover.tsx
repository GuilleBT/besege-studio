import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Sparkles, Compass } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface CuratorialCoverProps {
  onEnter: () => void;
}

export const CuratorialCover: React.FC<CuratorialCoverProps> = ({ onEnter }) => {
  const touchStartY = useRef<number>(0);

  // Prevent any background scrolling while the cover is active
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard Space / Enter / Down Arrow to enter naturally
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        handleEnter();
      }
    };

    // Mouse wheel or touchpad scroll to trigger enter
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 12) {
        handleEnter();
      }
    };

    // Mobile touch swipe gestures (swipe up or swipe down) to trigger enter seamlessly
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      // If user swiped more than 35px in either direction, enter the museum
      if (Math.abs(deltaY) > 35) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
          duration: 0.85,
          ease: [0.32, 0.72, 0, 1], // Emil Kowalski spring curve
        },
      }}
      className="fixed inset-0 z-[100] bg-besege-canvas flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden select-none border-b border-besege-black/10 shadow-2xl h-[100dvh]"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-besege-violet/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-besege-rose/20 blur-3xl pointer-events-none" />

      {/* Top Header: Monograph Meta */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-widest text-besege-muted border-b border-besege-black/10 pb-2.5 sm:pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
          <span className="text-besege-black font-semibold uppercase">BESEGÉ STUDIO</span>
          <span className="text-besege-muted hidden sm:inline">|</span>
          <span className="hidden sm:inline">Pabellón Digital & Archivo</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
          <span className="hidden sm:inline">MADRID · 40°25&apos;N</span>
          <span className="px-2.5 py-0.5 rounded-full bg-besege-violet/10 text-besege-violet font-semibold">
            UDIT 2024
          </span>
        </div>
      </div>

      {/* Central Content: Responsive for Desktop & Mobile */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-8 md:gap-14 overflow-hidden py-1 sm:py-2">
        {/* Monograph Image Plate (Auto-scales on mobile, tappable) */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={handleEnter}
          className="relative cursor-pointer group flex-shrink-0 w-36 sm:w-64 md:w-80 aspect-[4/5] rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-3 border border-besege-black/10 shadow-xl sm:shadow-2xl transition-transform duration-500 hover:scale-[1.02] active:scale-98"
          data-cursor="ABRIR"
        >
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-besege-canvas-dark">
            <img
              src="/assets/art-look-tfg-collection.png"
              alt="BESEGÉ Monografía de Alta Costura"
              className="w-full h-full object-cover transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-besege-black/75 via-transparent to-transparent flex flex-col justify-end p-2 sm:p-4 text-white">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-besege-violet-soft font-bold">
                Colección Fin de Grado
              </span>
              <span className="font-serif italic text-xs sm:text-lg leading-tight">
                Aura Drapeada & Cadenas
              </span>
            </div>
          </div>

          {/* Stamp Badge */}
          <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-besege-violet text-white flex items-center justify-center font-display font-black text-[10px] sm:text-xs shadow-lg">
            BSG
          </div>
        </motion.div>

        {/* Narrative & Entry Invitation */}
        <div className="text-center md:text-left space-y-2 sm:space-y-4 max-w-lg px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-besege-rose/25 text-besege-black font-serif italic text-xs sm:text-sm">
            <Sparkles size={12} className="text-besege-violet" />
            <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="font-display font-black text-2xl sm:text-5xl md:text-6xl text-besege-black tracking-tight leading-none">
              BESEGÉ <span className="font-serif font-normal italic text-besege-violet text-xl sm:text-4xl md:text-5xl">studio</span>
            </h1>
            <p className="font-mono text-[9px] sm:text-xs text-besege-muted uppercase tracking-[0.18em]">
              Bárbara Sánchez-Guerrero · Alta Costura
            </p>
          </div>

          <blockquote className="font-serif italic font-light text-sm sm:text-xl md:text-2xl text-besege-charcoal/90 leading-snug md:border-l-2 md:border-besege-violet md:pl-4 line-clamp-3 sm:line-clamp-none">
            &ldquo;{MUSEUM_METADATA.manifestoCore}&rdquo;
          </blockquote>

          <p className="hidden sm:block font-sans text-xs text-besege-charcoal/70 leading-relaxed">
            Una experiencia museística concebida para contemplar la orfebrería sobre el cuerpo humano a través de un viaje interactivo tridimensional.
          </p>

          {/* Direct, Unmistakable Entry CTA (Thumb-Friendly on Mobile) */}
          <div className="pt-2 sm:pt-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center md:justify-start w-full">
            <button
              onClick={handleEnter}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-besege-black text-white font-mono text-xs tracking-widest uppercase hover:bg-besege-violet active:scale-95 transition-all duration-300 shadow-xl font-semibold border border-white/20"
              data-cursor="ENTRAR"
            >
              <span>Abrir Exposición</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                <ArrowDown size={12} className="hidden sm:inline" />
                <ArrowUp size={12} className="sm:hidden" />
              </div>
            </button>

            {/* Mobile Touch Clue */}
            <div className="flex sm:hidden items-center gap-1.5 font-mono text-[10px] text-besege-violet font-medium animate-pulse">
              <ArrowUp size={11} />
              <span>Desliza hacia arriba o pulsa para entrar</span>
            </div>

            {/* Desktop Scroll Clue */}
            <span className="hidden sm:inline font-mono text-[10px] sm:text-[11px] text-besege-muted">
              o haz scroll hacia abajo ↓
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Museum Footprint */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between text-[10px] sm:text-xs font-mono text-besege-muted border-t border-besege-black/10 pt-2 sm:pt-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Compass size={12} className="text-besege-violet" />
          <span className="hidden sm:inline">Atelier de Creación:</span>
          <span>Madrid, ES</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
          <span>06 Obras</span>
          <span>·</span>
          <span>08 Dumps</span>
          <span>·</span>
          <span className="text-besege-black font-semibold">UDIT 2024</span>
        </div>
      </div>
    </motion.div>
  );
};
