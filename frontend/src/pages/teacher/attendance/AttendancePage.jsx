import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FaSave, FaPlus, FaUndo } from "react-icons/fa";

import { filterFormsData } from "@/data/filterFormsData";
import { getStudentsByGroup } from "@/data/DBdataSimulation";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import Modal from "@/components/ui/Modal/Modal";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";

import AttendanceTable from "@/pages/teacher/components/AttendanceTable";
import AttendanceLegend from "@/pages/teacher/components/AttendanceLegend";
import EmptyState from "@/pages/teacher/components/EmptyState";

import "./AttendancePage.css";

const AttendancePage = () => {
  const navigate = useNavigate();
  const { fields } = filterFormsData.attendance;

  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
    reset: false,
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    variant: null,
    onConfirm: null,
  });

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
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
  const filtrosCompletos = Boolean(
    grupoValue && asignaturaValue && periodoValue && duracion,
  );

  const handleBack = () => navigate("/teacher");

  // ✅ Función helper para calcular el siguiente estado (código más limpio)
  const calcularSiguienteEstado = (estadoActual, duracion) => {
    if (duracion === 1) {
      if (estadoActual === "P") return "R";
      if (estadoActual === "R") return "A";
      return "P";
    }
    if (duracion === 2) {
      if (estadoActual === "P") return "PARCIAL";
      if (estadoActual === "PARCIAL") return "A";
      if (estadoActual === "A") return "R";
      return "P";
    }
    // Duración 3
    if (estadoActual === "P") return "PARCIAL1";
    if (estadoActual === "PARCIAL1") return "PARCIAL2";
    if (estadoActual === "PARCIAL2") return "A";
    if (estadoActual === "A") return "R";
    return "P";
  };

  const hayCambiosEnAsistencia = () => {
    return estudiantes.some((est) => est.confirmado.some((c) => c === true));
  };

  const onFiltroValido = async (data) => {
    setLoading((prev) => ({ ...prev, cargar: true }));

    try {
      const students = await getStudentsByGroup(data.grupo);
      setEstudiantes(
        students.map((s) => {
          const [nombres, ...apellidosArr] = s.nombre.split(" ");
          return {
            id: s.id,
            apellidos: apellidosArr.join(" "),
            nombres,
            asistencia: Array(5).fill("P"),
            confirmado: Array(5).fill(false),
          };
        }),
      );
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
      alert("Error al cargar los estudiantes. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading((prev) => ({ ...prev, cargar: false }));
    }
  };

  const handleCargar = handleSubmit(onFiltroValido);

  const handleCargarClick = () => {
    if (hayCambiosEnAsistencia()) {
      setConfirmModal({
        isOpen: true,
        variant: "overwrite",
        onConfirm: () => {
          setConfirmModal({ isOpen: false, variant: null, onConfirm: null });
          handleCargar();
        },
      });
    } else {
      handleCargar();
    }
  };

  const handleResetClick = () => {
    if (hayCambiosEnAsistencia()) {
      setConfirmModal({
        isOpen: true,
        variant: "reset",
        onConfirm: () => {
          setConfirmModal({ isOpen: false, variant: null, onConfirm: null });
          handleReset();
        },
      });
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setLoading((prev) => ({ ...prev, reset: true }));
    reset(defaultValues);
    setEstudiantes([]);
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, reset: false }));
    }, 300);
  };

  const handleGuardar = () => {
    if (estudiantes.length === 0) {
      alert("No hay estudiantes cargados para guardar la asistencia.");
      return;
    }

    setLoading((prev) => ({ ...prev, guardar: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      setIsSuccessOpen(true);
    }, 1000);
  };

  // ✅ handleCambiarEstado corregido y optimizado
  const handleCambiarEstado = (estId, diaIndex) => {
    setEstudiantes((prev) =>
      prev.map((est) => {
        if (est.id !== estId) return est;

        const nuevaAsistencia = [...est.asistencia];
        const nuevoConfirmado = [...est.confirmado];
        const estadoActual = nuevaAsistencia[diaIndex];

        // ✅ Sin variable inicializada innecesariamente
        const nuevoEstado = !nuevoConfirmado[diaIndex]
          ? "P"
          : calcularSiguienteEstado(estadoActual, duracionSeleccionada);

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
                {fields.map((field) => (
                  <FormFieldCascada
                    key={field.id}
                    field={field}
                    register={register}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                  />
                ))}
              </div>
            </div>

            <div className="assessment-button">
              <Button
                type="button"
                variant="info"
                icon={FaPlus}
                iconPosition="left"
                disabled={loading.cargar || !filtrosCompletos}
                title={
                  !filtrosCompletos
                    ? "Completa todos los filtros primero"
                    : undefined
                }
                onClick={handleCargarClick}
              >
                {loading.cargar ? "Cargando..." : "Estudiantes"}
              </Button>

              <Button
                type="submit"
                variant="success"
                icon={FaSave}
                iconPosition="left"
                disabled={loading.guardar || estudiantes.length === 0}
                title={
                  estudiantes.length === 0
                    ? "Carga estudiantes primero"
                    : undefined
                }
              >
                {loading.guardar ? "Guardando..." : "Guardar"}
              </Button>

              <Button
                type="button"
                variant="outline-primary"
                icon={FaUndo}
                iconPosition="left"
                onClick={handleResetClick}
                disabled={loading.reset}
              >
                {loading.reset ? "Restableciendo..." : "Restablecer selección"}
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

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({ isOpen: false, variant: null, onConfirm: null })
        }
        onConfirm={confirmModal.onConfirm}
        variant={confirmModal.variant}
      />
    </div>
  );
};

export default AttendancePage;