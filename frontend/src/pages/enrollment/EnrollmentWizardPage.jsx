import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import EnrollmentStepper from "./components/EnrollmentStepper";
import StudentDataForm from "./components/StudentStep";
import GuardianDataForm from "./components/GuardianStep";
import DocumentDataForm from "./components/DocumentStep";
import ReviewDataForm from "./components/ReviewStep";
import { studentSchema, studentDefaultValues } from "@/schemas/studentSchema";
import {
  guardianSchema,
  guardianDefaultValues,
} from "@/schemas/guardianSchema";
import {
  documentSchema,
  documentDefaultValues,
} from "@/schemas/documentSchema";
import { reviewSchema, reviewDefaultValues } from "@/schemas/reviewSchema";
import { generateRadicado } from "@/utils/generateRadicado";
import logo from "@/assets/icons/espiral.svg";
import { Button } from "@/components/ui/Button/Button";
import "./EnrollmentWizardPage.css";

const STEP_TITLES = {
  1: "Datos del estudiante",
  2: "Datos del acudiente",
  3: "Carga de documentos",
  4: "Revisión final",
};

const TOTAL_STEPS = 4;

// ✅ Define los datos del navbar directamente aquí
const NAVBAR_DATA = {
  title: "Matrícula",
  color: "#0d3b7a", // o el color que uses para matrícula
};

function EnrollmentWizardPage({ context }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [studentData, setStudentData] = useState(studentDefaultValues);
  const [studentErrors, setStudentErrors] = useState({});

  const [guardianData, setGuardianData] = useState(guardianDefaultValues);
  const [guardianErrors, setGuardianErrors] = useState({});

  const [documentData, setDocumentData] = useState(documentDefaultValues);
  const [documentErrors, setDocumentErrors] = useState({});

  const [reviewData, setReviewData] = useState(reviewDefaultValues);
  const [reviewErrors, setReviewErrors] = useState({});

  const navigate = useNavigate();

  const isLastStep = currentStep === TOTAL_STEPS;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Usa los datos definidos arriba
  const { title, color } = NAVBAR_DATA;

  const handleStudentFieldChange = (field, value) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
    if (studentErrors[field]) {
      setStudentErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGuardianFieldChange = (field, value) => {
    setGuardianData((prev) => ({ ...prev, [field]: value }));
    if (guardianErrors[field]) {
      setGuardianErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDocumentFieldChange = (field, value, manualError) => {
    setDocumentData((prev) => ({ ...prev, [field]: value }));
    setDocumentErrors((prev) => ({
      ...prev,
      [field]: manualError || undefined,
    }));
  };

  const handleReviewFieldChange = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
    if (reviewErrors[field]) {
      setReviewErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStudentStep = () => {
    const result = studentSchema.safeParse(studentData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages[0],
        ])
      );
      setStudentErrors(newErrors);
      return false;
    }
    setStudentErrors({});
    return true;
  };

  const validateGuardianStep = () => {
    const result = guardianSchema.safeParse(guardianData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages[0],
        ])
      );
      setGuardianErrors(newErrors);
      return false;
    }
    setGuardianErrors({});
    return true;
  };

  const validateDocumentStep = () => {
    const result = documentSchema.safeParse(documentData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages[0],
        ])
      );
      setDocumentErrors(newErrors);
      return false;
    }
    setDocumentErrors({});
    return true;
  };

  const validateReviewStep = () => {
    const result = reviewSchema.safeParse(reviewData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages[0],
        ])
      );
      setReviewErrors(newErrors);
      return false;
    }
    setReviewErrors({});
    return true;
  };

  const goNext = () => {
    if (currentStep === 1 && !validateStudentStep()) return;
    if (currentStep === 2 && !validateGuardianStep()) return;
    if (currentStep === 3 && !validateDocumentStep()) return;
    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS));
  };

  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const handleSaveAndExit = () => {
    navigate("/matricula");
  };

  const handleSubmit = () => {
    if (!validateReviewStep()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const radicado = generateRadicado();
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + 15);

      setIsSubmitting(false);

      navigate("/matricula/confirmacion", {
        state: {
          radicado,
          guardianEmail: guardianData.email,
          estimatedDate: estimatedDate.toISOString(),
        },
      });
    }, 1200);
  };

  return (
    <div className="enrollment-wizard-page">
      <div className="navbar-enrollment" style={{ backgroundColor: color }}>
        <RouterLink to="/" className="navbar-logo logo-enrollment">
          <img src={logo} alt="logo" className="logo-icon" />
          <span className="logo-text">
            Gestión <span className="danger">360</span>
          </span>
        </RouterLink>
        <div className="navbar-content">
          <h2 className="navbar-title">
            {title}
            {context && <span className="navbar-context"> / {context}</span>}
          </h2>
          <p>Gestión de matrícula y procesos académicos</p>
        </div>
        <Button
          variant="outline-white"
          shape="pill"
          size="md"
          type="button"
          onClick={handleSaveAndExit}
        >
          Guardar y salir
        </Button>
      </div>

      <div className="enrollment-page__stepper">
        <h1 className="enrollment-page__title">{STEP_TITLES[currentStep]}</h1>
        <EnrollmentStepper currentStep={currentStep} />
      </div>

      <main className="enrollment-wizard-page__content">
        <div className="enrollment-wizard-page__step-card">
          {currentStep === 1 ? (
            <StudentDataForm
              data={studentData}
              errors={studentErrors}
              onChange={handleStudentFieldChange}
            />
          ) : currentStep === 2 ? (
            <GuardianDataForm
              data={guardianData}
              errors={guardianErrors}
              onChange={handleGuardianFieldChange}
            />
          ) : currentStep === 3 ? (
            <DocumentDataForm
              data={documentData}
              errors={documentErrors}
              onChange={handleDocumentFieldChange}
            />
          ) : (
            <ReviewDataForm
              studentData={studentData}
              guardianData={guardianData}
              documentData={documentData}
              reviewData={reviewData}
              reviewErrors={reviewErrors}
              onChange={handleReviewFieldChange}
              onEditStep={setCurrentStep}
            />
          )}
        </div>

        <div className="enrollment-wizard-page__nav">
          <Button
            variant="dark"
            shape="pill"
            className="btn-uniform-width"
            size="md"
            onClick={goBack}
            disabled={currentStep === 1}
          >
            Atrás
          </Button>
          {isLastStep ? (
            <Button
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          ) : (
            <Button
              variant="primary"
              shape="pill"
              className="btn-uniform-width"
              size="md"
              onClick={goNext}
            >
              Continuar
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export default EnrollmentWizardPage;