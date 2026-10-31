import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, Gem, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { museumAudio } from '../utils/audio';

const LAYERS_DATA = [
  {
    id: 1,
    tag: 'Capa I · Piel',
    title: 'El Lienzo Anatómico',
    subtitle: 'Soporte Humano · Sin Corsé',
    concept: 'La clavícula y el torso no son siluetas a encorsetar, sino el territorio sagrado donde se posa la pieza.',
    image: '/assets/art-botanical-painting.png',
    accentColor: 'border-besege-gold/40 text-besege-gold',
    bgBadge: 'bg-besege-gold/15 text-besege-gold',
    meta: 'TFG UDIT Moda · Anatomía',
  },
  {
    id: 2,
    tag: 'Capa II · Tejido',
    title: 'Plisados en Tensión Libre',
    subtitle: 'Seda satén cruda & muselina diagonal',
    concept: 'Las telas no aprisionan ni ciñen el cuerpo; cuelgan suspendidas por la propia gravedad, creando volúmenes etéreos.',
    image: '/assets/art-look-gold-bandeau.png',
    accentColor: 'border-besege-violet/40 text-besege-violet',
    bgBadge: 'bg-besege-violet/15 text-besege-violet',
    meta: 'Confección Artesanal Atelier',
  },
  {
    id: 3,
    tag: 'Capa III · Orfebrería',
    title: 'Cadenas & Encaje de Oro',
    subtitle: 'Fornitura de latón & perlas de agua dulce',
    concept: 'La disolución de la frontera entre el sastre y el orfebre. Cadenas y fornituras metálicas que decoran la piel desnuda.',
    image: '/assets/art-gold-black-embroidery.png',
    accentColor: 'border-besege-black/30 text-besege-black',
    bgBadge: 'bg-besege-black/10 text-besege-black',
    meta: 'Joyería sobre Piel',
  },
  {
    id: 4,
    tag: 'Convergencia · Obra Viva',
    title: 'La Escultura Viva Completa',
    subtitle: 'Piel, Seda & Joya en Unión Sagrada',
    concept: 'La prenda deja de ser un objeto para cubrirse y se convierte en adorno ritual. El cuerpo convertido en lienzo.',
    image: '/assets/art-look-tfg-collection.png',
    accentColor: 'border-besege-violet text-besege-violet',
    bgBadge: 'bg-besege-violet text-white',
    meta: 'Obra Central Tesis UDIT',
  },
];

