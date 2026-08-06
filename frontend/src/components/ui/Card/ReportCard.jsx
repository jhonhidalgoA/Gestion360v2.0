import "./ReportCard.css";

const ReportCard = ({ icon, title, subtitle, iconColor, onClick }) => {
  return (
    <button type="button" className="report-card" onClick={onClick}>
      <div className="report-icon" style={{ color: iconColor }}>
        <span className="material-symbols-outlined icon">{icon}</span>
      </div>

      <div className="report-text">
        <h4 className="report-title">{title}</h4>
        <p className="report-subtitle">{subtitle}</p>
      </div>
    </button>
  );
};

export default ReportCard;