
import "./TeacherSchedule.css";

const TeacherSchedule = ({ isOpen, onClose }) => {
  
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const timeSlots = [
    { time: "7:00 - 8:00", end: "8:00", type: "class" },
    { time: "8:00 - 9:00", end: "9:00", type: "class" },
    { time: "9:00 - 10:00", end: "10:00", type: "class" },
    { time: "10:00 - 10:30", end: "10:30", type: "break", label: "Descanso" },
    { time: "10:30 - 11:30", end: "11:30", type: "class" },
    { time: "11:30 - 12:30", end: "12:30", type: "class" },
    { time: "12:30 - 1:30", end: "1:30", type: "lunch", label: "Almuerzo" },
    { time: "1:30 - 2:30 ", end: "2:30", type: "class" },
    { time: "2:30 -3:30", end: "3:30", type: "class" },
    
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="schedule-overlay" onClick={onClose} />
      <div className="schedule-panel">
        <div className="schedule-header">
          <div className="schedule-title">
            <h2>Mi horario</h2>
            <p>Consulta tu programación semanal de clases</p>
          </div>
          <button className="schedule-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>     

        <div className="schedule-body">
          <div className="schedule-table">
            <div className="table-header">
              <div className="time-column-header"></div>
              {days.map((day) => (
                <div key={day} className="day-column-header">{day}</div>
              ))}
            </div>
            <div className="table-body">
              {timeSlots.map((slot, index) => (
                <div key={index} className="time-row">
                  <div className="time-label">{slot.time}</div>
                  {slot.type === "break" || slot.type === "lunch" ? (
                    <div className={`full-row ${slot.type}`}>
                      <span>{slot.label}</span>
                    </div>
                  ) : (
                    days.map((day) => (
                      <div key={day} className="schedule-cell"></div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSchedule;