import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {FaSave, FaPlus, FaTable } from "react-icons/fa"; 

import NavbarSection from "@/components/navbar/NavbarSection";
import FilterForm from "@/components/ui/FilterForm/FilterForm";
import { Button } from "@/components/ui/Button/Button"; // Importas tu Button existente
import "./AssessmentPage.css";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
    nuevaColumna: false,
  });

  const {
    register,
   
    formState: { errors },
  } = useForm({
    defaultValues: { grupo: "", asignatura: "", periodo: "" },
    mode: "onChange",
  });

 

  const handleBack = () => navigate("/teacher");

  const handleCargar = () => {
    setLoading((prev) => ({ ...prev, cargar: true }));
    setTimeout(() => setLoading((prev) => ({ ...prev, cargar: false })), 1000);
  };

  const handleGuardar = () => {
    setLoading((prev) => ({ ...prev, guardar: true }));
    setTimeout(() => setLoading((prev) => ({ ...prev, guardar: false })), 1000);
  };

  const handleNuevaColumna = () => {
    setLoading((prev) => ({ ...prev, nuevaColumna: true }));
    setTimeout(() => setLoading((prev) => ({ ...prev, nuevaColumna: false })), 1000);
  };

  return (
    <>
      <NavbarSection
        sectionKey="calificaciones"
        handleBack={handleBack}
        setIsModalOpen={setIsModalOpen}
      />

      <div className="assessment-container">
        <FilterForm
          sectionKey="calificaciones"
          optionsData={{ /* tus datos */ }}
          register={register}
          errors={errors}
        />        
        <div className="assessment-button">
          <Button
            variant="secondary"
            icon={FaPlus}
            iconPosition="left"
            disabled={loading.cargar}
            onClick={handleCargar}
          >
            {loading.cargar ? "Cargando..." : "Estudiantes"}
          </Button>

          <Button
            variant="save"
            icon={FaSave}
            iconPosition="left"
            disabled={loading.guardar}
            onClick={handleGuardar}
          >
            {loading.guardar ? "Guardando..." : "Guardar"}
          </Button>

          <Button
            variant="outline-primary"
            icon={FaTable}
            iconPosition="left"
            disabled={loading.nuevaColumna}
            onClick={handleNuevaColumna}
          >
            {loading.nuevaColumna ? "Agregando..." : "Nueva Columna"}
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div>
          {/* ModalLogout */}
        </div>
      )}
    </>
  );
};

export default AssessmentPage;