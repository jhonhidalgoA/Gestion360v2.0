import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import {
  TbSearch,
  TbCheck,
  TbClock,
  TbFlag,
  TbFileSearch,
} from "react-icons/tb";
import Navbar from "@/components/navbar/Navbar";
import Input from "@/components/ui/Input/Input";
import {
  applicationStatusSchema,
  applicationStatusDefaultValues,
} from "@/schemas/applicationStatusSchema";
import "./ApplicationStatusPage.css";

// Datos de prueba mientras no hay backend.
// Solo esta combinación exacta de radicado + documento "existe".
// TODO: reemplazar por la validación real del servidor.
const MOCK_RECORD = {
  radicado: "MAT-2026-874942",
  document: "1035467890",
};

function buildMockResult(radicado) {
  return {
    radicado,
    studentName: "Mariana Gómez Ruiz",
    grade: "Sexto",
    receivedDate: "22 de julio, 9:14 a. m.",
    estimatedDate: "6 de agosto de 2026",
    currentStage: "evaluation", // "received" | "evaluation" | "result"
  };
}

function ApplicationStatusPage() {
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(applicationStatusSchema),
    defaultValues: applicationStatusDefaultValues,
  });

  const onSubmit = (data) => {
    setIsSearching(true);
    setNotFound(false);
    setResult(null);

    // Simulación temporal mientras no hay backend conectado.
    // TODO: reemplazar por GET /matriculas/:radicado?document=...
    setTimeout(() => {
      setIsSearching(false);

      const matches =
        data.radicado === MOCK_RECORD.radicado &&
        data.document === MOCK_RECORD.document;

      if (matches) {
        setResult(buildMockResult(data.radicado));
      } else {
        setNotFound(true);
      }
    }, 900);
  };

  const handleSearchAgain = () => {
    setResult(null);
    setNotFound(false);
  };

  return (
    <div className="application-status-page">
      <Navbar solid />
      <main className="application-status-page__content">
        {!result && (
          <>
            <div className="application-status-page__icon-badge">
              <TbFileSearch aria-hidden="true" />
            </div>
            <h1 className="application-status-page__title">
              Consulta tu solicitud
            </h1>
            <p className="application-status-page__subtitle">
              Ingresa el número de radicado y el documento del acudiente para
              ver el estado de tu solicitud de matrícula.
            </p>
          </>
        )}
        {!result ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="application-status-page__form"
            noValidate
          >
            <Input
              label="Número de radicado"
              name="radicado"
              placeholder="Ej. MAT-2026-874942"
              register={register}
              error={errors.radicado}
              variant="rounded"
              style={{ textTransform: "uppercase" }}
              required
            />

            <Input
              label="Documento del acudiente"
              name="document"
              placeholder="Ej. 1035467890"
              register={register}
              error={errors.document}
              variant="rounded"
              required
            />

            {notFound && (
              <p className="application-status-page__not-found" role="alert">
                No encontramos ninguna solicitud con esos datos. Verifica el
                radicado y el documento e intenta de nuevo.
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-shape-pill btn-size-lg"
              disabled={isSubmitting || isSearching}
            >
              {isSearching ? (
                "Consultando..."
              ) : (
                <>
                  <TbSearch aria-hidden="true" />
                  Consultar
                </>
              )}
            </button>

            <p className="application-status-page__help">
              ¿No encuentras tu radicado?{" "}
              <RouterLink to="/contacto">Escríbenos</RouterLink>
            </p>
          </form>
        ) : (
          <ApplicationStatusResult
            result={result}
            onSearchAgain={handleSearchAgain}
          />
        )}
      </main>

      <footer className="application-status-page__footer">
        <p>© 2026 Gestión 360. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function ApplicationStatusResult({ result, onSearchAgain }) {
  const stages = [
    {
      key: "received",
      label: "Solicitud recibida",
      detail: result.receivedDate,
    },
    {
      key: "evaluation",
      label: "En evaluación",
      detail: "Un asesor está revisando los documentos.",
    },
    {
      key: "result",
      label: "Resultado",
      detail: `Estimado: ${result.estimatedDate}`,
    },
  ];

  const stageOrder = ["received", "evaluation", "result"];
  const currentIndex = stageOrder.indexOf(result.currentStage);

  return (
    <div className="application-status-result">
      <div className="application-status-result__header">
        <div>
          <p className="application-status-result__label">Radicado</p>
          <p className="application-status-result__radicado">
            {result.radicado}
          </p>
        </div>
        <span className="application-status-result__badge">En evaluación</span>
      </div>

      <div className="application-status-result__info">
        <p>
          <strong>Estudiante:</strong> {result.studentName}
        </p>
        <p>
          <strong>Grado:</strong> {result.grade}
        </p>
      </div>

      <ol className="application-status-result__timeline">
        {stages.map((stage, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li key={stage.key} className="application-status-result__step">
              <span
                className={`application-status-result__step-icon${
                  isDone
                    ? " application-status-result__step-icon--done"
                    : isActive
                      ? " application-status-result__step-icon--active"
                      : " application-status-result__step-icon--pending"
                }`}
              >
                {isDone ? (
                  <TbCheck aria-hidden="true" />
                ) : isActive ? (
                  <TbClock aria-hidden="true" />
                ) : (
                  <TbFlag aria-hidden="true" />
                )}
              </span>
              <span className="application-status-result__step-text">
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="application-status-result__actions">
        <button
          type="button"
          className="btn btn-back btn-shape-pill btn-size-sm"
          onClick={onSearchAgain}
        >
          Consultar otra solicitud
        </button>
      </div>
    </div>
  );
}

export default ApplicationStatusPage;
