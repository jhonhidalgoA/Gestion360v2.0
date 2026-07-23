import { forwardRef, useId, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import "./Input.css";

const Input = forwardRef(
  (
    {
      label,
      name,
      id,
      type = "text",
      placeholder = "",
      register,
      error,
      variant = "rounded", // "rounded" | "square"
      className = "",
      wrapperClassName = "",

      // Iconos
      leftIcon: LeftIcon,
      rightIcon: RightIcon,

      // Texto de ayuda
      helperText,

      // Estados
      required = false,
      disabled = false,
      readOnly = false,

      // Atributos HTML
      autoComplete = "off",
      autoFocus = false,
      maxLength,
      minLength,
      min,
      max,
      step,

      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const fieldId = id || name || generatedId;
   
    const errorMessage = typeof error === "string" ? error : error?.message;

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    const isPassword = type === "password";
    const hasRightSlot = Boolean(RightIcon) || isPassword;

    const fieldClassName = [
      "input__field",
      `input__field--${variant}`,
      type === "number" && "input__field--number",
      type === "date" && "input__field--date",
      LeftIcon && "input__field--left",
      hasRightSlot && "input__field--right",
      errorMessage && "input__field--error",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`input input--${variant} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={fieldId} className="input__label">
            {label}
            {required && (
              <span className="input__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Contenedor del input */}
        <div className="input__wrapper">
          {LeftIcon && (
            <span className="input__icon input__icon--left" aria-hidden="true">
              <LeftIcon />
            </span>
          )}

          <input
            ref={ref}
            id={fieldId}
            name={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            min={min}
            max={max}
            step={step}
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage
                ? `${fieldId}-error`
                : helperText
                ? `${fieldId}-helper`
                : undefined
            }
            className={fieldClassName}
            {...(register ? register(name) : {})}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              className="input__password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              tabIndex={0}
            >
              {showPassword ? <TbEyeOff /> : <TbEye />}
            </button>
          ) : (
            RightIcon && (
              <span className="input__icon input__icon--right" aria-hidden="true">
                <RightIcon />
              </span>
            )
          )}
        </div>

        
        <div className="input__meta">
          {errorMessage ? (
            <span id={`${fieldId}-error`} className="input__error input__error--visible">
              {errorMessage}
            </span>
          ) : helperText ? (
            <small id={`${fieldId}-helper`} className="input__helper">
              {helperText}
            </small>
          ) : (
            <span className="input__error">&nbsp;</span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;