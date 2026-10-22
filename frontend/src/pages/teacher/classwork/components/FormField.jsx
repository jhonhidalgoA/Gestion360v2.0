import Select from "@/components/ui/Select/Select";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import { optionsMap } from "@/data/DBdataSimulation"; 
import "./FormField.css";

const FormField = ({ field, register, errors }) => {
  const error = errors[field.id];

  const effectiveRules =
    field.validation ??
    (field.required ? { required: "Este campo es obligatorio" } : {});

  if (field.type === "select") {
    return (
      <Select
        label={field.label}
        name={field.id}
        options={field.options ?? optionsMap[field.optionsKey]} 
        register={register}
        rules={effectiveRules}
        error={error}
        variant="square"
        required={field.required}
        disabled={field.disabled}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        label={field.label}
        name={field.id}
        placeholder={field.placeholder}
        rows={field.rows || 4}
        register={register}
        rules={effectiveRules}
        error={error}
        variant="square"
        required={field.required}
        disabled={field.disabled}
      />
    );
  }

  if (field.type === "file") {
    return (
      <Input
        label={field.label}
        name={field.id}
        type="file"
        register={register}
        rules={effectiveRules}
        error={error}
        variant="square"
        required={field.required}
        disabled={field.disabled}
      />
    );
  }
    if (field.type === "toggle") {
    return (
      <div className="toggle-field">
        <span className="toggle-field__label">
          {field.label}
          {field.required && <span className="toggle-field__required"> *</span>}
        </span>
        <div
          className="toggle-field__options"
          role="radiogroup"
          aria-label={field.label}
        >
          {[
            { value: "si", text: "Sí" },
            { value: "no", text: "No" },
          ].map((option) => (
            <label className="toggle-field__option" key={option.value}>
              <input
                type="radio"
                value={option.value}
                disabled={field.disabled}
                {...register(field.id, effectiveRules)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
        {error && <p className="toggle-field__error">{error.message}</p>}
      </div>
    );
  }

  return (
    <Input
      label={field.label}
      name={field.id}
      type={field.type}
      placeholder={field.type === "date" ? undefined : field.placeholder}
      register={register}
      rules={effectiveRules}
      error={error}
      variant="square"
      required={field.required}
      disabled={field.disabled}
      readOnly={field.readOnly}
      className={field.inputClassName}
    />
  );
};

export default FormField;
