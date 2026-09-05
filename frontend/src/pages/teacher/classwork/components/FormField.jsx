import Select from "@/components/ui/Select/Select";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import { optionsMap } from "@/data/optionsData";
import "./FormField.css";

const FormField = ({ field, register, errors }) => {
  const error = errors[field.id];

  // Reglas efectivas: si el field trae `validation` custom, se respeta.
  // Si no, y es required, se genera la regla básica ("Este campo es obligatorio").
  // Esto es lo que antes faltaba conectar para los inputs nativos (text, url, date, textarea).
  const effectiveRules =
    field.validation ??
    (field.required ? { required: "Este campo es obligatorio" } : {});

  if (field.type === "select") {
    return (
      <Select
        label={field.label}
        name={field.id}
        options={optionsMap[field.optionsKey]}
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

  // text, url, date, y cualquier otro tipo compatible con Input
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
    />
  );
};

export default FormField;
