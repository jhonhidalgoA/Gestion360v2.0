
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export const supportData = [
  {
    id: "chat",    
    icon: <FaWhatsapp/>,
    color: "#25D366",    
    name: "Chat en vivo",
    description: "Respuesta inmediata en horario de atención",
    meta: "En línea ahora",
  },
  {
    id: "email",
    icon: <FaEnvelope />,
    color: "#4285F4",
    name: "Correo electrónico",
    description: "soporte@gestion360.edu.co",
    meta: "Respuesta en 24 h",
  },
  {
    id: "phone",
    icon: <FaPhone />,
    color: "#9C27B0",
    name: "Teléfono",
    description: "Lunes a viernes, 7:00 a.m. – 5:00 p.m.",
    meta: "(057) 312 8103686",
  },
];

export const ticketFormFields = [
  {
    id: "categoria",
    label: "Categoría",
    type: "select",
    options: [
      "Cuenta y acceso",
      "Calificaciones y reportes",
      "Problemas técnicos",
      "Otro",
    ],
    required: true,
  },
  {
    id: "prioridad",
    label: "Prioridad",
    type: "select",
    options: ["Baja", "Media", "Alta", "Urgente"],
    dependsOn: "categoria",
    required: true,
  },
  {
    id: "asunto",
    label: "Asunto",
    type: "text",
    placeholder: "Resume tu solicitud en pocas palabras",
    dependsOn: "prioridad",
    required: true,
  },
  {
    id: "descripcion",
    label: "Descripción",
    type: "textarea",
    placeholder:
      "Cuéntanos qué ocurrió, qué esperabas ver y en qué módulo pasó",
    rows: 4,
    dependsOn: "asunto",
    required: true,
  },
];
