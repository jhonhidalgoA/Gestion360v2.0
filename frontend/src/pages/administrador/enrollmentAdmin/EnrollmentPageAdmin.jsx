import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { filterFormsData } from "@/data/filterFormsData";
import { stepperData } from "@/data/stepperData";
import PhotoUpload from "@/components/ui/PhotoUpload/PhotoUpload";
import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";

import "./EnrollmentPageAdmin.css";

// Fecha en formato yyyy-mm-dd (el único que acepta <input type="date">)
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// Función para generar código de matrícula
const generateEnrollmentCode = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000; // Número aleatorio de 5 dígitos
  return `MAT-${year}-${random}`;
};

// Función para calcular edad desde una fecha yyyy-mm-dd
const calculateAge = (birthDateStr) => {
  if (!birthDateStr) return "";

  const [year, month, day] = birthDateStr.split("-").map(Number);
  if (!year || year < 1900) return ""; // evita edades absurdas mientras se escribe el año

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 0 ? age.toString() : "";
};

const EnrollmentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/administrador");

  const { rows, sectionTitle } = filterFormsData.enrollmentStudent;

  const allFields = rows.flatMap((row) => row.fields);
  const requiredIds = allFields.filter((f) => f.required).map((f) => f.id);

  const defaultValues = allFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // Observar fecha de nacimiento para calcular edad
  const birthDateValue = useWatch({ control, name: "birthDate" });

  // Auto-completar fecha de matrícula (hoy) y código al montar
  useEffect(() => {
    const today = formatDate(new Date());
    const code = generateEnrollmentCode();

    setValue("enrollmentDate", today, { shouldValidate: true });
    setValue("studentCode", code, { shouldValidate: true });
  }, [setValue]);

  // Calcular edad cuando cambie la fecha de nacimiento.
  // Solo se valida si hay edad: así no aparece el error "obligatorio" al entrar.
  useEffect(() => {
    const age = calculateAge(birthDateValue);
    setValue("age", age, { shouldValidate: age !== "" });
  }, [birthDateValue, setValue]);

  const requiredValues = useWatch({ control, name: requiredIds });

  const studentOk = requiredValues.every(
    (value) => String(value ?? "").trim() !== "",
  );
  const generalOk = false;
  const familyOk = false;

  const currentStep = !studentOk ? 1 : !generalOk ? 2 : !familyOk ? 3 : 4;
  const totalSteps = 4;

  const goNext = () => {
    console.log("Avanzar al siguiente paso");
  };

  return (
    <div className="enrollment-page">
      <NavbarSection
        sectionKey="enrollment"
        context="admin"
        handleBack={handleBack}
      />
      <Stepper
        className="enrollment-stepper"
        steps={stepperData.enrollmentPageAdmin}
        currentStep={currentStep}
      />
      <div className="enrollment-container">
        <form noValidate>
          {sectionTitle && (
            <h3 className="form-section-title">{sectionTitle}</h3>
          )}

          <div className="enrollment-student">
            <PhotoUpload name="photo" register={register} />

            <div className="enrollment-student__fields">
              {rows.map((row) => (
                <div className={row.className} key={row.id}>
                  {row.fields.map((field) => (
                    <FormFieldCascada
                      key={field.id}
                      field={field}
                      register={register}
                      errors={errors}
                      control={control}
                      setValue={setValue}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación (esta es la primera pantalla: sin "Atrás") */}
          <div className="enrollment-buttons">
            <Button
              type="button"
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              disabled={!studentOk}
              title={
                !studentOk
                  ? "Completa todos los campos obligatorios primero"
                  : undefined
              }
              onClick={goNext}
            >
              {currentStep === totalSteps ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentPage;
