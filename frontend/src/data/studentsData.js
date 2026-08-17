const mockStudents = [
  { id: 1, nombre: "Valentina Restrepo", grupo: "10-1", estado: "Estudiante activo" },
  { id: 2, nombre: "Samuel Ortiz", grupo: "10-1", estado: "Estudiante activo" },
  { id: 3, nombre: "María José Gómez", grupo: "10-1", estado: "Estudiante activo" },
  { id: 4, nombre: "Juan Esteban Cárdenas", grupo: "10-1", estado: "Estudiante activo" },
  { id: 5, nombre: "Isabella Zapata", grupo: "10-1", estado: "Estudiante activo" },
  { id: 6, nombre: "Santiago Muñoz", grupo: "10-1", estado: "Estudiante activo" },
  { id: 7, nombre: "Mariana Vélez", grupo: "10-2", estado: "Estudiante activo" },
  { id: 8, nombre: "Nicolás Arango", grupo: "10-2", estado: "Estudiante activo" },
  { id: 9, nombre: "Sofía Correa", grupo: "10-2", estado: "Estudiante activo" },
  { id: 10, nombre: "Andrés Felipe Ríos", grupo: "10-2", estado: "Estudiante activo" },
  { id: 11, nombre: "Camila Londoño", grupo: "11-1", estado: "Estudiante activo" },
  { id: 12, nombre: "Sebastián Patiño", grupo: "11-1", estado: "Estudiante activo" },
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