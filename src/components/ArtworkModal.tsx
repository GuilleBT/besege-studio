import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Layers, Calendar, User, Sparkles, Share2, Check } from 'lucide-react';
import { Artwork } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onInquire: (artwork: Artwork) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose, onInquire }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!artwork) return null;

  const handleShare = () => {
    museumAudio.playTactileClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-10 bg-besege-black/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-6xl rounded-3xl bg-besege-canvas border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row"
        >
          {/* Close Floating Button */}
          <button
            onClick={() => {
              museumAudio.playTactileClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 border border-besege-black/10 flex items-center justify-center text-besege-black hover:bg-besege-black hover:text-white transition-colors shadow-md"
            aria-label="Cerrar ficha"
            data-cursor="CERRAR"
          >
            <X size={18} />
          </button>

          {/* Left / Top: Interactive Artwork Viewport */}
          <div className="relative lg:w-3/5 bg-besege-charcoal/5 flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[350px] lg:min-h-full">
            <div
              className={`relative cursor-pointer transition-transform duration-500 ease-spring-smooth ${
                isZoomed ? 'scale-150 sm:scale-175' : 'scale-100'
              }`}
              onClick={() => {
                museumAudio.playTactileClick();
                setIsZoomed(!isZoomed);
              }}
              data-cursor={isZoomed ? "ALEJAR" : "ZOOM"}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-besege-black/10"
              />
            </div>

            {/* Zoom Toggle Widget */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-besege-black/10 text-xs font-mono shadow-sm">
              <button
                onClick={() => {
                  museumAudio.playTactileClick();
                  setIsZoomed(!isZoomed);
                }}
                className="flex items-center gap-1.5 text-besege-black hover:text-besege-violet transition-colors"
              >
                {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                <span>{isZoomed ? 'Restaurar Escala (1x)' : 'Macro Inspección (2x)'}</span>
              </button>
            </div>
          </div>

          {/* Right: Curatorial Catalog Sheet */}
          <div className="lg:w-2/5 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] space-y-6">
            <div className="space-y-6">
              {/* Inventory Header */}
              <div className="flex items-center justify-between pb-4 border-b border-besege-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-besege-violet" />
                  <span className="font-mono text-xs text-besege-violet font-semibold tracking-widest">
                    {artwork.code}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-besege-canvas-dark text-besege-charcoal">
                  {artwork.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-besege-black leading-tight">
                  {artwork.title}
                </h2>
                <p className="mt-1 font-serif italic text-base sm:text-lg text-besege-muted">
                  {artwork.subtitle}
                </p>
              </div>

              {/* Curatorial Description */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-besege-muted font-semibold">
                  Memoria de la Obra
                </h4>
                <p className="font-sans text-sm text-besege-charcoal leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Curatorial Note Pill */}
              <div className="p-4 rounded-2xl bg-white/80 border border-besege-black/5 space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-besege-violet font-semibold">
                  <Sparkles size={12} />
                  <span>Criterio Curatorial</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-besege-charcoal leading-relaxed">
                  &ldquo;{artwork.curatorialNote}&rdquo;
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="space-y-2 pt-2 border-t border-besege-black/10 font-mono text-xs">
                <div className="flex items-start gap-2 text-besege-charcoal/80">
                  <Layers size={13} className="text-besege-violet flex-shrink-0 mt-0.5" />
                  <span><strong>Materiales:</strong> {artwork.materials}</span>
                </div>
                <div className="flex items-center gap-2 text-besege-charcoal/80">
                  <Calendar size={13} className="text-besege-violet flex-shrink-0" />
                  <span><strong>Año de Ejecución:</strong> {artwork.year}</span>
                </div>
                <div className="flex items-start gap-2 text-besege-muted text-[11px]">
                  <User size={13} className="text-besege-violet flex-shrink-0 mt-0.5" />
                  <span>{artwork.credits}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-besege-black/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  museumAudio.playTactileClick();
                  onInquire(artwork);
                }}
                className="flex-1 py-3 px-6 rounded-full bg-besege-black text-white text-xs font-mono tracking-widest uppercase hover:bg-besege-violet transition-colors text-center font-semibold"
                data-cursor="CONTACTAR"
              >
                Consultar para Editorial / Cita
              </button>

              <button
                onClick={handleShare}
                className="py-3 px-4 rounded-full border border-besege-black/10 hover:border-besege-violet text-besege-black hover:text-besege-violet transition-colors flex items-center justify-center gap-1.5 text-xs font-mono"
                title="Copiar enlace a la obra"
              >
                {isCopied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                <span>{isCopied ? 'Enlace Copiado' : 'Ficha'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
