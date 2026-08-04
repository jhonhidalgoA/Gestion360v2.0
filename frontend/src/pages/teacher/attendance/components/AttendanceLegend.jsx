import "./AttendanceLegend.css";

const AttendanceLegend = ({ duracionSeleccionada }) => {
  return (
    <div className="leyenda-container">
      <div className="leyenda-items">
        <div className="leyenda-item">
          <span className="estado-icon presente">
            <span className="material-symbols-outlined">check</span>
          </span>
          <span>Presente ({duracionSeleccionada}h)</span>
        </div>

        <div className="leyenda-item">
          <span className="estado-icon ausente">
            <span className="material-symbols-outlined">close</span>
          </span>
          <span>Ausente (0h)</span>
        </div>

        <div className="leyenda-item">
          <span className="estado-icon retardo">
            <span className="material-symbols-outlined">timer</span>
          </span>
          <span>Retardo (max 15 min)</span>
        </div>

        {duracionSeleccionada === 2 && (
          <div className="leyenda-item">
            <span className="estado-icon parcial">
              <span className="material-symbols-outlined">remove</span>
            </span>
            <span>Parcial (1h presente, 1h ausente)</span>
          </div>
        )}

        {duracionSeleccionada === 3 && (
          <>
            <div className="leyenda-item">
              <span className="estado-icon parcial1">
                <span className="material-symbols-outlined">remove</span>
              </span>
              <span>Parcial 1 (2h presente, 1h ausente)</span>
            </div>
            <div className="leyenda-item">
              <span className="estado-icon parcial2">
                <span className="material-symbols-outlined">remove</span>
              </span>
              <span>Parcial 2 (1h presente, 2h ausente)</span>
            </div>
          </>
        )}
      </div>

      <div className="leyenda-nota">* Clic en cada celda para cambiar el estado</div>
    </div>
  );
};

export default AttendanceLegend;