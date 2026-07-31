import { Link } from "react-router-dom";
import "./ModuleCard.css";

const ModuleCard = ({ item }) => {
  return (
    <Link to={item.path} className="card-link">
      <div
        className="card"
        style={{
          background: item.gradient,
          color: "#fff",
        }}
      >
        {item.iconUrl ? (
          <img
            src={item.iconUrl}
            alt={item.title}
            className="card-icon"
            style={{
              width: item.iconSize || 200,
              height: item.iconSize || 200,
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            className="material-symbols-outlined card-icon"
            style={{
              fontSize: item.iconSize || 80,
              color: item.iconColor || "#fff",
            }}
          >
            {item.icon}
          </span>
        )}

        <span className="card-title">{item.title}</span>
      </div>
    </Link>
  );
};

export default ModuleCard;
