import { useState } from "react";
import "./TeacherGroups.css";

const TeacherGroups = ({ isOpen, onClose }) => {

  const groups = [
    { code: "601", subject: "Matemáticas", grade: "Sexto grado", students: 32, room: "Salón 204", type: "mat", icon: "calculate" },
    { code: "602", subject: "Ciencias Naturales", grade: "Sexto grado", students: 29, room: "Salón 205", type: "cie", icon: "science" },
    { code: "701", subject: "Lengua Castellana", grade: "Séptimo grado", students: 27, room: "Salón 108", type: "len", icon: "menu_book" },
    { code: "702", subject: "Ciencias Sociales", grade: "Séptimo grado", students: 26, room: "Salón 109", type: "soc", icon: "public" },
    { code: "801", subject: "Inglés", grade: "Octavo grado", students: 28, room: "Salón 301", type: "ing", icon: "translate" },
  ];

  const [search, setSearch] = useState("");

  const filteredGroups = groups.filter((g) =>
    `${g.code} ${g.subject}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = groups.reduce((sum, g) => sum + g.students, 0);
  const totalSubjects = new Set(groups.map((g) => g.subject)).size;

  if (!isOpen) return null;

  return (
    <>
      <div className="groups-overlay" onClick={onClose} />
      <div className="groups-panel">
        <div className="groups-header">
          <div className="groups-header-left">
            <div className="groups-header-icon">
              <span className="material-symbols-outlined">diversity_3</span>
            </div>
            <div className="groups-title">
              <h2>Mis grupos</h2>
              <p>Grupos y asignaturas a tu cargo este periodo</p>
            </div>
          </div>
          <button className="groups-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="groups-toolbar">
          <div className="groups-summary">
            <div className="summary-item">
              <strong>{groups.length}</strong>
              <span>Grupos</span>
            </div>
            <div className="summary-item">
              <strong>{totalStudents}</strong>
              <span>Estudiantes</span>
            </div>
            <div className="summary-item">
              <strong>{totalSubjects}</strong>
              <span>Asignaturas</span>
            </div>
          </div>
          <div className="groups-search">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Buscar grupo o asignatura…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="groups-body">
          <div className="groups-grid">
            {filteredGroups.map((group) => (
              <div key={group.code} className={`group-card card-${group.type}`}>
                <div className="group-top">
                  <div className="group-icon">
                    <span className="material-symbols-outlined">{group.icon}</span>
                  </div>
                  <span className="group-code">{group.code}</span>
                </div>

                <div className="group-name-block">
                  <h3>{group.subject}</h3>
                  <p>{group.grade}</p>
                </div>

                <div className="group-meta">
                  <span className="meta-chip">
                    <span className="material-symbols-outlined">group</span>
                    {group.students} estudiantes
                  </span>
                  <span className="meta-chip">
                    <span className="material-symbols-outlined">meeting_room</span>
                    {group.room}
                  </span>
                </div>

                <div className="group-footer">
                  <button className="btn-view">
                    Ver estudiantes
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredGroups.length === 0 && (
              <p className="groups-empty">No se encontraron grupos para "{search}"</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherGroups;