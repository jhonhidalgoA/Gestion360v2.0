import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FaSave, FaPlus, FaUndo } from "react-icons/fa";

import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap, getStudentsByGroup } from "@/data/DBdataSimulation";
import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import Select from "@/components/ui/Select/Select";
import Modal from "@/components/ui/Modal/Modal";
import AttendanceTable from "@/pages/teacher/attendance/components/AttendanceTable";
import AttendanceLegend from "@/pages/teacher/attendance/components/AttendanceLegend";
import EmptyState from "@/pages/teacher/attendance/components/EmptyState";

import "./AttendancePage.css";

const AttendancePage = () => {
  const navigate = useNavigate();
  const { fields } = filterFormsData.attendance;

  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [estudiantes, setEstudiantes] = useState([]);

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const grupoValue = useWatch({ control, name: "grupo" });
  const asignaturaValue = useWatch({ control, name: "asignatura" });
  const periodoValue = useWatch({ control, name: "periodo" });

  const duracion = useWatch({ control, name: "duracion" });
  const duracionSeleccionada = Number(duracion) || 1;

  // Navegación  //

  const handleBack = () => navigate("/teacher");

  const handleReset = () => {
    reset(defaultValues);
    setEstudiantes([]);
  };

  // Cargar estudiantes //

  const onFiltroValido = async (data) => {
    setLoading((prev) => ({
      ...prev,
      cargar: true,
    }));

    try {
      const students = await getStudentsByGroup(data.grupo);
      setEstudiantes(
        students.map((s) => {
          const [nombres, ...apellidosArr] = s.nombre.split(" ");
          return {
            id: s.id,
            apellidos: apellidosArr.join(" "),
            nombres,
            asistencia: Array(7).fill("P"),
            confirmado: Array(7).fill(false),
          };
        }),
      );
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        cargar: false,
      }));
    }
  };

  const handleCargar = handleSubmit(onFiltroValido);

  // Guardar //

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

  // Cambiar estado asistencia //

  const handleCambiarEstado = (estId, diaIndex) => {
    setEstudiantes((prev) =>
      prev.map((est) => {
        if (est.id !== estId) return est;

        const nuevaAsistencia = [...est.asistencia];
        const nuevoConfirmado = [...est.confirmado];

        const estadoActual = nuevaAsistencia[diaIndex];

        let nuevoEstado;

        if (!nuevoConfirmado[diaIndex]) {
          nuevoEstado = "P";
        } else if (duracionSeleccionada === 1) {
          if (estadoActual === "P") nuevoEstado = "R";
          else if (estadoActual === "R") nuevoEstado = "A";
          else nuevoEstado = "P";
        } else if (duracionSeleccionada === 2) {
          if (estadoActual === "P") nuevoEstado = "PARCIAL";
          else if (estadoActual === "PARCIAL") nuevoEstado = "A";
          else if (estadoActual === "A") nuevoEstado = "R";
          else nuevoEstado = "P";
        } else {
          if (estadoActual === "P") nuevoEstado = "PARCIAL1";
          else if (estadoActual === "PARCIAL1") nuevoEstado = "PARCIAL2";
          else if (estadoActual === "PARCIAL2") nuevoEstado = "A";
          else if (estadoActual === "A") nuevoEstado = "R";
          else nuevoEstado = "P";
        }

        nuevaAsistencia[diaIndex] = nuevoEstado;
        nuevoConfirmado[diaIndex] = true;

        return {
          ...est,
          asistencia: nuevaAsistencia,
          confirmado: nuevoConfirmado,
        };
      }),
    );
  };

  const renderField = (field) => {
    if (field.id === "asignatura") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={optionsMap[field.optionsKey]}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
          disabled={!grupoValue}
        />
      );
    }

    if (field.id === "periodo") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={optionsMap[field.optionsKey]}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
          disabled={!asignaturaValue}
        />
      );
    }

    if (field.id === "duracion") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={optionsMap[field.optionsKey]}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
          disabled={!periodoValue}
        />
      );
    }

    return (
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
    );
  };

  return (
    <div className="attendance-page">
      <NavbarSection sectionKey="asistencia" handleBack={handleBack} />

      <form onSubmit={handleSubmit(handleGuardar)}>
        <div className="assessment-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para visualizar la asistencia." />
          </div>
          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => renderField(field))}
              </div>
            </div>

            <div className="assessment-button">
              <Button
                type="button"
                variant="info"
                icon={FaPlus}
                iconPosition="left"
                disabled={loading.cargar}
                onClick={handleCargar}
              >
                {loading.cargar ? "Cargando..." : "Estudiantes"}
              </Button>
              <Button
                type="submit"
                variant="success"
                icon={FaSave}
                iconPosition="left"
                disabled={loading.guardar}
              >
                Guardar
              </Button>
              <Button
                type="button"
                variant="outline-primary"
                icon={FaUndo}
                iconPosition="left"
                onClick={handleReset}
              >
                Restablecer selección
              </Button>
            </div>
          </div>

          <AttendanceLegend duracionSeleccionada={duracionSeleccionada} />

          <div className="assessment-table">
            {estudiantes.length > 0 ? (
              <AttendanceTable
                estudiantes={estudiantes}
                duracionSeleccionada={duracionSeleccionada}
                onCambiarEstado={handleCambiarEstado}
              />
            ) : (
              <EmptyState title="La Tabla de Asistencia aparecerá aquí una vez completes los filtros." />
            )}
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
    </div>
  );
};

export default AttendancePage;
