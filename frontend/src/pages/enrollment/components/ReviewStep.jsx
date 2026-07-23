import "./ReviewStep.css";

import { TbPencil } from "react-icons/tb";
import { REQUIRED_DOCUMENTS } from "../../../constants/documents";

function ReviewDataForm({
  studentData,
  guardianData,
  documentData,
  reviewData,
  reviewErrors,
  onChange,
  onEditStep,
}) {
  const gradeLabel = studentData.grade || "—";
  const relationshipLabel = guardianData.relationship || "—";

  

  const uploadedCount = REQUIRED_DOCUMENTS.filter((doc) => documentData[doc.id]).length;
  const totalCount = REQUIRED_DOCUMENTS.length;

  return (
    <div className="review-data-form">
      <section className="review-section">
        <header className="review-section__header">
          <h2 className="review-section__title">Estudiante</h2>
          <button
            type="button"
            className="review-section__edit"
            onClick={() => onEditStep(1)}
          >
            <TbPencil aria-hidden="true" />
            Editar
          </button>
        </header>
        <p className="review-section__text">
          {studentData.firstName} {studentData.lastName} · {studentData.birthDate} · Grado: {gradeLabel}
          {studentData.previousSchool && (
            <>
              <br />
              Colegio de procedencia: {studentData.previousSchool}
            </>
          )}
        </p>
      </section>

      <section className="review-section">
        <header className="review-section__header">
          <h2 className="review-section__title">Acudiente</h2>
          <button
            type="button"
            className="review-section__edit"
            onClick={() => onEditStep(2)}
          >
            <TbPencil aria-hidden="true" />
            Editar
          </button>
        </header>
        <p className="review-section__text">
          {guardianData.firstName} {guardianData.lastName} · {relationshipLabel} · C.C. {guardianData.document}
          <br />
          {guardianData.phone} · {guardianData.email}
        </p>
      </section>

      <section className="review-section">
        <header className="review-section__header">
          <h2 className="review-section__title">Documentos</h2>
          <button
            type="button"
            className="review-section__edit"
            onClick={() => onEditStep(3)}
          >
            <TbPencil aria-hidden="true" />
            Editar
          </button>
        </header>
        <p className="review-section__text review-section__text--success">
          {uploadedCount} de {totalCount} documentos cargados
        </p>
      </section>

      <label
        className={`review-consent${reviewErrors.consent ? " review-consent--error" : ""}`}
      >
        <input
          type="checkbox"
          checked={reviewData.consent}
          onChange={(e) => onChange("consent", e.target.checked)}
        />
        <span>
          Autorizo el tratamiento de mis datos personales de acuerdo con la Ley 1581 de 2012 y la{" "}
          <a href="/politica-datos" className="review-consent__link" target="_blank" rel="noreferrer">
            política de tratamiento de datos
          </a>{" "}
          de la institución.
        </span>
      </label>
      {reviewErrors.consent && <p className="review-consent__error-text">{reviewErrors.consent}</p>}
    </div>
  );
}

export default ReviewDataForm;
