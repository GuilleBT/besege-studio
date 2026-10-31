export interface Artwork {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  materials: string;
  year: string;
  dimensions?: string;
  description: string;
  curatorialNote: string;
  credits: string;
  featured?: boolean;
}

export interface LabDump {
  id: string;
  title: string;
  image: string;
  category: string;
  concept: string;
  location: string;
  tags: string[];
}

export const MUSEUM_METADATA = {
  creator: "Bárbara Sánchez-Guerrero García",
  brand: "BESEGÉ STUDIO",
  initials: "B - S - G",
  almaMater: "UDIT (Universidad de Diseño, Innovación y Tecnología)",
  degree: "Grado en Diseño de Moda",
  location: "Madrid, España",
  tagline: "For today's goddesses, mermaids and fairies",
  manifestoCore: "¿Y si la ropa no estuviera hecha para vestirnos, sino para decorar nuestro cuerpo?",
  manifestoParagraphs: [
    "Su proyecto explora los límites entre moda y joyería, tomando como inspiración los orígenes de la autodecoración y las primeras joyas étnicas para entender la prenda como una pieza que se posa sobre el cuerpo y lo convierte en un lienzo.",
    "Aquí no se trata de tapar, modificar ni esculpir el cuerpo. Se trata de decorarlo.",
    "Las prendas se convierten así en objetos de expresión y las formas, los materiales y la estética en una manera de comunicar lo que significa la moda para su creadora."
  ],
  instagram: "besege_studio",
  creatorInstagram: "barbarasg_",
  foundationYear: "2024",
};

export const ARTWORKS_COLLECTION: Artwork[] = [
  {
    id: "bsg-01",
    code: "BSG·INV-01",
    title: "Aura Drapeada & Cadenas Áureas",
    subtitle: "Top Joya & Falda Asimétrica de Corte Diagonal",
    image: "/assets/art-look-tfg-collection.png",
    category: "Joyería Corporal",
    materials: "Seda satén cruda, muselina plisada en diagonal, cadenas de latón dorado, perlas de agua dulce",
    year: "2024",
    dimensions: "Pieza a medida sobre maniquí vivo",
    description: "Prenda-joya fundacional que cuestiona la vestimenta funcional. Cadenas ultrafinas abrazan el contorno de la clavícula y los laterales expuestos de la cadera, suspendiendo paños de satén que caen por gravedad.",
    curatorialNote: "El cuerpo humano deja de ser un molde al que amoldar un patrón rígido; se convierte en un pedestal sagrado donde la joya y el tejido se encuentran en equilibrio de tensión.",
    credits: "Fotografía: @garciaheras.foto · Modelos: Mika & Alisa · MUAH: @22saaraa22",
    featured: true,
  },
  {
    id: "bsg-02",
    code: "BSG·INV-02",
    title: "Relieve en Ocre Solar",
    subtitle: "Bandeau Escultórico & Minifalda de Costura Sesgada",
    image: "/assets/art-look-gold-bandeau.png",
    category: "Escultura Textil",
    materials: "Organza de seda tratada al calor, hilo dorado envejecido, fornituras metálicas",
    year: "2024",
    dimensions: "Pieza única de graduación",
    description: "Fruncidos orgánicos que evocan la textura marina de los arrecifes y algas mecidas por la marea. La pieza superior se posa de forma etérea sobre el torso femenino sin costuras opresivas.",
    curatorialNote: "Un diálogo plástico entre el brillo solar del dorado y la desnudez como territorio de calma.",
    credits: "Colección TFG UDIT · BESEGÉ Studio",
    featured: true,
  },
  {
    id: "bsg-03",
    code: "BSG·INV-03",
    title: "Pechera de Encaje Sombrío & Hilo Áureo",
    subtitle: "Orfebrería Textil Calada",
    image: "/assets/art-gold-black-embroidery.png",
    category: "Orfebrería Textil",
    materials: "Encaje de guipur negro azabache, filamentos de oro metálico bordados, lazos de satén marfil",
    year: "2024",
    dimensions: "38 x 42 cm",
    description: "Dos piezas de encaje artesanal donde la filigrana vegetal clásica se mezcla con la iconografía gótica. Sujeción dorsal mediante cintas de seda pura.",
    curatorialNote: "Los bordados actúan como tatuajes desmontables de metal y seda, concebidos para reposar sobre la piel sin armazones interiores.",
    credits: "Taller BESEGÉ · Madrid",
    featured: true,
  },
  {
    id: "bsg-04",
    code: "BSG·INV-04",
    title: "Botas de Sirena & Detritos Marinos",
    subtitle: "Calzado Escultórico con Conchas y Terciopelo",
    image: "/assets/seashell-boots.png",
    category: "Artefacto Sirena",
    materials: "Terciopelo rosa polvoriento, conchas marinas trituradas a mano, perlas barrocas, lazos de seda rasgada, tacón de aguja bañado en oro",
    year: "2024",
    dimensions: "Par escultórico",
    description: "Una de las piezas más poéticas del universo BESEGÉ: tacones de aguja recubiertos de salitre, cristales marinos y conchas fosilizadas, rematados por cintas de seda deshilachada que se atan a la pantorrilla.",
    curatorialNote: "La materialización de la sirena contemporánea arrojada a la orilla del mundo urbano; el lujo de la descomposición orgánica.",
    credits: "BESEGÉ Dump PT IV",
    featured: true,
  },
  {
    id: "bsg-05",
    code: "BSG·INV-05",
    title: "Anatomía de Ballet & Raso Íntimo",
    subtitle: "Calcetas de Muselina y Salones Satinados",
    image: "/assets/ballet-stockings.png",
    category: "Balletcore Contemporáneo",
    materials: "Muselina rosa etérea, satén champán, encaje fino de algodón",
    year: "2024",
    dimensions: "Estudio de silueta",
    description: "La disciplina del ballet clásico subvertida en un momento de languidez doméstica. Piernas enfundadas en muselina que rematan en zapatos de punta con lazo de satén.",
    curatorialNote: "Explora la noción de la bailarina como ninfa terrenal, atrapada entre el esfuerzo y la ensoñación.",
    credits: "BESEGÉ Studio Archivo",
  },
  {
    id: "bsg-06",
    code: "BSG·INV-06",
    title: "Cuña de Cuero & Encaje Neón",
    subtitle: "Tensión de Materia sobre Asfalto",
    image: "/assets/dump-heels-lace.png",
    category: "Detalle & Tensión",
    materials: "Piel de becerro negra pulida, puntilla de encaje rosa fluorescente, cemento urbano",
    year: "2024",
    dimensions: "Detalle en vivo",
    description: "Un zapato de cuña de piel negra severa del que asoma, como un susurro impertinente, un borde de encaje rosa flúor en contacto directo con el asfalto.",
    curatorialNote: "El epítome de la estética BESEGÉ: la colisión entre la dureza de la calle y la extrema fragilidad de la lencería.",
    credits: "BESEGÉ Dump PT IV",
  }
];

