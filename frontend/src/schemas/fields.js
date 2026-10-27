import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

/* ---------- Helpers ---------- */

export const typeError = (label) => (iss) =>
  iss.input === undefined ? `${label} es obligatorio` : `${label} no es válido`;

const collapseSpaces = (v) => v.replace(/\s+/g, " ").trim();

const baseText = (label, { min, max, required }) =>
  z
    .string({ error: typeError(label) })
    .transform(collapseSpaces)
    .pipe(
      z
        .string()
        .min(required ? 1 : 0, `${label} es obligatorio`)
        .refine((v) => v === "" || v.length >= min, `${label} debe tener al menos ${min} caracteres`)
        .max(max, `${label} no puede superar los ${max} caracteres`)
    );

/* ---------- Texto ---------- */

const NAME_RE = /^\p{L}[\p{L}\p{M}'’\- ]*$/u;
const PLACE_RE = /^\p{L}[\p{L}\p{M}.,'’\- ]*$/u;
const ADDRESS_RE = /^[\p{L}\p{M}\p{N},º°#/'\- ]+$/u;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export const personNameField = (label = "Este campo", { min = 2, max = 60, required = true } = {}) =>
  baseText(label, { min, max, required }).refine(
    (v) => v === "" || NAME_RE.test(v),
    `${label} solo puede contener letras`
  );

export const placeField = (label = "Este campo", { min = 2, max = 80, required = true } = {}) =>
  baseText(label, { min, max, required }).refine(
    (v) => v === "" || PLACE_RE.test(v),
    `${label} contiene caracteres no permitidos`
  );

export const addressField = (label = "Este campo", { min = 3, max = 100, required = true } = {}) =>
  baseText(label, { min, max, required }).refine(
    (v) => v === "" || ADDRESS_RE.test(v),
    `${label} contiene caracteres no permitidos`
  );

export const notesField = (label = "Este campo", { max = 500, required = false } = {}) =>
  z
    .string({ error: typeError(label) })
    .trim()
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .max(max, `${label} no puede superar los ${max} caracteres`)
    .refine((v) => !CONTROL_CHARS.test(v), `${label} contiene caracteres no permitidos`);

/* ---------- Documento ---------- */

export const documentField = (
  label = "El documento",
  { min = 6, max = 15, alphanumeric = false, required = true } = {}
) => {
  const re = alphanumeric ? /^[A-Za-z0-9]+$/ : /^\d+$/;
  return z
    .string({ error: typeError(label) })
    .trim()
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .refine(
      (v) => v === "" || re.test(v),
      `${label} solo puede contener ${alphanumeric ? "letras y números" : "números"}, sin puntos ni espacios`
    )
    .refine(
      (v) => v === "" || (v.length >= min && v.length <= max),
      `${label} debe tener entre ${min} y ${max} caracteres`
    );
};

/* ---------- Email ---------- */

const isEmail = (v) => z.email().safeParse(v).success;

export const emailField = (label = "El correo electrónico", { required = true } = {}) =>
  z
    .string({ error: typeError(label) })
    .trim()
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .max(254, "El correo no puede superar los 254 caracteres")
    .refine((v) => v === "" || isEmail(v), "Ingresa un correo válido, por ejemplo nombre@dominio.com")
    .transform((v) => v.toLowerCase());

/* ---------- Teléfono ---------- */

export const phoneField = (label = "El teléfono", { countryCode = "CO", required = true } = {}) =>
  z
    .string({ error: typeError(label) })
    .trim()
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .refine(
      (v) => v === "" || parsePhoneNumberFromString(v, countryCode)?.isValid() === true,
      "Ingresa un número de teléfono válido, por ejemplo 300 123 4567"
    );

/* ---------- Número entero ---------- */

export const integerField = (label = "Este campo", { min = 0, max = 999, required = true } = {}) =>
  z
    .string({ error: typeError(label) })
    .trim()
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .refine((v) => v === "" || /^\d+$/.test(v), `${label} debe ser un número entero`)
    .refine(
      (v) => v === "" || (Number(v) >= min && Number(v) <= max),
      `${label} debe estar entre ${min} y ${max}`
    );

/* ---------- Fecha ---------- */

// Fecha local (no UTC) en formato yyyy-mm-dd
const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const dateField = (
  label = "La fecha",
  { minDate = "1900-01-01", maxDate = null, allowFuture = false, required = true } = {}
) =>
  z
    .string({ error: typeError(label) })
    .min(required ? 1 : 0, `${label} es obligatoria`)
    .refine((v) => v === "" || z.iso.date().safeParse(v).success, `${label} no es una fecha válida`)
    .refine((v) => {
      if (v === "") return true;
      // se calcula al validar, no al crear el esquema
      const max = maxDate ?? (allowFuture ? null : todayISO());
      return v >= minDate && (!max || v <= max);
    }, `${label} está fuera del rango permitido`);

/* ---------- Select / Toggle ---------- */

export const selectField = (label = "Este campo", { options = null, required = true } = {}) =>
  z
    .string({ error: typeError(label) })
    .min(required ? 1 : 0, `${label} es obligatorio`)
    .refine((v) => v === "" || !options || options.includes(v), `${label} no es una opción válida`);