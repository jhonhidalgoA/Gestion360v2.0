import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import FormField from "@/pages/teacher/classwork/components/FormField";

const FormFieldCascada = ({ field, register, errors, control, setValue }) => {
  const dependValue = useWatch({ control, name: field.dependsOn || "" });

  const isDisabled = field.dependsOn
    ? dependValue === undefined || dependValue === ""
    : false;

  const dynamicPlaceholder = isDisabled
    ? `Selecciona "${field.dependsOn}" primero`
    : field.placeholder;

  const isFirstRender = useRef(true);
  const prevDependValue = useRef(dependValue);

  useEffect(() => {
    if (field.dependsOn) {
      if (!isFirstRender.current && prevDependValue.current !== dependValue) {
        setValue(field.id, "");
      }

      prevDependValue.current = dependValue;
      isFirstRender.current = false;
    }
  }, [dependValue, field.dependsOn, field.id, setValue]);

  return (
    <FormField
      key={field.id}
      field={{
        ...field,
        disabled: isDisabled,
        placeholder: dynamicPlaceholder,
      }}
      register={register}
      errors={errors}
    />
  );
};

export default FormFieldCascada;
