import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { MUSEUM_ROOMS, MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface MuseumNavbarProps {
  activeRoom: string;
  onNavigate: (roomId: string) => void;
}

export const MuseumNavbar: React.FC<MuseumNavbarProps> = ({ activeRoom, onNavigate }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    museumAudio.isMuted = nextMuted;
    if (!nextMuted) {
      museumAudio.playChime(660, 1.0);
    }
  };

  const handleNavClick = (id: string) => {
    museumAudio.playTactileClick();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Island Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 ${
            isScrolled
              ? 'bg-besege-canvas/90 border-besege-black/10 shadow-museum'
              : 'bg-besege-canvas/70 border-besege-black/5 shadow-sm'
          }`}
        >
          {/* Brand Identity / Logo Monogram */}
          <button
            onClick={() => handleNavClick('atrio')}
            className="flex items-center gap-3 group focus:outline-none"
            data-cursor="ATRIO"
            title="Volver al Atrio"
          >
            <div className="w-8 h-8 rounded-full bg-besege-violet flex items-center justify-center text-white font-display font-black text-xs tracking-tighter shadow-sm transition-transform duration-300 group-hover:scale-105">
              BSG
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xs tracking-widest text-besege-black uppercase group-hover:text-besege-violet transition-colors">
                BESEGÉ
              </span>
              <span className="font-mono text-[9px] text-besege-muted tracking-tight">
                STUDIO · MADRID
              </span>
            </div>
          </button>

          {/* Desktop Curatorial Rooms Links */}
          <div className="hidden lg:flex items-center gap-1 bg-besege-canvas-subtle/80 px-2 py-1 rounded-full border border-besege-black/5">
            {MUSEUM_ROOMS.map((room) => {
              const isActive = activeRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => handleNavClick(room.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-besege-charcoal/70 hover:text-besege-violet'
                  }`}
                  data-cursor={`SALA ${room.number}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeRoomPill"
                      className="absolute inset-0 bg-besege-violet rounded-full shadow-sm"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-[10px] opacity-70">{room.number}</span>
                    <span>{room.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Actions (Sound & Inquire) */}
          <div className="flex items-center gap-2">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              className="w-8 h-8 rounded-full border border-besege-black/10 flex items-center justify-center text-besege-charcoal hover:text-besege-violet hover:border-besege-violet/40 transition-colors focus:outline-none"
              title={isMuted ? "Activar sonido ambiental de museo" : "Silenciar sonido ambiental"}
              data-cursor={isMuted ? "SONIDO ON" : "MUTE"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-besege-violet animate-pulse" />}
            </button>

            {/* Direct Instagram / Archive Link */}
            <a
              href={`https://instagram.com/${MUSEUM_METADATA.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-besege-black text-white hover:bg-besege-violet text-xs font-mono tracking-wider transition-all duration-300"
              data-cursor="INSTAGRAM"
            >
              <span>@{MUSEUM_METADATA.instagram}</span>
              <ArrowUpRight size={12} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                museumAudio.playTactileClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden w-8 h-8 rounded-full bg-besege-canvas-dark flex items-center justify-center text-besege-black focus:outline-none"
              aria-label="Abrir menú de salas"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-besege-canvas/95 flex flex-col justify-center px-8 lg:hidden"
          >
            <div className="max-w-md mx-auto w-full space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-besege-black/10">
                <span className="font-mono text-xs uppercase text-besege-muted tracking-widest">
                  Directorio de Salas
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-besege-violet">
                  <Sparkles size={12} /> Museo BESEGÉ
                </span>
              </div>

              <div className="space-y-3">
                {MUSEUM_ROOMS.map((room, idx) => (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => handleNavClick(room.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-besege-black/5 hover:border-besege-violet/40 text-left transition-all"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-besege-violet tracking-widest">
                        SALA {room.number}
                      </div>
                      <div className="font-display font-bold text-xl text-besege-black">
                        {room.name}
                      </div>
                      <div className="text-xs text-besege-muted">
                        {room.subtitle}
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-besege-muted" />
                  </motion.button>
                ))}
              </div>

              <div className="pt-6 border-t border-besege-black/10 flex items-center justify-between text-xs font-mono text-besege-muted">
                <span>Bárbara Sánchez-Guerrero</span>
                <a
                  href={`https://instagram.com/${MUSEUM_METADATA.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-besege-violet font-semibold flex items-center gap-1"
                >
                  @{MUSEUM_METADATA.instagram} <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
