import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";
import { modalConfig, cancelVariant } from "../../data/modalData";
import "./Modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  variant = "confirm", // clave de modalConfig: confirm | edit | delete | logout | success
  title, // opcional: sobreescribe el título por defecto de la variante
  message, // pregunta principal
  description, // texto secundario gris
  entityLabel, // opcional: "Estudiante: ..." / "Eliminando: Matrícula #1234"
  confirmText, // opcional: sobreescribe el texto del botón primario
  children, // opcional: contenido custom del body (ej. textarea de retroalimentación)
}) => {
  const dialogRef = useRef(null);
  const config = modalConfig[variant] ?? modalConfig.confirm;
  const Icon = config.icon;

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Foco inicial dentro del modal (accesibilidad básica)
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
          <h2 className="modal-title" id="modal-title">
            {title || config.defaultTitle}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <IoClose />
          </button>
        </div>

        <div className="modal-body">
          {Icon && (
            <div className="modal-icon-wrap">
              <Icon className="modal-icon" />
            </div>
          )}

          {entityLabel && <p className="modal-entity">{entityLabel}</p>}

          {children ? (
            children
          ) : (
            <>
              {message && <p className="modal-message">{message}</p>}
              {description && <p className="modal-description">{description}</p>}
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
