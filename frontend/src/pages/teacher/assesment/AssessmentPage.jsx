// React y librerías externas
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FaPlus, FaSave, FaTable, FaUndo } from "react-icons/fa";

// Componentes compartidos
import NavbarSection from "@/components/navbar/NavbarSection";
import Modal from "@/components/ui/Modal/Modal";
import Coments from "@/components/ui/Coments/Coments";
import { Button } from "@/components/ui/Button/Button";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";

// Datos
import { filterFormsData } from "@/data/filterFormsData";
import { modalConfig } from "@/data/modalData";
import { getStudentsByGroup } from "@/data/DBdataSimulation";

// Componentes de la página
import AssessmentTable from "@/pages/teacher/components/AssessmentTable";
import EmptyState from "@/pages/teacher/components/EmptyState";
import FeedbackModalContent from "@/pages/teacher/components/FeedbackModalContent";

import "./AssessmentPage.css";

// ✅ Constante para límite de columnas (FE-008)
const MAX_NOTAS = 15;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { fields } = filterFormsData.calificaciones;

  const [loading, setLoading] = useState({
    cargar: false,
    guardar: false,
    nuevaColumna: false,
    reset: false,
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [numeroNotas, setNumeroNotas] = useState(10);

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    estudianteId: null,
    estudianteNombre: "",
    texto: "",
    lastUpdated: "",
  });

  // ✅ Estado para modales de confirmación (FE-009, FE-010)
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

  // ✅ Observar campos para habilitar botones
  const grupoValue = useWatch({ control, name: "grupo" });
  const asignaturaValue = useWatch({ control, name: "asignatura" });
  const periodoValue = useWatch({ control, name: "periodo" });

  // ✅ Todos los filtros requeridos completos
  const filtrosCompletos = Boolean(
    grupoValue && asignaturaValue && periodoValue,
  );

  // ✅ NUEVO: Helpers para validar datos modificables
  const hayNotasIngresadas = () => {
    return estudiantes.some((est) =>
      est.notas.some((nota) => nota !== "" && nota !== null),
    );
  };

  const hayRetroalimentacion = () => {
    return estudiantes.some((est) => est.retroalimentacion);
  };

  const hayDatosModificables = () => {
    return hayNotasIngresadas() || hayRetroalimentacion();
  };

  const handleBack = () => navigate("/teacher");

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
            notas: Array(numeroNotas).fill(""),
            notasErrors: {},
            retroalimentacion: "",
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

  // ✅ FE-009: Cargar estudiantes con confirmación si ya hay datos
  const handleCargarClick = () => {
    if (estudiantes.length > 0) {
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

  // ✅ FE-010: Resetear con confirmación SOLO si hay datos modificables
  const handleResetClick = () => {
    const hayDatos = hayDatosModificables();

    if (hayDatos) {
      setConfirmModal({
        isOpen: true,
        variant: "reset",
        onConfirm: () => {
          setConfirmModal({ isOpen: false, variant: null, onConfirm: null });
          handleReset();
        },
      });
    } else {
      // Si no hay datos modificables, resetear directamente sin modal
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

  // ✅ NUEVO: handleGuardar con validación de datos modificables
  const handleGuardar = () => {
    // Validar que haya datos modificables
    if (!hayDatosModificables()) {
      alert(
        "No hay calificaciones ni retroalimentación para guardar. Ingresa al menos una nota.",
      );
      return;
    }

    // Validar que no haya errores de formato
    const tieneErrores = estudiantes.some((est) =>
      Object.values(est.notasErrors || {}).some((err) => err !== null),
    );

    if (tieneErrores) {
      alert(
        "Hay notas con valores inválidos. Por favor, corrígelas antes de guardar.",
      );
      return;
    }

    setLoading((prev) => ({ ...prev, guardar: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      setIsSuccessOpen(true);
    }, 1000);
  };

  // ✅ FE-008: Límite de columnas
  const handleNuevaColumna = () => {
    if (numeroNotas >= MAX_NOTAS) return;

    setLoading((prev) => ({ ...prev, nuevaColumna: true }));
    setNumeroNotas((prev) => prev + 1);
    setEstudiantes((prev) =>
      prev.map((est) => ({
        ...est,
        notas: [...est.notas, ""],
        notasErrors: { ...est.notasErrors },
      })),
    );
    setTimeout(
      () => setLoading((prev) => ({ ...prev, nuevaColumna: false })),
      1000,
    );
  };

  // ✅ FE-003: Validación visual de notas con feedback
  const handleNotaChange = (estId, index, value) => {
    const isValidFormat =
      value === "" || /^([1-5](\.[0-9]{0,1})?)$/.test(value);

    setEstudiantes((prev) =>
      prev.map((est) => {
        if (est.id !== estId) return est;
        const notas = [...est.notas];
        const notasErrors = { ...est.notasErrors };

        if (isValidFormat) {
          const numValue = parseFloat(value);
          const isInRange =
            value === "" || (numValue >= 1.0 && numValue <= 5.0);
          notas[index] = value;
          notasErrors[index] = !isInRange
            ? "Valor fuera de rango (1.0-5.0)"
            : null;
        } else {
          notasErrors[index] = "Formato inválido. Use 1.0 a 5.0";
        }

        return { ...est, notas, notasErrors };
      }),
    );
  };

  const handleAbrirModal = (est) => {
    setFeedbackModal({
      isOpen: true,
      estudianteId: est.id,
      estudianteNombre: `${est.apellidos} ${est.nombres}`,
      texto: est.retroalimentacion || "",
      lastUpdated: est.retroalimentacionFecha || "",
    });
  };

  const handleGuardarFeedback = () => {
    setEstudiantes((prev) =>
      prev.map((est) =>
        est.id === feedbackModal.estudianteId
          ? { ...est, retroalimentacion: feedbackModal.texto }
          : est,
      ),
    );
    setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="assesment-page">
      <NavbarSection sectionKey="calificaciones" handleBack={handleBack} />
      <form onSubmit={handleSubmit(handleGuardar)}>
        <div className="assessment-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para visualizar las calificaciones." />
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
              {/* ✅ Botón Estudiantes: requiere filtros completos */}
              <Button
                type="button"
                variant="info"
                icon={FaPlus}
                iconPosition="left"
                disabled={loading.cargar || !filtrosCompletos}
                title={
                  !filtrosCompletos
                    ? "Completa Grupo, Asignatura y Periodo primero"
                    : undefined
                }
                onClick={handleCargarClick}
              >
                {loading.cargar ? "Cargando..." : "Estudiantes"}
              </Button>

              {/* ✅ Botón Guardar: requiere estudiantes y datos modificables */}
              <Button
                type="submit"
                variant="success"
                icon={FaSave}
                iconPosition="left"
                disabled={
                  loading.guardar ||
                  estudiantes.length === 0 ||
                  !hayDatosModificables()
                }
                title={
                  estudiantes.length === 0
                    ? "Carga estudiantes primero"
                    : !hayDatosModificables()
                      ? "Ingresa al menos una nota para guardar"
                      : undefined
                }
              >
                {loading.guardar ? "Guardando..." : "Guardar"}
              </Button>

              {/* ✅ Botón Nueva Columna: requiere estudiantes y no alcanzar límite */}
              <Button
                type="button"
                variant="outline-primary"
                icon={FaTable}
                iconPosition="left"
                disabled={
                  loading.nuevaColumna ||
                  estudiantes.length === 0 ||
                  numeroNotas >= MAX_NOTAS
                }
                title={
                  estudiantes.length === 0
                    ? "Carga estudiantes primero"
                    : numeroNotas >= MAX_NOTAS
                      ? `Máximo ${MAX_NOTAS} notas alcanzado`
                      : undefined
                }
                onClick={handleNuevaColumna}
              >
                {loading.nuevaColumna ? "Agregando..." : "Nueva Columna"}
              </Button>

              {/* ✅ Botón Restablecer: requiere datos o cambios */}
              <Button
                type="button"
                variant="outline-primary"
                icon={FaUndo}
                iconPosition="left"
                onClick={handleResetClick}
                disabled={loading.reset}
                title={undefined}
              >
                {loading.reset ? "Restableciendo..." : "Restablecer selección"}
              </Button>
            </div>
          </div>

          <div className="assessment-table">
            {estudiantes.length > 0 ? (
              <AssessmentTable
                estudiantes={estudiantes}
                numeroNotas={numeroNotas}
                onNotaChange={handleNotaChange}
                onAbrirModal={handleAbrirModal}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </form>

      {/* Modal de éxito */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        variant="success"
        message="¡Calificaciones guardadas!"
        description="Las calificaciones se registraron correctamente."
        autoCloseMs={5000}
      />

      {/* ✅ FE-009 / FE-010: Modal de confirmación dinámico */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({ isOpen: false, variant: null, onConfirm: null })
        }
        onConfirm={confirmModal.onConfirm}
        variant={confirmModal.variant}
      />

      {/* Modal de retroalimentación */}
      <Modal
        isOpen={feedbackModal.isOpen}
        onClose={() =>
          setFeedbackModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleGuardarFeedback}
        variant="feedback"
      >
        <FeedbackModalContent
          title={modalConfig.feedback.defaultTitle}
          estudiante={feedbackModal.estudianteNombre}
          lastUpdated={feedbackModal.lastUpdated}
          value={feedbackModal.texto}
          onChange={(texto) =>
            setFeedbackModal((prev) => ({ ...prev, texto }))
          }
        />
      </Modal>
    </div>
  );
};

export default AssessmentPage;