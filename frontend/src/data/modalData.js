import {
  IoHelpCircleOutline,
  IoSaveOutline,
  IoTrashOutline,
  IoLogOutOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoPaperPlaneOutline,
  IoCreateOutline,
} from "react-icons/io5";

export const cancelVariant = "outline-primary";

export const modalConfig = {
  confirm: {
    icon: IoHelpCircleOutline,
    iconBg: "var(--color-info-tint)",
    iconColor: "var(--color-info)",
    defaultTitle: "Confirmar acción",
    primaryText: "Confirmar",
    primaryVariant: "primary", // Coincide con .btn-primary
    btnIcon: IoCheckmarkOutline,
  },

  edit: {
    icon: IoSaveOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Editar",
    primaryText: "Guardar",
    primaryVariant: "success", // Coincide con .btn-success
    btnIcon: IoCheckmarkOutline,
  },

  delete: {
    icon: IoTrashOutline,
    iconBg: "var(--color-error-tint)",
    iconColor: "var(--color-error)",
    defaultTitle: "Eliminar registro",
    primaryText: "Eliminar",
    primaryVariant: "danger", // Coincide con .btn-danger
    btnIcon: IoTrashOutline,
  },

  logout: {
    icon: IoLogOutOutline,
    iconBg: "var(--bg-subtle)",
    iconColor: "var(--text-secondary)",
    defaultTitle: "Cerrar sesión",
    primaryText: "Cerrar sesión",
    primaryVariant: "warning", 
  },

  success: {
    icon: IoCheckmarkCircleOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Cerrar",
    primaryText: "Cerrar",
    primaryVariant: "success", // Coincide con .btn-success
    hideSecondary: true,
  },

  submitTask: {
    icon: IoCheckmarkCircleOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Enviar tarea",
    primaryText: "Enviar tarea",
    primaryVariant: "primary", // Coincide con .btn-primary
    btnIcon: IoPaperPlaneOutline,
    hideSecondary: false,
  },

  close: {
    icon: IoCloseOutline,
    iconBg: "var(--bg-subtle)",
    iconColor: "var(--text-secondary)",
    defaultTitle: "Cerrar",
    primaryText: "Cerrar",
    primaryVariant: "light", // Coincide con .btn-light
    btnIcon: IoCloseOutline,
  },

  feedback: {
    icon: null,
    defaultTitle: "Observación Pedagógica",
    primaryText: "Guardar",
    primaryVariant: "success", // Coincide con .btn-success
  },

  preview: {
    icon: null,
    iconBg: "var(--color-info-tint)",
    iconColor: "var(--color-info)",
    defaultTitle: "Vista previa del mensaje",
    primaryText: "Enviar Mensaje",
    primaryVariant: "primary", // Coincide con .btn-primary
    btnIcon: IoPaperPlaneOutline,
    hideSecondary: false,
    secondaryText: "Editar mensaje",    
    secondaryIcon: IoCreateOutline,    
  },
};

export const modalMessages = {
  logout: {
    message: "¿Cerrar sesión?",
    description: "Podrás volver a iniciar sesión cuando quieras.",
  },

  success: {
    message: "¡Operación exitosa!",
    description: "Los cambios se guardaron correctamente.",
  },

  submitTask: {
    message: "¿Deseas enviar esta tarea?",
    description: "Una vez enviada, la tarea quedará disponible para tus estudiantes.",
  },

  delete: {
    message: "¿Eliminar este registro?",
    description: "Esta acción no se puede deshacer.",
  },

  edit: {
    message: "Guardar cambios",
    description: "¿Estás seguro de que deseas guardar los cambios realizados?",
  },

  feedback: {
    message: "Observación Pedagógica",
    description: "",
  },

  preview: {
    message: "",
    description: "Así se verá el mensaje antes de enviarlo",
  },
};

export const modalBrand = {
  schoolName: "Colegio",
  moduleName: "STEM 360",
};