export const LAB_DUMPS: LabDump[] = [
  {
    id: "dump-01",
    title: "Cenicero de Cristal & Billetes con Flores Lilas",
    image: "/assets/art-ashtray-flowers.png",
    category: "Bodegón Urbano",
    concept: "Naturaleza muerta decadente: ceniza, algodón cosmético, billetes de euro enrollados como filtros y flores silvestres lilas. El glamour del exceso reconvertido en reliquia floral.",
    location: "Madrid Centro",
    tags: ["Decadencia", "Bodegón", "Flores", "Cenicero"]
  },
  {
    id: "dump-02",
    title: "Pétalos de Tulipán en Fregadero de Acero",
    image: "/assets/art-tulip-sink.png",
    category: "Materia Efímera",
    concept: "La belleza de la putrefacción y la floración: pétalos magentas y dorados flotando en un remolino de gotas de agua sobre el metal frío industrial.",
    location: "Atelier de Bárbara",
    tags: ["Efímero", "Agua", "Tulipanes", "Metal"]
  },
  {
    id: "dump-03",
    title: "Totems de Tul & Can-cán Escultórico",
    image: "/assets/art-tulle-sculptures.png",
    category: "Estudio de Volumen",
    concept: "Torres de tules escalonados montados sobre mástiles de madera cruda rotulados como 'CLEAN'. El nacimiento del volumen teatral antes de su patronaje.",
    location: "Talleres UDIT",
    tags: ["Brainstorming", "Tulle", "Escultura", "UDIT"]
  },
  {
    id: "dump-04",
    title: "Espiral Áurea de Mandarina & Calzado Íntimo",
    image: "/assets/tangerine-peel.png",
    category: "Geometría Natural",
    concept: "Una cáscara de mandarina pelada en una perfecta espiral de infinito junto a un momento de descanso íntimo y vulnerabilidad.",
    location: "Archivo Privado",
    tags: ["Orgánico", "Infinito", "Bailarinas", "Intimidad"]
  },
  {
    id: "dump-05",
    title: "Taburetes Rosas Apilados en el Asfalto",
    image: "/assets/art-pink-stools.png",
    category: "Color Callejero",
    concept: "La paleta cromática de BESEGÉ encontrada en el mobiliario más humilde: plástico moldeado erosionado por el sol estival sobre la acera.",
    location: "Callejero Madrileño",
    tags: ["Rosa", "Asfalto", "Plástico", "Inspiración"]
  },
  {
    id: "dump-06",
    title: "Orquídea Botánica sobre Fondo Bígaro",
    image: "/assets/art-botanical-painting.png",
    category: "Pintura Original",
    concept: "Estudio al óleo y gouache por Bárbara: flores de orquídea blanca flotando en una curva ingrávida sobre el mismo violeta identitario del logo.",
    location: "Cuaderno de Bocetos",
    tags: ["Pintura", "Orquídea", "Bígaro", "Botánica"]
  },
  {
    id: "dump-07",
    title: "La Doncella y los Corceles Blancos",
    image: "/assets/illustration-horses.png",
    category: "Ilustración Mítica",
    concept: "Carbón y lavado de acuarela: el universo de diosas, ninfas y caballos mitológicos que nutren el inconsciente textil de la creadora.",
    location: "Archivo Creativo",
    tags: ["Mito", "Hadas", "Dibujo", "Inocencia"]
  },
  {
    id: "dump-08",
    title: "Herrajes Góticos sobre Portón de Roble",
    image: "/assets/door-ironwork.png",
    category: "Arquitectura & Forja",
    concept: "Filigrana de hierro forjado con motivos de lirios y curvas cinéticas que inspiraron los enganches de joyería corporal de la colección.",
    location: "Patrimonio Histórico",
    tags: ["Forja", "Gótico", "Joyería", "Estructura"]
  }
];

export const MUSEUM_ROOMS = [
  { id: "atrio", number: "00", name: "Atrio", subtitle: "Sello & Apertura" },
  { id: "manifiesto", number: "01", name: "Manifiesto", subtitle: "El Cuerpo como Lienzo" },
  { id: "esculturas", number: "02", name: "Esculturas", subtitle: "Colección TFG & Joyería" },
  { id: "laboratorio", number: "03", name: "Laboratorio", subtitle: "Dumps & Bodegones Urbanos" },
  { id: "visita", number: "04", name: "Cita Privada", subtitle: "Consultas & Piezas a Medida" },
];
