import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FaPaperPlane, FaUndo, FaThumbtack } from "react-icons/fa";

import { Button } from "@/components/ui/Button/Button";
import { filterFormsData } from "@/data/filterFormsData";
import { stepperData } from "@/data/stepperData";
import { getStudentsByGroup } from "@/data/studentsData";
import useStepper from "@/components/hooks/useStepper";

import NavbarSection from "@/components/navbar/NavbarSection";
import FormField from "@/pages/teacher/classwork/components/FormField";
import Modal from "@/components/ui/Modal/Modal";
import Stepper from "@/components/ui/Stepper/Stepper";

import "./ClassworkPage.css";

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

const ClassworkPage = () => {
  const navigate = useNavigate();
  const { rows } = filterFormsData.tareas;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const [loading, setLoading] = useState({
    guardar: false,
    borrar: false,
  });

  const [students, setStudents] = useState([]);
  const [loadedKey, setLoadedKey] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");

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

  // STEPPER
  const step1Ok = Boolean(values.grupo && values.asignatura);

  const step2Ok = step1Ok && Boolean(values.fechaInicio && values.fechaFin);

  const step3Ok = step2Ok && Boolean(values.tema && values.descripcion);

  const { currentStep } = useStepper([
    step1Ok,
    step2Ok,
    step3Ok,
    selectedStudents.length > 0,
  ]);

  // ESTUDIANTES
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

  // ACCIONES
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

    setLoading((prev) => ({
      ...prev,
      guardar: true,
    }));

    const formData = new FormData();

    Object.entries(pendingData).forEach(([key, value]) => {
      if (value instanceof FileList) {
        if (value.length > 0) {
          formData.append(key, value[0]);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    formData.append("estudiantes", JSON.stringify(selectedStudents));

    console.log("Tarea creada:", formData);

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        guardar: false,
      }));

      setIsSubmitModalOpen(false);
      setPendingData(null);
      reset(defaultValues);
      setSelectedStudents([]);
      setStudents([]);
      setLoadedKey("");
    }, 1200);
  };

  return (
    <>
      <NavbarSection sectionKey="tasks" handleBack={handleBack} />
      <Stepper
        className="classwork-stepper"
        steps={stepperData.task}
        currentStep={currentStep}
      />
      <div className="classwork-container">
        <div className="report-main">
          <span>
            <FaThumbtack className="pin-icon" />
            Completa los filtros y selecciona a los estudiantes para enviar la
            tarea.
          </span>
        </div>
        <div className="classwork-grid">
          <div className="classwork-left">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={row.className || undefined}>
                  {row.fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      register={register}
                      errors={errors}
                    />
                  ))}
                </div>
              ))}

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
                  variant="send"
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

          <div className="classwork-right">
            <div className="classwork-student">
              <h4>Seleccionar Estudiantes</h4>
              <div className="search-wrap">
                <input
                  type="text"
                  placeholder="Buscar estudiante…"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  disabled={!groupKey || loadingStudents}
                />
              </div>
              <div className="select-all-row">
                <label className={`cbx ${!groupKey ? "dim" : ""}`}>
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
                  <span className="box">✓</span>
                  Seleccionar todos
                </label>
                <span>{groupKey ? students.length : 0} estudiantes</span>
              </div>
              {!groupKey ? (
                <div className="panel-empty">
                  <b>Aún no hay estudiantes para mostrar</b>
                  <span>
                    Selecciona grupo y asignatura para cargar la lista del
                    grupo.
                  </span>
                </div>
              ) : loadingStudents ? (
                <div className="panel-empty">
                  <b>Cargando estudiantes…</b>
                </div>
              ) : (
                <div className="student-list">
                  {filteredStudents.map((student, index) => (
                    <label
                      key={student.id}
                      className={`student-row ${
                        selectedStudents.includes(student.id) ? "checked" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleToggleStudent(student.id)}
                      />
                      <span
                        className="avatar"
                        style={{
                          background:
                            AVATAR_COLORS[index % AVATAR_COLORS.length],
                        }}
                      >
                        {getInitials(student.nombre)}
                      </span>
                      <span className="s-info">
                        <div className="s-name">{student.nombre}</div>
                        <div className="s-sub">
                          {student.grupo} · {student.estado}
                        </div>
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <div className="panel-foot">
                <span>
                  <b>{selectedCount}</b> estudiantes seleccionados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        variant="submitTask"
        isLoading={loading.guardar}
        confirmText="Enviar tarea"
      />
    </>
  );
};

export default ClassworkPage;
