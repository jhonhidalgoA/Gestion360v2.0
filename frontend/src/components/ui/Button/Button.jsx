import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  shape = 'semi',
  size = 'md',
  type = 'button',
  icon: Icon,
  as: Component = 'button',
  iconPosition = 'right',
  ...props
}) => {
  const shapeClass = {
    pill: 'btn-shape-pill',
    square: 'btn-shape-square',
    semi: 'btn-shape-semi',
  }[shape];

  const isButton = Component === 'button';

  return (
    <Component
      className={`btn btn-${variant} ${shapeClass} btn-size-${size}`}
      {...(isButton ? { type } : {})}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="btn-icon" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="btn-icon" />}
    </Component>
  );
};