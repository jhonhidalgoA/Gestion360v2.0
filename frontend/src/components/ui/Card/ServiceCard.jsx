import "./ServiceCard.css";

const ServiceCard = ({ icon, title, subtitle, linkText = "",}) => {
  return (
    
    <div className="service-card">
      <div className="service-icon">
        <span className="material-symbols-outlined icon ">{icon}</span>
      </div>
      <h4 className="service-title">{title}</h4>
      <h6 className="service-subtitle">{subtitle}</h6>
      <p className="service-link">{linkText}</p>
    </div>
  );
}

export default ServiceCard