import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  TbCheck,
  TbCopy,
  TbCircleCheckFilled,
  
} from "react-icons/tb";
import "./ConfirmationPage.css";

const TRACKING_URL = "gestion360.edu.co/seguimiento";

function formatEstimatedDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatReceivedDate() {
  return new Date().toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

function ConfirmationPage() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const { radicado, guardianEmail, estimatedDate } = location.state || {};

  // Si alguien llega directo a esta ruta (recarga, link compartido) sin haber
  // pasado por el wizard, no hay datos que mostrar: lo devolvemos al inicio del flujo.
  if (!radicado) {
    return <Navigate to="/matricula/nueva" replace />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(radicado);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si el navegador bloquea el clipboard, no rompemos la UI, solo no confirmamos copiado
    }
  };

 

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-card__icon-badge">
          <TbCheck aria-hidden="true" />
        </div>

        <h1 className="confirmation-card__title">¡Solicitud enviada!</h1>
        <p className="confirmation-card__subtitle">
          Tu solicitud de matrícula fue registrada correctamente.
        </p>

        <div className="confirmation-card__radicado">
          <span className="confirmation-card__radicado-label">
            Número de radicado
          </span>
          <div className="confirmation-card__radicado-row">
            <strong className="confirmation-card__radicado-value">
              {radicado}
            </strong>
            <button
              type="button"
              className="confirmation-card__copy-btn"
              onClick={handleCopy}
              aria-label="Copiar número de radicado"
            >
              <TbCopy aria-hidden="true" />
            </button>
          </div>
          {copied && (
            <span className="confirmation-card__copied-msg">Copiado</span>
          )}
        </div>

        <div className="confirmation-card__qr">
          <QRCodeSVG
            value={`https://${TRACKING_URL}?radicado=${radicado}`}
            size={140}
          />
        </div>

        <p className="confirmation-card__qr-caption">
          Escanea para consultar el estado
          <br />
          <a href={`https://${TRACKING_URL}`} target="_blank" rel="noreferrer">
            {TRACKING_URL}
          </a>
        </p>

        <ol className="confirmation-card__timeline">
          <li className="confirmation-card__timeline-step confirmation-card__timeline-step--done">
            <span className="confirmation-card__timeline-icon">
              <TbCircleCheckFilled aria-hidden="true" />
            </span>
            <span className="confirmation-card__timeline-label">
              Recibida
              <small>{formatReceivedDate()}</small>
            </span>
          </li>
          <li className="confirmation-card__timeline-step confirmation-card__timeline-step--active">
            <span
              className="confirmation-card__timeline-dot"
              aria-hidden="true"
            />
            <span className="confirmation-card__timeline-label">
              En evaluación
            </span>
          </li>
          <li className="confirmation-card__timeline-step">
            <span
              className="confirmation-card__timeline-dot confirmation-card__timeline-dot--pending"
              aria-hidden="true"
            />
            <span className="confirmation-card__timeline-label confirmation-card__timeline-label--muted">
              Resultado
            </span>
          </li>
        </ol>

        {estimatedDate && (
          <p className="confirmation-card__estimate">
            Fecha estimada de respuesta:{" "}
            <strong>{formatEstimatedDate(estimatedDate)}</strong>
          </p>
        )}

        {guardianEmail && (
          <p className="confirmation-card__email-note">
            Enviamos una copia a:  <span>{guardianEmail}</span>
          </p>
        )}

        
      </div>
    </div>
  );
}

export default ConfirmationPage;
