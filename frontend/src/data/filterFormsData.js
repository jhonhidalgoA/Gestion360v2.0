
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
        dependsOn: "grupo",
      },
      {
        id: "periodo",
        type: "select",
        label: "Periodo:",
        optionsKey: "periodos",
        required: true,
        dependsOn: "asignatura",
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

  reportes: {
    fields: [
      {
        id: "grupo",
        type: "select",
        label: "Grupo:",
        optionsKey: "grupos",
        required: true,
      },
      {
        id: "estudiante",
        type: "select",
        label: "Estudiante:",
        optionsKey: "estudiantes",
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

  tareas: {
    rows: [
      {
        number: 1,
        title: "Grupo - Asignatura",
        className: "form-row_tasks",
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
            dependsOn: "grupo",
          },
        ],
      },
      {
        number: 2,
        title: "Fechas",
        className: "form-row",
        fields: [
          {
            id: "fechaInicio",
            type: "date",
            label: "Fecha de Inicio:",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "asignatura",
          },
          {
            id: "fechaFin",
            type: "date",
            label: "Fecha de Fin:",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "fechaInicio",
          },
        ],
      },
      {
        number: 3,
        title: "Tema - Descripción",
        className: "form-row",
        fields: [
          {
            id: "tema",
            type: "text",
            label: "Tema:",
            required: true,
            placeholder: "Escribe aquí...",
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "fechaFin",
            dependsOnLabel: "Fecha de Fin",
          },
          {
            id: "attached",
            type: "file",
            label: "Adjunto:(opcional)",
            required: false,
          },
        ],
      },
      {
        className: "",
        fields: [
          {
            id: "descripcion",
            type: "textarea",
            label: "Descripción:",
            required: true,
            placeholder: "Describe aquí la actividad...",
            rows: 4,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "tema",
            dependsOnLabel: "Tema",
          },
        ],
      },
    ],
  },

  comunication: {
    rows: [
      {
        id: "destinatarios",
        number: 1,
        title: "Grupo - Asignatura",
        fields: [
          {
            id: "grupo",
            type: "select",
            label: "Grupo:",
            optionsKey: "grados",
            required: true,
            placeholder: "Seleccione un grupo",
          },
        ],
      },
      {
        id: "mensaje",
        number: 2,
        title: "Mensaje",
        fields: [],
      },
    ],
  },

  observador: {
    fields: [
      {
        id: "grupo",
        type: "select",
        label: "Grupo:",
        optionsKey: "grupos",
        required: true,
      },
      {
        id: "estudiante",
        type: "select",
        label: "Estudiante:",
        optionsKey: "estudiantes",
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
        id: "asignatura",
        type: "select",
        label: "Asignatura — opcional:",
        optionsKey: "asignaturas",
        required: false,
      },
    ],

    detailRows: [
      {
        className: "form-row",
        fields: [
          { id: "fecha", type: "date", label: "Fecha:", required: true },
          {
            id: "otorgadoPor",
            type: "select",
            dynamicOptions: "grantedByOptions",
            dynamicLabel: "grantedByLabel",
            required: false,
          },
        ],
      },
      {
        className: "form-row",
        classNameMap: { falta: "form-row-3" },
        fields: [
          {
            id: "tipoDetalle",
            type: "select",
            dynamicOptions: "options",
            dynamicLabel: "fieldLabel",
            required: true,
          },
          {
            id: "medidaCorrectiva",
            type: "select",
            dynamicOptions: "correctiveOptions",
            dynamicLabel: "correctiveLabel",
            showFor: ["falta"],
            required: false,
          },
          {
            id: "estadoCaso",
            type: "select",
            dynamicOptions: "caseStatusOptions",
            dynamicLabel: "caseStatusLabel",
            showFor: ["falta"],
            required: false,
          },
        ],
      },
      {
        className: "",
        fields: [
          {
            id: "descripcion",
            type: "textarea",
            showFor: ["falta"],
            dynamicLabel: "resumenLabel",
            rows: 3,
            required: true,
          },
        ],
      },
      {
        className: "",
        fields: [
          {
            id: "descripcion",
            type: "textarea",
            dynamicLabel: "descriptionLabel",
            placeholder: "Escribe aquí el detalle de la novedad...",
            rows: 4,
            required: true,
          },
        ],
      },
    ],
    defenseStatement: {
      title: "DESCARGOS",
      showFor: ["falta"],
      cards: [
        {
          id: "estudiante",
          name: "Descargos del estudiante",
          badge: "Pendiente",
          fields: [
            {
              id: "descargoEstudiante",
              type: "textarea",
              placeholder: "Explicación del estudiante sobre lo ocurrido",
              rows: 3,
            },
            {
              id: "fechaDescargoEstudiante",
              type: "date",
              label: "Fecha de los descargos",
            },
          ],
        },
        {
          id: "acudiente",
          name: "Descargos del acudiente",
          badge: "Pendiente",
          fields: [
            {
              id: "descargoAcudiente",
              type: "textarea",
              placeholder:
                "Explicación o posición del acudiente frente al caso",
              rows: 3,
            },
            {
              id: "fechaDescargoAcudiente",
              type: "date",
              label: "Fecha de los descargos",
            },
          ],
        },
      ],
    },
  },

  planning: {
    rows: [
      {
        sectionTitle: "1. Información Básica",
        sectionClassName: "section-title",
        className: "form-row-3",
        fields: [
          {
            id: "fechaInicio",
            type: "date",
            label: "Fecha de inicio:",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "fechaFin",
            type: "date",
            label: "Fecha de fin:",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "periodo",
            type: "select",
            label: "Periodo:",
            optionsKey: "periodos",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
      {
        className: "form-row-3",
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
            id: "tipo",
            type: "select",
            label: "Tipo:",
            optionsKey: "typePlan",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
    ],
  },

  standards: {
    rows: [
      {
        sectionTitle: "2. Estandares y DBA",
        sectionClassName: "section-title",
        className: "form-row-3",
        fields: [
          {
            id: "nombreUnidad",
            type: "text",
            label: "Nombre de la unidad:",
            placeholder: "Ej: Números enteros, Literatura Colombiana",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "nombreTema",
            type: "text",
            label: "Nombre del tema:",
            placeholder: "Ej: Orden de los números, Literatura indígena",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "tipo",
            type: "select",
            label: "Proyecto transversal:",
            optionsKey: "projectCurricular",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
      {
        className: "form-row-3",
        fields: [
          {
            id: "estandar",
            type: "select",
            label: "Estándar:",
            optionsKey: "estandares",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "dba",
            type: "select",
            label: "DBA:",
            optionsKey: "dba",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "evidenciaAprendizaje",
            type: "select",
            label: "Evidencia de Aprendizaje:",
            optionsKey: "evidenciasAprendizaje",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
    ],
  },

  development: {
    rows: [
      {
        sectionTitle: "3. Desarrollo de la clase",
        sectionClassName: "section-title",
        className: "form-row-2",
        fields: [
          {
            id: "competencias",
            type: "textarea",
            label: "Competencias:",
            placeholder: "Escribe aquí las competencias a desarrollar...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "objetivos",
            type: "textarea",
            label: "Objetivos:",
            placeholder: "Escribe aquí los objetivos a desarrollar...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
      {
        className: "form-row-2",
        fields: [
          {
            id: "saberesPrevios",
            type: "textarea",
            label: "Saberes previos (inicio):",
            placeholder:
              "Describe actividades o preguntas para activar conocimientos previos...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "analiza",
            type: "textarea",
            label: "Analiza:",
            placeholder:
              "Describe los temas, explicaciones, ejemplos o actividades del desarrollo...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
    ],
  },
  contentEvaluation: {
    rows: [
      {
        sectionTitle: "4. Contenidos y Evaluación",
        sectionClassName: "section-title",
        className: "form-row-2",
        fields: [
          {
            id: "contenidos",
            type: "textarea",
            label: "Contenidos:",
            placeholder:
              "Describe los temas, explicaciones, ejemplos o actividades del desarrollo...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
          {
            id: "evaluacion",
            type: "textarea",
            label: "Evaluación:",
            placeholder:
              "Describe cómo se evaluará el aprendizaje (instrumentos, criterios, actividades)...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
          },
        ],
      },
      {
        className: "form-row-2",
        fields: [
          {
            id: "observaciones",
            type: "textarea",
            label: "Observaciones:",
            placeholder: "Notas adicionales, adaptaciones, incidencias, etc.",
            required: false,
          },
          {
            id: "bibliografia",
            type: "textarea",
            label: "Bibliografía / recursos:",
            placeholder:
              "Libros, páginas web, videos, materiales utilizados...",
            required: false,
          },
        ],
      },
    ],
  },
};
