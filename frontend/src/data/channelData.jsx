import { FaWhatsapp, FaEnvelope, FaPhone, FaBell } from "react-icons/fa";

export const channelData = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp size={50} className="channel-icon--whatsapp" />,
    color: "#25D366",
    description: "Mensaje instantáneo",
  },
  {
    id: "email",
    name: "Email",
    icon: <FaEnvelope size={40} className="channel-icon--email" />,
    color: "#4285F4",
    description: "Correo electrónico",
  },
  {
    id: "sms",
    name: "SMS",
    icon: <FaPhone size={40} className="channel-icon--sms" />,
    color: "#9C27B0",
    description: "Mensaje de texto",
  },
  {
    id: "push",
    name: "Notificación",
    icon: <FaBell size={40} className="channel-icon--push" />,
    color: "#FF9800",
    description: "App móvil",
  },
];