export const AnatomyExplosion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileActiveLayer, setMobileActiveLayer] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 160,
    mass: 0.8,
  });

  // Desktop Scroll Transforms
  // Layer 1 (Skin Canvas): glides to LEFT
  const layer1X = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, -280, -320, 0]);
  const layer1RotateY = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, 16, 16, 0]);
  const layer1Scale = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [1, 0.95, 0.95, 1]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.12, 0.85, 0.98], [0.6, 1, 1, 0.4]);

  // Layer 2 (Pleated Silk Drape): stays CENTER
  const layer2Y = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, -30, -30, 0]);
  const layer2Scale = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [1, 1.05, 1.05, 1]);
  const layer2RotateX = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, -8, -8, 0]);

  // Layer 3 (Body Jewelry & Gold Chains): glides to RIGHT
  const layer3X = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, 280, 320, 0]);
  const layer3RotateY = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [0, -16, -16, 0]);
  const layer3Scale = useTransform(smoothProgress, [0.08, 0.45, 0.82, 0.96], [1, 0.95, 0.95, 1]);
  const layer3Opacity = useTransform(smoothProgress, [0, 0.12, 0.85, 0.98], [0.6, 1, 1, 0.4]);

  // Final Unified Living Sculpture overlay
  const unifiedOpacity = useTransform(smoothProgress, [0.86, 0.98], [0, 1]);
  const unifiedScale = useTransform(smoothProgress, [0.86, 0.98], [0.92, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMobileTab = (idx: number) => {
    museumAudio.playTactileClick();
    setMobileActiveLayer(idx);
  };

  const handleMobileNext = () => {
    museumAudio.playTactileClick();
    setMobileActiveLayer((prev) => (prev + 1) % LAYERS_DATA.length);
  };

  const handleMobilePrev = () => {
    museumAudio.playTactileClick();
    setMobileActiveLayer((prev) => (prev - 1 + LAYERS_DATA.length) % LAYERS_DATA.length);
  };

  const currentLayer = LAYERS_DATA[mobileActiveLayer];

  return (
    <>
      {/* =========================================================================
          MOBILE VIEW (< md: 768px): Intuitive Interactive Layer Touch Studio
          ========================================================================= */}
      <section className="block md:hidden py-16 px-4 bg-besege-canvas-subtle/70 border-t border-b border-besege-black/5">
        <div className="max-w-md mx-auto space-y-6">
          {/* Mobile Header */}
          <div className="space-y-1.5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-besege-violet/10 text-besege-violet font-mono text-[10px] uppercase tracking-widest font-semibold">
              <Layers size={12} />
              <span>Sala 01 · Estudio Anatómico</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-besege-black">
              Deconstrucción de la Prenda
            </h3>
            <p className="font-serif italic text-xs text-besege-muted">
              Toca o desliza para explorar las 4 capas de la orfebrería sobre la piel
            </p>
          </div>

          {/* Touch Tabs Segmented Control */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/80 border border-besege-black/10 shadow-sm">
            {LAYERS_DATA.map((layer, idx) => {
              const isActive = mobileActiveLayer === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => handleMobileTab(idx)}
                  className={`relative py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    isActive ? 'text-white font-bold' : 'text-besege-muted hover:text-besege-black'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveLayerPill"
                      className="absolute inset-0 bg-besege-violet rounded-xl shadow-sm"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10 block text-center">
                    0{layer.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Display Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="rounded-3xl bg-white border border-besege-black/10 shadow-xl overflow-hidden p-4 space-y-4"
              >
                {/* Layer Metadata Pill */}
                <div className="flex items-center justify-between pb-2 border-b border-besege-black/5">
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${currentLayer.accentColor}`}>
                    {currentLayer.tag}
                  </span>
                  <span className="font-mono text-[10px] text-besege-muted">
                    {currentLayer.meta}
                  </span>
                </div>

                {/* Layer Visual Plate */}
                <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-besege-canvas-dark border border-besege-black/5">
                  <img
                    src={currentLayer.image}
                    alt={currentLayer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-besege-black/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="font-serif italic text-lg leading-tight font-light">
                      {currentLayer.title}
                    </span>
                    <span className="font-mono text-[9px] text-white/80 mt-0.5">
                      {currentLayer.subtitle}
                    </span>
                  </div>
                </div>

                {/* Layer Philosophy */}
                <div className="p-3.5 rounded-2xl bg-besege-canvas/80 border border-besege-black/5 space-y-1">
                  <p className="font-sans text-xs text-besege-charcoal leading-relaxed">
                    {currentLayer.concept}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Previous / Next Arrow Floaters */}
            <div className="flex items-center justify-between pt-3 text-xs font-mono text-besege-muted">
              <button
                onClick={handleMobilePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-besege-black/10 shadow-sm active:scale-95"
              >
                <ChevronLeft size={14} className="text-besege-violet" />
                <span>Anterior</span>
              </button>

              <span className="text-[10px]">
                {mobileActiveLayer + 1} de {LAYERS_DATA.length}
              </span>

              <button
                onClick={handleMobileNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-besege-black/10 shadow-sm active:scale-95"
              >
                <span>Siguiente</span>
                <ChevronRight size={14} className="text-besege-violet" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESKTOP VIEW (>= md: 768px): Full 320vh 3D Spatial Scroll Scrubbing
          ========================================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="hidden md:block relative w-full h-[320vh] bg-besege-canvas-subtle/50 border-t border-b border-besege-black/5"
      >
        {/* Pinned Sticky Stage - Locked to the Center of the Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-8 md:p-12 [perspective:1400px]">
          {/* Curatorial Header */}
          <div className="flex items-center justify-between gap-4 z-20 max-w-7xl mx-auto w-full">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
                <span>Sala 01 · Estudio Anatómico</span>
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-besege-black">
                Deconstrucción Espacial de la Prenda
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-besege-muted bg-white/85 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
              <Layers size={14} className="text-besege-violet" />
              <span>Haz scroll para separar las 3 capas en el espacio</span>
            </div>
          </div>

          {/* Central 3D Exploded Stage - Perfectly Centered */}
          <div className="relative flex-1 w-full flex items-center justify-center [transform-style:preserve-3d]">
            <motion.div
              style={{
                rotateY: mousePos.x * 16,
                rotateX: -mousePos.y * 12,
              }}
              className="relative flex items-center justify-center w-full max-w-5xl h-[58vh] [transform-style:preserve-3d] transition-transform duration-200 ease-out"
            >
              {/* LAYER 1: El Lienzo Humano (La Piel & Clavícula) - Moves Left */}
              <motion.div
                style={{
                  x: layer1X,
                  rotateY: layer1RotateY,
                  scale: layer1Scale,
                  opacity: layer1Opacity,
                }}
                className="absolute z-10 w-[320px] md:w-[360px] h-full rounded-3xl bg-white border border-besege-gold/40 shadow-2xl p-4 flex flex-col justify-between backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-besege-gold/20 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-besege-gold font-bold">
                    Capa I · Piel
                  </span>
                  <Compass size={14} className="text-besege-gold" />
                </div>

                <div className="relative flex-1 my-2 rounded-2xl overflow-hidden bg-amber-50/60 border border-besege-gold/20 flex flex-col justify-between p-4">
                  <div className="w-10 h-10 rounded-full bg-besege-gold/15 text-besege-gold flex items-center justify-center font-serif text-lg font-bold">
                    01
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif italic text-xl text-besege-black">
                      El Lienzo Anatómico
                    </h4>
                    <p className="font-sans text-xs text-besege-charcoal/80 leading-relaxed">
                      La clavícula y el torso no son siluetas a encorsetar, sino el territorio sagrado donde se posa la pieza.
                    </p>
                  </div>
                  <div className="font-mono text-[9px] text-besege-gold uppercase tracking-wider">
                    Soporte Humano · Sin Corsé
                  </div>
                </div>

                <div className="font-mono text-[9px] text-besege-muted text-right">
                  TFG UDIT Moda
                </div>
              </motion.div>

              {/* LAYER 2: El Tejido Ingrávido (Seda & Plisados) - Stays Center */}
              <motion.div
                style={{
                  y: layer2Y,
                  scale: layer2Scale,
                  rotateX: layer2RotateX,
                }}
                className="absolute z-20 w-[340px] md:w-[380px] h-full rounded-3xl bg-white border border-besege-violet/40 shadow-2xl p-4 flex flex-col justify-between backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-besege-violet/20 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-besege-violet font-bold">
                    Capa II · Tejido
                  </span>
                  <Layers size={14} className="text-besege-violet" />
                </div>

                <div className="relative flex-1 my-2 rounded-2xl overflow-hidden bg-besege-canvas border border-besege-black/5">
                  <img
                    src="/assets/art-look-gold-bandeau.png"
                    alt="Tejido plisado y seda"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-besege-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="font-serif italic text-lg sm:text-xl font-light">
                      Plisados en Tensión Libre
                    </span>
                    <span className="font-mono text-[10px] text-white/80">
                      Seda satén cruda & muselina diagonal
                    </span>
                  </div>
                </div>

                <div className="font-mono text-[9px] text-besege-muted text-right">
                  Confección Artesanal
                </div>
              </motion.div>

              {/* LAYER 3: La Orfebrería Corporal (Cadenas & Encaje) - Moves Right */}
              <motion.div
                style={{
                  x: layer3X,
                  rotateY: layer3RotateY,
                  scale: layer3Scale,
                  opacity: layer3Opacity,
                }}
                className="absolute z-15 w-[320px] md:w-[360px] h-full rounded-3xl bg-white border border-besege-black/20 shadow-2xl p-4 flex flex-col justify-between backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-besege-black/10 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-besege-black font-bold">
                    Capa III · Orfebrería
                  </span>
                  <Gem size={14} className="text-besege-violet" />
                </div>

                <div className="relative flex-1 my-2 rounded-2xl overflow-hidden bg-besege-canvas border border-besege-black/5">
                  <img
                    src="/assets/art-gold-black-embroidery.png"
                    alt="Orfebrería corporal y encaje de oro"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-besege-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="font-serif italic text-lg font-light">
                      Cadenas & Encaje de Oro
                    </span>
                    <span className="font-mono text-[10px] text-besege-gold-light">
                      Fornitura de latón & perlas de agua dulce
                    </span>
                  </div>
                </div>

                <div className="font-mono text-[9px] text-besege-muted text-right">
                  Joyería sobre Piel
                </div>
              </motion.div>

              {/* CONVERGENCE OVERLAY: The Complete Living Sculpture */}
              <motion.div
                style={{
                  opacity: unifiedOpacity,
                  scale: unifiedScale,
                }}
                className="absolute z-30 w-[380px] md:w-[420px] h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-besege-violet bg-white p-3 pointer-events-none"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="/assets/art-look-tfg-collection.png"
                    alt="Convergencia: Escultura Viva Completa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-besege-black/90 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-besege-violet text-white font-mono text-[10px] uppercase tracking-widest font-semibold w-fit mb-2">
                      <Sparkles size={11} />
                      <span>Convergencia Total</span>
                    </span>
                    <h4 className="font-serif italic text-2xl">
                      La Obra Viva: Piel, Seda & Joya
                    </h4>
                    <p className="font-mono text-[11px] text-white/80">
                      La prenda deja de ser objeto y se convierte en adorno sagrado.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Stage Progress Indicator */}
          <div className="relative z-20 max-w-7xl mx-auto w-full pt-3 border-t border-besege-black/10 flex items-center justify-between gap-3 text-xs font-mono text-besege-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-besege-black">
                <span className="w-2 h-2 rounded-full bg-besege-violet" />
                <span>Estudio en 3 Fases:</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white border border-besege-black/10 text-[10px]">
                  01. Piel
                </span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-besege-black/10 text-[10px]">
                  02. Seda
                </span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-besege-black/10 text-[10px]">
                  03. Orfebrería
                </span>
              </div>
            </div>

            <div>
              <span>UDIT Moda · Colección de Grado</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
