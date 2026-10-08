import { Link } from "react-router-dom";
import "./AdminCard.css";

const AdminCard = ({ item, color }) => {
  return (
    <Link to={item.to || "#"}>
      <div
        className="card-admin"
        style={{
          backgroundColor: color || item.color || "var(--color-primary)",
        }}
      >
        <span className="material-symbols-outlined card-admin-icon">
          {item.icon}
        </span>
        <span className="card-admin-title">{item.title}</span>
      </div>
    </Link>
  );
};

export default AdminCard;