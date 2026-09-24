import { useState } from "react";
import {
  FaSearch,
  FaCommentDots,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaPaperclip,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import { Link as RouterLink } from "react-router-dom";
import logo from "@/assets/icons/espiral.svg";

import "./SupportPage.css";

const NAVBAR_DATA = {
  title: "Soporte",
  color: "#0d3b7a",
};

const SoportePage = ({ context }) => {
  const { title, color } = NAVBAR_DATA;

  const [openFaq, setOpenFaq] = useState("q1");

  const [categoria, setCategoria] = useState("Cuenta y acceso");
  const [prioridad, setPrioridad] = useState("Baja");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ticket enviado correctamente");
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
          <div className="contact-cards">
            <div className="contact-card">
              <div className="card-icon chat-icon">
                <FaCommentDots size={24} color="#16a34a" />
              </div>
              <h3>Chat en vivo</h3>
              <p>Respuesta inmediata en horario de atención</p>
              <span className="status-online">● En línea ahora</span>
            </div>

            <div className="contact-card">
              <div className="card-icon email-icon">
                <FaEnvelope size={24} color="#1e40af" />
              </div>
              <h3>Correo electrónico</h3>
              <p className="email-link">soporte@gestion360.edu.co</p>
              <span className="response-time">Respuesta en 24 h</span>
            </div>

            <div className="contact-card">
              <div className="card-icon phone-icon">
                <FaPhone size={24} color="#b45309" />
              </div>
              <h3>Teléfono</h3>
              <p>Lunes a viernes, 7:00 a.m. – 5:00 p.m.</p>
              <span className="phone-number">(604) 444 0000</span>
            </div>
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
          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option>Cuenta y acceso</option>
                  <option>Calificaciones y reportes</option>
                  <option>Problemas técnicos</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prioridad</label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                >
                  <option>Baja</option>
                  <option>Media</option>
                  <option>Alta</option>
                  <option>Urgente</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Asunto</label>
              <input
                type="text"
                placeholder="Resume tu solicitud en pocas palabras"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                placeholder="Cuéntanos qué ocurrió, qué esperabas ver y en qué módulo pasó"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Adjuntar captura o archivo (opcional)</label>
              <div className="file-upload">
                <FaPaperclip size={20} color="#6b7280" />
                <label className="file-label">
                  <span className="file-link">Elige un archivo</span> o
                  arrástralo aquí — PNG, JPG o PDF, máx. 5 MB
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
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
              <button type="submit" className="btn-submit">
                Enviar ticket
                <FaArrowRight size={18} color="#ffffff" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SoportePage;
