export const filterFormsData = {
  calificaciones: {
    fields: [
      {
        id: "grupo",
        type: "select",
        label: "Grupo:",
        optionsKey: "grupos",
        required: true,
      },
      {
        id: "asignatura",
        type: "select",
        label: "Asignatura:",
        optionsKey: "asignaturas",
        required: true,
      },
      {
        id: "periodo",
        type: "select",
        label: "Periodo:",
        optionsKey: "periodos",
        required: true,
      },
    ],
  },

  attendance: {
    fields: [
      {
        id: "grupo",
        type: "select",
        label: "Grupo:",
        optionsKey: "grupos",
        required: true,
      },
      {
        id: "asignatura",
        type: "select",
        label: "Asignatura:",
        optionsKey: "asignaturas",
        required: true,
      },
      {
        id: "periodo",
        type: "select",
        label: "Periodo:",
        optionsKey: "periodos",
        required: true,
      },
      {
        id: "duracion",
        type: "select",
        label: "Duración:",
        optionsKey: "duraciones",
        required: true,
      },
    ],
  },
  tareas: {
    fields: [
      {
        id: "grupo",
        type: "select",
        label: "Grupo:",
        optionsKey: "grupos",
        required: true,
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "asignatura",
        type: "select",
        label: "Asignatura:",
        optionsKey: "asignaturas",
        required: true,
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "fechaInicio",
        type: "date",
        label: "Fecha de Inicio:",
        required: true,
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "fechaFin",
        type: "date",
        label: "Fecha de Fin:",
        required: true,
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "tema",
        type: "text",
        label: "Tema:",
        required: true,
        placeholder: "Escribe aquí...",
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "descripcion",
        type: "textarea",
        label: "Descripción:",
        required: true,
        placeholder: "Describe aquí la actividad...",
        rows: 4,
        validation: { required: "Este campo es obligatorio" },
      },
      {
        id: "url",
        type: "url",
        label: "URL:",
        required: false,
        placeholder: "https://...",
      },
      {
        id: "attached",
        type: "file",
        label: "Adjunto:",
        required: false,
      },
    ],
  },
};
