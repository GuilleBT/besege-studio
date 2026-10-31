import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Tag, X, Info } from 'lucide-react';
import { LAB_DUMPS, LabDump } from '../data/museumData';
import { museumAudio } from '../utils/audio';

export const LaboratorySection: React.FC = () => {
  const [selectedDump, setSelectedDump] = useState<LabDump | null>(null);

  const handleOpenDump = (dump: LabDump) => {
    museumAudio.playChime(620, 1.0);
    setSelectedDump(dump);
  };

  const handleCloseDump = () => {
    museumAudio.playTactileClick();
    setSelectedDump(null);
  };

  return (
    <section id="laboratorio" className="relative py-28 px-4 sm:px-8 bg-besege-canvas-subtle/70 border-t border-besege-black/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-besege-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
              <span>Sala 03 · Dumps, Despojos & Moodboards</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-besege-black">
              Laboratorio de Materia Cruda
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-besege-muted max-w-xl">
              Donde el glamour decadente, las colillas con flores y el asfalto de Madrid nutren la imaginación de Bárbara.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-besege-muted bg-white/70 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
            <Sparkles size={14} className="text-besege-violet" />
            <span>Archivo @besege_studio Dumps</span>
          </div>
        </div>

        {/* Masonry / Organic Dumps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAB_DUMPS.map((dump, idx) => (
            <motion.div
              key={dump.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              onClick={() => handleOpenDump(dump)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/80 border border-besege-black/5 shadow-sm hover:shadow-museum transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
              data-cursor="DETALLE"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-besege-canvas-dark">
                <img
                  src={dump.image}
                  alt={dump.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-besege-black/70 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase">
                  {dump.category}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-display font-bold text-base text-besege-black group-hover:text-besege-violet transition-colors line-clamp-1">
                  {dump.title}
                </h3>
                <p className="font-sans text-xs text-besege-charcoal/70 line-clamp-2 leading-relaxed">
                  {dump.concept}
                </p>

                <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-besege-muted border-t border-besege-black/5">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-besege-violet" />
                    {dump.location}
                  </span>
                  <span className="text-besege-violet font-semibold">VER NOTA</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Dump Modal View */}
      <AnimatePresence>
        {selectedDump && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-besege-black/80 backdrop-blur-md"
            onClick={handleCloseDump}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-besege-canvas p-6 sm:p-8 shadow-2xl border border-besege-black/10 overflow-hidden space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDump}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/80 border border-besege-black/10 flex items-center justify-center text-besege-black hover:bg-besege-black hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-xs uppercase text-besege-violet tracking-widest font-semibold">
                  {selectedDump.category} · Archivo Crudo
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-besege-black">
                  {selectedDump.title}
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-besege-black/5 border border-besege-black/5">
                <img
                  src={selectedDump.image}
                  alt={selectedDump.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-besege-black/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-besege-violet">
                  <Info size={14} />
                  <span>Curaduría & Significado en el Universo BESEGÉ:</span>
                </div>
                <p className="font-sans text-sm text-besege-charcoal leading-relaxed">
                  {selectedDump.concept}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-besege-black/10 text-xs font-mono text-besege-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-besege-violet" />
                  <span>{selectedDump.location}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag size={13} className="text-besege-violet" />
                  {selectedDump.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-besege-canvas-dark text-besege-charcoal text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
