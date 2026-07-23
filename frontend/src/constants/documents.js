export const REQUIRED_DOCUMENTS = [
  {
    id: "registroCivil",
    label: "Registro civil de nacimiento",
    required: true,
  },
  {
    id: "foto",
    label: "Foto tipo documento",
    required: true,
  },
  {
    id: "documentoIdentidad",
    label: "Documento de identidad",
    required: true,
  },
  {
    id: "carneVacunas",
    label: "Carné de vacunas",
    required: true,
  },
  {
    id: "certificadoNotas",
    label: "Certificado de notas del colegio anterior",
    required: true,
  },
  {
    id: "reciboServicios",
    label: "Recibo de servicios públicos (comprobante de residencia)",
    required: false,
  },
];

export const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"];
