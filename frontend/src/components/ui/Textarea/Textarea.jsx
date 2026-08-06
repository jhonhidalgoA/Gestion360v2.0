import { forwardRef, useId } from "react";
import "./Textarea.css";

const Textarea = forwardRef(
  (
    {
      label,
      name,
      id,
      placeholder = "",
      register,
      rules,
      error,
      variant = "rounded", 
      className = "",
      wrapperClassName = "",
      helperText,
      required = false,
      disabled = false,
      readOnly = false,
      autoComplete = "off",
      autoFocus = false,
      rows = 5,
      cols,
      resize = "vertical",
      maxLength,
      minLength,

      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id || name || generatedId;

    
    const errorMessage = typeof error === "string" ? error : error?.message;

    // Reglas efectivas: si el padre no pasa `rules` explícitas,
    // se derivan de `required`. Sin esto, register() nunca recibía
    // ninguna regla y el campo jamás se marcaba como inválido.
    const effectiveRules =
      rules ?? (required ? { required: "Este campo es obligatorio" } : {});

    const fieldClassName = [
      "textarea__field",
      `textarea__field--${variant}`,
      `textarea__field--${resize}`,
      errorMessage && "textarea__field--error",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`textarea textarea--${variant} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={fieldId} className="textarea__label">
            {label}
            {required && (
              <span className="textarea__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage
              ? `${fieldId}-error`
              : helperText
              ? `${fieldId}-helper`
              : undefined
          }
          className={fieldClassName}
          {...(register ? register(name, effectiveRules) : {})}
          {...props}
        />

        {/* Slot único: error tiene prioridad; si no hay error se muestra
            helper; si no hay ninguno se reserva el espacio igual */}
        <div className="textarea__meta">
          {errorMessage ? (
            <span
              id={`${fieldId}-error`}
              className="textarea__error textarea__error--visible"
            >
              {errorMessage}
            </span>
          ) : helperText ? (
            <small id={`${fieldId}-helper`} className="textarea__helper">
              {helperText}
            </small>
          ) : (
            <span className="textarea__error">&nbsp;</span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
