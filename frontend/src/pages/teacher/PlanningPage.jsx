import { useNavigate } from "react-router-dom";

import NavbarSection from "@/components/navbar/NavbarSection";

import "./PlanningPage.css";

const PlanningPage = () => {
  const navigate = useNavigate(); 
  const handleBack = () => navigate("/teacher");

  const handleCrearPlan = () => {
    navigate("/crear-plan");
  };

  const handleMisPlanes = () => {
    navigate("/ver-planes");
  };
  
  return (
    <>
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} />
      <div className="planning-container">
        <h2>Selecciona la opción que deseas realizar</h2>
        <div className="planning-cards">
          <div className="planning-card" onClick={handleCrearPlan}>
            <div>
              <span className="material-symbols-outlined planning-icon">
                add_circle
              </span>
            </div>
            <div className="planning-card_title">
              <h3>Crear Nuevo Plan</h3>
              <p>Diseña y crea un nuevo plan de clase </p>
            </div>
          </div>
          <div className="planning-card" onClick={handleMisPlanes}>
            <div>
              <span className="material-symbols-outlined planning-icon">
                folder_open
              </span>
            </div>
            <div className="planning-card_title">
              <h3>Mis Planes</h3>
              <p>Consulta, edita o gestiona tus planes existentes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPage;
