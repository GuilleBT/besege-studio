import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface MuseumFooterProps {
  onBackToTop: () => void;
}

export const MuseumFooter: React.FC<MuseumFooterProps> = ({ onBackToTop }) => {
  const handleScrollTop = () => {
    museumAudio.playChime(660, 1.2);
    onBackToTop();
  };

  return (
    <footer className="relative bg-besege-canvas-dark/40 border-t border-besege-black/10 pt-20 pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-besege-black/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-besege-violet flex items-center justify-center text-white font-display font-black text-xs">
                BSG
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-besege-black">
                BESEGÉ <span className="font-serif italic font-normal text-besege-violet text-xl">studio</span>
              </span>
            </div>

            <p className="font-serif italic text-base text-besege-charcoal/80 max-w-sm">
              &ldquo;{MUSEUM_METADATA.tagline}&rdquo;
            </p>

            <p className="font-mono text-xs text-besege-muted">
              Pabellón digital de alta costura, joyería corporal y experimentación textil por Bárbara Sánchez-Guerrero.
            </p>
          </div>

          {/* Directory Column */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="uppercase text-besege-violet tracking-widest font-semibold block mb-2">
              Índice de Salas
            </span>
            <ul className="space-y-2 text-besege-charcoal/80">
              <li>
                <a href="#atrio" className="hover:text-besege-violet transition-colors">
                  Sala 00 · Atrio de Entrada & Logo
                </a>
              </li>
              <li>
                <a href="#manifiesto" className="hover:text-besege-violet transition-colors">
                  Sala 01 · Manifiesto & Tesis UDIT
                </a>
              </li>
              <li>
                <a href="#esculturas" className="hover:text-besege-violet transition-colors">
                  Sala 02 · Esculturas Textiles & Joyería
                </a>
              </li>
              <li>
                <a href="#laboratorio" className="hover:text-besege-violet transition-colors">
                  Sala 03 · Dumps & Archivo Crudo
                </a>
              </li>
              <li>
                <a href="#visita" className="hover:text-besege-violet transition-colors">
                  Sala 04 · Libro de Registro Curatorial
                </a>
              </li>
            </ul>
          </div>

          {/* Credits & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div className="font-mono text-xs space-y-1">
              <span className="uppercase text-besege-muted tracking-widest block">
                Grado Académico
              </span>
              <div className="text-besege-black font-semibold">UDIT Alumni</div>
              <div className="text-besege-muted">Diseño, Innovación y Tecnología · Madrid</div>
            </div>

            <button
              onClick={handleScrollTop}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-besege-black/10 hover:border-besege-violet text-besege-black hover:text-besege-violet text-xs font-mono tracking-widest uppercase transition-all shadow-sm w-fit"
              data-cursor="SUBIR"
            >
              <span>Volver al Atrio</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Monumental Watermark Typography */}
        <div className="select-none pointer-events-none text-center">
          <div className="font-display font-black text-6xl sm:text-9xl md:text-[13rem] leading-none text-besege-black/[0.04] tracking-tighter uppercase overflow-hidden">
            BESEGÉ
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-besege-muted pt-4">
          <div>
            © {new Date().getFullYear()} BESEGÉ STUDIO · Bárbara Sánchez-Guerrero. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-besege-violet" />
            <span>Pabellón Digital Diseñado con Excelencia Curatorial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
