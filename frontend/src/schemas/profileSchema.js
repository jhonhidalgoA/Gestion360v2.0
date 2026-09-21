import { z } from "zod";
import {
  personNameField,
  emailField,
  phoneField,
  selectField,
  passwordField,
} from "./validators";

import { optionsMap } from "@/data/DBdataSimulation"

const AREA_OPTIONS = optionsMap.asignaturas;

export const profileFields = [
  { id: "nombre", label: "Nombre completo", type: "text", required: true },
  { id: "correo", label: "Correo electrónico", type: "email", required: true },
  { id: "telefono", label: "Teléfono de contacto", type: "tel" },
  {
    id: "area",
    label: "Área o especialidad",
    type: "select",
    required: true,
    options: AREA_OPTIONS,
  },
];

export const passwordFields = [
  { id: "actual", label: "Contraseña actual", type: "password", required: true },
  { id: "nueva", label: "Nueva contraseña", type: "password", required: true },
  { id: "confirmar", label: "Confirmar nueva contraseña", type: "password", required: true },
];

export const profileDefaultValues = {
  nombre: "",
  correo: "",
  telefono: "",
  area: "",
};

export const passwordDefaultValues = {
  actual: "",
  nueva: "",
  confirmar: "",
};

export const profileSchema = z.object({
  nombre: personNameField("El nombre", { min: 3, max: 80 }),
  correo: emailField("El correo electrónico"),
  telefono: phoneField("El teléfono", { required: false }),
  area: selectField("El área", { options: AREA_OPTIONS }),
});

const currentPasswordField = (label = "La contraseña actual") =>
  z
    .string({ required_error: `${label} es obligatoria` })
    .min(1, `${label} es obligatoria`)
    .refine((val) => !/^\s|\s$/.test(val), `${label} no puede iniciar ni terminar con espacio`)
    .refine((val) => !val.includes("\u0000"), `${label} contiene contenido no permitido`);

const newPasswordField = (label = "La nueva contraseña") =>
  passwordField(label)
    .refine((val) => /[A-Z]/.test(val), `${label} debe contener al menos una mayúscula`)
    .refine((val) => /[0-9]/.test(val), `${label} debe contener al menos un número`);

export const passwordSchema = z
  .object({
    actual: currentPasswordField(),
    nueva: newPasswordField(),
    confirmar: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((data) => data.nueva === data.confirmar, {
    message: "Las contraseñas no coinciden",
    path: ["confirmar"],
  });