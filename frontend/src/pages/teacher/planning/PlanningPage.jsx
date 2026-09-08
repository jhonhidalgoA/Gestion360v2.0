import { useNavigate } from "react-router-dom";

import NavbarSection from "@/components/navbar/NavbarSection";

import "./PlanningPage.css";

const PlanningPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const handleCrearPlan = () => {
    navigate("/LessonPlanPage");
  };

  const handleMisPlanes = () => {
    navigate("/LessonPlanLibrary");
  };

  return (
    <>
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} />
      <div className="planning-container">
        <div className="planning-title">
          <h2>¿Que deseas hacer?</h2>
          <h3>Selecciona una opcion para continuar</h3>
        </div>
        <div className="planning-cards">
          <div className="planning-card" onClick={handleCrearPlan}>
            <div className="planning-card__icon">
              <span className="material-symbols-outlined planning-icon">
                add_circle
              </span>
            </div>
            <div className="planning-card_title">
              <h3>Crear Nuevo Plan</h3>
              <p>Define objetivos, contenidos, metodología y evaluación.</p>
            </div>
          </div>

          <div className="planning-card" onClick={handleMisPlanes}>
            <div className="planning-card__icon">
              <span className="material-symbols-outlined planning-icon">
                folder_open
              </span>
            </div>
            <div className="planning-card_title">
              <h3>Mis Planes</h3>
              <p>Consulta, edita o gestiona tus planes existentes.</p>
            </div>
          </div>
        </div>
        <div className="planning-statistics">
          <div className="plan-total">
            <h1>24</h1>
            <p>PLANES TOTALES</p>
          </div>
          <div className="plan-active">
            <h1>18</h1>
            <p>PLANES ACTIVOS</p>
          </div>
          <div className="plan-active">
            <h1>3</h1>
            <p>PLANES EN CONSTRUCCIÓN</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPage;
