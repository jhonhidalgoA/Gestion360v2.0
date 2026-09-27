// SoportePage.jsx
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaSearch,
  FaChevronDown,
  FaPaperclip,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import { Link as RouterLink } from "react-router-dom";
import logo from "@/assets/icons/espiral.svg";

import { supportData,  ticketFormFields } from "@/data/supportData";

import SupportCard from "@/components/ui/Card/SupportCard";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";
import { Button } from "@/components/ui/Button/Button";

import "./SupportPage.css";

const NAVBAR_DATA = {
  title: "Soporte",
  color: "#0d3b7a",
};

const SoportePage = ({ context }) => {
  const { title, color } = NAVBAR_DATA;

  const [openFaq, setOpenFaq] = useState("q1");
  const [archivo, setArchivo] = useState(null);

  const ticketDefaultValues = ticketFormFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: ticketDefaultValues, mode: "onChange" });

  const descripcionValue = useWatch({ control, name: "descripcion" });
  const archivoHabilitado = Boolean(descripcionValue);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const onSubmitTicket = () => {
    alert("Ticket enviado correctamente");
    reset(ticketDefaultValues);
    setArchivo(null);
  };

  const handleChannelSelect = (id) => {
    if (id === "email") {
      window.location.href = "mailto:soporte@gestion360.edu.co";
    } else if (id === "phone") {
      window.location.href = "tel:+576044440000";
    }
    // "chat": abrir el widget de chat cuando esté disponible
  };

  const faqs = [
    {
      id: "faq-1",
      category: "Cuenta y acceso",
      questions: [
        {
          id: "q1",
          question: "¿Cómo recupero mi contraseña?",
          answer:
            'En la pantalla de inicio de sesión, selecciona "Olvidé mi contraseña" e ingresa tu documento. Te enviaremos un enlace de restablecimiento al correo registrado.',
        },
        {
          id: "q2",
          question: "¿Puedo cambiar mi correo de contacto?",
          answer:
            "Sí, puedes cambiar tu correo de contacto desde la sección de configuración de tu perfil.",
        },
      ],
    },
    {
      id: "faq-2",
      category: "Calificaciones y reportes",
      questions: [
        {
          id: "q3",
          question: "¿Por qué no veo la tabla de calificaciones?",
          answer:
            "Verifica que el período académico esté activo y que tengas permisos de visualización. Si el problema persiste, contacta a soporte.",
        },
      ],
    },
    {
      id: "faq-3",
      category: "Problemas técnicos",
      questions: [
        {
          id: "q4",
          question: "La plataforma se ve lenta o no carga",
          answer:
            "Intenta limpiar la caché de tu navegador, verificar tu conexión a internet o usar otro navegador. Si el problema persiste, envíanos un ticket.",
        },
      ],
    },
  ];

  return (
    <div className="soport-page">
      <div className="navbar-enrollment" style={{ backgroundColor: color }}>
        <RouterLink to="/" className="navbar-logo logo-enrollment">
          <img src={logo} alt="logo" className="logo-icon" />
          <span className="logo-text">
            Gestión <span className="danger">360</span>
          </span>
        </RouterLink>
        <div className="navbar-content">
          <h2 className="navbar-title">
            {title}
            {context && <span className="navbar-context"> / {context}</span>}
          </h2>
          <p>Centro de soporte y atención al usuario</p>
        </div>
      </div>

      <div className="soporte-body">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <FaSearch size={20} color="#9ca3af" />
            <input type="text" placeholder="Busca una pregunta o un tema..." />
          </div>
        </div>

        {/* Canales de contacto */}
        <section className="section">
          <h2>Canales de contacto</h2>
          <div className="channels-grid-2">
            {supportData.map((channel) => (
              <SupportCard
                key={channel.id}
                channel={channel}
                onSelect={handleChannelSelect}
              />
            ))}
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="section">
          <h2>Preguntas frecuentes</h2>
          {faqs.map((group) => (
            <div key={group.id} className="faq-group">
              <h3 className="faq-category">{group.category}</h3>
              {group.questions.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      size={20}
                      className={`faq-arrow ${openFaq === faq.id ? "open" : ""}`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Enviar un ticket */}
        <section className="section">
          <h2>Enviar un ticket</h2>
          <form className="ticket-form" onSubmit={handleSubmit(onSubmitTicket)}>
            <div className="form-row">
              <FormFieldCascada
                field={ticketFormFields[0]}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
              <FormFieldCascada
                field={ticketFormFields[1]}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
            </div>

            <FormFieldCascada
              field={ticketFormFields[2]}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <FormFieldCascada
              field={ticketFormFields[3]}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <div className="form-group">
              <label>Adjuntar captura o archivo (opcional)</label>
              <div
                className={`file-upload ${
                  !archivoHabilitado ? "file-upload--disabled" : ""
                }`}
              >
                <FaPaperclip size={20} color="#6b7280" />
                <label className="file-label">
                  <span className="file-link">Elige un archivo</span> o
                  arrástralo aquí — PNG, JPG o PDF, máx. 5 MB
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    disabled={!archivoHabilitado}
                    hidden
                  />
                </label>
                {archivo && <span className="file-name">{archivo.name}</span>}
              </div>
            </div>

            <div className="form-footer">
              <div className="response-estimate">
                <FaClock size={18} color="#16a34a" />
                <span>Tiempo de respuesta estimado: 24 horas hábiles</span>
              </div>
              <Button
                type="submit"
                variant="success"
                icon={FaArrowRight}
                iconPosition="right"
                disabled={!archivoHabilitado}
              >
                Enviar ticket
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SoportePage;
