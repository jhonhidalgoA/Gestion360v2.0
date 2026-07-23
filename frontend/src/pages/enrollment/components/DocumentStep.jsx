import "./DocumentStep.css";
import { useState } from "react";
import { TbCloudUpload, TbFileCheck, TbTrash } from "react-icons/tb";
import {
  REQUIRED_DOCUMENTS,
  MAX_FILE_SIZE_MB,
  ACCEPTED_FILE_TYPES,
} from "../../../constants/documents";

function DocumentDataForm({ data, errors, onChange }) {
  const [dragOverId, setDragOverId] = useState(null);

  const uploadedCount = REQUIRED_DOCUMENTS.filter((doc) => data[doc.id]).length;
  const totalCount = REQUIRED_DOCUMENTS.length;
  const progressPercent = Math.round((uploadedCount / totalCount) * 100);

  const validateFile = (file) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "Formato no permitido. Sube un PDF o una imagen (JPG, PNG).";
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `El archivo supera el tamaño máximo de ${MAX_FILE_SIZE_MB} MB.`;
    }
    return null;
  };

  const handleFile = (id, file) => {
    const validationError = validateFile(file);
    if (validationError) {
      onChange(id, undefined, validationError);
      return;
    }
    onChange(id, file);
  };

  const handleInputChange = (id) => (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(id, file);
  };

  const handleDrop = (id) => (e) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(id, file);
  };

  const handleRemove = (id) => onChange(id, undefined);

  return (
    <div className="document-data-form">
      <div className="document-data-form__progress-row">
        <span className="document-data-form__progress-label">
          {uploadedCount} de {totalCount} documentos cargados
        </span>
        <div
          className="document-data-form__progress-bar"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="document-data-form__progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="document-data-form__list">
        {REQUIRED_DOCUMENTS.map((doc) => {
          const uploadedFile = data[doc.id];
          const fieldError = errors[doc.id];
          const isDragOver = dragOverId === doc.id;

          if (uploadedFile) {
            return (
              <div key={doc.id} className="document-card document-card--uploaded">
                <TbFileCheck className="document-card__icon" aria-hidden="true" />
                <div className="document-card__info">
                  <p className="document-card__label">{doc.label}</p>
                  <p className="document-card__meta">{uploadedFile.name} · cargado</p>
                </div>
                <button
                  type="button"
                  className="document-card__remove"
                  aria-label={`Eliminar ${doc.label}`}
                  onClick={() => handleRemove(doc.id)}
                >
                  <TbTrash aria-hidden="true" />
                </button>
              </div>
            );
          }

          return (
            <div key={doc.id}>
              <label
                className={`document-card document-card--empty${
                  isDragOver ? " document-card--dragover" : ""
                }${fieldError ? " document-card--error" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverId(doc.id);
                }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={handleDrop(doc.id)}
              >
                <TbCloudUpload
                  className="document-card__icon document-card__icon--muted"
                  aria-hidden="true"
                />
                <div className="document-card__info">
                  <p className="document-card__label">
                    {doc.label}
                    {doc.required && <span className="document-card__required"> *</span>}
                  </p>
                  <p className="document-card__meta">
                    {doc.required
                      ? `Arrastra el archivo o haz clic para subir · PDF o imagen, máx. ${MAX_FILE_SIZE_MB} MB`
                      : `Opcional · PDF o imagen, máx. ${MAX_FILE_SIZE_MB} MB`}
                  </p>
                </div>
                <input
                  type="file"
                  name={doc.id}
                  accept={ACCEPTED_FILE_TYPES.join(",")}
                  className="document-card__input"
                  onChange={handleInputChange(doc.id)}
                />
                <span className="document-card__upload-link">Subir</span>
              </label>
              {fieldError && <p className="document-card__error-text">{fieldError}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DocumentDataForm;
