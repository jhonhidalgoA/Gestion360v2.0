import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaThumbtack } from "react-icons/fa";

import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap, ASIGNATURA_ESTANDARES_MAP } from "@/data/DBdataSimulation";
import { stepperData } from "@/data/stepperData";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormField from "@/pages/teacher/classwork/components/FormField";
import Select from "@/components/ui/Select/Select";

import "./LessonPlanPage.css";

const STEP_KEYS = {
  1: "planning",
  2: "standards",
  3: "development",
  4: "contentEvaluation",
};

const TOTAL_STEPS = 4;

const LessonPlanPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState({});

  const stepKey = STEP_KEYS[currentStep];
  const rows = filterFormsData[stepKey]?.rows ?? [];

  const defaultValues = rows
    .flatMap((row) => row.fields)
    .reduce((acc, field) => {
      acc[field.id] = planData[field.id] ?? "";
      return acc;
    }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const handleBack = () => navigate("/planningPage");

  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  const onNext = (data) => {
    const updatedPlan = { ...planData, ...data };
    setPlanData(updatedPlan);

    if (currentStep === TOTAL_STEPS) {
      console.log("Plan completo:", updatedPlan);
      // TODO: submit final al backend cuando esté listo
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const renderField = (field) => {
    if (field.type === "select") {
      let options = optionsMap[field.optionsKey];

      if (field.id === "estandar") {
        const asignaturaSeleccionada = planData.asignatura;
        const estandaresKey = ASIGNATURA_ESTANDARES_MAP[asignaturaSeleccionada];
        options = estandaresKey ? optionsMap[estandaresKey] : [];
      }

      return (
        <Select
          key={field.id}
          label={field.label}
          name={field.id}
          options={options}
          register={register}
          error={errors[field.id]}
          variant="square"
          required={field.required}
        />
      );
    }
    return (
      <FormField
        key={field.id}
        field={field}
        register={register}
        errors={errors}
      />
    );
  };

  return (
    <>
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} />
      <Stepper
        className="classwork-stepper"
        steps={stepperData.lessonPlan}
        currentStep={currentStep}
      />

      <form key={currentStep} onSubmit={handleSubmit(onNext)} noValidate>
        <div className="plan-container">
          {currentStep === 1 && (
            <div className="report-main">
              <span>
                <FaThumbtack className="pin-icon" /> Completa los filtros para
                generar el plan de clase.
              </span>
            </div>
          )}

          <div className="plan-header">
            {rows.map((row, i) => (
              <div key={i} className="plan-section">
                {row.sectionTitle && (
                  <p className={`section-title ${row.sectionClassName || ""}`}>
                    {row.sectionTitle}
                  </p>
                )}
                <div className={row.className || undefined}>
                  {row.fields.map((field) => (
                    <div key={field.id}>{renderField(field)}</div>
                  ))}
                </div>
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
              onClick={goPrev}
              disabled={currentStep === 1}
            >
              Atrás
            </Button>
            <Button
              type="submit"
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
            >
              {currentStep === TOTAL_STEPS ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LessonPlanPage;
