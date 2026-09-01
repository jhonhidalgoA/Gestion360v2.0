import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaThumbtack } from "react-icons/fa";

import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap } from "@/data/DBdataSimulation";
import { stepperData } from "@/data/stepperData";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormField from "@/pages/teacher/classwork/components/FormField";
import Select from "@/components/ui/Select/Select";

import "./LessonPlanPage.css";

const LessonPlanPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const rows = filterFormsData.planning?.rows ?? [];

  const defaultValues = rows
    .flatMap((row) => row.fields)
    .reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const handleBack = () => navigate("/planningPage");

  const onSubmit = (data) => {
    console.log("Paso 1 - Información Básica:", data);
  };

  const renderField = (field) => {
    if (field.type === "select") {
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
    }
    return <FormField field={field} register={register} errors={errors} />;
  };

  return (
    <>
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} />
      <Stepper
        className="classwork-stepper"
        steps={stepperData.lessonPlan}
        currentStep={currentStep}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="plan-container">
          <div className="report-main">
            <span>
              <FaThumbtack className="pin-icon" /> Completa los filtros para
              generar el plan de clase.
            </span>
          </div>
          <div className="plan-header">
            {rows.map((row, i) => (
              <div key={i} className={row.className || undefined}>
                {row.fields.map((field) => (
                  <div key={field.id}>{renderField(field)}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="plan-buttons">
            <Button
              type="button"
              variant="dark"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 1}
            >
              Atrás
            </Button>
            <Button
              type="button"
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              onClick={() => setCurrentStep((s) => s + 1)}
            >
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LessonPlanPage;
