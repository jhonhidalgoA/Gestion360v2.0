import {
    FaWhatsapp, FaEnvelope, FaPhone, FaBell
} from "react-icons/fa"

export const channelData = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <FaWhatsapp size={30} />,
      color: "#25D366",
      description: "Mensaje instantáneo",
    },
    {
      id: "email",
      name: "Email",
      icon: <FaEnvelope size={30} />,
      color: "#4285F4",
      description: "Correo electrónico",
    },
    {
      id: "sms",
      name: "SMS",
      icon: <FaPhone size={30} />,
      color: "#9C27B0",
      description: "Mensaje de texto",
    },
    {
      id: "push",
      name: "Notificación",
      icon: <FaBell size={30} />,
      color: "#FF9800",
      description: "App móvil",
    },
]