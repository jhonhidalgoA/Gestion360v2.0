import { z } from "zod";

export const reviewSchema = z.object({
  consent: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar la autorización de datos para enviar la solicitud.",
  }),
});

export const reviewDefaultValues = {
  consent: false,
};