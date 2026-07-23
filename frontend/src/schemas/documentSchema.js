import { z } from "zod";
import { REQUIRED_DOCUMENTS } from "@/constants/documents";

// Construye el schema dinámicamente a partir de REQUIRED_DOCUMENTS,
// así que agregar/quitar un documento en constants/documents.js
// actualiza la validación automáticamente.
const fileField = (label, required) => {
  const base = z.instanceof(File, { message: `${label}: adjunta un archivo válido.` });
  return required ? base : base.optional();
};

const shape = Object.fromEntries(
  REQUIRED_DOCUMENTS.map((doc) => [doc.id, fileField(doc.label, doc.required)])
);

export const documentSchema = z.object(shape);

export const documentDefaultValues = Object.fromEntries(
  REQUIRED_DOCUMENTS.map((doc) => [doc.id, undefined])
);
