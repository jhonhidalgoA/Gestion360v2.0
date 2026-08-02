import {
  IoHelpCircleOutline,
  IoSaveOutline,
  IoTrashOutline,
  IoLogOutOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

// El color de cada botón NO se define aquí. "primaryVariant" es el mismo
// nombre de variant que ya entiende <Button/> (btn-save, btn-delete, etc),
// y ese componente ya lee los colores reales desde tokens.css.
// El botón "Cancelar" SIEMPRE es transparente/outline, sin importar la variante.
export const cancelVariant = "outline-primary";

export const modalConfig = {
  confirm: {
    icon: IoHelpCircleOutline,
    iconBg: "var(--color-info-tint)",
    iconColor: "var(--color-info)",
    defaultTitle: "Confirmar acción",
    primaryText: "Confirmar",
    primaryVariant: "primary",
    btnIcon: IoCheckmarkOutline, // ícono dentro del botón de acción, no en Cancelar
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
    defaultTitle: "Listo",
    primaryText: "Entendido",
    primaryVariant: "submit",
    btnIcon: IoCheckmarkOutline,
    hideSecondary: true, // este tipo no necesita botón "Cancelar"
  },
};

// Textos por defecto reutilizables. La clave coincide con el "variant" del modal,
// así el Modal los toma automáticamente si no le pasas message/description a mano.
export const modalMessages = {
  logout: {
    message: "¿Cerrar sesión?",
    description: "Podrás volver a iniciar sesión cuando quieras.",
  },
  delete: {
    message: "¿Eliminar este registro?",
    description: "Esta acción no se puede deshacer.",
  },
  edit: {
    message: "",
    description: "", // se usa junto con entityLabel, ej: "Estudiante: ..."
  },
};

// Nombre y marca fijos del header, igual en todos los modales de la app
export const modalBrand = {
  schoolName: "Colegio",
  moduleName: "STEM 360",
};