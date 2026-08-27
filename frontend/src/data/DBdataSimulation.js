export const optionsMap = {
  grupos: [
    { value: "preescolar", label: "Preescolar" },
    { value: "primero", label: "Primero" },
    { value: "segundo", label: "Segundo" },
    { value: "tercero", label: "Tercero" },
    { value: "cuarto", label: "Cuarto" },
    { value: "quinto", label: "Quinto" },
    { value: "sexto", label: "Sexto" },
    { value: "septimo", label: "Séptimo" },
    { value: "octavo", label: "Octavo" },
    { value: "noveno", label: "Noveno" },
    { value: "decimo", label: "Décimo" },
    { value: "undecimo", label: "Undécimo" },
  ],

  asignaturas: [
    { value: "ciencias_naturales", label: "Ciencias Naturales" },
    { value: "biologia", label: "Biología" },
    { value: "quimica", label: "Química" },
    { value: "fisica", label: "Física" },

    { value: "ciencias_sociales", label: "Ciencias Sociales" },
    { value: "historia", label: "Historia" },
    { value: "geografia", label: "Geografía" },
    { value: "constitucion_democracia", label: "Constitución y Democracia" },
    { value: "catedra_paz", label: "Cátedra de Paz" },

    { value: "lengua_castellana", label: "Lengua Castellana" },
    { value: "ingles", label: "Inglés" },

    { value: "matematicas", label: "Matemáticas" },
    { value: "geometria", label: "Geometría" },
    { value: "estadistica", label: "Estadística" },
    { value: "trigonometria", label: "Trigonometría" },

    { value: "tecnologia_informatica", label: "Tecnología e Informática" },

    { value: "educacion_artistica", label: "Educación Artística y Cultural" },

    { value: "educacion_etica", label: "Educación Ética y en Valores" },

    {
      value: "educacion_fisica",
      label: "Educación Física, Recreación y Deportes",
    },

    { value: "educacion_religiosa", label: "Educación Religiosa" },
  ],

  periodos: [
    { value: "1", label: "Periodo 1" },
    { value: "2", label: "Periodo 2" },
    { value: "3", label: "Periodo 3" },
    { value: "4", label: "Periodo 4" },
  ],

  duraciones: [
    { value: "1", label: "1 hora" },
    { value: "2", label: "2 horas" },
    { value: "3", label: "3 horas" },
  ],
};

export const observationFormConfig = {
  reconocimiento: {
    fieldLabel: "Tipo de reconocimiento:",
    options: [
      { value: "academico", label: "Académico" },
      { value: "deportivo", label: "Deportivo" },
      { value: "cultural", label: "Cultural / Artístico" },
      {
        value: "convivencial",
        label: "Convivencial (comportamiento ejemplar)",
      },
      { value: "liderazgo", label: "Liderazgo" },
      { value: "investigativo", label: "Investigativo / Científico" },
      { value: "solidaridad", label: "Solidaridad y valores" },
      { value: "asistencia", label: "Asistencia y puntualidad" },
    ],
    grantedByLabel: "Reconocido por:",
    grantedByOptions: [
      { value: "docente", label: "Docente de área" },
      { value: "direccion", label: "Dirección de grupo" },
      { value: "coordinacion", label: "Coordinación académica" },
      { value: "rectoria", label: "Rectoría" },
      { value: "comite", label: "Comité de convivencia" },
    ],
    descriptionLabel: "Descripción del logro",
  },

  falta: {
    fieldLabel: "Tipo de falta:",
    options: [
      { value: "tipo1", label: "1. Tipo I — Leve" },
      { value: "tipo2", label: "2. Tipo II — Grave" },
      { value: "tipo3", label: "3. Tipo III — Gravísima" },
    ],
    correctiveLabel: "Artículo:",
    correctiveOptions: [
      { value: "verbal", label: "Amonestación verbal" },
      { value: "escrita", label: "Amonestación escrita" },
      { value: "citacion", label: "Citación al acudiente" },
      { value: "comunitario", label: "Trabajo comunitario" },
      { value: "suspension", label: "Suspensión temporal" },
    ],
    caseStatusLabel: "Numeral:",
    caseStatusOptions: [
      { value: "revision", label: "En revisión" },
      { value: "citacion", label: "Citación programada" },
      { value: "comite", label: "Comité programado" },
      { value: "cerrado", label: "Cerrado" },
    ],
    grantedByLabel: "¿Quién reporta?:",
    grantedByOptions: [
      { value: "docente", label: "1. Docente de área" },
      { value: "coordinacion", label: "2. Coordinación disciplinaria" },
      { value: "comite", label: "3. Comité de convivencia" },
    ],
    descriptionLabel: "Descripción de la falta",
    resumenLabel: "Descripción",
  },
};


