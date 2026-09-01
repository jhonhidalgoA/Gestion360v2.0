import { FaBookOpen, FaCalendarAlt, FaPen } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";

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
        title: "Grupo - Asignatura",
        icon: FaBookOpen,
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
          },
        ],
      },
      {
        title: "Fechas",
        icon: FaCalendarAlt,
        className: "form-row",
        fields: [
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
        ],
      },
      {
        title: "Tema e instrucciones",
        icon: FaPen,
        className: "form-row",
        fields: [
          {
            id: "tema",
            type: "text",
            label: "Tema:",
            required: true,
            placeholder: "Escribe aquí...",
            validation: { required: "Este campo es obligatorio" },
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
          },
        ],
      },
    ],
  },

  comunication: {
    rows: [
      {
        id: "destinatarios",
        title: "DESTINATARIOS",
        icon: FiUsers,
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
        title: "MENSAJE",
        icon: FaPenToSquare,
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
      {
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
            id: "nombreUnidad",
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
    ],
  },
};