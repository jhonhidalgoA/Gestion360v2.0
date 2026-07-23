import { z } from "zod";
import { documentField } from "./validators";

const RADICADO_REGEX = /^MAT-\d{4}-\d{6}$/;

export const applicationStatusSchema = z.object({
  radicado: z
    .string({ required_error: "El número de radicado es obligatorio" })
    .trim()
    .toUpperCase()
    .min(1, "El número de radicado es obligatorio")
    .refine((val) => RADICADO_REGEX.test(val), "El formato debe ser MAT-AAAA-000000"),
  document: documentField("El documento del acudiente"),
});

export const applicationStatusDefaultValues = {
  radicado: "",
  document: "",
};