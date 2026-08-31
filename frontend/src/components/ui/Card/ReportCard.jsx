import "./ReportCard.css";

const ReportCard = ({
  icon,
  title,
  subtitle,
  iconColor,  
  category,
  requirements = [],
  requirementLabels = {},
  disabled = false,
  onClick,
}) => {
  const steps = requirements
    .map((requirement) => requirementLabels[requirement])
    .filter(Boolean);

  return (
    <div
      className={`report-card${disabled ? " report-card--disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <svg
        className="report-card-shape"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L19.29,0 L25.66,77.72 Q26.79,91.30 29.29,91.30 L100,91.30 L100,100 L0,100 Z"
          fill={iconColor}
        />
      </svg>

      <div className="report-icon">
        <span className="report-category">{category}</span>
        <span className="material-symbols-outlined icon">{icon}</span>
      </div>

      <div className="report-body">
        <div className="report-text">
          <h4 className="report-title">{title}</h4>
          <p className="report-subtitle">{subtitle}</p>
        </div>

        {steps.length > 0 && (
          <div className="report-steps">
            <span className="subheading">Requiere:</span>
            {steps.map((label, index) => (
              <div className="report-step" key={label}>
                <span className="report-step-badge">{index + 1}</span>
                <span className="report-step-label">{label}</span>
                {index < steps.length - 1 && (
                  <span className="report-step-arrow">›</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;