import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbArrowRight } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import mail_icon from "@/assets/icons/mail-icon.png";
import phone_icon from "@/assets/icons/phone-icon.png";
import location_icon from "@/assets/icons/location-icon.png";

import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";

import { contactSchema, contactDefaultValues } from "@/schemas/contactSchema";

import "./Contact.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
  });

  const onSubmit = async (data) => {
    try {
      console.log("Datos validados listos para enviar:", data);

      // 1. Llamado real al backend (ejemplo con fetch)
      const response = await fetch("https://tu-api.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // 2. Manejo de respuesta
      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const result = await response.json();
      console.log("Éxito:", result);

      // 3. Limpiar formulario y mostrar feedback al usuario
      reset();
      alert("¡Mensaje enviado con éxito!"); 
      
    } catch (error) {
      console.error("Error en el envío:", error);
      // Opcional: mostrar error global o en un campo específico
      setError("root", { 
        message: "No se pudo enviar el mensaje. Inténtalo de nuevo." 
      });
    }
  };

  return (
    <div className="contact">
      {/* Información */}
      <div className="contact-col contact-info">
        <h3>Envíanos tu mensaje</h3>
        <p>
          Estamos comprometidos con brindar una atención oportuna y de calidad.
          Si deseas obtener información, resolver inquietudes o conocer más
          sobre nuestra institución, completa el siguiente formulario y nos
          pondremos en contacto contigo.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="Correo" />
            contacto@zirel.com
          </li>
          <li>
            <img src={phone_icon} alt="Teléfono" />
            +57 312-810-3686
          </li>
          <li>
            <img src={location_icon} alt="Ubicación" />
            Calle 2 # 34-04, Salamina
            <br />
            Caldas, Colombia
          </li>
        </ul>
      </div>

      {/* Formulario */}
      <div className="contact-col">
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
          
          {/* Error global del formulario si la API falla */}
          {errors.root && (
            <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
          )}

          <Input
            label="Tu Nombre"
            name="name"
            placeholder="Ej. Juan Pérez"
            register={register}
            error={errors.name}
            autoComplete="name"
            required
          />
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="ej: jhon@example.com"
            register={register}
            error={errors.email}
            autoComplete="email"
            required
          />

          <Textarea
            label="Escribe tu mensaje"
            name="message"
            placeholder="Escribe tu mensaje..."
            rows={6}
            register={register}
            error={errors.message}
            maxLength={500}
            helperText="Máximo 500 caracteres."
            required
          />

          <Button
            type="submit"
            variant="primary"
            shape="pill"
            size="lg"
            icon={TbArrowRight}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;