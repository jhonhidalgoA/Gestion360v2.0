import "./StudentStep.css";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { GRADE_OPTIONS } from "../../../constants/grade";

function StudentDataForm({ data, errors, onChange }) {
  return (
    <div className="student-data-form">
      {/* Primera fila */}
      <div className="student-data-form__row">
        <Input
          label="Nombres"
          name="firstName"
          type="text"
          placeholder="Ej. Mariana"
          value={data.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          error={errors.firstName}
          variant="square"
          required
        />

        <Input
          label="Apellidos"
          name="lastName"
          type="text"
          placeholder="Ej. Gómez Ruiz"
          value={data.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={errors.lastName}
          variant="square"
          required
        />
      </div>

      {/* Segunda fila */}
      <div className="student-data-form__row">
        <Input
          label="Fecha de nacimiento"
          name="birthDate"
          type="date"
          value={data.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
          error={errors.birthDate}
          variant="square"
          required
        />
        <Select
          label="Grado al que aspira"
          name="grade"
          value={data.grade}
          onChange={(e) => onChange("grade", e.target.value)}
          error={errors.grade}
          options={GRADE_OPTIONS}
          placeholder="Selecciona un grado"
          variant="square"
          required
        />
      </div>

      {/* Tercera fila */}
      <div>
        <Input
          label="Colegio de procedencia (si aplica)"
          name="previousSchool"
          type="text"
          placeholder="Nombre de la institución actual"
          value={data.previousSchool}
          onChange={(e) => onChange("previousSchool", e.target.value)}
          variant="square"
        />
      </div>
    </div>
  );
}

export default StudentDataForm;