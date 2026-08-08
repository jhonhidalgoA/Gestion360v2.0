export const requirementLabels = {
  grupo: "Grupo",
  estudiante: "Estudiante",
  asignatura: "Asignatura",
  periodo: "Período",
};




export const reportsConfig = [
  {
    id: "boletin",
    category: "Documento",
    icon: "description",
    title: "Boletín de Calificaciones",
    subtitle: "Resumen consolidado de todas las asignaturas del periodo.",
    iconColor: "var(--color-accent)",

    requirements: [
      "grupo",
      "estudiante",
      "periodo",
    ],

    format: {
      type: "pdf",
      icon: "picture_as_pdf",
      label: "PDF",
    },

    action: {
      type: "generate",
    },

    handlerKey: "handleBoletinClick",
  },

  {
    id: "asistencia",
    category: "Asistencia",
    icon: "calendar_today",
    title: "Control de Asistencia",
    subtitle: "Asistencias, ausencias y llegadas tarde por fecha.",
    iconColor: "var(--color-success)",

    requirements: [
      "grupo",
      "estudiante",
      "periodo",
    ],

    format: {
      type: "system",
      icon: "desktop_windows",
      label: "Sistema",
    },

    action: {
      type: "open",
    },

    handlerKey: "handleValidateOnly",
  },

  {
    id: "certificado",
    category: "Documento",
    icon: "assignment_turned_in",
    title: "Certificado Escolar",
    subtitle: "Constancia oficial de matrícula y estado académico.",
    iconColor: "var(--btn-pdf)",

    requirements: [
      "grupo",
      "estudiante",
    ],

    format: {
      type: "pdf",
      icon: "picture_as_pdf",
      label: "PDF",
    },

    action: {
      type: "generate",
    },

    handlerKey: "handleCertificadoClick",
  },

  {
    id: "observador",
    category: "Convivencia",
    icon: "assignment",
    title: "Observador Escolar",
    subtitle: "Registro de convivencia, novedades y compromisos.",
    iconColor: "var(--color-error)",

    requirements: [
      "grupo",
      "estudiante",
    ],

    format: {
      type: "pdf",
      icon: "picture_as_pdf",
      label: "PDF",
    },

    action: {
      type: "open",
    },

    handlerKey: "handleValidateOnly",
  },
];