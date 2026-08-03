import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave, FaPlus, FaTable } from "react-icons/fa";

import { Button } from "@/components/ui/Button/Button";
import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap } from "@/data/optionsData";

import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";
import Modal from "@/components/ui/Modal/Modal";
import AssessmentTable from "@/pages/teacher/attendance/components/AssessmentTable";

import "./AssessmentPage.css";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { fields } = filterFormsData.calificaciones;

  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
    nuevaColumna: false,
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [numeroNotas, setNumeroNotas] = useState(10);

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleBack = () => navigate("/teacher");

  const onFiltroValido = (data) => {
    console.log("Filtro válido:", data);
    setLoading((prev) => ({ ...prev, cargar: true }));

    setTimeout(() => {
      setEstudiantes([
        {
          id: 1,
          apellidos: "Garcia Villadiego",
          nombres: "Luis Alberto",
          notas: ["5.0", "5.0", "5.0", "5.0", "5.0"],
          retroalimentacion: "",
        },
        {
          id: 2,
          apellidos: "Giraldo Giraldo",
          nombres: "Jorge Armando",
          notas: ["5.0", "4.5", "3.5", "2.5", "4.0"],
          retroalimentacion: "",
        },
      ]);
      setLoading((prev) => ({ ...prev, cargar: false }));
    }, 1000);
  };

  const handleCargar = handleSubmit(onFiltroValido);

  const handleGuardar = () => {
    setLoading((prev) => ({ ...prev, guardar: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      setIsSuccessOpen(true);
    }, 1000);
  };

  const handleNuevaColumna = () => {
    setLoading((prev) => ({ ...prev, nuevaColumna: true }));
    setNumeroNotas((prev) => prev + 1);
    setEstudiantes((prev) =>
      prev.map((est) => ({ ...est, notas: [...est.notas, ""] })),
    );
    setTimeout(
      () => setLoading((prev) => ({ ...prev, nuevaColumna: false })),
      1000,
    );
  };

  const handleNotaChange = (estId, index, value) => {
  if (value === "" || /^([1-5](\.[0-9]{0,1})?)$/.test(value)) {
    const numValue = parseFloat(value);
    if (value === "" || (numValue >= 1.0 && numValue <= 5.0)) {
      setEstudiantes((prev) =>
        prev.map((est) => {
          if (est.id !== estId) return est;
          const notas = [...est.notas];
          while (notas.length <= index) notas.push("");
          notas[index] = value;
          return { ...est, notas };
        }),
      );
    }
  }
};

  const handleAbrirModal = (estudiante) => {
    // TODO: conectar con el modal de retroalimentación (pendiente de definir componente)
    console.log("Abrir retro de:", estudiante);
  };

  return (
    <>
      <NavbarSection sectionKey="calificaciones" handleBack={handleBack} />
      <form onSubmit={handleSubmit(handleGuardar)}>
        <div className="assessment-container">
          <div className="filter-card">
            <div className="form-row">
              {fields.map((field) => (
                <Select
                  key={field.id}
                  label={field.label}
                  name={field.id}
                  options={optionsMap[field.optionsKey]}
                  register={register}
                  error={errors[field.id]}
                  variant="square"
                  required={field.required}
                />
              ))}
            </div>
          </div>
          <div className="assessment-button">
            <Button
              type="button"
              variant="load"
              icon={FaPlus}
              iconPosition="left"
              disabled={loading.cargar}
              onClick={handleCargar}
            >
              {loading.cargar ? "Cargando..." : "Estudiantes"}
            </Button>
            <Button
              type="submit"
              variant="save"
              icon={FaSave}
              iconPosition="left"
              disabled={loading.guardar}
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="outline-primary"
              icon={FaTable}
              iconPosition="left"
              disabled={loading.nuevaColumna}
              onClick={handleNuevaColumna}
            >
              {loading.nuevaColumna ? "Agregando..." : "Nueva Columna"}
            </Button>
          </div>

          <div className="assessment-table">
            {estudiantes.length > 0 && (
              <AssessmentTable
                estudiantes={estudiantes}
                numeroNotas={numeroNotas}
                onNotaChange={handleNotaChange}
                onAbrirModal={handleAbrirModal}
              />
            )}
          </div>
        </div>
      </form>

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        variant="success"
        message="¡Calificaciones guardadas!"
        description="Las calificaciones se registraron correctamente."
        autoCloseMs={5000}
      />
    </>
  );
};

export default AssessmentPage;
