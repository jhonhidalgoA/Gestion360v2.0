import { z } from "zod";
import { personNameField, dateField, selectField, textField } from "./validators";
import { GRADE_OPTIONS } from "../constants/grade";

export const studentSchema = z.object({
  firstName: personNameField("El nombre", { min: 3, max: 50 }),
  lastName: personNameField("El apellido", { min: 5, max: 50 }),
  birthDate: dateField("La fecha de nacimiento", {
    minDate: "1995-01-01",
    allowFuture: false,
  }),
  grade: selectField("El grado", { options: GRADE_OPTIONS }),
  previousSchool: textField("El colegio de procedencia", { required: false, max: 100 }),
});

export const studentDefaultValues = {
  firstName: "",
  lastName: "",
  birthDate: "",
  grade: "",
  previousSchool: "",
};