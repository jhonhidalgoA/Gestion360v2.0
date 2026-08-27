import { Check } from "lucide-react";
import { observationTypes } from "@/data/observerData";
import "./ObserverCard.css";

const ObserverCard = ({ value, onChange }) => {
  return (
    <div className="observer-card-group">
      {observationTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = value === type.id;
        return (
          <label
            key={type.id}
            className={`report-card ${isSelected ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="tipoNovedad"
              value={type.id}
              checked={isSelected}
              onChange={() => onChange(type.id)}
            />
            <span className="observer-check">
              <Check className="report-check-icon" />
            </span>
            <div className="report-content">
              <div className="report-icon" style={{ color: type.iconColor }}>
                {Icon && <Icon className="icon" />}
              </div>
              <div className="report-text">
                <span className="report-category">{type.category}</span>
                <h4 className="report-title">{type.title}</h4>
                <p className="report-subtitle">{type.subtitle}</p>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default ObserverCard;