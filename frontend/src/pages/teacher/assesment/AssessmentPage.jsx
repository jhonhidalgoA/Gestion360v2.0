// React y librerías externas
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FaPlus, FaSave, FaTable, FaUndo, FaThumbtack } from "react-icons/fa";

// Componentes compartidos
import NavbarSection from "@/components/navbar/NavbarSection";
import Modal from "@/components/ui/Modal/Modal";
import Select from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";


// Datos
import { filterFormsData } from "@/data/filterFormsData";
import { modalConfig } from "@/data/modalData";
import { optionsMap, getStudentsByGroup } from "@/data/DBdataSimulation";

// Componentes de la página
import AssessmentTable from "@/pages/teacher/attendance/components/AssessmentTable";
import EmptyState from "@/pages/teacher/attendance/components/EmptyState";
import FeedbackModalContent from "@/pages/teacher/attendance/components/FeedbackModalContent";

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

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    estudianteId: null,
    estudianteNombre: "",
    texto: "",
    lastUpdated: "",
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
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const grupoValue = useWatch({ control, name: "grupo" });
  const asignaturaValue = useWatch({ control, name: "asignatura" });

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
            retroalimentacion: "",
          };
        })
      );
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
    } finally {
      setLoading((prev) => ({ ...prev, cargar: false }));
    }
  };

  const handleCargar = handleSubmit(onFiltroValido);

  const handleReset = () => {
    reset(defaultValues);
    setEstudiantes([]);
  };

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
    <>
      <NavbarSection sectionKey="calificaciones" handleBack={handleBack} />
      <form onSubmit={handleSubmit(handleGuardar)}>
        <div className="assessment-container">
          <div className="report-main">          
            <span>
               <FaThumbtack className="pin-icon" /> Completa los filtros para visualizar las calificaciones.
            </span>
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
                icon={FaTable}
                iconPosition="left"
                disabled={loading.nuevaColumna}
                onClick={handleNuevaColumna}
              >
                {loading.nuevaColumna ? "Agregando..." : "Nueva Columna"}
              </Button>
              <Button
                type="button"
                variant="outline-primary"
                icon={FaUndo}
                iconPosition="left"
                onClick={handleReset}
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

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        variant="success"
        message="¡Calificaciones guardadas!"
        description="Las calificaciones se registraron correctamente."
        autoCloseMs={5000}
      />

      <Modal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleGuardarFeedback}
        variant="feedback"
      >
        <FeedbackModalContent
          title={modalConfig.feedback.defaultTitle}
          estudiante={feedbackModal.estudianteNombre}
          lastUpdated={feedbackModal.lastUpdated}
          value={feedbackModal.texto}
          onChange={(texto) => setFeedbackModal((prev) => ({ ...prev, texto }))}
        />
      </Modal>
    </>
  );
};

export default AssessmentPage;