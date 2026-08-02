import { forwardRef, useId } from "react";
import { TbChevronDown } from "react-icons/tb";
import "./Select.css";

const Select = forwardRef(
  (
    {
      label,
      name,
      id,
      options = [],
      placeholder = "Seleccione una opción",
      value,
      onChange,
      onBlur,
      register,
      rules,
      error,
      variant = "square", // "rounded" | "square"
      helperText,
      required = false,
      disabled = false,
      autoComplete = "off",
      autoFocus = false,
      iconLeft,
      className = "",
      wrapperClassName = "",

      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id || name || generatedId;

    const errorMessage = typeof error === "string" ? error : error?.message;

    const effectiveRules =
      rules ?? (required ? { required: "Este campo es obligatorio" } : {});

    const registerProps =
      register && name
        ? register(name, effectiveRules)
        : {
            value,
            onChange,
            onBlur,
          };

    const fieldClassName = [
      "select__field",
      `select__field--${variant}`,
      iconLeft && "select__field--left-icon",
      "select__field--right-icon",
      errorMessage && "select__field--error",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`select select--${variant} ${wrapperClassName}`}>
        {label && (
          <label htmlFor={fieldId} className="select__label">
            {label}
            {required && (
              <span className="select__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="select__wrapper">
          {iconLeft && (
            <span className="select__icon select__icon--left" aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <select
            id={fieldId}
            name={name}
            ref={ref}
            disabled={disabled}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage
                ? `${fieldId}-error`
                : helperText
                ? `${fieldId}-helper`
                : undefined
            }
            className={fieldClassName}
            {...registerProps}
            {...props}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>

            {options.map((option) => {
              if (typeof option === "string") {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              }

              return (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              );
            })}
          </select>

          <span className="select__icon select__icon--right" aria-hidden="true">
            <TbChevronDown />
          </span>
        </div>

        <div className="select__meta">
          {errorMessage ? (
            <span id={`${fieldId}-error`} className="select__error select__error--visible">
              {errorMessage}
            </span>
          ) : helperText ? (
            <small id={`${fieldId}-helper`} className="select__helper">
              {helperText}
            </small>
          ) : (
            <span className="select__error">&nbsp;</span>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;