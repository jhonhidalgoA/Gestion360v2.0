// useAuth.js
export function useAuth() {
  // 1. Leer el usuario guardado en el Login
  const storedUser = localStorage.getItem("currentUser");
  
  // 2. Usar el usuario real, o un fallback si no hay sesión iniciada
  const user = storedUser 
    ? JSON.parse(storedUser) 
    : {
        fullName: "Invitado",
        correo: "invitado@ejemplo.com",
        role: "docente",
        roles: ["docente"],
      };

  const logout = () => {
    // 3. Borrar los datos al cerrar sesión
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return { user, logout };
}