import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaUndo } from "react-icons/fa";

import { Button } from "@/components/ui/Button/Button";
import { filterFormsData } from "@/data/filterFormsData";

import NavbarSection from "@/components/navbar/NavbarSection";
import FormField from "@/pages/teacher/classwork/components/FormField";
import Modal from "@/components/ui/Modal/Modal";

import "./ClassworkPage.css";

const ClassworkPage = () => {
  const navigate = useNavigate();
  const { rows } = filterFormsData.tareas;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const [loading, setLoading] = useState({
    guardar: false,
    borrar: false,
  });

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
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleReset = () => {
    reset(defaultValues);
    setPendingData(null);
    setIsSubmitModalOpen(false);
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

    console.log("Tarea creada:", formData);

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        guardar: false,
      }));

      setIsSubmitModalOpen(false);
      setPendingData(null);
      reset(defaultValues);
    }, 1200);
  };

  return (
    <>
      <NavbarSection sectionKey="tasks" handleBack={handleBack} />

      <div className="classwork-container">
        <div className="classwork-left">
          <div className="report-main">
            <h4>Asignación de tareas</h4>

            <span>
              Selecciona los campos en orden para habilitar la asignación de
              tareas.
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            </div>
          </form>
        </div>

        <div className="classwork-right">
          <div className="classwork-student">
            <h4>Seleccionar Estudiantes</h4>

            <div className="classwork-students_check">
              <label htmlFor="students">Todos</label>

              <input
                type="checkbox"
                id="students"
                checked
                onChange={() => {}}
                disabled
              />
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
