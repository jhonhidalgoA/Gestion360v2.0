import { z } from "zod";
import zxcvbn from "zxcvbn";
import { typeError } from "./fields";

// Solo para crear o cambiar contraseña. En el login valida únicamente que no esté vacía.
export const passwordField = (
  label = "La contraseña",
  { min = 8, max = 64, minStrength = 2, userInputs = [] } = {}
) =>
  z
    .string({ error: typeError(label) })
    .min(1, `${label} es obligatoria`)
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} no puede superar los ${max} caracteres`)
    .refine(
      // zxcvbn solo corre si el largo es razonable
      (v) => v.length < min || v.length > max || zxcvbn(v, userInputs).score >= minStrength,
      `${label} es muy fácil de adivinar. Prueba con una frase más larga o menos común.`
    );