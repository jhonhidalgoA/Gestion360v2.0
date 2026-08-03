import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave, FaPlus } from "react-icons/fa";

import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";

import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap } from "@/data/optionsData";

import "./AttendancePage.css";

const Attendance = () => {


  /* ===========================
     Configuración
  =========================== */

  const navigate = useNavigate();
  const { fields } = filterFormsData.attendance;

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  /* ===========================
     Estados
  =========================== */

  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
    nuevaColumna: false,
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  /* ===========================
     Formulario
  =========================== */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  /* ===========================
     Navegación
  =========================== */

  const handleBack = () => navigate("/teacher");

  /* ===========================
     Eventos
  =========================== */

  const onFiltroValido = (data) => {
    console.log("Filtro válido:", data);

    setLoading((prev) => ({
      ...prev,
      cargar: true,
    }));

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        cargar: false,
      }));
    }, 1000);
  };

  const handleCargar = handleSubmit(onFiltroValido);

  const handleGuardar = () => {
    setLoading((prev) => ({
      ...prev,
      guardar: true,
    }));

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        guardar: false,
      }));

      setIsSuccessOpen(true);
    }, 1000);
  };

  

  
  return (
    <>
      <NavbarSection sectionKey="asistencia" handleBack={handleBack} />

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
            
          </div>
        </div>
      </form>

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        variant="success"
        message="¡Asistencia guardada!"
        description="La asistencia se registró correctamente."
        autoCloseMs={5000}
      />
    </>
  );
};

export default Attendance;
