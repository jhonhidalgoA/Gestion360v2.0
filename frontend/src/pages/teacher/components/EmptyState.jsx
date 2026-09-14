import { FaTable } from "react-icons/fa";
import "./EmptyState.css";

const EmptyState = ({
  icon: Icon = FaTable,
  title = "La Tabla de Calificaciones aparecerá aquí una vez completes los filtros.",
  
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon />
      </div>
      <p className="empty-state-title">{title}</p>
      
    </div>
  );
};

export default EmptyState;