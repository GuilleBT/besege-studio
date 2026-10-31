import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Mail, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { MUSEUM_METADATA, Artwork } from '../data/museumData';
import { museumAudio } from '../utils/audio';

interface PrivateVisitsSectionProps {
  initialSubject?: string;
}

export const PrivateVisitsSection: React.FC<PrivateVisitsSectionProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Editorial de Moda & Shoot',
    message: initialSubject ? `Hola Bárbara, me gustaría consultar sobre la obra "${initialSubject}" para...` : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    'Editorial de Moda & Shoot',
    'Préstamo de Piezas para Estilismo',
    'Exposición en Galería / Museo',
    'Pieza de Orfebrería Textil a Medida',
    'Colaboración Artística'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    museumAudio.playChime(880, 1.5);
    setIsSubmitted(true);

    // Open user's email client cleanly
    const subject = encodeURIComponent(`[BESEGÉ CITA] ${formData.type} - ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nTipo de Consulta: ${formData.type}\n\nMensaje:\n${formData.message}`
    );
    window.location.href = `mailto:barbara@besegestudio.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="visita" className="relative py-28 px-4 sm:px-8 bg-besege-canvas border-t border-besege-black/5">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-besege-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-besege-violet tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-besege-violet" />
              <span>Sala 04 · Libro de Registro Curatorial</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-besege-black">
              Cita Privada & Adquisición
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-besege-muted max-w-xl">
              Actualmente las piezas de BESEGÉ no se comercializan como ropa en serie. Cada obra es un objeto único disponible para proyectos editoriales, exposiciones o encargos privados.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-besege-muted bg-white/70 px-4 py-2 rounded-full border border-besege-black/5 shadow-sm">
            <Sparkles size={14} className="text-besege-violet" />
            <span>Atelier Abierto a Diálogo</span>
          </div>
        </div>

        {/* Dual Layout: Form & Creator Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white/80 p-8 sm:p-12 rounded-3xl border border-besege-black/5 shadow-museum">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                <h3 className="font-display font-bold text-2xl text-besege-black">
                  Cédula de Contacto Enviada
                </h3>
                <p className="font-sans text-sm text-besege-charcoal/80 max-w-md mx-auto leading-relaxed">
                  Gracias por tu interés en el universo de BESEGÉ. Bárbara revisará tu solicitud y se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-besege-black text-white text-xs font-mono uppercase tracking-wider hover:bg-besege-violet transition-colors"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-besege-muted mb-2">
                    Tu Nombre o Estudio / Revista
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carmen Valdés · Revista Vogue"
                    className="w-full px-4 py-3 rounded-2xl bg-besege-canvas border border-besege-black/10 focus:outline-none focus:border-besege-violet text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-besege-muted mb-2">
                    Correo Electrónico de Contacto
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carmen@editorial.com"
                    className="w-full px-4 py-3 rounded-2xl bg-besege-canvas border border-besege-black/10 focus:outline-none focus:border-besege-violet text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-besege-muted mb-2">
                    Motivo de la Cita / Consulta
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-besege-canvas border border-besege-black/10 focus:outline-none focus:border-besege-violet text-sm font-sans"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-besege-muted mb-2">
                    Mensaje o Breve Descripción del Proyecto
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detalles de la fecha, concepto o pieza de interés..."
                    className="w-full px-4 py-3 rounded-2xl bg-besege-canvas border border-besege-black/10 focus:outline-none focus:border-besege-violet text-sm font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-besege-violet text-white font-mono text-xs tracking-widest uppercase hover:bg-besege-violet-dark transition-colors flex items-center justify-center gap-2 font-semibold shadow-md shadow-besege-violet/20"
                  data-cursor="ENVIAR"
                >
                  <Send size={14} />
                  <span>Registrar Cita en el Atelier</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Atelier Links Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/70 border border-besege-black/5 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-besege-black">
                Canales Oficiales de la Creadora
              </h3>

              <div className="space-y-4">
                <a
                  href={`https://instagram.com/${MUSEUM_METADATA.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-besege-canvas border border-besege-black/5 hover:border-besege-violet/40 transition-all group"
                  data-cursor="INSTAGRAM"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-besege-violet/10 text-besege-violet flex items-center justify-center group-hover:bg-besege-violet group-hover:text-white transition-colors">
                      <Instagram size={18} />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-besege-black">
                        @{MUSEUM_METADATA.instagram}
                      </div>
                      <div className="font-mono text-[11px] text-besege-muted">
                        Archivo de marca & Dumps visuales
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-besege-violet font-semibold">
                    Seguir ↗
                  </span>
                </a>

                <a
                  href={`https://instagram.com/${MUSEUM_METADATA.creatorInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-besege-canvas border border-besege-black/5 hover:border-besege-violet/40 transition-all group"
                  data-cursor="BÁRBARA"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-besege-black/5 text-besege-black flex items-center justify-center group-hover:bg-besege-black group-hover:text-white transition-colors">
                      <Instagram size={18} />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-besege-black">
                        @{MUSEUM_METADATA.creatorInstagram}
                      </div>
                      <div className="font-mono text-[11px] text-besege-muted">
                        Perfil personal de Bárbara
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-besege-muted group-hover:text-besege-black transition-colors font-semibold">
                    Visitar ↗
                  </span>
                </a>
              </div>

              <div className="pt-4 border-t border-besege-black/10 space-y-2 text-xs font-mono text-besege-muted">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-besege-violet" />
                  <span>Estudio Base: Madrid, España</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-besege-violet" />
                  <span>Contacto Curatorial: barbara@besegestudio.com</span>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-3xl bg-besege-violet text-white shadow-museum space-y-3">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">
                Sobre la exclusividad
              </span>
              <p className="font-serif italic text-base sm:text-lg leading-relaxed">
                &ldquo;Cada prenda es una escultura viva irrepetible. No producimos stock; tejemos memorias sobre la piel.&rdquo;
              </p>
              <div className="font-mono text-[10px] text-white/80">
                — Bárbara Sánchez-Guerrero
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
