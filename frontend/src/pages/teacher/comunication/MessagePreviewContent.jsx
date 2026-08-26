import { TbUser, TbSend, TbMessage } from "react-icons/tb";
import { channelData } from "@/data/channelData";
import "./MessagePreviewContent.css";

const PreviewMessageContent = ({ destinatario, canales, mensaje }) => {
  const fechaEnvio = new Date().toLocaleString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const canalesInfo = canales
    .map((id) => channelData.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="preview-message">
      <p className="modal-message">Vista previa del mensaje</p>
      <p className="preview-message-subtitle">
        Así se verá el mensaje antes de enviarlo a los destinatarios.
      </p>

      <div className="preview-message-block">
        <span className="preview-message-icon-wrap">
          <TbUser />
        </span>
        <div>
          <p className="preview-message-label">DESTINATARIO</p>
          <p className="preview-message-value">{destinatario}</p>
        </div>
      </div>

      <div className="preview-message-block">
        <span className="preview-message-icon-wrap">
          <TbSend />
        </span>
        <div>
          <p className="preview-message-label">CANALES DE ENVÍO</p>
          <div className="preview-message-channels">
            {canalesInfo.map((canal) => (
              <span
                key={canal.id}
                className="preview-message-chip"
                style={{ color: canal.color, background: `${canal.color}1A` }}
              >
                {canal.icon}
                {canal.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-message-block">
        <span className="preview-message-icon-wrap">
          <TbMessage />
        </span>
        <div className="preview-message-text-wrap">
          <p className="preview-message-label">MENSAJE</p>
          <p className="preview-message-text">{mensaje}</p>
          <p className="preview-message-timestamp">
            Se enviará el {fechaEnvio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewMessageContent;