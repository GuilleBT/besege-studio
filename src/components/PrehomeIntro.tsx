import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Volume2, ArrowRight } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface PrehomeIntroProps {
  onEnter: () => void;
}

export const PrehomeIntro: React.FC<PrehomeIntroProps> = ({ onEnter }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Handle press and hold mechanic (or instant click)
  useEffect(() => {
    if (isHolding) {
      museumAudio.playTactileClick();
      intervalRef.current = window.setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            triggerEnter();
            return 100;
          }
          return prev + 3.5;
        });
      }, 25);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setHoldProgress(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding]);

  const triggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    museumAudio.playChime(528, 2.0);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  const handleQuickClick = () => {
    triggerEnter();
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(12px)',
            transition: { duration: 0.9, ease: [0.32, 0.72, 0, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-[#0E0D13] text-white overflow-hidden select-none"
        >
          {/* Ambient Ethereal Glow Orbs (Twilight Siren Aesthetic) */}
          <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-besege-violet/20 blur-[130px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-besege-rose/15 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-besege-gold/10 blur-[160px] pointer-events-none" />

          {/* Top Curatorial Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-widest text-white/70 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
              <span className="text-white font-semibold uppercase">Pabellón Digital Privado</span>
              <span className="text-white/40">|</span>
              <span className="text-besege-gold-light hidden sm:inline">Archivo de Alta Costura</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden md:inline text-white/60">MADRID · 40°25&apos;N</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono uppercase tracking-wider">
                UDIT 2024
              </span>
            </div>
          </div>

          {/* Central Poetic Monolith Stage */}
          <div className="relative z-10 max-w-4xl mx-auto my-auto text-center space-y-8 flex flex-col items-center">
            {/* The Brand Monogram & Crest */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="relative group cursor-pointer"
              onClick={handleQuickClick}
              data-cursor="BESEGÉ"
            >
              <div className="p-4 sm:p-5 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/assets/logo.jpg"
                  alt="BESEGÉ STUDIO Logo"
                  className="w-24 sm:w-32 h-auto rounded-2xl object-contain brightness-110"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-besege-violet text-white text-[9px] font-mono tracking-widest uppercase shadow-md font-semibold">
                B · S · G
              </div>
            </motion.div>

            {/* Monumental Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display font-extrabold text-4xl sm:text-7xl md:text-8xl tracking-tight text-white"
              >
                BESEGÉ <span className="font-serif italic font-normal text-besege-violet-light text-3xl sm:text-6xl md:text-7xl">studio</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-[0.25em]"
              >
                Bárbara Sánchez-Guerrero García · Alta Costura & Joyería Corporal
              </motion.p>
            </div>

            {/* The Grand Core Thesis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-besege-violet/20 border border-besege-violet/40 text-besege-violet-light font-serif italic text-base sm:text-xl">
                <Sparkles size={15} />
                <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
              </div>

              <blockquote className="font-serif italic font-light text-xl sm:text-3xl text-white/90 leading-snug">
                &ldquo;{MUSEUM_METADATA.manifestoCore}&rdquo;
              </blockquote>
            </motion.div>

            {/* Three Floating Miniature Preview Medallions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-4 sm:gap-6 pt-2"
            >
              <div className="group relative w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5 p-1 transition-transform hover:scale-110">
                <img
                  src="/assets/seashell-boots.png"
                  alt="Reliquia Sirena"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute inset-0 bg-besege-violet/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-mono uppercase tracking-wider text-white">
                  Sirena
                </span>
              </div>

              <div className="group relative w-20 sm:w-24 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-besege-violet shadow-2xl bg-white/10 p-1 transition-transform hover:scale-110">
                <img
                  src="/assets/art-look-tfg-collection.png"
                  alt="Obra Central TFG"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute inset-0 bg-besege-violet/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-mono uppercase tracking-wider text-white">
                  Orfebrería
                </span>
              </div>

              <div className="group relative w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5 p-1 transition-transform hover:scale-110">
                <img
                  src="/assets/dump-heels-lace.png"
                  alt="Tensión Urbana"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute inset-0 bg-besege-rose-neon/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-mono uppercase tracking-wider text-white">
                  Asfalto
                </span>
              </div>
            </motion.div>

            {/* The "Hold to Enter" / Magnetic Click Initiation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 flex flex-col items-center gap-3"
            >
              <div
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                onClick={handleQuickClick}
                className="relative group cursor-pointer"
                data-cursor="CRUZAR"
              >
                {/* Outer Circular Progress Ring for Hold */}
                <div className="relative flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-besege-black font-mono text-xs sm:text-sm tracking-widest uppercase font-bold shadow-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 active:scale-95">
                  {/* Progress Fill Background */}
                  <motion.div
                    className="absolute inset-0 bg-besege-violet"
                    style={{
                      width: `${holdProgress}%`,
                    }}
                    transition={{ ease: 'linear' }}
                  />

                  {/* Button Text */}
                  <span className={`relative z-10 flex items-center gap-3 transition-colors ${holdProgress > 40 ? 'text-white' : 'text-besege-black'}`}>
                    <span>{holdProgress > 0 ? `Abriendo Pabellón... ${Math.round(holdProgress)}%` : 'Entrar al Pabellón BESEGÉ'}</span>
                    <ArrowRight size={16} className="text-besege-violet group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 tracking-wider">
                <Volume2 size={13} className="text-besege-violet-light" />
                <span>Experiencia sonora & sensorial recomendada · Pulsa para iniciar</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Coordinates & Curatorial Footer */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Compass size={13} className="text-besege-violet-light" />
              <span>DISEÑO & MODA · BÁRBARA SÁNCHEZ-GUERRERO</span>
            </div>

            <div className="flex items-center gap-4">
              <span>06 Obras de Grado</span>
              <span>·</span>
              <span>08 Dumps de Materia</span>
              <span>·</span>
              <span className="text-white font-semibold">EDICIÓN 2024</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
