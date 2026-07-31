import "./SelectField.css";


const SelectField = ({ label, id, register, errors, required, options = [] }) => {
  const errorMessage = errors?.[id]?.message;

  return (
    <div className="select-field">
      <label htmlFor={id} className="select-field-label">
        {label}
      </label>
      <select
        id={id}
        className="select-field-input"
        {...register(id, {
          required: required ? "Este campo es obligatorio" : false,
        })}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="select-field-error">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
