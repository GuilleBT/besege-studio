import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, Gem, Layers } from 'lucide-react';
import { ARTWORKS_COLLECTION, Artwork } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface SculpturesGalleryProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export const SculpturesGallery: React.FC<SculpturesGalleryProps> = ({ onSelectArtwork }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Joyería Corporal',
    'Escultura Textil',
    'Orfebrería Textil',
    'Artefacto Sirena',
    'Balletcore Contemporáneo'
  ];

  const filteredArtworks = selectedCategory === 'Todas'
    ? ARTWORKS_COLLECTION
    : ARTWORKS_COLLECTION.filter((art) => art.category === selectedCategory);

  const handleFilterClick = (cat: string) => {
    museumAudio.playTactileClick();
    setSelectedCategory(cat);
  };

  const handleOpenArtwork = (artwork: Artwork) => {
    museumAudio.playChime(784, 1.2);
    onSelectArtwork(artwork);
  };

  return (
    <section id="esculturas" className="relative py-28 px-4 sm:px-8 bg-besege-canvas">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Curatorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-besege-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
              <span>Sala 02 · Colección Fin de Grado</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-besege-black">
              Esculturas Textiles & Joyería
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-besege-muted max-w-xl">
              Piezas concebidas como orfebrería sobre anatomía. Ni para tapar, ni para esculpir: para consagrar.
            </p>
          </div>

          {/* Pedestal Count */}
          <div className="flex items-center gap-3 font-mono text-xs text-besege-muted bg-white/70 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
            <Gem size={14} className="text-besege-violet" />
            <span>{filteredArtworks.length} Obras en Exhibición</span>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-besege-violet text-white shadow-sm'
                    : 'bg-white/60 hover:bg-white text-besege-charcoal/80 border border-besege-black/5'
                }`}
                data-cursor={cat.toUpperCase()}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Artworks Exhibition Grid (Museum Pedestals) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, idx) => (
              <motion.article
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenArtwork(artwork)}
                className="group relative cursor-pointer flex flex-col rounded-3xl bg-white/80 border border-besege-black/5 p-4 shadow-sm hover:shadow-museum transition-all duration-500 hover:-translate-y-1"
                data-cursor="INSPECCIONAR"
              >
                {/* Museum Inventory Header */}
                <div className="flex items-center justify-between pb-3 px-2 text-xs font-mono text-besege-muted border-b border-besege-black/5">
                  <span className="font-semibold text-besege-violet tracking-widest">
                    {artwork.code}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider bg-besege-canvas px-2 py-0.5 rounded-full">
                    {artwork.category}
                  </span>
                </div>

                {/* Framed Image Showcase */}
                <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-besege-canvas-subtle border border-besege-black/5">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-besege-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-besege-black text-xs font-mono font-semibold tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={13} className="text-besege-violet" />
                      <span>CÉDULA DE MUSEO</span>
                    </div>
                  </div>

                  {artwork.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-besege-black/80 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase">
                      <Sparkles size={11} className="text-besege-gold" />
                      <span>TFG UDIT</span>
                    </div>
                  )}
                </div>

                {/* Artwork Title & Metadata */}
                <div className="mt-4 px-2 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-besege-black group-hover:text-besege-violet transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="font-serif italic text-sm text-besege-muted">
                      {artwork.subtitle}
                    </p>
                  </div>

                  {/* Materials Chip */}
                  <div className="pt-3 border-t border-besege-black/5 flex items-start gap-2 text-[11px] font-mono text-besege-charcoal/80">
                    <Layers size={13} className="text-besege-violet flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed">
                      {artwork.materials}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
