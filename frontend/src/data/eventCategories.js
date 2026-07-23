export const categoryLabels = {
  academico: "Académico",
  institucional: "Institucional",
  evaluaciones: "Evaluaciones",
  cultural: "Cultural",
  deportivo: "Deportivo",
  "padres de familia": "Padres de Familia",
  bienestar: "Bienestar",
  convivencia: "Convivencia",
  administrativo: "Administrativo",
  vacaciones: "Vacaciones",
};

export const categoryColors = {
  academico: "var(--color-primary)",
  institucional: "var(--color-primary-dark)",
  evaluaciones: "var(--color-error)",
  cultural: "var(--color-accent)",
  deportivo: "var(--color-success)",
  "padres de familia": "var(--color-primary-light)",
  bienestar: "#0f9b8e",
  convivencia: "#7c5cbf",
  administrativo: "#546e7a",
  vacaciones: "#c68f10",
};

export const getCategoryLabel = (category) =>
  categoryLabels[category] || category;

export const getCategoryColor = (category) =>
  categoryColors[category] || "var(--color-primary)";
