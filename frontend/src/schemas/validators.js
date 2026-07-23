import { z } from "zod";


/* Name */

const PERSON_NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'\-\s]+$/;

export const personNameField = (label = "Este campo", { min = 2, max = 60, required = true } = {}) => {
  const applyRules = (schema) =>
    schema
      .refine((val) => val === "" || !/\s{2,}/.test(val), `${label} no puede contener espacios dobles`)
      .refine((val) => val === "" || !containsNullByte(val), `${label} contiene contenido no permitido`)
      .refine(
        (val) => val === "" || !DANGEROUS_PATTERNS.some((pattern) => pattern.test(val)),
        `${label} contiene contenido no permitido`
      )
      .refine(
        (val) => val === "" || PERSON_NAME_REGEX.test(val),
        `${label} solo puede contener letras`
      );

  const base = z
    .string({ invalid_type_error: `${label} debe ser un texto válido` })
    .trim();

  if (!required) {
    return applyRules(
      base
        .max(max, `${label} no puede superar los ${max} caracteres`)
        .refine((val) => val === "" || val.length >= min, `${label} debe tener al menos ${min} caracteres`)
    )
      .optional()
      .or(z.literal(""));
  }

  return applyRules(
    base
      .min(1, `${label} es obligatorio`)
      .min(min, `${label} debe tener al menos ${min} caracteres`)
      .max(max, `${label} no puede superar los ${max} caracteres`)
  );
};

/* Text */

const GENERAL_TEXT_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9.,°#\-\s]+$/;
const DANGEROUS_PATTERNS = [
  /<\s*script/i,
  /<\s*\/?\s*[a-z]+.*?>/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /data\s*:\s*text\/html/i,
  /--|;|\/\*|\*\//,
  /\b(select|insert|update|delete|drop|union|exec|xp_cmdshell)\b/i,
];

const containsNullByte = (val) => val.includes("\u0000");

export const textField = (label = "Este campo", { min = 3, max = 100, required = true } = {}) => {
  const applyCommonRules = (schema) =>
    schema
      .refine((val) => val === "" || !/\s{2,}/.test(val), `${label} no puede contener espacios dobles`)
      .refine((val) => val === "" || !containsNullByte(val), `${label} contiene contenido no permitido`)
      .refine(
        (val) => val === "" || !DANGEROUS_PATTERNS.some((pattern) => pattern.test(val)),
        `${label} contiene contenido no permitido`
      )
      .refine(
        (val) => val === "" || GENERAL_TEXT_REGEX.test(val),
        `${label} contiene caracteres no permitidos`
      );

  const base = z
    .string({ invalid_type_error: `${label} debe ser un texto válido` })
    .trim();

  if (!required) {
    return applyCommonRules(
      base
        .max(max, `${label} no puede superar los ${max} caracteres`)
        .refine((val) => val === "" || val.length >= min, `${label} debe tener al menos ${min} caracteres`)
    )
      .optional()
      .or(z.literal(""));
  }

  return applyCommonRules(
    base
      .min(1, `${label} es obligatorio`)
      .min(min, `${label} debe tener al menos ${min} caracteres`)
      .max(max, `${label} no puede superar los ${max} caracteres`)
  );
};

/* Password */

export const passwordField = (label = "La contraseña", { minLength = 8, maxLength = 16 } = {}) =>
  z
    .string({ required_error: `${label} es obligatoria` })
    .min(1, `${label} es obligatoria`)
    .min(minLength, `${label} debe tener al menos ${minLength} caracteres`)
    .max(maxLength, `${label} no puede superar los ${maxLength} caracteres`)
    .refine((val) => !/^\s|\s$/.test(val), `${label} no puede iniciar ni terminar con espacio`)
    .refine((val) => !val.includes("\u0000"), `${label} contiene contenido no permitido`);


/* ID */

const DOCUMENT_REGEX = /^\d+$/;

export const documentField = (label = "El documento", { min = 8, max = 15 } = {}) =>
  z
    .string({
      required_error: `${label} es obligatorio`,
      invalid_type_error: `${label} debe ser un valor válido`,
    })
    .trim()
    .min(1, `${label} es obligatorio`)
    .refine((val) => !/\s/.test(val), `${label} no puede contener espacios`)
    .refine((val) => !/[a-zA-ZÁÉÍÓÚÑÜáéíóúñü]/.test(val), `${label} no puede contener letras`)
    .refine((val) => DOCUMENT_REGEX.test(val), `${label} solo puede contener números`)
    .refine((val) => val.length >= min, `${label} debe tener al menos ${min} dígitos`)
    .refine((val) => val.length <= max, `${label} no puede superar los ${max} dígitos`)
    .refine((val) => !val.includes("\u0000"), `${label} contiene contenido no permitido`); 
    
