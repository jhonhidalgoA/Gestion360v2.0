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
};
