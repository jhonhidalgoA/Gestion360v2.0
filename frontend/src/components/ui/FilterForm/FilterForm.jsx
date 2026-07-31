import { filterFormsData } from "../../../data/filterFormsData";
import SelectField from "@/components/ui/FilterForm/SelectField";
import "./FilterForm.css";

const FilterForm = ({ sectionKey, optionsData, register, errors }) => {
  const config = filterFormsData[sectionKey];

  if (!config) return null;

  return (
    <div className="filter-card">
      <div className="form-row">
        {config.fields.map((field) => {
          if (field.type === "select") {
            return (
              <SelectField
                key={field.id}
                label={field.label}
                id={field.id}
                register={register}
                errors={errors}
                required={field.required}
                options={optionsData[field.optionsKey] ?? []}
              />
            );
          }

          // Tipo de campo no soportado todavía
          return null;
        })}
      </div>
    </div>
  );
};

export default FilterForm;
