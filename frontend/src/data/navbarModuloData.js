// Data del Navbar del MÓDULO interno (post-login).
// No confundir con navbarData.js (ese es el navbar público del landing).

// 1) Acciones de menú de usuario. Se definen UNA sola vez.
//    Cada rol solo referencia las claves que le aplican (ver roleConfig más abajo).
export const userMenuActions = {
  editarPerfil: {
    title: "Editar perfil",
    to: "/perfil/editar",
    icon: "person",
    cName: "user-menu-action",
    type: "page",
  },
  cambiarPassword: {
    title: "Cambiar contraseña",
    to: "/perfil/password",
    icon: "lock",
    cName: "user-menu-action",
    type: "page",
  },
  configuracion: {
    title: "Configuración",
    to: "/admin/configuracion",
    icon: "settings",
    cName: "user-menu-action",
    type: "page",
  },
  misGrupos: {
    title: "Mis grupos",
    to: "/docente/grupos",
    icon: "groups",
    cName: "user-menu-action",
    type: "page",
  },
  misCalificaciones: {
    title: "Mis calificaciones",
    to: "/estudiante/calificaciones",
    icon: "grade",
    cName: "user-menu-action",
    type: "page",
  },
  misHijos: {
    title: "Mis hijos",
    to: "/padre/hijos",
    icon: "family_restroom",
    cName: "user-menu-action",
    type: "page",
  },
};

// 2) Config por rol: nombre a mostrar, título del menú, y QUÉ acciones de arriba usar.
//    Agregar un rol nuevo = agregar una entrada aquí. No se toca el componente.
export const roleConfig = {
  administrador: {
    moduleLabel: "Administrador",
    roleTitle: "Administrador del Sistema",
    menuItems: ["editarPerfil", "cambiarPassword", "configuracion"],
  },
  docente: {
    moduleLabel: "Docente",
    roleTitle: "Docente",
    menuItems: ["editarPerfil", "cambiarPassword", "misGrupos"],
  },
  estudiante: {
    moduleLabel: "Estudiante",
    roleTitle: "Estudiante",
    menuItems: ["editarPerfil", "cambiarPassword", "misCalificaciones"],
  },
  padre: {
    moduleLabel: "Padre de Familia",
    roleTitle: "Padre de Familia",
    menuItems: ["editarPerfil", "cambiarPassword", "misHijos"],
  },
};

// Fallback por si llega un rol desconocido o sin definir (nunca dejar el navbar roto)
export const defaultRoleConfig = {
  moduleLabel: "Usuario",
  roleTitle: "Usuario",
  menuItems: ["editarPerfil", "cambiarPassword"],
};
