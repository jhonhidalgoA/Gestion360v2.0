import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { optionsMap } from "@/data/optionsData";
import { filterFormsData } from "@/data/filterFormsData";
import { observationTypes } from "@/data/observerData";

import { FaThumbtack } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";

import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";
import FormField from "@/pages/teacher/classwork/components/FormField";
import ObserverCard from "@/components/ui/Card/ObserverCard";

import "./ObserverStudentPage.css";

const ObserverStudentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const fields = filterFormsData.observador?.fields ?? [];
  const detailRows = filterFormsData.observador?.detailRows ?? [];

  const [tipoNovedad, setTipoNovedad] = useState("");
  const selectedType = observationTypes.find((t) => t.id === tipoNovedad);
  const SelectedIcon = selectedType?.icon;

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const handleTipoChange = (id) => {
    setTipoNovedad(id);
    setValue("tipoDetalle", "");
    setValue("otorgadoPor", "");
    setValue("medidaCorrectiva", "");
    setValue("estadoCaso", "");
  };

  const renderField = (field) => {
    if (field.type === "select" && field.dynamicOptions) {
      return (
        <Select
          key={selectedType.id}
          label={selectedType[field.dynamicLabel] ?? field.label}
          name={field.id}
          options={selectedType[field.dynamicOptions] ?? []}
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
      ? { ...field, label: selectedType[field.dynamicLabel] ?? field.label }
      : field;

    return <FormField field={finalField} register={register} errors={errors} />;
  };

  return (
    <>
      <NavbarSection sectionKey="observador" handleBack={handleBack} />
      <form action="" method="post">
        <div className="observer-container">
          <div className="report-main">
            <span>
              <FaThumbtack className="pin-icon" /> Completa los filtros para
              generar el reporte.
            </span>
          </div>

          <div className="observer-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => (
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
                ))}
              </div>
            </div>
          </div>

          <div className="observer-card_type">
            <div className="observer-subtitle">
              <TbCategory className="observer-icon" />
              <span>TIPO DE NOVEDAD</span>
            </div>
            <div className="observer-card-options">
              <ObserverCard value={tipoNovedad} onChange={handleTipoChange} />
            </div>
          </div>
          {selectedType && (
            <div className="observer-card_type">
              <div className="observer-item">
                <div className="observer-item_subtitle">
                  {SelectedIcon && <SelectedIcon className="observer-icon" />}
                  <span>DETALLE DEL {selectedType.label.toUpperCase()}</span>
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
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default ObserverStudentPage;
