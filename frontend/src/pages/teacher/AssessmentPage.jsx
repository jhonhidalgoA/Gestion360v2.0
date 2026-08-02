import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave, FaPlus, FaTable } from "react-icons/fa";

import NavbarSection from "@/components/navbar/NavbarSection";
import { Button } from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import "./AssessmentPage.css";

const grupos = [
  { value: "10-1", label: "10-1" },
  { value: "10-2", label: "10-2" },
];

const asignaturas = [
  { value: "matematicas", label: "Matemáticas" },
  { value: "ciencias", label: "Ciencias" },
];

const periodos = [
  { value: "1", label: "Periodo 1" },
  { value: "2", label: "Periodo 2" },
];

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
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { grupo: "", asignatura: "", periodo: "" },
    mode: "onChange",
  });

  const handleBack = () => navigate("/teacher");

  const onFiltroValido = (data) => {
    console.log("Filtro válido:", data);
    setLoading((prev) => ({ ...prev, cargar: true }));
    setTimeout(() => setLoading((prev) => ({ ...prev, cargar: false })), 1000);
  };

  const handleCargar = handleSubmit(onFiltroValido);

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
        <div className="filter-card">
          <div className="form-row">
            <Select
              label="Grupo:"
              name="grupo"
              options={grupos}
              register={register}
              error={errors.grupo}
              variant="square"
              required
            />
            <Select
              label="Asignatura:"
              name="asignatura"
              options={asignaturas}
              register={register}
              error={errors.asignatura}
              variant="square"
              required
            />
            <Select
              label="Periodo:"
              name="periodo"
              options={periodos}
              register={register}
              error={errors.periodo}
              variant="square"
              required
            />
          </div>
        </div>

        <div className="assessment-button">
          <Button
            variant="load"
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