/*  Email  */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailField = (label = "El correo electrónico", { max = 100 } = {}) =>
  z
    .string({
      required_error: `${label} es obligatorio`,
      invalid_type_error: `${label} debe ser un texto válido`,
    })
    .trim()
    .toLowerCase()
    .min(1, `${label} es obligatorio`)
    .max(max, `${label} no puede superar los ${max} caracteres`)
    .refine((val) => !/\s/.test(val), `${label} no puede contener espacios`)
    .refine((val) => (val.match(/@/g) || []).length === 1, `${label} debe contener un único @`)
    .refine((val) => !val.includes("\u0000"), `${label} contiene contenido no permitido`)
    .refine((val) => EMAIL_REGEX.test(val), `Ingresa ${label.toLowerCase()} válido`); 

    
/*  Phone  */

// Solo dígitos, longitud típica de celular/fijo (7 a 15 dígitos, estándar E.164 sin '+')
const PHONE_REGEX = /^\d+$/;

export const phoneField = (label = "El teléfono", { min = 7, max = 15, required = true } = {}) => {
  const applyRules = (schema) =>
    schema
      .refine((val) => val === "" || !/\s/.test(val), `${label} no puede contener espacios`)
      .refine((val) => val === "" || !/[a-zA-ZÁÉÍÓÚÑÜáéíóúñü]/.test(val), `${label} no puede contener letras`)
      .refine((val) => val === "" || PHONE_REGEX.test(val), `${label} solo puede contener números`)
      .refine((val) => val === "" || val.length >= min, `${label} debe tener al menos ${min} dígitos`)
      .refine((val) => val === "" || val.length <= max, `${label} no puede superar los ${max} dígitos`)
      .refine((val) => val === "" || !val.includes("\u0000"), `${label} contiene contenido no permitido`);

  const base = z
    .string({
      required_error: `${label} es obligatorio`,
      invalid_type_error: `${label} debe ser un valor válido`,
    })
    .trim();

  if (!required) {
    return applyRules(base).optional().or(z.literal(""));
  }

  return applyRules(base.min(1, `${label} es obligatorio`));
};   


/* Number */

export const numberField = (
  label = "Este campo",
  { min = 0, max = 999, integer = true, required = true } = {}
) => {
  const base = z.coerce
    .number({
      required_error: `${label} es obligatorio`,
      invalid_type_error: `${label} debe ser un número válido`,
    })
    .refine((val) => !Number.isNaN(val), `${label} debe ser un número válido`)
    .refine((val) => Number.isFinite(val), `${label} debe ser un número finito`)
    .refine((val) => (integer ? Number.isInteger(val) : true), `${label} debe ser un número entero`)
    .refine((val) => val >= min, `${label} debe ser mayor o igual a ${min}`)
    .refine((val) => val <= max, `${label} no puede superar ${max}`);

  return required ? base : base.optional();
};

/* Date */

export const dateField = (
  label = "La fecha",
  { minDate = "1900-01-01", maxDate = null, allowFuture = false, required = true } = {}
) => {
  const resolveMaxDate = () => {
    if (maxDate) return new Date(maxDate);
    if (allowFuture) return new Date("2100-01-01");
    return new Date(); // hoy, si no se permite fecha futura
  };

  const validateRange = (val) => {
    const date = new Date(val);
    if (Number.isNaN(date.getTime())) return false;
    const min = new Date(minDate);
    const max = resolveMaxDate();
    return date >= min && date <= max;
  };

  const base = z
    .string({
      required_error: `${label} es obligatoria`,
      invalid_type_error: `${label} debe ser una fecha válida`,
    })
    .refine((val) => val === "" || !Number.isNaN(new Date(val).getTime()), `${label} tiene un formato inválido`)
    .refine((val) => val === "" || validateRange(val), `Ingresa ${label.toLowerCase()} dentro de un rango válido`);

  if (!required) {
    return base.optional().or(z.literal(""));
  }

  return z
    .string({ required_error: `${label} es obligatoria` })
    .min(1, `${label} es obligatoria`)
    .refine((val) => !Number.isNaN(new Date(val).getTime()), `${label} tiene un formato inválido`)
    .refine(validateRange, `Ingresa ${label.toLowerCase()} dentro de un rango válido`);
};

/* Select */

export const selectField = (label = "Este campo", { options = null, required = true } = {}) => {
  const base = z.string({
    required_error: `${label} es obligatorio`,
    invalid_type_error: `${label} debe ser una opción válida`,
  });

  const withOptionsCheck = (schema) =>
    options
      ? schema.refine(
          (val) => val === "" || options.includes(val),
          `${label} debe ser una de las opciones disponibles`
        )
      : schema;

  if (!required) {
    return withOptionsCheck(base).optional().or(z.literal(""));
  }

  return withOptionsCheck(base.min(1, `${label} es obligatorio`));
};