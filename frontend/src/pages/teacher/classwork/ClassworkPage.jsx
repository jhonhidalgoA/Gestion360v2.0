// 1. Imports y Dependencias
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { FaPaperPlane, FaUndo } from "react-icons/fa";
import { TbSearch } from "react-icons/tb";

import { Button } from "@/components/ui/Button/Button";
import Coments from "@/components/ui/Coments/Coments";
import Input from "@/components/ui/Input/Input";
import Modal from "@/components/ui/Modal/Modal";
import Stepper from "@/components/ui/Stepper/Stepper";

import useStepper from "@/components/hooks/useStepper";
import NavbarSection from "@/components/navbar/NavbarSection";

import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";

import { filterFormsData } from "@/data/filterFormsData";
import { stepperData } from "@/data/stepperData";
import { getStudentsByGroup } from "@/data/studentsData";

import "./ClassworkPage.css";

// 2. Constantes y Funciones Auxiliares
const AVATAR_COLORS = [
  "#D6285C",
  "#1DA851",
  "#3568D6",
  "#8347D9",
  "#D97D1F",
  "#1CA5A0",
];

const getInitials = (nombre) =>
  nombre
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// 3. Declaración del Componente
const ClassworkPage = () => {
  const navigate = useNavigate();
  const { rows } = filterFormsData.tareas;

  // 4. Estados Locales
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [loading, setLoading] = useState({ guardar: false, borrar: false });

  const [students, setStudents] = useState([]);
  const [loadedKey, setLoadedKey] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");

  // 5. Configuración del Formulario
  const allFields = rows.flatMap((row) => row.fields || []);
  const defaultValues = allFields.reduce((acc, field) => {
    if (field.type !== "file") {
      acc[field.id] = "";
    }
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const values = useWatch({ control });

  // 6. Lógica de Validación del Stepper
  const grupoAsignaturaOk = Boolean(values.grupo && values.asignatura);
  const fechasOk =
    grupoAsignaturaOk && Boolean(values.fechaInicio && values.fechaFin);
  const temaDescripcionOk =
    fechasOk && Boolean(values.tema && values.descripcion);
  const estudiantesOk = temaDescripcionOk && selectedStudents.length > 0;

  const { currentStep } = useStepper([
    grupoAsignaturaOk,
    fechasOk,
    temaDescripcionOk,
    estudiantesOk,
    true, // ← true dummy para que el hook retorne 5 cuando todos estén completos
  ]);

  const groupKey =
    values.grupo && values.asignatura
      ? `${values.grupo}|${values.asignatura}`
      : "";

  const loadingStudents = groupKey !== "" && loadedKey !== groupKey;
  const selectedCount =
    groupKey && !loadingStudents ? selectedStudents.length : 0;

  useEffect(() => {
    if (!groupKey) return;
    let cancel = false;

    getStudentsByGroup(values.grupo).then((data) => {
      if (cancel) return;
      setStudents(data);
      setSelectedStudents([]);
      setSearchStudent("");
      setLoadedKey(groupKey);
    });

    return () => {
      cancel = true;
    };
  }, [groupKey, values.grupo]);

  const handleToggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents((prev) =>
      prev.length === students.length ? [] : students.map((s) => s.id),
    );
  };

  const filteredStudents = students.filter((s) =>
    s.nombre.toLowerCase().includes(searchStudent.toLowerCase()),
  );

  // 8. Manejadores de Eventos
  const handleReset = () => {
    reset(defaultValues);
    setPendingData(null);
    setIsSubmitModalOpen(false);
    setSelectedStudents([]);
    setStudents([]);
    setLoadedKey("");
    setSearchStudent("");
  };

  const handleBack = () => {
    navigate("/teacher");
  };

  const onSubmit = (data) => {
    setPendingData(data);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    setLoading((prev) => ({ ...prev, guardar: true }));
    const formData = new FormData();

    Object.entries(pendingData).forEach(([key, value]) => {
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    formData.append("estudiantes", JSON.stringify(selectedStudents));
    console.log("Tarea creada:", formData);

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      setIsSubmitModalOpen(false);
      setPendingData(null);
      reset(defaultValues);
      setSelectedStudents([]);
      setStudents([]);
      setLoadedKey("");
    }, 1200);
  };

  return (
    <div className="classwork-page">
      <NavbarSection sectionKey="tasks" handleBack={handleBack} />

      <Stepper
        className="classwork-stepper"
        steps={stepperData.task}
        currentStep={currentStep}
      />

      <div className="classwork-container">
        <div className="report-main">
          <Coments text="Selecciona y completa los campos para enviar la tarea a los estudiantes." />
        </div>
        <div className="classwork-grid">
          {/* Panel Izquierdo: Formulario */}
          <div className="classwork-left">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {rows.map((row, rowIndex) => {
                return (
                  <div key={rowIndex} className="form-section">
                    {row.title && (
                      <div className="form-section-title">
                        <span className="form-section-title__badge">
                          {row.number}
                        </span>
                        <span className="form-section-title__text">
                          {row.title}
                        </span>
                      </div>
                    )}
                    <div className={row.className || undefined}>
                      {row.fields.map((field) => (
                        <FormFieldCascada
                          key={field.id}
                          field={field}
                          register={register}
                          errors={errors}
                          control={control}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="classwork-button">
                <Button
                  type="button"
                  variant="outline-primary"
                  icon={FaUndo}
                  iconPosition="left"
                  onClick={handleReset}
                  disabled={loading.guardar}
                >
                  Restablecer selección
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  icon={FaPaperPlane}
                  iconPosition="left"
                  size="md"
                  className="btn-uniform-width"
                  disabled={loading.guardar}
                >
                  {loading.guardar ? "Enviando..." : "Enviar Tarea"}
                </Button>
              </div>
            </form>
          </div>

          {/* Panel Derecho: Lista de Estudiantes */}
          <div className="classwork-right">
            <div className="classwork-student">
              <div className="form-section-title">
                <span className="form-section-title__badge">4</span>
                <span className="form-section-title__text">Estudiantes</span>
              </div>

              <Input
                name="searchStudent"
                leftIcon={TbSearch}
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                disabled={!groupKey || loadingStudents}
                wrapperClassName="student-panel__search"
                variant="square"
              />

              <div className="student-panel__select-all">
                <label
                  className={`student-panel__checkbox ${
                    !groupKey ? "student-panel__checkbox--disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      groupKey !== "" &&
                      students.length > 0 &&
                      selectedStudents.length === students.length
                    }
                    onChange={handleSelectAll}
                    disabled={!groupKey || loadingStudents}
                  />
                  <span className="student-panel__checkbox-box">✓</span>
                  Seleccionar todos
                </label>
                <span>{groupKey ? students.length : 0} estudiantes</span>
              </div>

              {!groupKey ? (
                <div className="student-panel__empty">
                  <b>Aún no hay estudiantes para mostrar</b>
                  <span>
                    Selecciona grupo y asignatura para cargar la lista del
                    grupo.
                  </span>
                </div>
              ) : loadingStudents ? (
                <div className="student-panel__empty">
                  <b>Cargando estudiantes…</b>
                </div>
              ) : (
                <div className="student-panel__list">
                  {filteredStudents.map((student, index) => (
                    <label
                      key={student.id}
                      className={`student-panel__row ${
                        selectedStudents.includes(student.id)
                          ? "student-panel__row--checked"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleToggleStudent(student.id)}
                      />
                      <span
                        className="student-panel__avatar"
                        style={{
                          background:
                            AVATAR_COLORS[index % AVATAR_COLORS.length],
                        }}
                      >
                        {getInitials(student.nombre)}
                      </span>
                      <span className="student-panel__info">
                        <div className="student-panel__name">
                          {student.nombre}
                        </div>
                        <div className="student-panel__sub">
                          {student.grupo} · {student.estado}
                        </div>
                      </span>
                    </label>
                  ))}
                </div>
              )}

              <div className="student-panel__footer">
                <span>
                  <b>{selectedCount}</b> estudiantes seleccionados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        variant="submitTask"
        isLoading={loading.guardar}
        confirmText="Enviar tarea"
      />
    </div>
  );
};

export default ClassworkPage;
