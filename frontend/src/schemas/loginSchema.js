import { z } from "zod";
import { documentField } from "../schemas/validators";

// Contraseña de login: solo valida que no esté vacía, sin exigir reglas de fortaleza
const loginPasswordField = (label = "La contraseña", { max = 128 } = {}) =>
  z
    .string({ required_error: `${label} es obligatoria` })
    .min(1, `${label} es obligatoria`)
    .max(max, `${label} no puede superar los ${max} caracteres`)
    .refine((val) => !/^\s|\s$/.test(val), `${label} no puede iniciar ni terminar con espacio`)
    .refine((val) => !val.includes("\u0000"), `${label} contiene contenido no permitido`);

export const loginSchema = z.object({
  username: documentField("El documento"),
  password: loginPasswordField(),
  remember: z.boolean().optional().default(false),
});

export const loginDefaultValues = {
  username: "",
  password: "",
  remember: false,
};