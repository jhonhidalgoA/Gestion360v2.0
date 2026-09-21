export const userMenuActions = {
  editarPerfil: {
    title: "Editar perfil",
    to: "/perfil/editar",
    icon: "person",
    cName: "user-menu-action",
    type: "panel",
    section: "cuenta",
    accent: "neutral",
  },
  cambiarPassword: {
    title: "Cambiar contraseña",
    to: "/perfil/password",
    icon: "lock",
    cName: "user-menu-action",
    type: "page",
    section: "cuenta",
    accent: "neutral",
  },
  configuracion: {
    title: "Configuración",
    to: "/admin/configuracion",
    icon: "settings",
    cName: "user-menu-action",
    type: "page",
    section: "cuenta",
    accent: "neutral",
  },
  misGrupos: {
    title: "Mis grupos",
    to: "/docente/grupos",
    icon: "groups",
    cName: "user-menu-action",
    type: "page",
    section: "academico",
    accent: "green",
  },
  misHorario: {
    title: "Mi horario",
    to: "/docente/horario",
    icon: "calendar_month",
    cName: "user-menu-action",
    type: "page",
    section: "academico",
    accent: "blue",
  },
  misCalificaciones: {
    title: "Mis calificaciones",
    to: "/estudiante/calificaciones",
    icon: "grade",
    cName: "user-menu-action",
    type: "page",
    section: "academico",
    accent: "green",
  },
  misHijos: {
    title: "Mis hijos",
    to: "/padre/hijos",
    icon: "family_restroom",
    cName: "user-menu-action",
    type: "page",
    section: "academico",
    accent: "pink",
  },
};

// Etiquetas visibles de cada sección. Agregar una sección nueva = agregar una línea aquí.
export const sectionLabels = {
  cuenta: "Cuenta",
  academico: "Académico",
};

export const roleConfig = {
  administrador: {
    moduleLabel: "Administrador",
    roleTitle: "Administrador del Sistema",
    homePath: "/admin",
    menuItems: ["editarPerfil", "cambiarPassword", "configuracion"],
  },
  docente: {
    moduleLabel: "Docente",
    roleTitle: "Docente",
    homePath: "/teacher",
    menuItems: ["editarPerfil", "cambiarPassword", "misGrupos", "misHorario"],
  },
  estudiante: {
    moduleLabel: "Estudiante",
    roleTitle: "Estudiante",
    homePath: "/student",
    menuItems: ["editarPerfil", "cambiarPassword", "misCalificaciones"],
  },
  padre: {
    moduleLabel: "Padre de Familia",
    roleTitle: "Padre de Familia",
    homePath: "/parent",
    menuItems: ["editarPerfil", "cambiarPassword", "misHijos"],
  },
};

export const defaultRoleConfig = {
  moduleLabel: "Usuario",
  roleTitle: "Usuario",
  homePath: "/",
  menuItems: ["editarPerfil", "cambiarPassword"],
};