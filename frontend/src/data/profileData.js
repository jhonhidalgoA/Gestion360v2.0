// src/data/profileData.js

export const profileFields = [
  {
    id: "nombre",
    type: "text",
    label: "Nombre completo:",
    required: true,
    placeholder: "Ej: María González",
  },
  {
    id: "correo",
    type: "email",
    label: "Correo electrónico:",
    required: true,
    placeholder: "correo@ejemplo.com",
  },
  {
    id: "telefono",
    type: "tel",
    label: "Teléfono / Celular:",
    required: false,
    placeholder: "Ej: 3001234567",
  },
  {
    id: "area",
    type: "select",
    label: "Área o especialidad:",
    required: true,
    options: [
      "Matemáticas y ciencias naturales",
      "Lengua castellana",
      "Ciencias sociales",
      "Educación física",
      "Inglés",
      "Artes",
    ],
  },
];

export const passwordFields = [
  {
    id: "actual",
    type: "password",
    label: "Contraseña actual:",
    required: true,
    placeholder: "Ingresa tu contraseña actual",
  },
  {
    id: "nueva",
    type: "password",
    label: "Nueva contraseña:",
    required: true,
    placeholder: "Mínimo 8 caracteres",
  },
  {
    id: "confirmar",
    type: "password",
    label: "Confirmar nueva contraseña:",
    required: true,
    placeholder: "Repite la nueva contraseña",
  },
];