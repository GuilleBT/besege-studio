import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Eye, Layers } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface PortalEntranceProps {
  onEnter: () => void;
}

export const PortalEntrance: React.FC<PortalEntranceProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth Emil Kowalski spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 180,
    mass: 0.7,
  });

  // Hero header elements fade out in the first 20% of scroll
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.18], [0, -50]);

  // Logo Monolith: scales from 1 -> 2 -> 14 to open the dimensional gate
  const logoScale = useTransform(smoothProgress, [0, 0.22, 0.55, 0.75], [1, 1.8, 5, 14]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.35, 0.65], [1, 0.95, 0]);
  const logoBlur = useTransform(smoothProgress, [0.35, 0.65], ['blur(0px)', 'blur(10px)']);

  // Central Hero Piece (Emerges from INSIDE the logo like a vision!)
  const centerPieceScale = useTransform(smoothProgress, [0.18, 0.45, 0.75, 0.92], [0.3, 1, 1.15, 2.2]);
  const centerPieceOpacity = useTransform(smoothProgress, [0.18, 0.32, 0.75, 0.92], [0, 1, 1, 0]);
  const centerPieceZ = useTransform(smoothProgress, [0.18, 0.45], [-200, 0]);

  // Flanking Orbiting Captures (Clearly positioned inside viewport, staying visible during scroll)
  // Top-Left: Seashell boots
  const piece1X = useTransform(smoothProgress, [0.15, 0.42, 0.78, 0.95], [-40, -220, -320, -650]);
  const piece1Y = useTransform(smoothProgress, [0.15, 0.42, 0.78, 0.95], [20, -110, -140, -320]);
  const piece1Scale = useTransform(smoothProgress, [0.15, 0.42, 0.78, 0.95], [0.4, 1, 1.05, 1.8]);
  const piece1Opacity = useTransform(smoothProgress, [0.15, 0.3, 0.78, 0.92], [0, 1, 1, 0]);
  const piece1Rotate = useTransform(smoothProgress, [0.15, 0.8], [-4, -14]);

  // Top-Right: Neon lace wedge on pavement
  const piece2X = useTransform(smoothProgress, [0.18, 0.45, 0.8, 0.95], [40, 230, 330, 680]);
  const piece2Y = useTransform(smoothProgress, [0.18, 0.45, 0.8, 0.95], [20, -100, -130, -300]);
  const piece2Scale = useTransform(smoothProgress, [0.18, 0.45, 0.8, 0.95], [0.4, 1, 1.05, 1.8]);
  const piece2Opacity = useTransform(smoothProgress, [0.18, 0.32, 0.8, 0.92], [0, 1, 1, 0]);
  const piece2Rotate = useTransform(smoothProgress, [0.18, 0.8], [4, 14]);

  // Bottom-Left: Tulle sculptures UDIT workshop
  const piece3X = useTransform(smoothProgress, [0.22, 0.48, 0.82, 0.95], [-30, -210, -300, -600]);
  const piece3Y = useTransform(smoothProgress, [0.22, 0.48, 0.82, 0.95], [30, 120, 150, 360]);
  const piece3Scale = useTransform(smoothProgress, [0.22, 0.48, 0.82, 0.95], [0.4, 0.95, 1.0, 1.6]);
  const piece3Opacity = useTransform(smoothProgress, [0.22, 0.35, 0.82, 0.92], [0, 1, 1, 0]);
  const piece3Rotate = useTransform(smoothProgress, [0.22, 0.85], [3, 8]);

  // Bottom-Right: Tulip sink water droplets
  const piece4X = useTransform(smoothProgress, [0.25, 0.5, 0.84, 0.95], [30, 220, 310, 620]);
  const piece4Y = useTransform(smoothProgress, [0.25, 0.5, 0.84, 0.95], [30, 130, 160, 370]);
  const piece4Scale = useTransform(smoothProgress, [0.25, 0.5, 0.84, 0.95], [0.4, 0.95, 1.0, 1.6]);
  const piece4Opacity = useTransform(smoothProgress, [0.25, 0.38, 0.84, 0.92], [0, 1, 1, 0]);
  const piece4Rotate = useTransform(smoothProgress, [0.25, 0.85], [-3, -8]);

  // Final Portal Resolution Gate (Connecting to Sala 01)
  const gateOpacity = useTransform(smoothProgress, [0.78, 0.92, 1], [0, 1, 1]);
  const gateScale = useTransform(smoothProgress, [0.78, 0.95], [0.8, 1]);

  return (
    <section
      ref={containerRef}
      id="atrio"
      className="relative w-full h-[320vh] bg-besege-canvas"
    >
      {/* Pinned Sticky Stage - Locked to Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-10 [perspective:1400px]">
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-besege-violet/10 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Top Eyebrow Badge */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-besege-black/5 shadow-sm text-xs font-mono text-besege-charcoal tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
          <span>Sala 00 · Atrio de Entrada</span>
          <span className="text-besege-muted">|</span>
          <span className="text-besege-violet font-semibold">Tesis UDIT 2024</span>
        </motion.div>

        {/* Central 3D Stage */}
        <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto flex items-center justify-center [transform-style:preserve-3d]">
          {/* Hero Typography (Fades early on scroll) */}
          <motion.div
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="absolute top-2 sm:top-6 inset-x-0 text-center space-y-2 pointer-events-none z-30"
          >
            <h1 className="font-display font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-tight text-besege-black">
              BESEGÉ <span className="font-serif font-normal italic text-besege-violet text-3xl sm:text-5xl md:text-6xl">studio</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-xs text-besege-muted uppercase tracking-[0.25em]">
              Bárbara Sánchez-Guerrero García · Alta Costura & Joyería Corporal
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-besege-rose/25 text-besege-black font-serif italic text-sm sm:text-base">
              <Sparkles size={13} className="text-besege-violet" />
              <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
            </div>
          </motion.div>

          {/* Monumental Logo Gate (Opens up like a portal) */}
          <motion.div
            style={{
              scale: logoScale,
              opacity: logoOpacity,
              filter: logoBlur,
            }}
            className="relative z-20 will-change-transform [transform-style:preserve-3d] cursor-pointer"
            data-cursor="PORTAL"
            onClick={() => {
              museumAudio.playChime(660, 1.2);
              onEnter();
            }}
          >
            <div className="p-4 sm:p-6 rounded-3xl bg-white/80 border border-besege-black/10 shadow-2xl backdrop-blur-md">
              <img
                src="/assets/logo.jpg"
                alt="BESEGÉ Monolith"
                className="w-32 sm:w-44 md:w-52 h-auto rounded-2xl object-contain mix-blend-multiply"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-besege-violet text-white text-[9px] font-mono tracking-widest uppercase shadow-md font-semibold">
              B · S · G
            </div>
          </motion.div>

          {/* Central Emerging Haute Couture Vision (Born from the center of the logo!) */}
          <motion.div
            style={{
              scale: centerPieceScale,
              opacity: centerPieceOpacity,
              translateZ: centerPieceZ,
            }}
            className="absolute z-25 w-64 sm:w-80 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-besege-violet bg-white p-2.5 [transform-style:preserve-3d]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/assets/art-look-tfg-collection.png"
                alt="Obra Central TFG"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-besege-black/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-besege-violet-light font-bold">
                  Obra Central · Tesis UDIT
                </span>
                <span className="font-serif italic text-lg sm:text-xl font-light">
                  Aura Drapeada & Cadenas
                </span>
              </div>
            </div>
          </motion.div>

          {/* Flying Screenshot 1: Botas de Sirena (Top Left) */}
          <motion.div
            style={{
              x: piece1X,
              y: piece1Y,
              scale: piece1Scale,
              opacity: piece1Opacity,
              rotateZ: piece1Rotate,
            }}
            className="absolute z-20 w-44 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-besege-black/10 bg-white p-2"
          >
            <img
              src="/assets/seashell-boots.png"
              alt="Botas de Sirena con Conchas"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-lg bg-besege-black/80 backdrop-blur-sm text-white text-center font-mono text-[9px] uppercase tracking-wider">
              Botas de Sirena & Conchas
            </div>
          </motion.div>

          {/* Flying Screenshot 2: Cuña Piel & Encaje Neón (Top Right) */}
          <motion.div
            style={{
              x: piece2X,
              y: piece2Y,
              scale: piece2Scale,
              opacity: piece2Opacity,
              rotateZ: piece2Rotate,
            }}
            className="absolute z-20 w-44 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-besege-black/10 bg-white p-2"
          >
            <img
              src="/assets/dump-heels-lace.png"
              alt="Cuña de Cuero & Encaje Neón"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-lg bg-besege-rose-neon/90 backdrop-blur-sm text-white text-center font-mono text-[9px] uppercase tracking-wider font-semibold">
              Encaje Neón sobre Asfalto
            </div>
          </motion.div>

          {/* Flying Screenshot 3: Tótems de Tul UDIT (Bottom Left) */}
          <motion.div
            style={{
              x: piece3X,
              y: piece3Y,
              scale: piece3Scale,
              opacity: piece3Opacity,
              rotateZ: piece3Rotate,
            }}
            className="absolute z-20 w-40 sm:w-52 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-besege-black/10 bg-white p-2"
          >
            <img
              src="/assets/art-tulle-sculptures.png"
              alt="Tótems de Tul UDIT"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-lg bg-besege-black/80 backdrop-blur-sm text-white text-center font-mono text-[9px] uppercase tracking-wider">
              Tótems de Tul · Workshop
            </div>
          </motion.div>

          {/* Flying Screenshot 4: Tulipanes en Fregadero (Bottom Right) */}
          <motion.div
            style={{
              x: piece4X,
              y: piece4Y,
              scale: piece4Scale,
              opacity: piece4Opacity,
              rotateZ: piece4Rotate,
            }}
            className="absolute z-20 w-40 sm:w-52 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-besege-black/10 bg-white p-2"
          >
            <img
              src="/assets/art-tulip-sink.png"
              alt="Pétalos de Tulipán en Fregadero"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-lg bg-besege-violet/90 backdrop-blur-sm text-white text-center font-mono text-[9px] uppercase tracking-wider">
              Materia Efímera & Metal
            </div>
          </motion.div>

          {/* Portal Emergence Card (When arriving at Sala 01) */}
          <motion.div
            style={{
              opacity: gateOpacity,
              scale: gateScale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="p-8 sm:p-12 rounded-3xl bg-white/95 border border-besege-violet/30 shadow-2xl backdrop-blur-xl text-center max-w-lg mx-auto space-y-4 pointer-events-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-besege-violet/10 text-besege-violet font-mono text-xs uppercase tracking-widest font-semibold">
                <Eye size={12} />
                <span>Umbral Cruzado · Sala 01</span>
              </span>
              <h3 className="font-serif italic text-2xl sm:text-4xl text-besege-black leading-snug">
                &ldquo;El cuerpo no se viste. Se decora.&rdquo;
              </h3>
              <p className="font-mono text-xs text-besege-muted">
                Continúa deslizando para explorar el manifiesto y la anatomía en capas.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Kinetic Scroll Indicator */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-30 flex flex-col items-center gap-2.5"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-besege-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-besege-violet animate-pulse" />
            <span>Haz scroll para atravesar la dimensión BESEGÉ</span>
          </div>

          <div className="w-5 h-8 rounded-full border-2 border-besege-charcoal/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-besege-violet"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
