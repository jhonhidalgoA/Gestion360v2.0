import { z } from "zod";
import { textField, emailField } from "./validators";

export const contactSchema = z.object({
  name: textField("El nombre", {
    min: 3,
    max: 80,
  }),

  email: emailField("El correo electrónico"),

  message: textField("El mensaje", {
    min: 10,
    max: 500,
  }),
});

export const contactDefaultValues = {
  name: "",
  email: "",
  message: "",
};