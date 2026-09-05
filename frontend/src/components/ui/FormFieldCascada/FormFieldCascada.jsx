import { useWatch } from "react-hook-form";
import FormField from "@/pages/teacher/classwork/components/FormField";

const FormFieldCascada = ({ field, register, errors, control }) => {
  const dependValue = useWatch({ control, name: field.dependsOn || "" });
  const isDisabled = field.dependsOn ? !dependValue : false;

  return (
    <FormField
      key={field.id}
      field={{
        ...field,
        disabled: isDisabled,
      }}
      register={register}
      errors={errors}
    />
  );
};
export default FormFieldCascada;
