import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaPaperPlane,  FaEraser  } from "react-icons/fa";

import NavbarSection from "@/components/navbar/NavbarSection";
import { Button } from "@/components/ui/Button/Button";
import FormField from "@/pages/teacher/classwork/components/FormField";
import { filterFormsData } from "@/data/filterFormsData";

import "./ClassworkPage.css";

const ClassworkPage = () => {
  const navigate = useNavigate();
  const { rows } = filterFormsData.tareas;

  const [loading, setLoading] = useState({
    guardar: false,
    borrar: false,
  });

  const allFields = rows.flatMap((row) => row.fields || []);
  const defaultValues = allFields.reduce((acc, field) => {
    if (field.type !== "file") acc[field.id] = "";
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

  const handleBack = () => navigate("/teacher");

  const onSubmit = (data) => {
    setLoading((prev) => ({ ...prev, guardar: true }));

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    console.log("Tarea creada:", formData);

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      reset();
    }, 1200);
  };

  const handleDelete = () => {
    setLoading((prev) => ({ ...prev, borrar: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, borrar: false }));
      reset();
    }, 1000);
  };

  return (
    <>
      <NavbarSection sectionKey="tareas" handleBack={handleBack} />
      <div className="classwork-container">
        <div className="classwork-left">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                variant="close"
                icon={FaEraser}
                iconPosition="left"
                size="md"
                className="btn-uniform-width"
                disabled={loading.borrar}
                onClick={handleDelete}
              >
                {loading.borrar ? "Borrando..." : "Borrar Campos"}
              </Button>
            </div>
          </form>
        </div>

        <div className="classwork-right">

        </div>
      </div>
    </>
  );
};

export default ClassworkPage;