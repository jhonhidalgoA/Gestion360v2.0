import { useEffect, useRef, useState } from "react";
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

const TOTAL_STEPS = Object.keys(STEP_KEYS).length;

const ASIGNATURA_FIELD = "asignatura";
const ESTANDAR_FIELD = "estandar";

// react-hook-form solo lee defaultValues en el primer render, por eso se
// definen una vez para todos los pasos. Los valores se conservan entre pasos
// porque RHF retiene los campos desmontados (shouldUnregister: false).
const DEFAULT_VALUES = Object.values(STEP_KEYS)
  .flatMap((key) => filterFormsData[key]?.rows ?? [])
  .flatMap((row) => row.fields ?? [])
  .reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

const getEstandarOptions = (asignatura) => {
  const estandaresKey = ASIGNATURA_ESTANDARES_MAP[asignatura];
  return estandaresKey ? optionsMap[estandaresKey] ?? [] : [];
};

// PENDIENTE: no existe un servicio de envío. Este es el único punto a
// implementar. Cuando exista, hacerla async y marcar el plan como finalizado
// solo si el envío tiene éxito. Hoy NO se guarda nada.
const submitLessonPlan = (plan) => {
  console.log("Plan completo:", plan);
};

const LessonPlanPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const stepKey = STEP_KEYS[currentStep];
  const rows = filterFormsData[stepKey]?.rows ?? [];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const asignaturaValue = useWatch({ control, name: ASIGNATURA_FIELD });

  // Si cambia la asignatura, el estándar elegido deja de ser válido.
  const prevAsignatura = useRef(asignaturaValue);
  useEffect(() => {
    if (prevAsignatura.current !== asignaturaValue) {
      prevAsignatura.current = asignaturaValue;
      setValue(ESTANDAR_FIELD, "");
    }
  }, [asignaturaValue, setValue]);

  const handleBack = () => navigate("/planningPage");

  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  const onNext = (data) => {
    if (currentStep === TOTAL_STEPS) {
      submitLessonPlan(data);
      setIsFinished(true);
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const renderField = (field) => {
    if (field.id !== ESTANDAR_FIELD) {
      return (
        <FormFieldCascada
          field={field}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      );
    }

    const options = getEstandarOptions(asignaturaValue);
    const hasOptions = options.length > 0;

    return (
      <FormFieldCascada
        field={{
          ...field,
          options,
          required: hasOptions,
          validation: hasOptions ? field.validation : {},
        }}
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