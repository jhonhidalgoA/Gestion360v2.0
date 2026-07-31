import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";
import { modalConfig, modalMessages, cancelVariant } from "../../../data/modalData";
import "./Modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  variant = "confirm", 
  message, 
  description, 
  entityLabel, // opcional: "Estudiante: ..." / "Eliminando: Matrícula #1234"
  confirmText, // opcional: sobreescribe el texto del botón primario
  children, // opcional: contenido custom del body (ej. textarea de retroalimentación)
}) => {
  const dialogRef = useRef(null);
  const config = modalConfig[variant] ?? modalConfig.confirm;
  const defaults = modalMessages[variant] ?? {};
  const Icon = config.icon;

  // Si no llega message/description por props, usa el texto por defecto de esta variante
  const finalMessage = message ?? defaults.message;
  const finalDescription = description ?? defaults.description;

  

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-brand">
            <div className="modal-title">
              <h3>Colegio</h3>
              <span className="modal-subtitle">STEAM 360</span>
            </div>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <IoClose size={30} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {Icon && (
            <div
              className="modal-icon-wrap"
              style={{ background: config.iconBg, color: config.iconColor }}
            >
              <Icon className="modal-icon" />
            </div>
          )}

          {entityLabel && <p className="modal-entity">{entityLabel}</p>}

          {children ? (
            children
          ) : (
            <>
              {finalMessage && <p className="modal-message">{finalMessage}</p>}
              {finalDescription && (
                <p className="modal-description">{finalDescription}</p>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          {!config.hideSecondary && (
            <Button variant={cancelVariant} onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button
            variant={config.primaryVariant}            
            onClick={onConfirm || onClose}
          >
            {confirmText || config.primaryText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
