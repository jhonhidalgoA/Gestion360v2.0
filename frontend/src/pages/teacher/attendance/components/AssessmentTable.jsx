import { useRef, useState } from "react";
import "./AssessmentTable.css";

const calcularPromedio = (notas) => {
  const nums = notas.filter((n) => n !== "").map(Number);
  if (nums.length === 0) return "0.00";
  const promedio = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.min(promedio, 5.0).toFixed(2);
};

const getColorClass = (valor) => {
  if (valor === "" || isNaN(valor)) return "";
  const n = Number(valor);
  if (n < 3) return "celda-roja";
  if (n < 4) return "celda-amarilla";
  return "celda-verde";
};

const getColorPromedioClass = (prom) => {
  const p = Number(prom);
  if (p < 3) return "promedio-rojo";
  if (p < 4) return "promedio-naranja";
  return "promedio-verde";
};

const AssessmentTable = ({ estudiantes, numeroNotas, onNotaChange, onAbrirModal }) => {
  const [celdaActiva, setCeldaActiva] = useState(null);
  const inputsRef = useRef({});

  const handleKeyDown = (e, estIndex, notaIndex) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      if (notaIndex < numeroNotas - 1) {
        inputsRef.current[`${estIndex}-${notaIndex + 1}`]?.focus();
      } else if (estIndex < estudiantes.length - 1) {
        inputsRef.current[`${estIndex + 1}-0`]?.focus();
      }
    }
    if (key === "ArrowRight")
      inputsRef.current[`${estIndex}-${notaIndex + 1}`]?.focus();
    if (key === "ArrowLeft")
      inputsRef.current[`${estIndex}-${notaIndex - 1}`]?.focus();
    if (key === "ArrowDown")
      inputsRef.current[`${estIndex + 1}-${notaIndex}`]?.focus();
    if (key === "ArrowUp")
      inputsRef.current[`${estIndex - 1}-${notaIndex}`]?.focus();
  };

  return (
    <div className="assessment-table-wrapper">
      <table
        className="assessment-table"
        style={{ minWidth: `${700 + numeroNotas * 60}px` }}
      >
        <thead>
          <tr>
            <th className="th-estudiante">Estudiante</th>
            {Array.from({ length: numeroNotas }, (_, i) => (
              <th key={i} className="th-nota">
                N{i + 1}
              </th>
            ))}
            <th className="th-promedio">Promedio</th>
            <th className="th-accion">Acción</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, estIndex) => {
            const promedio = calcularPromedio(est.notas);
            return (
              <tr key={est.id} className={estIndex % 2 === 0 ? "row-even" : "row-odd"}>
                <td className="td-estudiante">
                  {est.apellidos} {est.nombres}
                </td>

                {Array.from({ length: numeroNotas }, (_, notaIndex) => {
                  const nota = est.notas[notaIndex] ?? "";
                  const cellKey = `${estIndex}-${notaIndex}`;
                  const isActive = celdaActiva === cellKey;
                  return (
                    <td key={notaIndex} className="td-nota">
                      <div className="nota-input-wrap">
                        <input
                          type="text"
                          value={nota}
                          ref={(el) => (inputsRef.current[cellKey] = el)}
                          onFocus={() => setCeldaActiva(cellKey)}
                          onBlur={() => setCeldaActiva(null)}
                          onKeyDown={(e) => handleKeyDown(e, estIndex, notaIndex)}
                          onChange={(e) => onNotaChange(est.id, notaIndex, e.target.value)}
                          title="Rango válido: 1.0 - 5.0"
                          className={[
                            "nota-input",
                            getColorClass(nota),
                            isActive ? "is-active" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        />
                        {isActive && (
                          <div className="nota-tooltip">
                            1.0 - 5.0
                            <div className="nota-tooltip-arrow" />
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}

                <td className={`td-promedio ${getColorPromedioClass(promedio)}`}>
                  {promedio}
                </td>

                <td className="td-accion">
                  <button
                    onClick={() => onAbrirModal(est)}
                    className={`btn-accion ${est.retroalimentacion ? "con-retro" : "sin-retro"}`}
                  >
                    {est.retroalimentacion ? "✓ Ver/Editar" : "Agregar"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;