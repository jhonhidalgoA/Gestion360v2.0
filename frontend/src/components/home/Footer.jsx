import logo from "@/assets/icons/espiral.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaMailBulk,
} from "react-icons/fa";

import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

import "./Footer.css";
import CreativeWebDesign from "@components/ui/CreativeWebDesign/CreativeWebDesign";

const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://facebook.com/steam360",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com/steam360",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com/steam360",
    label: "Twitter",
  },
  {
    icon: FaYoutube,
    url: "https://youtube.com/steam360",
    label: "YouTube",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <div className="footer-logo">
            <img src={logo} alt="Logo" className="logo-icon" />
            <h4>Gestión 360</h4>
          </div>

          <p>
            Transformando vidas a través de la educación con innovación y
            excelencia académica.
          </p>

          <div className="footer-social">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social-link"
              >
                <Icon size={30} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Institucional</h4>

          <ul>
            <li>
              <a href="">Quiénes Somos</a>
            </li>
            <li>
              <a href="">Modelo Educativo</a>
            </li>
            <li>
              <a href="">Admisiones 2026</a>
            </li>
            <li>
              <a href="">Calendario Académico</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Recursos</h4>

          <ul>
            <li>
              <a href="">Biblioteca Virtual</a>
            </li>
            <li>
              <a href="">Blog Educativo</a>
            </li>
            <li>
              <a href="">Preguntas Frecuentes</a>
            </li>
            <li>
              <a href="">Contacto</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Contáctanos</h4>

          <ul className="footer-contact">
            <li>
              <HiOutlineLocationMarker className="contact-icon" />
              <span>Salamina, Caldas, Colombia</span>
            </li>

            <li>
              <HiOutlinePhone className="contact-icon" />
              <span>+57 312 810 3686</span>
            </li>

            <li>
              <HiOutlineMail className="contact-icon" />
              <span>contacto@gestion360.edu.co</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <CreativeWebDesign />
        <div className="footer-social-dev">
          <FaGithub className="contact-icon" />
          <FaLinkedin className="contact-icon" />
          <FaMailBulk className="contact-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
