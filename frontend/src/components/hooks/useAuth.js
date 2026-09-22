// Mock temporal de autenticación.
// Cuando exista el AuthContext real, este archivo se reemplaza por:
//   export { useContext(AuthContext) } o similar,
// SIN tener que tocar los componentes que ya usan useAuth().

const mockUser = {
  fullName: "Jhon Fredy Hidalgo Arango",
  correo: "jhon.hidalgo@ejemplo.com",
  role: "docente", // rol activo — cambiar aquí para probar los otros roles: administrador | docente | estudiante | padre
  roles: ["docente", "padre"], // roles disponibles para este usuario (para "Cambiar de rol")
};

export function useAuth() {
  const logout = () => {
    // TODO: reemplazar por la llamada real de logout cuando exista el backend
    window.location.href = "/";
  };

  return { user: mockUser, logout };
}
