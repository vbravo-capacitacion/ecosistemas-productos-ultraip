export type FamilyId = "infraestructura" | "administracion" | "identificacion" | "inteligencia";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  detail: string;
}

export interface Family {
  id: FamilyId;
  name: string;
  headline: string;
  colorVar: string; // tailwind token suffix: infra | admin | ident | intel
  products: Product[];
}

export const FAMILIES: Family[] = [
  {
    id: "infraestructura",
    name: "Infraestructura de Video",
    headline: "El sistema operativo del centro de monitoreo y el cofre legal de la evidencia.",
    colorVar: "infra",
    products: [
      {
        id: "control-center",
        name: "Control Center",
        tagline: "El núcleo del sistema (VMS)",
        detail:
          "El sistema operativo del centro de monitoreo: donde se visualizan y operan las cámaras en vivo. Todo nace y se administra desde acá.",
      },
      {
        id: "biblioteca-digital",
        name: "Biblioteca Digital",
        tagline: "Evidencia legal en la nube",
        detail:
          "El cofre legal y auditable donde la evidencia se preserva con trazabilidad. Estados: Descargado, Pre-aprobado, Aprobado, Denegado, Finalizado, Vencido.",
      },
    ],
  },
  {
    id: "administracion",
    name: "Administración",
    headline: "El panel maestro: usuarios, permisos y reglas de todo el sistema.",
    colorVar: "admin",
    products: [
      {
        id: "configurator",
        name: "Configurator",
        tagline: "Usuarios y permisos",
        detail:
          "Panel maestro de configuración, de uso principalmente interno: alta y baja de operadores, qué ve y controla cada perfil, y trazabilidad (quién, qué y cuándo).",
      },
    ],
  },
  {
    id: "identificacion",
    name: "Identificación",
    headline: "De las patentes a los rostros: identificar vehículos y personas en tiempo real.",
    colorVar: "ident",
    products: [
      {
        id: "central-alarmas",
        name: "Central de Alarmas y Monitoreo",
        tagline: "Lectura de patentes ANPR / ALPR",
        detail:
          "ANPR/ALPR = Reconocimiento Automático de Patentes. Vista web con mapa, lista de patentes y alarmas en tiempo real. Versiones Mobile para operación en calle.",
      },
      {
        id: "reconocimiento-facial",
        name: "Reconocimiento Facial",
        tagline: "Identificación biométrica",
        detail:
          "Misma familia que ANPR, aplicada a personas: enrolamiento con DNI, listas de búsqueda y alertas en tiempo real con ubicación del evento.",
      },
      {
        id: "tvf",
        name: "TVF — Tránsito Vecinal Frecuente",
        tagline: "Identificación en pasos de frontera",
        detail:
          "Identificación de rostro y registro de patentes en pasos fronterizos. TVF Web para administradores y operadores en punto de control; TVF Tablet para operadores en calle (control vehicular, peatonal y logístico).",
      },
    ],
  },
  {
    id: "inteligencia",
    name: "Inteligencia",
    headline: "La misma capa de IA puede mirar el presente o investigar el pasado.",
    colorVar: "intel",
    products: [
      {
        id: "analiticas-tiempo-real",
        name: "Analíticas en Tiempo Real",
        tagline: "Alertas en el momento",
        detail:
          "Cruce de línea perimetral, merodeo/amontonamiento e incidentes de tránsito (ITS): vehículos detenidos, en contramano o accidentes.",
      },
      {
        id: "analiticas-forenses",
        name: "Analíticas Forenses",
        tagline: "Búsqueda por atributos",
        detail:
          "Búsqueda de eventos pasados por atributos (color, vestimenta, rango horario, tipo) sin mirar horas de grabación.",
      },
    ],
  },
];

export interface QuizQuestion {
  id: string;
  family: FamilyId;
  question: string;
  options: string[];
  correctIndex: number;
  reinforcement: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    family: "infraestructura",
    question: "¿Cuál es el núcleo del sistema desde donde nace y se administra todo?",
    options: ["Biblioteca Digital", "Control Center", "Configurator", "Central de Alarmas"],
    correctIndex: 1,
    reinforcement:
      "Control Center es el sistema operativo del centro de monitoreo: todo nace y se administra desde ahí.",
  },
  {
    id: "q2",
    family: "infraestructura",
    question: "¿Dónde se preserva la evidencia con trazabilidad legal y auditable?",
    options: ["Control Center", "Configurator", "Biblioteca Digital", "TVF Web"],
    correctIndex: 2,
    reinforcement:
      "La Biblioteca Digital es el cofre legal de la evidencia, con estados como Pre-aprobado, Aprobado y Finalizado.",
  },
  {
    id: "q3",
    family: "administracion",
    question: "¿Qué producto gestiona usuarios, permisos y trazabilidad del sistema?",
    options: ["Configurator", "Control Center", "Analíticas", "Reconocimiento Facial"],
    correctIndex: 0,
    reinforcement:
      "Configurator es el panel maestro: alta/baja de operadores, permisos por perfil y registro de quién hizo qué.",
  },
  {
    id: "q4",
    family: "identificacion",
    question: "¿Qué significa ANPR / ALPR?",
    options: [
      "Alerta Nacional de Personas Requeridas",
      "Reconocimiento Automático de Patentes",
      "Análisis de Redes y Perímetros",
      "Registro Avanzado de Pasos Fronterizos",
    ],
    correctIndex: 1,
    reinforcement:
      "ANPR/ALPR = Automatic Number/License Plate Recognition: reconocimiento automático de patentes.",
  },
  {
    id: "q5",
    family: "identificacion",
    question:
      "¿Qué producto combina identificación de rostro y registro de patentes en pasos de frontera?",
    options: ["Central de Alarmas", "Reconocimiento Facial Mobile", "TVF", "Configurator"],
    correctIndex: 2,
    reinforcement:
      "TVF (Tránsito Vecinal Frecuente) opera en pasos fronterizos con versión Web para el punto de control y Tablet para operadores en calle.",
  },
  {
    id: "q6",
    family: "inteligencia",
    question:
      "Buscar eventos pasados por atributos (color, vestimenta, horario) sin mirar horas de grabación es una analítica…",
    options: ["En tiempo real", "Forense", "Perimetral", "De tránsito (ITS)"],
    correctIndex: 1,
    reinforcement:
      "Las analíticas forenses investigan hacia el pasado; las de tiempo real alertan en el momento (cruce de línea, merodeo, ITS).",
  },
];

export const AREAS = [
  "QA",
  "PM",
  "PO",
  "UX/UI",
  "FRONT/BACKEND",
  "DATA - I+D",
  "MESA DE AYUDA",
  "ADMINISTRACION",
  "COMUNICACION/MARKETING",
  "LOGISTICA",
  "RRHH",
  "GERENCIA",
  "OTRO",
] as const;

export const FAMILY_LABEL: Record<FamilyId, string> = {
  infraestructura: "Infraestructura",
  administracion: "Administración",
  identificacion: "Identificación",
  inteligencia: "Inteligencia",
};
