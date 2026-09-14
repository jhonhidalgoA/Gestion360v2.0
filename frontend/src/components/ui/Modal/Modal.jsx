import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";
import { modalConfig, modalMessages, modalBrand } from "@/data/modalData";
import "./Modal.css";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  variant = "confirm",
  message,
  description,
  entityLabel,
  confirmText,
  secondaryText = "Cancelar",
  secondaryIcon,
  isLoading = false,
  autoCloseMs,
  children,
}) => {
  const dialogRef = useRef(null);
  const timerRef = useRef(null);
  const remainingRef = useRef(autoCloseMs);
  const startedAtRef = useRef(null);

  const config = modalConfig[variant] ?? modalConfig.confirm;
  const defaults = modalMessages[variant] ?? {};

  const Icon = config.icon;
  const BtnIcon = config.btnIcon;

  const finalMessage = message ?? defaults.message;
  const finalDescription = description ?? defaults.description;

  useEffect(() => {
    if (!isOpen || !autoCloseMs) return;
    remainingRef.current = autoCloseMs;
    const start = () => {
      startedAtRef.current = Date.now();
      timerRef.current = setTimeout(() => onClose?.(), remainingRef.current);
    };
    start();
    return () => clearTimeout(timerRef.current);
  }, [isOpen, autoCloseMs, onClose]);

  const handleMouseEnter = () => {
    if (!autoCloseMs) return;
    clearTimeout(timerRef.current);
    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(remainingRef.current - elapsed, 0);
  };

  const handleMouseLeave = () => {
    if (!autoCloseMs) return;
    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => onClose?.(), remainingRef.current);
  };

  // ✅ CAL-002: Escape + focus trap (Tab / Shift+Tab no salen del modal)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll(
          FOCUSABLE_SELECTOR
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="modal-header">
          <div className="modal-brand">
            <div className="modal-title">
              {/* ✅ CAL-001: id que referencia aria-labelledby */}
              <h3 id="modal-title">{modalBrand.schoolName}</h3>
              <span className="modal-subtitle">{modalBrand.moduleName}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <IoClose size={24} />
          </button>
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
            <Button
              variant="outline-primary"
              onClick={onClose}
              disabled={isLoading}
              className="btn-uniform-width"
              icon={secondaryIcon}
              iconPosition="left"
            >
              {secondaryText}
            </Button>
          )}
          <Button
            variant={config.primaryVariant || "primary"}
            onClick={onConfirm || onClose}
            disabled={isLoading}
            icon={BtnIcon}
            className="btn-uniform-width"
            iconPosition="left"
          >
            {isLoading ? "Procesando..." : confirmText || config.primaryText || "Aceptar"}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;