import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, Eye } from 'lucide-react';
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

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.8,
  });

  // Dimensional Camera Transforms
  // Logo scales up massively from 1 to 16, opening a portal
  const logoScale = useTransform(smoothProgress, [0, 0.4, 0.75], [1, 2.8, 16]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.5, 0.75], [1, 0.9, 0]);
  const logoBlur = useTransform(smoothProgress, [0, 0.45, 0.7], ['blur(0px)', 'blur(2px)', 'blur(16px)']);

  // Hero text fades out early as we dive in
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.25], [0, -60]);

  // Floating Peripheral 3D Planes (Fly past the camera during the warp)
  // Plane 1: Seashell boots (Top Left)
  const plane1Scale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.4, 1.2, 2.5]);
  const plane1X = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-120, -280, -700]);
  const plane1Y = useTransform(smoothProgress, [0.15, 0.5, 0.85], [80, -40, -300]);
  const plane1Opacity = useTransform(smoothProgress, [0.15, 0.35, 0.75, 0.9], [0, 1, 0.9, 0]);
  const plane1Rotate = useTransform(smoothProgress, [0.15, 0.85], [-8, -25]);

  // Plane 2: Neon lace wedge (Bottom Right)
  const plane2Scale = useTransform(smoothProgress, [0.2, 0.55, 0.9], [0.3, 1.1, 2.4]);
  const plane2X = useTransform(smoothProgress, [0.2, 0.55, 0.9], [120, 300, 750]);
  const plane2Y = useTransform(smoothProgress, [0.2, 0.55, 0.9], [100, 60, 250]);
  const plane2Opacity = useTransform(smoothProgress, [0.2, 0.4, 0.8, 0.95], [0, 1, 0.9, 0]);
  const plane2Rotate = useTransform(smoothProgress, [0.2, 0.9], [6, 22]);

  // Plane 3: Tulip sink (Top Right)
  const plane3Scale = useTransform(smoothProgress, [0.3, 0.65, 0.95], [0.3, 1.0, 2.2]);
  const plane3X = useTransform(smoothProgress, [0.3, 0.65, 0.95], [80, 240, 600]);
  const plane3Y = useTransform(smoothProgress, [0.3, 0.65, 0.95], [-80, -200, -500]);
  const plane3Opacity = useTransform(smoothProgress, [0.3, 0.5, 0.85, 0.98], [0, 1, 0.8, 0]);

  // Plane 4: Tulle sculptures (Bottom Left)
  const plane4Scale = useTransform(smoothProgress, [0.25, 0.6, 0.92], [0.4, 1.15, 2.3]);
  const plane4X = useTransform(smoothProgress, [0.25, 0.6, 0.92], [-80, -220, -550]);
  const plane4Y = useTransform(smoothProgress, [0.25, 0.6, 0.92], [140, 260, 520]);
  const plane4Opacity = useTransform(smoothProgress, [0.25, 0.45, 0.82, 0.95], [0, 1, 0.8, 0]);

  // Tunnel Emergence (Manifesto Teaser that emerges from the vortex)
  const gateScale = useTransform(smoothProgress, [0.65, 0.95, 1], [0.6, 1, 1]);
  const gateOpacity = useTransform(smoothProgress, [0.65, 0.85, 1], [0, 1, 1]);
  const gateY = useTransform(smoothProgress, [0.65, 1], [100, 0]);

  return (
    <section
      ref={containerRef}
      id="atrio"
      className="relative w-full h-[240vh] bg-besege-canvas"
    >
      {/* Pinned Viewport Frame with 3D Perspective */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-10 [perspective:1200px]">
        {/* Subtle Ambient Background Vignette & Violet Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-besege-violet/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-besege-black/5 shadow-sm text-xs font-mono text-besege-charcoal tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-besege-violet animate-ping" />
          <span>Sala 00 · Atrio de Entrada</span>
          <span className="text-besege-muted">|</span>
          <span className="text-besege-violet font-semibold">Tesis UDIT 2024</span>
        </motion.div>

        {/* Central 3D Dimensional Warp Camera */}
        <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center [transform-style:preserve-3d]">
          {/* Hero Subtitle & Brand Taglines (Fades on Scroll) */}
          <motion.div
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="text-center space-y-3 mb-6"
          >
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight text-besege-black">
              BESEGÉ <span className="font-serif font-normal italic text-besege-violet text-3xl sm:text-5xl md:text-7xl">studio</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-besege-muted uppercase tracking-[0.25em]">
              Bárbara Sánchez-Guerrero García · Alta Costura & Joyería Corporal
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-besege-rose/25 text-besege-black font-serif italic text-base sm:text-lg">
              <Sparkles size={14} className="text-besege-violet" />
              <span>&ldquo;{MUSEUM_METADATA.tagline}&rdquo;</span>
            </div>
          </motion.div>

          {/* Monumental Modular Logo Monolith (Zooms into camera like a portal) */}
          <motion.div
            style={{
              scale: logoScale,
              opacity: logoOpacity,
              filter: logoBlur,
            }}
            className="relative will-change-transform [transform-style:preserve-3d] cursor-pointer"
            data-cursor="PORTAL"
            onClick={() => {
              museumAudio.playChime(660, 1.2);
              onEnter();
            }}
          >
            <div className="p-3 sm:p-5 rounded-3xl bg-white/70 border border-besege-black/10 shadow-2xl backdrop-blur-md">
              <img
                src="/assets/logo.jpg"
                alt="BESEGÉ Monolith"
                className="w-32 sm:w-44 md:w-56 h-auto rounded-2xl object-contain mix-blend-multiply"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-besege-violet text-white text-[9px] font-mono tracking-widest uppercase shadow-md">
              B · S · G
            </div>
          </motion.div>

          {/* 3D Flying Gallery Fragment 1: Seashell Boots */}
          <motion.div
            style={{
              x: plane1X,
              y: plane1Y,
              scale: plane1Scale,
              opacity: plane1Opacity,
              rotateZ: plane1Rotate,
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/60 w-44 sm:w-60 aspect-[4/5] bg-white p-2"
          >
            <img
              src="/assets/seashell-boots.png"
              alt="Botas de Sirena"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-besege-black/80 text-white font-mono text-[9px] uppercase tracking-wider">
              Artefacto Sirena
            </div>
          </motion.div>

          {/* 3D Flying Gallery Fragment 2: Neon Lace Wedge */}
          <motion.div
            style={{
              x: plane2X,
              y: plane2Y,
              scale: plane2Scale,
              opacity: plane2Opacity,
              rotateZ: plane2Rotate,
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/60 w-44 sm:w-64 aspect-[4/5] bg-white p-2"
          >
            <img
              src="/assets/dump-heels-lace.png"
              alt="Cuña y encaje neón"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-besege-rose-neon text-white font-mono text-[9px] uppercase tracking-wider">
              Tensión & Asfalto
            </div>
          </motion.div>

          {/* 3D Flying Gallery Fragment 3: Tulip Sink */}
          <motion.div
            style={{
              x: plane3X,
              y: plane3Y,
              scale: plane3Scale,
              opacity: plane3Opacity,
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/60 w-40 sm:w-56 aspect-square bg-white p-2"
          >
            <img
              src="/assets/art-tulip-sink.png"
              alt="Tulipanes en el fregadero"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-besege-violet text-white font-mono text-[9px] uppercase tracking-wider">
              Materia Efímera
            </div>
          </motion.div>

          {/* 3D Flying Gallery Fragment 4: Tulle Sculptures */}
          <motion.div
            style={{
              x: plane4X,
              y: plane4Y,
              scale: plane4Scale,
              opacity: plane4Opacity,
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/60 w-40 sm:w-52 aspect-[4/5] bg-white p-2"
          >
            <img
              src="/assets/art-tulle-sculptures.png"
              alt="Tótems de tul UDIT"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-besege-black text-white font-mono text-[9px] uppercase tracking-wider">
              UDIT Workshop
            </div>
          </motion.div>

          {/* Portal Gate Destination (Resolves as user scrolls deep) */}
          <motion.div
            style={{
              scale: gateScale,
              opacity: gateOpacity,
              y: gateY,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
          >
            <div className="p-8 sm:p-12 rounded-3xl bg-besege-canvas/95 border border-besege-violet/30 shadow-2xl backdrop-blur-xl text-center max-w-xl mx-auto space-y-4 pointer-events-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-besege-violet/10 text-besege-violet font-mono text-xs uppercase tracking-widest font-semibold">
                <Eye size={12} />
                <span>Portal Atravesado · Sala 01</span>
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

        {/* Bottom Scroll Cue with Kinetic Warp Indicator */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-30 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-besege-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-besege-violet animate-pulse" />
            <span>Haz scroll para entrar en la dimensión BESEGÉ</span>
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
