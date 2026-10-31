import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Layers, Shield, Gem, Compass } from 'lucide-react';
import { museumAudio } from '../utils/audio';

export const AnatomyExplosion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 180,
    mass: 0.8,
  });

  // Layer 3D Spatial Offsets driven by scroll scrubbing
  // Layer 1: Skin Canvas (Behind)
  const layer1Z = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, -180, 0]);
  const layer1X = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, -220, 0]);
  const layer1RotateY = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, -18, 0]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.8]);

  // Layer 2: Suspended Silk Drape (Middle)
  const layer2Z = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, 60, 0]);
  const layer2Y = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, -80, 0]);
  const layer2RotateX = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, 12, 0]);

  // Layer 3: Body Jewelry & Golden Chains (Forefront)
  const layer3Z = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, 240, 0]);
  const layer3X = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, 220, 0]);
  const layer3RotateY = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0, 20, 0]);

  // Dynamic Layer Stage Text
  const stageOpacity1 = useTransform(smoothProgress, [0.05, 0.25, 0.4], [0, 1, 0]);
  const stageOpacity2 = useTransform(smoothProgress, [0.35, 0.55, 0.7], [0, 1, 0]);
  const stageOpacity3 = useTransform(smoothProgress, [0.65, 0.85, 0.98], [0, 1, 0]);
  const stageOpacity4 = useTransform(smoothProgress, [0.85, 0.95, 1], [0, 1, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[280vh] bg-besege-canvas-subtle/40 border-t border-b border-besege-black/5"
    >
      {/* Pinned 3D Laboratory Showcase */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-12 [perspective:1400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
              <span>Deconstrucción 3D · Sala 01</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-besege-black">
              Anatomía en Capas: El Cuerpo como Soporte
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-besege-muted bg-white/80 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
            <Layers size={14} className="text-besege-violet" />
            <span>Haz scroll para separar las capas en el espacio</span>
          </div>
        </div>

        {/* Central 3D Exploded Stage */}
        <div className="relative flex-1 flex items-center justify-center [transform-style:preserve-3d]">
          {/* Dynamic 3D Rig controlled by scroll and mouse tilt */}
          <motion.div
            style={{
              rotateY: mousePos.x * 25,
              rotateX: -mousePos.y * 20,
            }}
            className="relative w-72 sm:w-96 md:w-[28rem] aspect-[4/5] [transform-style:preserve-3d] transition-transform duration-200 ease-out"
          >
            {/* Layer 1: The Human Canvas / Skin Backdrop */}
            <motion.div
              style={{
                translateZ: layer1Z,
                translateX: layer1X,
                rotateY: layer1RotateY,
                opacity: layer1Opacity,
              }}
              className="absolute inset-0 rounded-3xl bg-amber-50/90 border border-besege-gold/40 shadow-2xl p-5 flex flex-col justify-between backdrop-blur-sm [backface-visibility:hidden]"
            >
              <div className="flex items-center justify-between border-b border-besege-gold/30 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-besege-gold font-bold">
                  Capa I · El Lienzo Anatómico
                </span>
                <Compass size={14} className="text-besege-gold" />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-besege-gold/10 flex items-center justify-center text-besege-gold font-serif text-2xl italic">
                  I
                </div>
                <h4 className="font-serif italic text-2xl text-besege-black">
                  La Piel Desnuda
                </h4>
                <p className="font-sans text-xs text-besege-charcoal/80 leading-relaxed">
                  El torso, la clavícula y las curvas de la cadera no son limitaciones a corregir, sino el pedestal sobre el que descansa la creación.
                </p>
              </div>

              <div className="font-mono text-[9px] text-besege-muted text-right">
                Base Estructural · Grado en Diseño UDIT
              </div>
            </motion.div>

            {/* Layer 2: Suspended Silk & Pleats */}
            <motion.div
              style={{
                translateZ: layer2Z,
                translateY: layer2Y,
                rotateX: layer2RotateX,
              }}
              className="absolute inset-0 rounded-3xl bg-white/90 border border-besege-violet/30 shadow-2xl p-5 flex flex-col justify-between backdrop-blur-md [backface-visibility:hidden]"
            >
              <div className="flex items-center justify-between border-b border-besege-violet/20 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-besege-violet font-bold">
                  Capa II · El Tejido Ingrávido
                </span>
                <Layers size={14} className="text-besege-violet" />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-besege-violet/10 flex items-center justify-center text-besege-violet font-serif text-2xl italic">
                  II
                </div>
                <h4 className="font-serif italic text-2xl text-besege-black">
                  Plisados en Tensión Libre
                </h4>
                <p className="font-sans text-xs text-besege-charcoal/80 leading-relaxed">
                  Muselinas y satenes cortados al bies. Las telas caen por pura gravedad y movimiento natural, sin corsetería rígida ni patrones opresivos.
                </p>
              </div>

              <div className="font-mono text-[9px] text-besege-muted text-right">
                Seda Satén Cruda & Muselina
              </div>
            </motion.div>

            {/* Layer 3: Body Jewelry & Golden Chains */}
            <motion.div
              style={{
                translateZ: layer3Z,
                translateX: layer3X,
                rotateY: layer3RotateY,
              }}
              className="absolute inset-0 rounded-3xl bg-besege-charcoal/95 text-white border border-besege-gold shadow-2xl p-5 flex flex-col justify-between backdrop-blur-md [backface-visibility:hidden]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-besege-gold font-bold">
                  Capa III · Orfebrería Corporal
                </span>
                <Gem size={14} className="text-besege-gold" />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-besege-gold/20 flex items-center justify-center text-besege-gold font-serif text-2xl italic">
                  III
                </div>
                <h4 className="font-serif italic text-2xl text-besege-gold-light">
                  Cadenas & Perlas Barrocas
                </h4>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  La joyería deja de ser accesorio secundario y se convierte en el esqueleto estructural que suspende y une las prendas a través de la piel.
                </p>
              </div>

              <div className="font-mono text-[9px] text-besege-gold/70 text-right">
                Latón Bañado & Perlas de Agua Dulce
              </div>
            </motion.div>

            {/* Central Living Artifact Image (Shown on complete scrub convergence) */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.75, 0.95], [0, 1]),
                scale: useTransform(smoothProgress, [0.75, 0.95], [0.85, 1]),
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-besege-violet z-40 bg-black"
            >
              <img
                src="/assets/art-look-tfg-collection.png"
                alt="BESEGÉ TFG Escultura Viva"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="font-mono text-[10px] text-besege-violet-light uppercase tracking-widest">
                  Convergencia Total · Obra Viva
                </span>
                <span className="font-serif italic text-xl">
                  Aura Drapeada & Cadenas Áureas
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Stage Callouts at the bottom */}
        <div className="relative h-14 flex items-center justify-center text-center font-mono text-xs z-20">
          <motion.div
            style={{ opacity: stageOpacity1 }}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-besege-black/10 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-besege-gold" />
            <span>Fase 01: El cuerpo humano desnudo como lienzo soberano</span>
          </motion.div>

          <motion.div
            style={{ opacity: stageOpacity2 }}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-besege-black/10 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-besege-violet" />
            <span>Fase 02: Los drapeados de seda suspendidos sin forzar silueta</span>
          </motion.div>

          <motion.div
            style={{ opacity: stageOpacity3 }}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full bg-besege-black text-white shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-besege-gold animate-ping" />
            <span>Fase 03: Las cadenas de orfebrería como articulaciones de luz</span>
          </motion.div>

          <motion.div
            style={{ opacity: stageOpacity4 }}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full bg-besege-violet text-white shadow-md"
          >
            <Sparkles size={13} />
            <span>Fase 04: La escultura viva completa en armonía orgánica</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
