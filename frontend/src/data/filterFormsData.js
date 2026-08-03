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
};