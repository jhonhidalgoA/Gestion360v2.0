// ===========================
// DATOS MOCK - FRONTEND ONLY
// ===========================

// 1. GRADOS/GRUPOS
export const mockGrados = [
  { id: "1", nombre: "Primero A" },
  { id: "2", nombre: "Primero B" },
  { id: "3", nombre: "Segundo A" },
  { id: "4", nombre: "Segundo B" },
  { id: "5", nombre: "Tercero A" },
  { id: "6", nombre: "Tercero B" },
  { id: "7", nombre: "Cuarto A" },
  { id: "8", nombre: "Cuarto B" },
  { id: "9", nombre: "Quinto A" },
  { id: "10", nombre: "Quinto B" },
];

// 2. ASIGNATURAS (independientes)
export const mockAsignaturas = [
  { id: "1", nombre: "Matemáticas" },
  { id: "2", nombre: "Español" },
  { id: "3", nombre: "Ciencias Naturales" },
  { id: "4", nombre: "Ciencias Sociales" },
  { id: "5", nombre: "Inglés" },
  { id: "6", nombre: "Educación Física" },
  { id: "7", nombre: "Arte" },
  { id: "8", nombre: "Música" },
];

// 3. PERÍODOS
export const mockPeriodos = [
  { id: "1", nombre: "Primer Período" },
  { id: "2", nombre: "Segundo Período" },
  { id: "3", nombre: "Tercer Período" },
  { id: "4", nombre: "Cuarto Período" },
];

// 4. ESTUDIANTES (DEPENDIENTE DE GRUPO)
export const mockEstudiantes = [
  // Grupo 1 (Primero A)
  { id: "1", nombres: "Juan Carlos", apellidos: "Pérez López", grupo_id: "1" },
  { id: "2", nombres: "María Fernanda", apellidos: "Gómez Silva", grupo_id: "1" },
  { id: "3", nombres: "Luis Alberto", apellidos: "Rodríguez Martínez", grupo_id: "1" },
  
  // Grupo 2 (Primero B)
  { id: "4", nombres: "Ana Lucía", apellidos: "Torres Ramírez", grupo_id: "2" },
  { id: "5", nombres: "Carlos Andrés", apellidos: "Díaz Vargas", grupo_id: "2" },
  
  // Grupo 3 (Segundo A)
  { id: "6", nombres: "Sofía Isabel", apellidos: "Morales Castro", grupo_id: "3" },
  { id: "7", nombres: "Diego Alejandro", apellidos: "Herrera Rojas", grupo_id: "3" },
  { id: "8", nombres: "Valentina", apellidos: "Jiménez López", grupo_id: "3" },
  
  // Grupo 4 (Segundo B)
  { id: "9", nombres: "Mateo", apellidos: "Sánchez Gutiérrez", grupo_id: "4" },
  { id: "10", nombres: "Isabella", apellidos: "Pineda Mendoza", grupo_id: "4" },
];

// 5. DURACIÓN DE CLASE (DEPENDIENTE DE ASIGNATURA)
export const mockDuracionClase = [
  { id: "1", asignatura_id: "1", duracion: "60 minutos" },
  { id: "2", asignatura_id: "1", duracion: "90 minutos" },
  { id: "3", asignatura_id: "2", duracion: "60 minutos" },
  { id: "4", asignatura_id: "3", duracion: "90 minutos" },
  { id: "5", asignatura_id: "4", duracion: "60 minutos" },
  { id: "6", asignatura_id: "5", duracion: "60 minutos" },
  { id: "7", asignatura_id: "6", duracion: "90 minutos" },
  { id: "8", asignatura_id: "7", duracion: "60 minutos" },
  { id: "9", asignatura_id: "8", duracion: "60 minutos" },
];

// 6. TIPOS DE PLAN DE CLASE
export const mockTiposPlan = [
  { id: "1", nombre: "Teórica" },
  { id: "2", nombre: "Práctica" },
  { id: "3", nombre: "Taller" },
  { id: "4", nombre: "Laboratorio" },
  { id: "5", nombre: "Evaluación" },
];

// ===========================
// FUNCIONES DE SIMULACIÓN
// ===========================

// Simula delay de red (500ms - 1000ms)
export const simulateApiDelay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Obtiene estudiantes por grupo (simulando fetch con dependencia)
export const getEstudiantesByGrupo = async (grupoId) => {
  await simulateApiDelay();
  return mockEstudiantes.filter(est => est.grupo_id === grupoId);
};

// Obtiene duración por asignatura (simulando fetch con dependencia)
export const getDuracionByAsignatura = async (asignaturaId) => {
  await simulateApiDelay();
  return mockDuracionClase.filter(dc => dc.asignatura_id === asignaturaId);
};

// Exporta todo como objeto único para facilitar import
export const mockData = {
  grados: mockGrados,
  asignaturas: mockAsignaturas,
  periodos: mockPeriodos,
  estudiantes: mockEstudiantes,
  duracionClase: mockDuracionClase,
  tiposPlan: mockTiposPlan,
};

export default mockData;