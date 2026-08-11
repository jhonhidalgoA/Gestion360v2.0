import {
  IoHelpCircleOutline,
  IoSaveOutline,
  IoTrashOutline,
  IoLogOutOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";

export const cancelVariant = "outline-primary";

export const modalConfig = {
  confirm: {
    icon: IoHelpCircleOutline,
    iconBg: "var(--color-info-tint)",
    iconColor: "var(--color-info)",
    defaultTitle: "Confirmar acción",
    primaryText: "Confirmar",
    primaryVariant: "primary",
    btnIcon: IoCheckmarkOutline,
  },

  edit: {
    icon: IoSaveOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Editar",
    primaryText: "Guardar",
    primaryVariant: "save",
    btnIcon: IoCheckmarkOutline,
  },

  delete: {
    icon: IoTrashOutline,
    iconBg: "var(--color-error-tint)",
    iconColor: "var(--color-error)",
    defaultTitle: "Eliminar registro",
    primaryText: "Eliminar",
    primaryVariant: "delete",
    btnIcon: IoTrashOutline,
  },

  logout: {
    icon: IoLogOutOutline,
    iconBg: "var(--bg-subtle)",
    iconColor: "var(--btn-print)",
    defaultTitle: "Logout",
    primaryText: "Logout",
    primaryVariant: "logout",
  },

  success: {
    icon: IoCheckmarkCircleOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Cerrar",
    primaryText: "Cerrar",
    primaryVariant: "close",
    hideSecondary: true,
  },

  submitTask: {
    icon: IoCheckmarkCircleOutline,
    iconBg: "var(--color-success-tint)",
    iconColor: "var(--color-success)",
    defaultTitle: "Enviar tarea",
    primaryText: "Enviar tarea",
    primaryVariant: "send",
    btnIcon: IoPaperPlaneOutline,
    hideSecondary: false,
  },

  close: {
    icon: IoCloseOutline,
    iconBg: "var(--bg-subtle)",
    iconColor: "var(--text-secondary)",
    defaultTitle: "Cerrar",
    primaryText: "Cerrar",
    primaryVariant: "submit",
    btnIcon: IoCloseOutline,
  },

  feedback: {
    icon: null,
    defaultTitle: "Observación Pedagógica",
    primaryText: "Guardar",
    primaryVariant: "save",
  },
};

export const modalMessages = {
  logout: {
    message: "¿Cerrar sesión?",
    description: "Podrás volver a iniciar sesión cuando quieras.",
  },

  success: {
    message: "¿Enviar tarea?",
    description: "Esta seguro de enviar esta tarea",
  },

  submitTask: {
    message: "¿Deseas enviar esta tarea?",
    description: "Verifica que la información sea correcta antes de continuar.",
  },

  delete: {
    message: "¿Eliminar este registro?",
    description: "Esta acción no se puede deshacer.",
  },

  edit: {
    message: "",
    description: "",
  },

  feedback: {
    message: "Observación Pedagógica",
    description: "",
  },
};

export const modalBrand = {
  schoolName: "Colegio",
  moduleName: "STEM 360",
};
