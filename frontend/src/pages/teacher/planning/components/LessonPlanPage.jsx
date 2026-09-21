import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { filterFormsData } from "@/data/filterFormsData";
import { optionsMap, ASIGNATURA_ESTANDARES_MAP } from "@/data/DBdataSimulation";
import { stepperData } from "@/data/stepperData";
import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";
import Coments from "@/components/ui/Coments/Coments";

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
  const [isFinished, setIsFinished] = useState(false);

  const stepKey = STEP_KEYS[currentStep];
  const rows = filterFormsData[stepKey]?.rows ?? [];

  const defaultValues = rows
    .flatMap((row) => row.fields ?? [])
    .reduce((acc, field) => {
      acc[field.id] = planData[field.id] ?? "";
      return acc;
    }, {});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const asignaturaValue = useWatch({ control, name: "asignatura" });

  const handleBack = () => navigate("/planningPage");

  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  const onNext = (data) => {
    const updatedPlan = { ...planData, ...data };
    setPlanData(updatedPlan);

    if (currentStep === TOTAL_STEPS) {
      console.log("Plan completo:", updatedPlan);
      setIsFinished(true);
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const renderField = (field) => {
    const processedField = { ...field };

    if (field.id === "estandar") {
      const estandaresKey = ASIGNATURA_ESTANDARES_MAP[asignaturaValue];
      processedField.options = estandaresKey ? optionsMap[estandaresKey] ?? [] : [];
    }

    return (
      <FormFieldCascada
        key={field.id}
        field={processedField}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
      />
    );
  };

  return (
    <div className="plan-page">
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} context="Crear nuevo plan" />
      <Stepper
        className="classwork-stepper"
        steps={stepperData.lessonPlan}
        currentStep={currentStep}
        isFinished={isFinished}
      />
      <form key={currentStep} onSubmit={handleSubmit(onNext)} noValidate>
        <div className="plan-container">
          {/* ✅ Mensaje visible en TODOS los pasos */}
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para crear el plan de clase." />
          </div>

          <div className="plan-header">
            {rows.map((row, i) => (
              <div key={i} className="plan-section">
                {row.sectionTitle && (
                  <p className={`section-title ${row.sectionClassName || ""}`}>
                    {row.sectionTitle}
                  </p>
                )}
                <div className={row.className || undefined}>
                  {row.fields?.map((field) => (
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
              disabled={currentStep === 1 || isFinished}
            >
              Atrás
            </Button>
            <Button
              type="submit"
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              disabled={!isValid || isFinished}
            >
              {currentStep === TOTAL_STEPS ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LessonPlanPage;