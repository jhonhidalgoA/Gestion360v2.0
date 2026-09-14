import "./FeedbackModalContent.css";

const MAX_LENGTH = 300;

const FeedbackModalContent = ({ title, estudiante, value, onChange, lastUpdated }) => {
  return (
    <div className="feedback-content">
      <p>{title}</p>
      <h2>{estudiante}</h2>

      {lastUpdated && (
        <p className="feedback-updated">Última actualización: {lastUpdated}</p>
      )}


      <textarea
        className="feedback-textarea"
        placeholder="Escribe aquí tus comentarios..."
        value={value}
        maxLength={MAX_LENGTH}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="feedback-counter">
        {value.length} / {MAX_LENGTH}
      </p>
    </div>
  );
};

export default FeedbackModalContent;