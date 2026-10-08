import { Link } from "react-router-dom";
import "./TeacherCard.css";

const TeacherCard = ({ item }) => {
  return (
    <Link to={item.path}>
      <div
        className="card-teacher"
        style={{
          background: item.gradient,
          color: "#fff",
        }}
      >
        <span
          className="material-symbols-outlined card-icon"
          style={{
            fontSize: item.iconSize || 70,
            color: item.iconColor || "#fff",
          }}
        >
          {item.icon}
        </span>

        <span className="card-title">{item.title}</span>
      </div>
    </Link>
  );
};

export default TeacherCard;