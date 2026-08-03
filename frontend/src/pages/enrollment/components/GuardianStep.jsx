import "./GuardianStep.css";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { RELATIONSHIP_OPTIONS } from "../../../constants/relationships";

function GuardianDataForm({ data, errors, onChange }) {
  return (
    <div className="guardian-data-form">
      {/* Primera fila */}
      <div className="guardian-data-form__row">
        <Select
          label="Parentesco"
          name="relationship"
          value={data.relationship}
          onChange={(e) => onChange("relationship", e.target.value)}
          error={errors.relationship}
          options={RELATIONSHIP_OPTIONS}
          placeholder="Selecciona el parentesco"
          variant="square"
          required
        />

        <Input
          label="Documento"
          name="document"
          type="text"
          placeholder="Ej. 1035467890"
          value={data.document}
          onChange={(e) => onChange("document", e.target.value)}
          error={errors.document}
          variant="square"
          required
        />
      </div>

      {/* Segunda fila */}
      <div className="guardian-data-form__row">
        <Input
          label="Nombres"
          name="firstName"
          type="text"
          placeholder="Ej. Claudia"
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
          placeholder="Ej. Ramírez Soto"
          value={data.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={errors.lastName}
          variant="square"
          required
        />
      </div>

      {/* Tercera fila */}
      <div className="guardian-data-form__row">
        <Input
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="Ej. 3121234567"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          error={errors.phone}
          variant="square"
          required
        />

        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="ej: claudia@example.com"
          autoComplete="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors.email}
          variant="square"
          required
        />
      </div>
    </div>
  );
}

export default GuardianDataForm;