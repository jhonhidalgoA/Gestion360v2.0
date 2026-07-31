import "./Button.css";

export const Button = ({
  children,
  variant = "primary",
  shape = "semi",
  size = "md",
  type = "button",
  icon: Icon,
  iconSize, 
  as: Component = "button",
  iconPosition = "right",
  ...props
}) => {
  const shapeClass = {
    pill: "btn-shape-pill",
    square: "btn-shape-square",
    semi: "btn-shape-semi",
  }[shape];

  const isButton = Component === "button";
  const iconProps = iconSize
    ? {
        className: "btn-icon",
        size: iconSize,
        style: {
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          fontSize: `${iconSize}px`,
        },
      }
    : { className: "btn-icon" };

  return (
    <Component
      className={`btn btn-${variant} ${shapeClass} btn-size-${size}`}
      {...(isButton ? { type } : {})}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon {...iconProps} />}
      {children}
      {Icon && iconPosition === "right" && <Icon {...iconProps} />}
    </Component>
  );
};
