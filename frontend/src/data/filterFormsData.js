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
      {
        id: "duracion",
        type: "select",
        label: "Duración:",
        optionsKey: "duraciones",
        required: true,
        dependsOn: "periodo",
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
        dependsOn: "grupo",
      },
      {
        id: "periodo",
        type: "select",
        label: "Periodo:",
        optionsKey: "periodos",
        required: true,
        dependsOn: "estudiante",
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
            placeholder: "Seleccione un grupo",
          },
          {
            id: "asignatura",
            type: "select",
            label: "Asignatura:",
            optionsKey: "asignaturas",
            required: true,
            dependsOn: "grupo",
            placeholder: "Seleccione una asignatura",
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
            dependsOn: "asignatura",
            placeholder: "Seleccione fecha de inicio",
          },
          {
            id: "fechaFin",
            type: "date",
            label: "Fecha de Fin:",
            required: true,
            dependsOn: "fechaInicio",
            placeholder: "Seleccione fecha de fin",
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
            placeholder: "Escribir el  tema",
            dependsOn: "fechaFin",
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
            placeholder: "Escribir la descripción de la tarea",
            rows: 4,
            dependsOn: "tema",
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
        title: "Destinatarios",
        fields: [
          {
            id: "grupo",
            type: "select",
            label: "Grupo:",
            optionsKey: "grupos",
            required: true,
            placeholder: "Seleccione un grupo",
          },
          {
            id: "estudiante",
            type: "select",
            label: "Estudiante:",
            required: true,
            dependsOn: "grupo",
            placeholder: "Seleccione una opción",
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
        dependsOn: "grupo",
      },
      {
        id: "periodo",
        type: "select",
        label: "Periodo:",
        optionsKey: "periodos",
        required: true,
        dependsOn: "estudiante",
      },
      {
        id: "asignatura",
        type: "select",
        label: "Asignatura — opcional:",
        optionsKey: "asignaturas",
        required: false,
        dependsOn: "periodo",
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
            dependsOn: "fecha",
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
            dependsOn: "otorgadoPor",
            required: true,
          },
          {
            id: "medidaCorrectiva",
            type: "select",
            dynamicOptions: "correctiveOptions",
            dynamicLabel: "correctiveLabel",
            dependsOn: "tipoDetalle",
            showFor: ["falta"],
            required: false,
          },
          {
            id: "estadoCaso",
            type: "select",
            dynamicOptions: "caseStatusOptions",
            dynamicLabel: "caseStatusLabel",
            dependsOn: "medidaCorrectiva",
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
            dependsOn: "estadoCaso",
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
            dependsOn: "tipoDetalle",
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
            dependsOn: "fechaInicio",
          },
          {
            id: "periodo",
            type: "select",
            label: "Periodo:",
            optionsKey: "periodos",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "fechaFin",
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
            dependsOn: "periodo",
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
          {
            id: "actividadAcademica",
            type: "select",
            label: "Actividad Académica:",
            optionsKey: "typePlan",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "asignatura",
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
            dependsOn: "actividadAcademica",
          },
          {
            id: "nombreTema",
            type: "text",
            label: "Nombre del tema:",
            placeholder: "Ej: Orden de los números, Literatura indígena",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "nombreUnidad",
          },
          {
            id: "proyectoTransversal",
            type: "select",
            label: "Proyecto transversal:",
            optionsKey: "projectCurricular",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "nombreTema",
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
            dependsOn: "proyectoTransversal",
          },
          {
            id: "dba",
            type: "select",
            label: "DBA:",
            optionsKey: "dba",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "estandar",
          },
          {
            id: "evidenciaAprendizaje",
            type: "select",
            label: "Evidencia de Aprendizaje:",
            optionsKey: "evidenciasAprendizaje",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "dba",
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
            dependsOn: "evidenciaAprendizaje",
          },
          {
            id: "objetivos",
            type: "textarea",
            label: "Objetivos:",
            placeholder: "Escribe aquí los objetivos a desarrollar...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "competencias",
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
            dependsOn: "objetivos",
          },
          {
            id: "analiza",
            type: "textarea",
            label: "Analiza:",
            placeholder:
              "Describe los temas, explicaciones, ejemplos o actividades del desarrollo...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "saberesPrevios",
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
            dependsOn: "analiza",
          },
          {
            id: "evaluacion",
            type: "textarea",
            label: "Evaluación:",
            placeholder:
              "Describe cómo se evaluará el aprendizaje (instrumentos, criterios, actividades)...",
            required: true,
            validation: { required: "Este campo es obligatorio" },
            dependsOn: "contenidos",
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

  enrollmentStudent: {
    sectionTitle: "1. Información del Estudiante",
    rows: [
      {
        id: "basicData",
        className: "form-row-4",
        fields: [
          {
            id: "enrollmentDate",
            type: "date",
            label: "Fecha de Matrícula:",
            readOnly: true,
            inputClassName: "input__field--auto",
          },
          {
            id: "studentCode",
            type: "text",
            label: "Código:",
            readOnly: true,
            inputClassName: "input__field--auto",
          },
          {
            id: "firstName",
            type: "text",
            label: "Nombres:",
            required: true,
            dependsOn: "studentCode",
          },
          {
            id: "lastName",
            type: "text",
            label: "Apellidos:",
            required: true,
            dependsOn: "firstName",
          },
        ],
      },
      {
        id: "personalData",
        className: "form-row-4",
        fields: [
          {
            id: "birthDate",
            type: "date",
            label: "Fecha de Nacimiento:",
            required: true,
            dependsOn: "lastName",
          },
          {
            id: "age",
            type: "text",
            label: "Edad:",
            required: true,
            readOnly: true,
            inputClassName: "input__field--auto",
          },
          {
            id: "gender",
            type: "select",
            label: "Género:",
            optionsKey: "genders",
            required: true,
            dependsOn: "birthDate",
          },
          {
            id: "birthPlace",
            type: "text",
            label: "Lugar de Nacimiento:",
            required: true,
            dependsOn: "gender",
          },
        ],
      },
      {
        id: "contactData",
        className: "form-row-4",
        fields: [
          {
            id: "documentType",
            type: "select",
            label: "Tipo de Documento:",
            optionsKey: "documentTypes",
            required: true,
            dependsOn: "birthPlace",
          },
          {
            id: "documentNumber",
            type: "text",
            label: "Número de Documento:",
            required: true,
            dependsOn: "documentType",
          },
          {
            id: "phone",
            type: "tel",
            label: "Teléfono:",
            required: true,
            dependsOn: "documentNumber",
          },
          {
            id: "email",
            type: "email",
            label: "Correo Electrónico:",
            placeholder: "ejemplo@dominio.com",
            required: true,
            dependsOn: "phone",
          },
        ],
      },
    ],
    documentsSection: {
      title: "DOCUMENTOS ENTREGADOS",
      options: [
        { id: "gradesCertificate", label: "Certificado de notas" },
        { id: "identityDocument", label: "Documento de identidad" },
        { id: "peaceAndSafe", label: "Paz y salvo" },
        { id: "vaccinationCard", label: "Carnet de vacunación" },
      ],
    },
  },
  schedules: {
    sectionTitle: "2. Información de la Matrícula",
    sections: [
      {
        id: "enrollmentData",
        rows: [
          {
            id: "academicData",
            className: "form-row-4",
            fields: [
              {
                id: "grade",
                type: "select",
                label: "Grado al que ingresa:",
                optionsKey: "grupos",
                required: true,
              },
              {
                id: "group",
                type: "select",
                label: "Grupo:",
                required: true,
                dependsOn: "grade",
              },
              {
                id: "shift",
                type: "select",
                label: "Jornada:",
                optionsKey: "shifts",
                required: true,
                dependsOn: "group",
              },
              {
                id: "enrollmentType",
                type: "select",
                label: "Tipo de Matrícula:",
                optionsKey: "enrollmentTypes",
                required: true,
                dependsOn: "shift",
              },
            ],
          },
        ],
      },
      {
        id: "origin",
        rows: [
          {
            id: "originRow",
            className: "form-row-4",
            fields: [
              {
                id: "previousSchool",
                type: "text",
                label: "Institución de procedencia:",
                required: false,
                dependsOn: "enrollmentType",
              },
              {
                id: "institutionType",
                type: "select",
                label: "Tipo de institución:",
                optionsKey: "institutionTypes",
                required: false,
                dependsOn: "previousSchool",
              },
              {
                id: "lastGrade",
                type: "select",
                label: "Último grado cursado:",
                optionsKey: "grupos",
                required: false,
                dependsOn: "institutionType",
              },
              {
                id: "previousYear",
                type: "number",
                label: "Año:",
                required: false,
                dependsOn: "lastGrade",
              },
            ],
          },
        ],
      },
      {
        id: "notes",
        rows: [
          {
            id: "notesRow",
            fields: [
              {
                id: "enrollmentNotes",
                type: "textarea",
                label: "Observaciones de la matrícula:",
                required: false,
                rows: 3,
                dependsOn: "previousYear",
              },
            ],
          },
        ],
      },
    ],
  },
  general: {
    sectionTitle: "3. Información general del estudiante",
    sections: [
      {
        id: "generalInformation",
        rows: [
          {
            id: "residenceRow",
            className: "form-row-5",
            fields: [
              {
                id: "residenceAddress",
                type: "text",
                label: "Dirección de Residencia:",
                required: true,
              },
              {
                id: "neighborhood",
                type: "text",
                label: "Barrio:",
                required: true,
              },
              {
                id: "locality",
                type: "text",
                label: "Localidad:",
                required: true,
              },
              {
                id: "stratum",
                type: "select",
                label: "Estrato:",
                optionsKey: "strata",
                required: true,
              },
              {
                id: "zone",
                type: "select",
                label: "Zona:",
                optionsKey: "zones",
                required: true,
              },
            ],
          },
        ],
      },
      {
        id: "referentialInformation",
        rows: [
          {
            id: "referentialRow",
            className: "form-row-5",
            fields: [
              {
                id: "eps",
                type: "text",
                label: "EPS:",
                required: false,
              },
              {
                id: "healthRegime",
                type: "select",
                label: "Régimen de salud:",
                optionsKey: "healthRegimes",
                required: false,
              },
              {
                id: "bloodGroup",
                type: "select",
                label: "Grupo sanguíneo:",
                optionsKey: "bloodGroups",
                required: false,
              },
              {
                id: "ethnicGroup",
                type: "select",
                label: "Grupo étnico:",
                optionsKey: "ethnicGroups",
                required: false,
              },
              {
                id: " victimStatus",
                type: "select",
                label: "Información Referencial:",
                optionsKey: "victimStatus",
                required: false,
              },
            ],
          },
        ],
      },

      {
        id: "familyAndEducationalSupport",
        rows: [
          {
            id: "familyAndEducationalSupportRow",
            className: "form-row-4",
            fields: [
              {
                id: "hasSiblingsAtSchool",
                type: "toggle",
                label: "¿Tiene hermanos en el colegio?",
                required: false,
              },
              {
                id: "siblingsDetails",
                type: "text",
                label: "¿Cuáles?",
                placeholder: "Nombres",
                required: false,
              },
              {
                id: "requiresPedagogicalSupport",
                type: "toggle",
                label: "¿Requiere apoyo pedagógico ?",
                required: false,
              },
              {
                id: "pedagogicalSupportDetails",
                type: "text",
                label: "Detalle:",
                placeholder: "Descripción breve",
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },
  father: {
    sectionTitle: "4. Información del padre",
    sections: [
      {
        id: "fatherData",
        rows: [
          {
            id: "fatherIdentityRow",
            className: "form-row-4",
            fields: [
              {
                id: "fatherNames",
                type: "text",
                label: "Nombres:",
                placeholder: "Nombres completos",
                required: true,
              },
              {
                id: "fatherLastNames",
                type: "text",
                label: "Apellidos:",
                placeholder: "Apellidos completos",
                required: true,
              },
              {
                id: "fatherDocumentType",
                type: "select",
                label: "Tipo de documento:",
                optionsKey: "documentTypes",
                required: true,
              },
              {
                id: "fatherDocumentNumber",
                type: "text",
                label: "Número de documento:",
                placeholder: "Sin puntos ni espacios",
                required: true,
              },
            ],
          },
          {
            id: "fatherContactRow",
            className: "form-row-4",
            fields: [
              {
                id: "fatherMobile",
                type: "text",
                label: "Celular / WhatsApp:",
                placeholder: "300 000 0000",
                required: true,
              },

              {
                id: "fatherEmail",
                type: "text",
                label: "Correo electrónico:",
                placeholder: "nombre@correo.com",
                required: true,
              },
              {
                id: "fatherEducationLevel",
                type: "select",
                label: "Nivel educativo:",
                optionsKey: "educationLevels",
                required: false,
              },
              {
                id: "fatherProfession",
                type: "text",
                label: "Profesión:",
                placeholder: "Ingrese la profesión u oficio",
                required: false,
              },
            ],
          },
          {
            id: "fatherWorkRow",
            className: "form-row-4",
            fields: [
              {
                id: "fatherOccupation",
                type: "text",
                label: "Ocupación:",
                placeholder: "Ej. Contador",
                required: false,
              },

              {
                id: "fatherLivesWithStudent",
                type: "toggle",
                label: "¿Vive con el estudiante?",
                required: false,
              },
              {
                id: "fatherAddress",
                type: "text",
                label: "Dirección de residencia:",
                placeholder: "Calle, número, barrio",
                required: true,
              },
              {
                id: "fatherCity",
                type: "text",
                label: "Ciudad:",
                placeholder: "Ciudad",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
  mother: {
    sectionTitle: "5. Información de la madre",
    sections: [
      {
        id: "motherData",
        rows: [
          {
            id: "motherIdentityRow",
            className: "form-row-4",
            fields: [
              {
                id: "motherNames",
                type: "text",
                label: "Nombres:",
                placeholder: "Nombres completos",
                required: true,
              },
              {
                id: "motherLastNames",
                type: "text",
                label: "Apellidos:",
                placeholder: "Apellidos completos",
                required: true,
              },
              {
                id: "motherDocumentType",
                type: "select",
                label: "Tipo de documento:",
                optionsKey: "documentTypes",
                required: true,
              },
              {
                id: "motherDocumentNumber",
                type: "text",
                label: "Número de documento:",
                placeholder: "Sin puntos ni espacios",
                required: true,
              },
            ],
          },
          {
            id: "motherContactRow",
            className: "form-row-4",
            fields: [
              {
                id: "motherMobile",
                type: "text",
                label: "Celular / WhatsApp:",
                placeholder: "300 000 0000",
                required: true,
              },              
              {
                id: "motherEmail",
                type: "text",
                label: "Correo electrónico:",
                placeholder: "nombre@correo.com",
                required: true,
              },
              {
                id: "motherEducationLevel",
                type: "select",
                label: "Nivel educativo:",
                optionsKey: "educationLevels",
                required: false,
              },
               {
                id: "motherProfession",
                type: "text",
                label: "Profesión:",
                placeholder: "Ingrese la profesión u oficio",
                required: false,
              },
            ],
          },
          {
            id: "motherWorkRow",
            className: "form-row-4",
            fields: [
              {
                id: "motherOccupation",
                type: "text",
                label: "Ocupación:",
                placeholder: "Ej. Contadora",
                required: false,
              },              
              {
                id: "motherLivesWithStudent",
                type: "toggle",
                label: "¿Vive con el estudiante?",
                required: false,
              },
              {
                id: "motherAddress",
                type: "text",
                label: "Dirección de residencia:",
                placeholder: "Calle, número, barrio",
                required: true,
              },
              {
                id: "motherCity",
                type: "text",
                label: "Ciudad:",
                placeholder: "Ciudad",
                required: true,
              },
            ],
          },
         
        ],
      },
    ],
  },
    emergency: {
    id: "emergencyContact",
    title: "Contacto de emergencia",
    columns: [
      {
        id: "emergencyContact1",
        title: "Contacto 1",
        rows: [
          {
            id: "emergencyRow",
            className: "form-row-3",
            fields: [
              {
                id: "emergencyName",
                type: "text",
                label: "Nombre completo:",
                required: true,
              },
              {
                id: "emergencyRelationship",
                type: "text",
                label: "Parentesco:",
                required: true,
              },
              {
                id: "emergencyPhone",
                type: "text",
                label: "Celular / WhatsApp:",
                required: true,
              },
            ],
          },
        ],
      },
      {
        id: "emergencyContact2",
        title: "Contacto 2 (opcional)",
        rows: [
          {
            id: "emergencyRow2",
            className: "form-row-3",
            fields: [
              {
                id: "emergencyName2",
                type: "text",
                label: "Nombre completo:",
                required: false,
              },
              {
                id: "emergencyRelationship2",
                type: "text",
                label: "Parentesco:",
                required: false,
              },
              {
                id: "emergencyPhone2",
                type: "text",
                label: "Celular / WhatsApp:",
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },
};
