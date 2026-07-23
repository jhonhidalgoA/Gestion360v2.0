import { z } from "zod";
import {
  personNameField,
  documentField,
  phoneField,
  emailField,
  selectField,
} from "./validators";
import { RELATIONSHIP_OPTIONS } from "@/constants/relationships";

export const guardianSchema = z.object({
  relationship: selectField("El parentesco", { options: RELATIONSHIP_OPTIONS }),
  firstName: personNameField("El nombre del acudiente", { min: 2, max: 50 }),
  lastName: personNameField("El apellido del acudiente", { min: 2, max: 50 }),
  document: documentField("El documento del acudiente"),
  phone: phoneField("El teléfono del acudiente"),
  email: emailField("El correo del acudiente"),
});

export const guardianDefaultValues = {
  relationship: "",
  firstName: "",
  lastName: "",
  document: "",
  phone: "",
  email: "",
};