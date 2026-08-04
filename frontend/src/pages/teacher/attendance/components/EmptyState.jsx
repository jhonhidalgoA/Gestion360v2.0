import { FaTable } from "react-icons/fa";
import "./EmptyState.css";

const EmptyState = ({
  icon: Icon = FaTable,
  title = "Selecciona grupo, asignatura y periodo",
  description = "La tabla de calificaciones aparecerá aquí una vez completes los tres filtros.",
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon />
      </div>
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};

export default EmptyState;