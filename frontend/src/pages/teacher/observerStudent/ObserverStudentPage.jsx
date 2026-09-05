import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { filterFormsData } from "@/data/filterFormsData";
import { observationTypes } from "@/data/observerData";
import {
  observationFormConfig,
  optionsMap,
  getStudentsByGroup,
} from "@/data/DBdataSimulation";

import { FaUndo } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { FiFilePlus } from "react-icons/fi";

import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import Select from "@/components/ui/Select/Select";
import FormField from "@/pages/teacher/classwork/components/FormField";
import ObserverCard from "@/components/ui/Card/ObserverCard";
import Modal from "@/components/ui/Modal/Modal";

import "./ObserverStudentPage.css";

const ObserverStudentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const fields = filterFormsData.observador?.fields ?? [];
  const detailRows = filterFormsData.observador?.detailRows ?? [];

  const [tipoNovedad, setTipoNovedad] = useState("");
  const selectedType = observationTypes.find((t) => t.id === tipoNovedad);
  const selectedFormConfig = observationFormConfig[tipoNovedad];
  const SelectedIcon = selectedType?.icon;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [loading, setLoading] = useState({
    guardar: false,
  });

  const [studentOptions, setStudentOptions] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const grupoValue = useWatch({ control, name: "grupo" });
  const estudianteValue = useWatch({ control, name: "estudiante" });
  const periodoValue = useWatch({ control, name: "periodo" });

  const cardsHabilitadas = Boolean(
    grupoValue && estudianteValue && periodoValue,
  );

  const [grupoAnterior, setGrupoAnterior] = useState(grupoValue);
  if (grupoValue !== grupoAnterior) {
    setGrupoAnterior(grupoValue);
    setStudentOptions([]);
    setValue("estudiante", "");
    setLoadingStudents(!!grupoValue);
  }

  useEffect(() => {
    if (!grupoValue) return;

    let isCurrent = true;

    getStudentsByGroup(grupoValue).then((students) => {
      if (!isCurrent) return;
      setStudentOptions(
        students.map((s) => ({ value: s.id, label: s.nombre })),
      );
      setLoadingStudents(false);
    });

    return () => {
      isCurrent = false;
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
    setStudentOptions([]);
  };

  const onSubmit = (data) => {
    setPendingData(data);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    setLoading((prev) => ({ ...prev, guardar: true }));

    console.log("Novedad registrada:", { tipoNovedad, ...pendingData });

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, guardar: false }));
      setIsSubmitModalOpen(false);
      setPendingData(null);
      reset(defaultValues);
      setTipoNovedad("");
      setStudentOptions([]);
    }, 1200);
  };

  const renderField = (field) => {
    if (field.type === "select" && field.dynamicOptions) {
      return (
        <Select
          key={selectedType.id}
          label={selectedFormConfig?.[field.dynamicLabel] ?? field.label}
          name={field.id}
          options={selectedFormConfig?.[field.dynamicOptions] ?? []}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
        />
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="observer-check">
          <input type="checkbox" defaultChecked {...register(field.id)} />
          {field.label}
        </label>
      );
    }

    const finalField = field.dynamicLabel
      ? {
          ...field,
          label: selectedFormConfig?.[field.dynamicLabel] ?? field.label,
        }
      : field;

    return <FormField field={finalField} register={register} errors={errors} />;
  };

  const renderFilterField = (field) => {
    if (field.id === "estudiante") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={studentOptions}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
          disabled={!grupoValue || loadingStudents}
          placeholder={
            !grupoValue
              ? "Selecciona un grupo primero"
              : loadingStudents
                ? "Cargando estudiantes..."
                : "Selecciona un estudiante"
          }
        />
      );
    }

    if (field.id === "periodo") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={optionsMap[field.optionsKey] ?? []}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
          disabled={!estudianteValue}
        />
      );
    }

    if (field.id === "asignatura") {
      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={optionsMap[field.optionsKey] ?? []}
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
        options={optionsMap[field.optionsKey] ?? []}
        register={register}
        error={errors[field.id]}
        variant="square"
        required={field.required}
      />
    );
  };

  const submitLabel =
    tipoNovedad === "falta" ? "Registrar falta" : "Registrar reconocimiento";

  return (
    <div className="observer-page">
      <NavbarSection sectionKey="observador" handleBack={handleBack} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="observer-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para generar el reporte." />
          </div>

          <div className="observer-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => renderFilterField(field))}
              </div>
            </div>
          </div>

          <div className="observer-card_type">
            <div className="observer-subtitle">
              <TbCategory className="observer-icon" />
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
                  {SelectedIcon && <SelectedIcon className="observer-icon" />}
                  <span>{selectedType.title.toUpperCase()}</span>
                </div>

                <div className="observer-item_date">
                  {detailRows
                    .filter(
                      (row) =>
                        !row.showFor || row.showFor.includes(tipoNovedad),
                    )
                    .map((row, rowIndex) => {
                      const visibleFields = row.fields.filter(
                        (field) =>
                          !field.showFor || field.showFor.includes(tipoNovedad),
                      );
                      const rowClass =
                        row.classNameMap?.[tipoNovedad] ?? row.className;

                      return (
                        <div key={rowIndex} className={rowClass || undefined}>
                          {visibleFields.map((field) => (
                            <div key={field.id}>{renderField(field)}</div>
                          ))}
                        </div>
                      );
                    })}
                </div>

                <label className="observer-check_footer">
                  <input
                    type="checkbox"
                    defaultChecked
                    {...register("notificar")}
                  />
                  Notificar al acudiente
                </label>

                <div className="classwork-button">
                  <Button
                    type="button"
                    variant="outline-primary"
                    icon={FaUndo}
                    iconPosition="left"
                    onClick={handleReset}
                    disabled={loading.guardar}
                  >
                    Restablecer formulario
                  </Button>

                  <Button
                    type="submit"
                    variant={tipoNovedad === "falta" ? "danger" : "success"}
                    icon={FiFilePlus}
                    iconPosition="left"
                    size="md"
                    className="btn-uniform-width"
                    disabled={loading.guardar}
                  >
                    {loading.guardar ? "Registrando..." : submitLabel}
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
          tipoNovedad === "falta" ? "submitWarning" : "submitRecognition"
        }
        isLoading={loading.guardar}
        confirmText={submitLabel}
      />
    </div>
  );
};

export default ObserverStudentPage;
