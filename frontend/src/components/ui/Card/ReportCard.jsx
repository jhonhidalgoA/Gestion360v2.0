
import "./ReportCard.css";

const ReportCard = ({
  icon,
  title,
  subtitle,
  iconColor,
  format,
  category, 
  requirements = [],
  requirementLabels = {},
 
}) => {
 

  const requirementText = requirements
    .map((requirement) => requirementLabels[requirement])
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="report-card">
      {format && (
        <span className={`report-badge report-badge--${format.type}`}>
          <span className="material-symbols-outlined report-badge__icon">
            {format.icon}
          </span>
          {format.label}
        </span>
      )}

      <div className="report-content">
        <div className="report-icon" style={{ color: iconColor }}>
          <span className="material-symbols-outlined icon">{icon}</span>
        </div>

        <div className="report-text">
          <span className="report-category">{category}</span>
          <h4 className="report-title">{title}</h4>
          <p className="report-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="report-footer">
        {requirementText && (
          <p className="report-requirements">
            <strong>Requiere:</strong> {requirementText}
          </p>
        )}
       
      </div>
    </div>
  );
};

export default ReportCard;
