import  ModuleCard from "@/components/ui/Card/ModuleCard";
import NavbarModulo from "@/components/navbar/NavbarModulo";

import { moduleData } from "@/data/moduleData";
import "./TeacherPage.css";

const TeacherPage = () => {
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const menuItems = moduleData.teacher;

  return (
    <>
      <NavbarModulo />
      <div className="teacher-container">
        <div className="teacher-header">
          <h1>Bienvenido Docente</h1>
          <p className="current-date">{fechaActual}</p>
        </div>

        <div className="card-grid">
          {menuItems.map((item) => (
            <ModuleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
