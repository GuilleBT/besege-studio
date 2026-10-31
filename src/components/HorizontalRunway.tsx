import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { Maximize2, Sparkles, Gem, Layers, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { ARTWORKS_COLLECTION, Artwork } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface HorizontalRunwayProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export const HorizontalRunway: React.FC<HorizontalRunwayProps> = ({ onSelectArtwork }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  // Desktop Scroll Scrubbing Logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 250,
  });

  // Skew cards based on scroll velocity (Speed warp effect on desktop)
  const velocitySkew = useTransform(smoothVelocity, [-1, 0, 1], [-8, 0, 8]);

  // Horizontal translation from 0% to -68% as user scrolls vertically on desktop
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['2%', '-68%']);

  // Background Parallax Typography
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['5%', '-30%']);

  const handleOpenArtwork = (artwork: Artwork) => {
    museumAudio.playChime(784, 1.2);
    onSelectArtwork(artwork);
  };

  // Track active slide in mobile carousel
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const cardWidth = mobileScrollRef.current.offsetWidth * 0.84;
    const newIdx = Math.round(scrollLeft / cardWidth);
    setMobileActiveIdx(Math.min(newIdx, ARTWORKS_COLLECTION.length));
  };

  return (
    <div id="esculturas" className="relative w-full">
      {/* =========================================================================
          MOBILE VIEW (< md: 768px): Silky Native Touch Carousel with Snap Points
          ========================================================================= */}
      <section className="block md:hidden py-16 bg-besege-canvas border-b border-besege-black/5 overflow-hidden">
        {/* Curatorial Header */}
        <div className="px-4 space-y-2 mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-besege-violet/10 text-besege-violet font-mono text-[10px] uppercase tracking-widest font-semibold">
            <Gem size={12} />
            <span>Sala 02 · Pasarela Dimensional</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-besege-black">
            Esculturas Textiles & Joyería
          </h2>
          <p className="font-serif italic text-xs text-besege-muted">
            06 Obras de Alta Costura · Toca para inspeccionar en macro
          </p>
        </div>

        {/* Native Touch Snap Horizontal Track */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-6 pt-2 no-scrollbar touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ARTWORKS_COLLECTION.map((artwork, idx) => (
            <article
              key={artwork.id}
              onClick={() => handleOpenArtwork(artwork)}
              className="group relative cursor-pointer snap-center shrink-0 w-[84vw] max-w-[320px] rounded-3xl bg-white border border-besege-black/10 p-4 shadow-museum active:scale-[0.98] transition-transform"
            >
              {/* Inventory Header */}
              <div className="flex items-center justify-between pb-2 text-[10px] font-mono text-besege-muted border-b border-besege-black/5">
                <span className="font-bold text-besege-violet tracking-widest">
                  {artwork.code}
                </span>
                <span className="uppercase tracking-wider bg-besege-canvas px-2 py-0.5 rounded-full">
                  {artwork.category}
                </span>
              </div>

              {/* Framed Image Showcase */}
              <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-besege-canvas-dark border border-besege-black/5">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />

                {artwork.featured && (
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-besege-black/85 backdrop-blur-sm text-white text-[9px] font-mono tracking-widest uppercase">
                    <Sparkles size={10} className="text-besege-gold" />
                    <span>TFG UDIT</span>
                  </div>
                )}

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 text-besege-black font-mono text-[9px] uppercase tracking-wider shadow-sm">
                  {artwork.year}
                </div>

                {/* Mobile Tap Overlay */}
                <div className="absolute inset-x-2 bottom-2 bg-besege-black/75 backdrop-blur-md text-white py-1.5 px-3 rounded-xl flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <Maximize2 size={11} className="text-besege-violet-light" />
                    <span>Cédula & Macro 2x</span>
                  </span>
                  <span className="text-besege-violet-light font-bold">Ver →</span>
                </div>
              </div>

              {/* Artwork Metadata */}
              <div className="mt-3 space-y-1.5">
                <div>
                  <h3 className="font-display font-bold text-lg text-besege-black">
                    {artwork.title}
                  </h3>
                  <p className="font-serif italic text-xs text-besege-muted">
                    {artwork.subtitle}
                  </p>
                </div>

                {/* Materials Tag */}
                <div className="pt-2 border-t border-besege-black/5 flex items-start gap-1.5 text-[11px] font-mono text-besege-charcoal/80">
                  <Layers size={11} className="text-besege-violet flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1 leading-snug">
                    {artwork.materials}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Final Runway Invitation Card */}
          <div className="snap-center shrink-0 w-[84vw] max-w-[300px] p-6 rounded-3xl bg-besege-violet text-white shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-widest uppercase opacity-80">
                Fin del Desfile
              </span>
              <h3 className="font-display font-bold text-xl leading-tight">
                ¿Interesado en una pieza o editorial?
              </h3>
              <p className="font-serif italic text-xs text-white/90 leading-relaxed">
                Las obras están disponibles para sesiones fotográficas, exposiciones y creaciones a medida.
              </p>
            </div>

            <a
              href="#visita"
              className="py-3 px-5 rounded-full bg-white text-besege-black font-mono text-[11px] uppercase tracking-wider font-semibold text-center hover:bg-besege-black hover:text-white transition-colors"
            >
              Solicitar Cita en el Atelier
            </a>
          </div>
        </div>

        {/* Carousel Pagination & Hint Indicator */}
        <div className="px-4 flex flex-col items-center gap-2 pt-2">
          {/* Dot Pagination */}
          <div className="flex items-center gap-1.5">
            {ARTWORKS_COLLECTION.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mobileActiveIdx === idx ? 'w-5 bg-besege-violet' : 'bg-besege-black/15'
                }`}
              />
            ))}
          </div>

          <div className="text-[10px] font-mono text-besege-muted flex items-center gap-1">
            <span>← Desliza horizontalmente para ver las 6 esculturas →</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESKTOP VIEW (>= md: 768px): Full 380vh Pinned Runway with Velocity Skew
          ========================================================================= */}
      <section
        ref={targetRef}
        className="hidden md:block relative h-[380vh] bg-besege-canvas"
      >
        {/* Pinned Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-8">
          {/* Curatorial Header */}
          <div className="flex items-end justify-between gap-4 z-20 max-w-7xl mx-auto w-full">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
                <span>Sala 02 · Pasarela Dimensional</span>
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-besege-black">
                Esculturas Textiles & Joyería
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-besege-muted bg-white/80 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
              <Gem size={14} className="text-besege-violet" />
              <span>06 Obras en Desfile Horizontal</span>
              <ArrowRight size={14} className="text-besege-violet animate-pulse" />
            </div>
          </div>

          {/* Giant Parallax Typography in Background */}
          <motion.div
            style={{ x: bgTextX }}
            className="absolute top-1/2 -translate-y-1/2 left-0 select-none pointer-events-none whitespace-nowrap z-0"
          >
            <span className="font-display font-black text-[18vw] leading-none text-besege-black/[0.03] tracking-tighter uppercase">
              BESEGÉ STUDIO · ALTA COSTURA
            </span>
          </motion.div>

          {/* The Horizontal Runway Track */}
          <div className="relative z-10 flex-1 flex items-center">
            <motion.div
              style={{ x: xTranslate }}
              className="flex items-center gap-14 pl-16 pr-32"
            >
              {ARTWORKS_COLLECTION.map((artwork) => (
                <motion.article
                  key={artwork.id}
                  style={{ skewX: velocitySkew }}
                  onClick={() => handleOpenArtwork(artwork)}
                  className="group relative cursor-pointer flex-shrink-0 w-[420px] md:w-[460px] rounded-3xl bg-white/85 border border-besege-black/10 p-5 shadow-museum hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  data-cursor="INSPECCIONAR"
                >
                  {/* Museum Inventory Header */}
                  <div className="flex items-center justify-between pb-3 px-1 text-xs font-mono text-besege-muted border-b border-besege-black/5">
                    <span className="font-semibold text-besege-violet tracking-widest">
                      {artwork.code}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-besege-canvas px-2.5 py-0.5 rounded-full">
                      {artwork.category}
                    </span>
                  </div>

                  {/* Framed Image Showcase with Specular Sheen */}
                  <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-besege-canvas-dark border border-besege-black/5">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Dynamic Hover Sheen & Inspect Badge */}
                    <div className="absolute inset-0 bg-besege-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-besege-black text-xs font-mono font-semibold tracking-wider shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 size={14} className="text-besege-violet" />
                        <span>CÉDULA DE MUSEO & MACRO</span>
                      </div>
                    </div>

                    {artwork.featured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-besege-black/85 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase">
                        <Sparkles size={11} className="text-besege-gold" />
                        <span>TFG UDIT</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/90 text-besege-black font-mono text-[9px] uppercase tracking-wider shadow-sm">
                      {artwork.year}
                    </div>
                  </div>

                  {/* Artwork Title & Metadata */}
                  <div className="mt-5 px-1 space-y-3">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-besege-black group-hover:text-besege-violet transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="font-serif italic text-sm text-besege-muted">
                        {artwork.subtitle}
                      </p>
                    </div>

                    {/* Materials Chip */}
                    <div className="pt-3 border-t border-besege-black/5 flex items-start gap-2 text-xs font-mono text-besege-charcoal/80">
                      <Layers size={13} className="text-besege-violet flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">
                        {artwork.materials}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Final Runway Call to Action Card */}
              <div className="flex-shrink-0 w-80 p-8 rounded-3xl bg-besege-violet text-white shadow-2xl flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">
                    Fin del Desfile
                  </span>
                  <h3 className="font-display font-bold text-2xl">
                    ¿Interesado en una pieza o editorial?
                  </h3>
                  <p className="font-serif italic text-sm text-white/90 leading-relaxed">
                    Las obras están disponibles para sesiones fotográficas, exposiciones y creaciones a medida.
                  </p>
                </div>

                <a
                  href="#visita"
                  className="py-3 px-6 rounded-full bg-white text-besege-black font-mono text-xs uppercase tracking-wider font-semibold text-center hover:bg-besege-black hover:text-white transition-colors"
                  data-cursor="CONTACTO"
                >
                  Solicitar Cita en el Atelier
                </a>
              </div>
            </motion.div>
          </div>

          {/* Runway Progress Scrubber Bar */}
          <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-besege-black/10 flex items-center justify-between text-xs font-mono text-besege-muted">
            <div className="flex items-center gap-3">
              <span>01</span>
              <div className="w-64 h-1.5 rounded-full bg-besege-black/10 overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                  className="h-full bg-besege-violet rounded-full"
                />
              </div>
              <span>06</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Desliza para avanzar por el desfile</span>
              <span className="text-besege-violet font-semibold">BESEGÉ COLLECTION</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
