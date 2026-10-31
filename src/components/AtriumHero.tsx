import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface AtriumHeroProps {
  onEnter: () => void;
}

export const AtriumHero: React.FC<AtriumHeroProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleEnterClick = () => {
    museumAudio.playChime(528, 1.4);
    onEnter();
  };

  return (
    <section
      ref={containerRef}
      id="atrio"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 overflow-hidden bg-besege-canvas"
    >
      {/* Ambient ethereal color glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-besege-violet/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-besege-rose/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[40rem] h-64 rounded-full bg-besege-canvas-dark/60 blur-2xl pointer-events-none" />

      {/* Top Curatorial Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-besege-black/5 shadow-sm text-xs font-mono text-besege-charcoal tracking-widest uppercase"
      >
        <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
        <span>Sala 00 · Atrio de Entrada</span>
        <span className="text-besege-muted">|</span>
        <span className="text-besege-violet font-semibold">Archivo UDIT 2024</span>
      </motion.div>

      {/* Central Monumental Brand Installation */}
      <motion.div
        style={{ y: yPos, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-8"
      >
        {/* Interactive Logo Monogram Block */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="relative mb-8 group"
          data-cursor="BESEGÉ"
        >
          {/* Subtle Outer Bezel for the Logo */}
          <div className="p-3 rounded-3xl bg-white/60 border border-besege-black/5 shadow-museum backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02]">
            <img
              src="/assets/logo.jpg"
              alt="BESEGÉ STUDIO Logo"
              className="w-28 sm:w-36 md:w-44 h-auto rounded-2xl object-contain mix-blend-multiply"
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-besege-violet text-white text-[9px] font-mono tracking-widest uppercase shadow-sm">
            B · S · G
          </div>
        </motion.div>

        {/* Brand Title & Pronunciation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-3"
        >
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight text-besege-black">
            BESEGÉ <span className="font-serif font-normal italic text-besege-violet text-3xl sm:text-5xl md:text-7xl">studio</span>
          </h1>

          <p className="font-mono text-xs sm:text-sm text-besege-muted uppercase tracking-[0.25em]">
            Bárbara Sánchez-Guerrero García · Alta Costura & Joyería Corporal
          </p>
        </motion.div>

        {/* Poetic Tagline & Museum Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-besege-rose/20 text-besege-black font-serif italic text-base sm:text-lg">
            <Sparkles size={14} className="text-besege-violet" />
            <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
          </div>

          <p className="text-sm sm:text-base text-besege-charcoal/80 font-sans leading-relaxed text-balance">
            Un pabellón digital concebido no como comercio, sino como un santuario plástico donde la prenda abandona la función utilitaria para posarse sobre la anatomía humana como una escultura viva.
          </p>
        </motion.div>

        {/* Interactive CTA to Enter the Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-besege-black text-white text-xs font-mono tracking-widest uppercase hover:bg-besege-violet transition-all duration-300 shadow-md hover:shadow-museum-hover hover:-translate-y-0.5 active:translate-y-0"
            data-cursor="ENTRAR"
          >
            <span>Iniciar Recorrido de Museo</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowDown size={12} />
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Technical Coordinates & Footprint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-besege-black/10 text-xs font-mono text-besege-muted"
      >
        <div className="flex items-center gap-2">
          <Compass size={14} className="text-besege-violet" />
          <span>40°25&apos;N · MADRID, ES</span>
        </div>
        <div>
          <span className="text-besege-black font-semibold">TFG UDIT:</span> 2024
        </div>
        <div>
          <span className="text-besege-black font-semibold">COLECCIÓN:</span> 06 Obras
        </div>
        <div className="text-right">
          <span className="text-besege-violet font-semibold">LABORATORIO:</span> 08 Dumps
        </div>
      </motion.div>
    </section>
  );
};
