import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Feather, Eye } from 'lucide-react';
import { MUSEUM_METADATA } from '../data/museumData';
import { museumAudio } from '../utils/audio';

export const ManifestoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const concepts = [
    {
      title: "Autodecoración Primitiva",
      tag: "ORÍGENES",
      icon: <Sparkles size={16} />,
      text: "Inspirada en las primeras manifestaciones de adorno corporal que precedieron al concepto utilitario de la ropa. Las joyas étnicas primitivas no cubrían por pudor, sino que consagraban el cuerpo como un templo de identidad.",
    },
    {
      title: "El Cuerpo como Lienzo Vivo",
      tag: "FILOSOFÍA",
      icon: <Feather size={16} />,
      text: "Aquí no se trata de tapar, modificar ni esculpir el cuerpo humano para encajarlo en un corsé o silueta impuesta. Se trata de posar la materia sobre la piel y convertir la anatomía en un lienzo de expresión pura.",
    },
    {
      title: "Hibridación Moda-Orfebrería",
      tag: "TÉCNICA",
      icon: <Eye size={16} />,
      text: "La disolución de la frontera entre el sastre y el orfebre. Cadenas de latón y oro viejo sustituyen a las cremalleras y costuras rígidas; las telas no aprisionan, sino que cuelgan suspendidas por la propia gravedad.",
    },
  ];

  const handleTabChange = (idx: number) => {
    museumAudio.playTactileClick();
    setActiveTab(idx);
  };

  return (
    <section id="manifiesto" className="relative py-28 px-4 sm:px-8 bg-besege-canvas-subtle/50 border-t border-b border-besege-black/5">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-besege-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
              <span>Sala 01 · Cuestionamiento Ontológico</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-besege-black">
              El Manifiesto BESEGÉ
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-besege-muted">
            <span>UDIT ALUMNI · TFG FASHION DESIGN</span>
            <div className="text-besege-black font-semibold">MADRID, ESPAÑA</div>
          </div>
        </div>

        {/* The Great Provocative Thesis Question */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-white/70 border border-besege-black/5 shadow-museum overflow-hidden">
          <div className="absolute top-6 right-8 text-besege-violet/10 pointer-events-none">
            <Quote size={120} />
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-besege-violet/10 text-besege-violet font-mono text-[10px] tracking-widest uppercase font-semibold">
              La Pregunta Fundacional
            </span>

            <blockquote className="font-serif italic font-light text-3xl sm:text-5xl md:text-6xl text-besege-black leading-tight">
              &ldquo;{MUSEUM_METADATA.manifestoCore}&rdquo;
            </blockquote>

            <p className="font-sans text-base sm:text-lg text-besege-charcoal/90 leading-relaxed pt-2">
              Esta es la premisa desde la que parte el proyecto de investigación y creación de <strong className="font-semibold text-besege-black">Bárbara Sánchez-Guerrero</strong>. En una era saturada de prendas industriales y patrones genéricos, BESEGÉ propone una reconexión con la delicadeza ritual del adorno.
            </p>
          </div>
        </div>

        {/* Interactive Dual Presentation (Concepts & Botanical Artifacts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Theoretical Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-besege-muted">
              <span>Pilares Teóricos de la Creadora</span>
            </div>

            <div className="space-y-3">
              {concepts.map((concept, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <motion.div
                    key={concept.title}
                    onClick={() => handleTabChange(idx)}
                    className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-white shadow-museum border-besege-violet/30'
                        : 'bg-white/40 hover:bg-white/70 border-besege-black/5'
                    }`}
                    data-cursor="LEER"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-besege-violet text-white'
                              : 'bg-besege-black/5 text-besege-muted'
                          }`}
                        >
                          {concept.icon}
                        </div>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-besege-violet font-semibold">
                          {concept.tag}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-besege-muted">0{idx + 1}</span>
                    </div>

                    <h3 className="font-display font-semibold text-lg sm:text-xl text-besege-black mb-2">
                      {concept.title}
                    </h3>

                    <p className="font-sans text-sm text-besege-charcoal/80 leading-relaxed">
                      {concept.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Original Sketches & Botanical Studies Gallery */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white/70 border border-besege-black/5 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-besege-black/5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-besege-muted">
                  Estudio Plástico · Cuaderno de Taller
                </span>
                <span className="px-2 py-0.5 rounded-full bg-besege-rose/20 text-besege-rose-neon font-mono text-[10px] font-semibold">
                  Original
                </span>
              </div>

              {/* Botanical Flower Painting Artifact */}
              <div className="relative group overflow-hidden rounded-2xl border border-besege-black/10 bg-besege-canvas" data-cursor="ORQUÍDEA">
                <img
                  src="/assets/art-botanical-painting.png"
                  alt="Orquídea botánica estudio por Bárbara Sánchez-Guerrero"
                  className="w-full h-64 object-cover transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-besege-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="font-serif italic text-base">Orquídea sobre fondo bígaro</span>
                  <span className="font-mono text-[10px] text-white/80">Gouache & Óleo · Cuaderno de Bárbara</span>
                </div>
              </div>

              {/* Illustration Artifact */}
              <div className="relative group overflow-hidden rounded-2xl border border-besege-black/10 bg-besege-canvas" data-cursor="ILUSTRACIÓN">
                <img
                  src="/assets/illustration-horses.png"
                  alt="Doncella y corceles blancos"
                  className="w-full h-48 object-cover transition-transform duration-700 ease-spring-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-besege-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="font-serif italic text-base">Doncella y Corceles Míticos</span>
                  <span className="font-mono text-[10px] text-white/80">Carbón y lavado · Génesis de sirenas y hadas</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-besege-canvas font-mono text-[11px] text-besege-charcoal/80 leading-normal border border-besege-black/5">
                <strong className="text-besege-violet font-semibold">Nota Curatorial:</strong> Las siluetas de las pecheras y los drapeados de BESEGÉ no nacen de patrones geométricos industriales, sino de trazos orgánicos de tallos de orquídeas y fábulas mitológicas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
