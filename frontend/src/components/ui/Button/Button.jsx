import { useMemo } from "react";
import "./Button.css";

export const Button = ({
  children,
  variant = "primary",
  shape = "rounded",
  size = "md",
  width = "auto",
  type = "button",
  icon: Icon,
  iconSize = 18,
  iconPosition: iconPositionProp,
  as: Component = "button",
  className = "",
  "aria-label": ariaLabel,
  ...props
}) => {
  const isIconOnly = !children;

  const iconPosition =
    iconPositionProp || (shape === "pill" ? "right" : "left");

  const classes = useMemo(
    () =>
      [
        "btn",
        `btn-${variant}`,
        `btn-shape-${shape}`,
        `btn-size-${size}`,
        `btn-width-${width}`,
        isIconOnly && "btn-icon-only",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [variant, shape, size, width, isIconOnly, className]
  );

  const iconElement = Icon && (
    <Icon className="btn-icon" size={iconSize} aria-hidden="true" />
  );

  return (
    <Component
      className={classes}
      {...(Component === "button" ? { type } : {})}
      aria-label={isIconOnly ? (ariaLabel || "Botón de acción") : ariaLabel}
      {...props}
    >
      {iconPosition === "left" && iconElement}
      {!isIconOnly && <span className="btn-text">{children}</span>}
      {iconPosition === "right" && iconElement}
    </Component>
  );
};