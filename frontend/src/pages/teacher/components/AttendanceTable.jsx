import "./AttendanceTable.css";

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie"]; // ✅ Solo 5 días

const getFechasSemana = () => {
  const hoy = new Date();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (hoy.getDay() === 0 ? 6 : hoy.getDay() - 1));

  return Array.from({ length: 5 }, (_, i) => { // ✅ Cambiado de 7 a 5
    const dia = new Date(lunes);
    dia.setDate(lunes.getDate() + i);
    const mes = dia.toLocaleString("es-ES", { month: "short" });
    return `${DIAS_SEMANA[i]} ${dia.getDate()} ${mes}.`;
  });
};

const getIndiceHoy = () => {
  const dia = new Date().getDay();
  // Si es sábado (6) o domingo (0), no hay "hoy" en la semana laboral
  if (dia === 0 || dia === 6) return -1;
  return dia - 1; // 0=Lun, 1=Mar, 2=Mié, 3=Jue, 4=Vie
};

const getEstadoCelda = (estado, confirmado, duracionSeleccionada) => {
  if (!confirmado) return { icono: "", texto: "", clase: "vacio" };

  if (duracionSeleccionada === 1) {
    if (estado === "P") return { icono: "check", texto: "1h", clase: "presente" };
    if (estado === "A") return { icono: "close", texto: "A", clase: "ausente" };
    return { icono: "timer", texto: "R", clase: "retardo" };
  }

  if (duracionSeleccionada === 2) {
    if (estado === "P") return { icono: "check", texto: "2h", clase: "presente" };
    if (estado === "PARCIAL") return { icono: "remove", texto: "-", clase: "parcial" };
    if (estado === "A") return { icono: "close", texto: "A", clase: "ausente" };
    if (estado === "R") return { icono: "timer", texto: "R", clase: "retardo" };
  }

  if (duracionSeleccionada === 3) {
    if (estado === "P") return { icono: "check", texto: "3h", clase: "presente" };
    // ✅ Diferenciación de PARCIAL1 y PARCIAL2
    if (estado === "PARCIAL1") return { icono: "remove", texto: "P2", clase: "parcial1" };
    if (estado === "PARCIAL2") return { icono: "remove", texto: "P1", clase: "parcial2" };
    if (estado === "A") return { icono: "close", texto: "A", clase: "ausente" };
    if (estado === "R") return { icono: "timer", texto: "R", clase: "retardo" };
  }

  return { icono: "", texto: "", clase: "vacio" };
};

const calcularResumen = (asistencia, confirmado, duracionSeleccionada) => {
  let presentes = 0;
  let ausentes = 0;
  let retardos = 0;
  let diasConfirmados = 0;
  let diasP = 0;
  let diasA = 0;
  let diasR = 0;

  asistencia.forEach((estado, i) => {
    if (!confirmado[i]) return;
    diasConfirmados++;

    if (estado === "P") {
      presentes += 1;
      diasP++;
    } else if (estado === "A") {
      ausentes += 1;
      diasA++;
    } else if (estado === "R") {
      retardos += 0.25;
      diasR++;
    } else if (estado === "PARCIAL") {
      presentes += 0.5;
      ausentes += 0.5;
      diasP += 0.5;
      diasA += 0.5;
    } else if (estado === "PARCIAL1") {
      presentes += 2;
      ausentes += 1;
      diasP += 1;
      diasA += 0.5;
    } else if (estado === "PARCIAL2") {
      presentes += 1;
      ausentes += 2;
      diasP += 0.5;
      diasA += 1;
    }
  });

  const horasPresentes = presentes * duracionSeleccionada;
  const horasAusentes = ausentes * duracionSeleccionada;
  const horasRetardos = retardos;

  const totalDias = diasConfirmados;
  const porcentajePresentes = totalDias > 0 ? Math.round((diasP / totalDias) * 100) : 0;
  const porcentajeAusentes = totalDias > 0 ? Math.round((diasA / totalDias) * 100) : 0;
  const porcentajeRetardos = totalDias > 0 ? Math.round((diasR / totalDias) * 100) : 0;

  return {
    horasPresentes: horasPresentes.toFixed(1),
    horasAusentes: horasAusentes.toFixed(1),
    horasRetardos: horasRetardos.toFixed(1),
    porcentajePresentes,
    porcentajeAusentes,
    porcentajeRetardos,
    diasConfirmados: totalDias,
  };
};

const AttendanceTable = ({ estudiantes, duracionSeleccionada, onCambiarEstado }) => {
  const fechasSemana = getFechasSemana();
  const indiceHoy = getIndiceHoy();

  return (
    <div className="tabla-container">
      <div className="tabla-scroll">
        <table className="tabla-asistencia">
          <thead>
            <tr>
              <th className="columna-estudiante">Estudiante</th>
              {fechasSemana.map((fecha, i) => (
                <th
                  key={i}
                  className={`columna-dia ${i === indiceHoy ? "columna-hoy" : ""}`}
                >
                  {fecha}
                </th>
              ))}
              <th className="columna-resumen">Resumen</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est, estIndex) => {
              const confirmadoArr = est.confirmado || Array(5).fill(false); // ✅ Cambiado a 5
              const resumen = calcularResumen(est.asistencia, confirmadoArr, duracionSeleccionada);

              return (
                <tr key={est.id} className={estIndex % 2 === 0 ? "fila-par" : "fila-impar"}>
                  <td className="celda-estudiante">
                    {est.apellidos} {est.nombres}
                  </td>

                  {est.asistencia.map((estado, diaIndex) => {
                    const confirmado = confirmadoArr[diaIndex];
                    const { icono, texto, clase } = getEstadoCelda(estado, confirmado, duracionSeleccionada);
                    const esHoy = diaIndex === indiceHoy;

                    return (
                      <td key={diaIndex} className={`celda-dia ${esHoy ? "columna-hoy" : ""}`}>
                        <button
                          type="button"
                          onClick={() => onCambiarEstado(est.id, diaIndex)}
                          className={`boton-estado ${clase}`}
                        >
                          <div className="icono-texto-container">
                            {icono && (
                              <span className="material-symbols-outlined icono-estado">{icono}</span>
                            )}
                            {!icono && clase === "vacio" && (
                              <span className="material-symbols-outlined icono-vacio">add</span>
                            )}
                            <span className="estado-texto">{texto}</span>
                          </div>
                        </button>
                      </td>
                    );
                  })}

                  <td className="celda-resumen">
                    {resumen.diasConfirmados === 0 ? (
                      <div className="resumen-vacio">Sin registros esta semana</div>
                    ) : (
                      <div className="resumen-container">
                        <div className="resumen-header">
                          <span className="resumen-porcentaje">{resumen.porcentajePresentes}%</span>
                          <span className="resumen-label">asistencia</span>
                        </div>
                        <div className="resumen-barra">
                          {resumen.porcentajePresentes > 0 && (
                            <div className="barra-presente" style={{ width: `${resumen.porcentajePresentes}%` }} />
                          )}
                          {resumen.porcentajeAusentes > 0 && (
                            <div className="barra-ausente" style={{ width: `${resumen.porcentajeAusentes}%` }} />
                          )}
                          {resumen.porcentajeRetardos > 0 && (
                            <div className="barra-retardo" style={{ width: `${resumen.porcentajeRetardos}%` }} />
                          )}
                        </div>
                        <div className="resumen-detalle">
                          {resumen.horasPresentes}h asistidas · {resumen.horasAusentes}h ausente
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;