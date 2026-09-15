import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { filterFormsData } from "@/data/filterFormsData";
import { observationTypes } from "@/data/observerData";
import {
  observationFormConfig,
  getStudentsByGroup,
} from "@/data/DBdataSimulation";

import { FaUndo } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import FormField from "@/pages/teacher/classwork/components/FormField";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";
import ObserverCard from "@/components/ui/Card/ObserverCard";
import Modal from "@/components/ui/Modal/Modal";

import "./ObserverStudentPage.css";

const ObserverStudentPage = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate("/teacher");

  const fields = filterFormsData.observador?.fields ?? [];
  const detailRows = filterFormsData.observador?.detailRows ?? [];

  const [tipoNovedad, setTipoNovedad] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [loading, setLoading] = useState({ guardar: false });

  const [studentState, setStudentState] = useState({
    options: [],
    loading: false,
    error: "",
  });

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  defaultValues.notificar = true;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const grupoValue = useWatch({
    control,
    name: "grupo",
  });

  const estudianteValue = useWatch({
    control,
    name: "estudiante",
  });

  const periodoValue = useWatch({
    control,
    name: "periodo",
  });

  const cardsHabilitadas = Boolean(
    grupoValue && estudianteValue && periodoValue
  );

  const selectedType = observationTypes.find(
    (type) => type.id === tipoNovedad
  );

  const selectedFormConfig = observationFormConfig[tipoNovedad];

  const SelectedIcon = selectedType?.icon;

  // useEffect 1: limpia el campo estudiante
  useEffect(() => {
    if (!grupoValue) {
      setValue("estudiante", "");
    }
  }, [grupoValue, setValue]);

  // useEffect 2: carga los estudiantes del grupo
  useEffect(() => {
    let cancelled = false;

    if (!grupoValue) {
      return;
    }

    const loadStudents = async () => {
      try {
        const students = await getStudentsByGroup(grupoValue);

        if (cancelled) return;

        setStudentState({
          options: students.map((student) => ({
            value: student.id,
            label: student.nombre,
          })),
          loading: false,
          error: "",
        });
      } catch (error) {
        if (cancelled) return;

        console.error("Error cargando estudiantes:", error);

        setStudentState({
          options: [],
          loading: false,
          error: "No se pudieron cargar los estudiantes.",
        });
      }
    };

    loadStudents();

    return () => {
      cancelled = true;
    };
  }, [grupoValue]);

  const handleTipoChange = (id) => {
    setTipoNovedad(id);
    setValue("tipoDetalle", "");
    setValue("otorgadoPor", "");
    setValue("medidaCorrectiva", "");
    setValue("estadoCaso", "");
  };

  const handleReset = () => {
    reset(defaultValues);
    setTipoNovedad("");
    setPendingData(null);
    setIsSubmitModalOpen(false);

    setStudentState({
      options: [],
      loading: false,
      error: "",
    });
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

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        guardar: false,
      }));

      setIsSubmitModalOpen(false);
      setPendingData(null);
      reset(defaultValues);
      setTipoNovedad("");

      setStudentState({
        options: [],
        loading: false,
        error: "",
      });
    }, 1200);
  };

  const renderField = (field) => {
    if (field.type === "checkbox") {
      return (
        <FormField
          key={field.id}
          field={field}
          register={register}
          errors={errors}
        />
      );
    }

    const finalField = field.dynamicLabel
      ? {
          ...field,
          label:
            selectedFormConfig?.[field.dynamicLabel] ?? field.label,
        }
      : field;

    return (
      <FormField
        key={field.id}
        field={finalField}
        register={register}
        errors={errors}
      />
    );
  };

  const renderFilterField = (field) => {
    const fieldWithOptions =
      field.id === "estudiante"
        ? {
            ...field,
            options: grupoValue ? studentState.options : [],
            isLoading: grupoValue
              ? studentState.loading
              : false,
          }
        : field;

    return (
      <FormFieldCascada
        key={field.id}
        field={fieldWithOptions}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
      />
    );
  };

  const submitLabel =
    tipoNovedad === "falta"
      ? "Registrar falta"
      : "Registrar reconocimiento";

  return (
    <div className="observer-page">
      <NavbarSection
        sectionKey="observador"
        handleBack={handleBack}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="observer-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para generar el reporte." />

            {studentState.error && (
              <div
                className="error-message"
                role="alert"
                style={{
                  color: "var(--color-error)",
                  fontSize: "var(--fs-sm)",
                  marginTop: "var(--space-2)",
                }}
              >
                {studentState.error}
              </div>
            )}
          </div>

          <div className="observer-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) =>
                  renderFilterField(field)
                )}
              </div>
            </div>
          </div>

          <div className="observer-card_type">
            <div className="observer-subtitle">
              <span>TIPO DE NOVEDAD</span>
            </div>

            <div className="observer-card-options">
              <ObserverCard
                value={tipoNovedad}
                onChange={handleTipoChange}
                disabled={!cardsHabilitadas}
              />
            </div>
          </div>

          {selectedType && (
            <div className="observer-card_type">
              <div className="observer-item">
                <div className="observer-item_subtitle">
                  {SelectedIcon && (
                    <SelectedIcon className="observer-icon" />
                  )}

                  <span>
                    {selectedType.title.toUpperCase()}
                  </span>
                </div>

                <div className="observer-item_date">
                  {detailRows
                    .filter(
                      (row) =>
                        !row.showFor ||
                        row.showFor.includes(tipoNovedad)
                    )
                    .map((row, rowIndex) => {
                      const visibleFields = row.fields.filter(
                        (field) =>
                          !field.showFor ||
                          field.showFor.includes(tipoNovedad)
                      );

                      const rowClass =
                        row.classNameMap?.[tipoNovedad] ??
                        row.className;

                      return (
                        <div
                          key={rowIndex}
                          className={rowClass || undefined}
                        >
                          {visibleFields.map((field) => (
                            <div key={field.id}>
                              {renderField(field)}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                </div>

                <label className="observer-notify-wrapper">
                  <input
                    type="checkbox"
                    id="notificar"
                    defaultChecked={true}
                    {...register("notificar")}
                  />

                  <span className="observer-notify-box">
                    ✓
                  </span>

                  <span>Notificar al acudiente</span>
                </label>

                <div className="classwork-button">
                  <Button
                    type="button"
                    variant="outline-primary"
                    icon={FaUndo}
                    iconPosition="left"
                    onClick={handleReset}
                    disabled={
                      loading.guardar ||
                      studentState.loading
                    }
                  >
                    Restablecer formulario
                  </Button>

                  <Button
                    type="submit"
                    variant={
                      tipoNovedad === "falta"
                        ? "danger"
                        : "success"
                    }
                    icon={FiFilePlus}
                    iconPosition="left"
                    size="md"
                    className="btn-uniform-width"
                    disabled={loading.guardar}
                  >
                    {loading.guardar
                      ? "Registrando..."
                      : submitLabel}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>

      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        variant={
          tipoNovedad === "falta"
            ? "submitWarning"
            : "submitRecognition"
        }
        isLoading={loading.guardar}
        confirmText={submitLabel}
      />
    </div>
  );
};

export default ObserverStudentPage;