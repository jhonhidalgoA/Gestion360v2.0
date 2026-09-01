import { Check } from "lucide-react";
import { observationTypes } from "@/data/observerData";
import "./ObserverCard.css";

const ObserverCard = ({ value, onChange, disabled = false }) => {
  return (
    <div className="observer-card-group">
      {observationTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = value === type.id;
        return (
          <label
            key={type.id}
            className={`report-card ${isSelected ? "selected" : ""}${
              disabled ? " report-card--disabled" : ""
            }`}
            style={{ "--ch": type.iconColor }}
          >
            <input
              type="radio"
              name="tipoNovedad"
              value={type.id}
              checked={isSelected}
              disabled={disabled}
              onChange={() => onChange(type.id)}
            />

            <span className="observer-check">
              <Check className="report-check-icon" />
            </span>

            <svg
              className="report-card-shape"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,0 L19.29,0 L25.66,77.72 Q26.79,91.30 29.29,91.30 L100,91.30 L100,100 L0,100 Z"
                fill={type.iconColor}
              />
            </svg>

            <div className="report-icon">
              <span className="report-category">{type.category}</span>
              {Icon && <Icon className="icon" />}
            </div>

            <div className="report-body">
              <div className="report-text">
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