const mockStudents = [
  // Preescolar
  { id: 1, nombre: "Emilia Rodríguez Vargas", grupo: "preescolar", estado: "Estudiante activo" },
  { id: 2, nombre: "Mateo González Herrera", grupo: "preescolar", estado: "Estudiante activo" },
  { id: 3, nombre: "Salomé Martínez Castro", grupo: "preescolar", estado: "Estudiante activo" },
  { id: 4, nombre: "Samuel Herrera Cárdenas", grupo: "preescolar", estado: "Estudiante activo" },
  { id: 5, nombre: "Antonella Vargas Rojas", grupo: "preescolar", estado: "Estudiante activo" },

  // Primero
  { id: 6, nombre: "Sofía Ramírez López", grupo: "primero", estado: "Estudiante activo" },
  { id: 7, nombre: "Tomás Restrepo Morales", grupo: "primero", estado: "Estudiante activo" },
  { id: 8, nombre: "Valentina Castro Jiménez", grupo: "primero", estado: "Estudiante activo" },
  { id: 9, nombre: "Juan David Morales Sánchez", grupo: "primero", estado: "Estudiante activo" },
  { id: 10, nombre: "Mariana López Torres", grupo: "primero", estado: "Estudiante activo" },

  // Segundo
  { id: 11, nombre: "Isabella Torres Gómez", grupo: "segundo", estado: "Estudiante activo" },
  { id: 12, nombre: "Nicolás Gómez Pérez", grupo: "segundo", estado: "Estudiante activo" },
  { id: 13, nombre: "Luciana Pérez Moreno", grupo: "segundo", estado: "Estudiante activo" },
  { id: 14, nombre: "Santiago Moreno Sánchez", grupo: "segundo", estado: "Estudiante activo" },
  { id: 15, nombre: "Gabriela Sánchez Martínez", grupo: "segundo", estado: "Estudiante activo" },

  // Tercero
  { id: 16, nombre: "Martina Cárdenas Valencia", grupo: "tercero", estado: "Estudiante activo" },
  { id: 17, nombre: "Alejandro Rojas Jiménez", grupo: "tercero", estado: "Estudiante activo" },
  { id: 18, nombre: "Sara Jiménez Ospina", grupo: "tercero", estado: "Estudiante activo" },
  { id: 19, nombre: "Daniel Valencia Ortiz", grupo: "tercero", estado: "Estudiante activo" },
  { id: 20, nombre: "Manuela Ortiz Vélez", grupo: "tercero", estado: "Estudiante activo" },

  // Cuarto
  { id: 21, nombre: "Laura Vélez Arias", grupo: "cuarto", estado: "Estudiante activo" },
  { id: 22, nombre: "Juan Esteban Muñoz Duarte", grupo: "cuarto", estado: "Estudiante activo" },
  { id: 23, nombre: "Catalina Arias Navarro", grupo: "cuarto", estado: "Estudiante activo" },
  { id: 24, nombre: "Felipe Navarro Correa", grupo: "cuarto", estado: "Estudiante activo" },
  { id: 25, nombre: "Juliana Correa Molina", grupo: "cuarto", estado: "Estudiante activo" },

  // Quinto
  { id: 26, nombre: "María José Londoño Patiño", grupo: "quinto", estado: "Estudiante activo" },
  { id: 27, nombre: "Sebastián Patiño Giraldo", grupo: "quinto", estado: "Estudiante activo" },
  { id: 28, nombre: "Ana Sofía Giraldo Restrepo", grupo: "quinto", estado: "Estudiante activo" },
  { id: 29, nombre: "Miguel Ángel Duarte Salazar", grupo: "quinto", estado: "Estudiante activo" },
  { id: 30, nombre: "Gabriela Restrepo Quintero", grupo: "quinto", estado: "Estudiante activo" },

  // Sexto
  { id: 31, nombre: "Samuel Arango Mejía", grupo: "sexto", estado: "Estudiante activo" },
  { id: 32, nombre: "Valeria Quintero Ospina", grupo: "sexto", estado: "Estudiante activo" },
  { id: 33, nombre: "Mateo Salazar Castaño", grupo: "sexto", estado: "Estudiante activo" },
  { id: 34, nombre: "Mariana Ospina Rincón", grupo: "sexto", estado: "Estudiante activo" },
  { id: 35, nombre: "Nicolás Mejía Arboleda", grupo: "sexto", estado: "Estudiante activo" },

  // Séptimo
  { id: 36, nombre: "Sofía Restrepo Vélez", grupo: "septimo", estado: "Estudiante activo" },
  { id: 37, nombre: "Juan Sebastián López Vargas", grupo: "septimo", estado: "Estudiante activo" },
  { id: 38, nombre: "Camila Hernández Ruiz", grupo: "septimo", estado: "Estudiante activo" },
  { id: 39, nombre: "Daniel Felipe Vargas Molina", grupo: "septimo", estado: "Estudiante activo" },
  { id: 40, nombre: "Isabella Rincón Cardona", grupo: "septimo", estado: "Estudiante activo" },

  // Octavo
  { id: 41, nombre: "Santiago Castaño Echeverri", grupo: "octavo", estado: "Estudiante activo" },
  { id: 42, nombre: "María Fernanda Ruiz Gómez", grupo: "octavo", estado: "Estudiante activo" },
  { id: 43, nombre: "Andrés Felipe Gómez Molina", grupo: "octavo", estado: "Estudiante activo" },
  { id: 44, nombre: "Laura Sofía Molina Torres", grupo: "octavo", estado: "Estudiante activo" },
  { id: 45, nombre: "Tomás Echeverri Salazar", grupo: "octavo", estado: "Estudiante activo" },

  // Noveno
  { id: 46, nombre: "Valentina Zapata Arboleda", grupo: "noveno", estado: "Estudiante activo" },
  { id: 47, nombre: "Sebastián Arboleda Castaño", grupo: "noveno", estado: "Estudiante activo" },
  { id: 48, nombre: "Mariana Vélez Londoño", grupo: "noveno", estado: "Estudiante activo" },
  { id: 49, nombre: "Juan José Cardona Ríos", grupo: "noveno", estado: "Estudiante activo" },
  { id: 50, nombre: "Sofía Londoño Restrepo", grupo: "noveno", estado: "Estudiante activo" },

  // Décimo
  { id: 51, nombre: "Valentina Restrepo Muñoz", grupo: "decimo", estado: "Estudiante activo" },
  { id: 52, nombre: "Samuel Ortiz Cárdenas", grupo: "decimo", estado: "Estudiante activo" },
  { id: 53, nombre: "María José Gómez Ríos", grupo: "decimo", estado: "Estudiante activo" },
  { id: 54, nombre: "Juan Esteban Cárdenas Rojas", grupo: "decimo", estado: "Estudiante activo" },
  { id: 55, nombre: "Isabella Zapata Correa", grupo: "decimo", estado: "Estudiante activo" },

  // Undécimo
  { id: 56, nombre: "Camila Londoño Arango", grupo: "undecimo", estado: "Estudiante activo" },
  { id: 57, nombre: "Sebastián Patiño Vargas", grupo: "undecimo", estado: "Estudiante activo" },
  { id: 58, nombre: "Nicolás Arango Mejía", grupo: "undecimo", estado: "Estudiante activo" },
  { id: 59, nombre: "Sofía Correa Valencia", grupo: "undecimo", estado: "Estudiante activo" },
  { id: 60, nombre: "Andrés Felipe Ríos Castaño", grupo: "undecimo", estado: "Estudiante activo" },
];

// Hoy: simula la API con datos de prueba.
// Mañana: reemplaza el interior por axios.get(`/api/estudiantes?grupo=${grupo}`)
export const getStudentsByGroup = (grupo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudents.filter((s) => s.grupo === grupo));
    }, 800);
  });
};
