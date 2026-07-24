import { FaQuestionCircle, FaSave, FaTrash, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";

export const cancelVariant = "outline-primary";

export const modalConfig = {
  confirm: {
    icon: FaQuestionCircle,
    defaultTitle: "Confirmar acción",
    primaryText: "Confirmar",
    primaryVariant: "primary",
  },
  edit: {
    icon: FaSave,
    defaultTitle: "Editar",
    primaryText: "Guardar",
    primaryVariant: "save",
  },
  delete: {
    icon: FaTrash,
    defaultTitle: "Eliminar registro",
    primaryText: "Eliminar",
    primaryVariant: "delete",
  },
  logout: {
    icon: FaSignOutAlt,
    defaultTitle: "Cerrar sesión",
    primaryText: "Cerrar sesión",
    primaryVariant: "primary",
  },
  success: {
    icon: FaCheckCircle,
    defaultTitle: "Listo",
    primaryText: "Entendido",
    primaryVariant: "submit",
    hideSecondary: true, // este tipo no necesita botón "Cancelar"
  },
};

// Textos por defecto reutilizables (puedes sobreescribirlos al invocar el modal)
export const modalMessages = {
  logout: {
    message: "¿Cerrar sesión?",
    description: "Tendrás que volver a iniciar sesión para acceder a tu cuenta.",
  },
  deleteGeneric: {
    message: "¿Eliminar este registro?",
    description: "Esta acción no se puede deshacer.",
  },
  saveFeedback: {
    message: "",
    description: "", // se usa junto con entityLabel, ej: "Estudiante: ..."
  },
};


export const modalBrand = {
  schoolName: "Colegio",
  moduleName: "STEM 360",
};
