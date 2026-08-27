import { TbAward, TbAlertTriangle } from "react-icons/tb";

export const observationTypes = [
  {
    id: "reconocimiento",
    category: "Documento",
    icon: TbAward,
    title: "Registrar reconocimiento",
    subtitle:
      "Logro destacado, méritos académicos o felicitación por comportamiento ejemplar.",
    iconColor: "var(--color-success)",
  },
  {
    id: "falta",
    category: "Documento",
    icon: TbAlertTriangle,
    title: "Registrar situación disciplinaria",
    subtitle:
      "Incumplimiento del manual de convivencia, situación académica o disciplinaria grave.",
    iconColor: "var(--color-error)",
  },
];