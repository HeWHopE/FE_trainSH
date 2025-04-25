import * as yup from "yup";

export const UpdateTrainValidationSchema = yup.object({
  name: yup.string().nullable().optional(),
  origin: yup.string().nullable().optional(),
  destination: yup.string().nullable().optional(),
  departure: yup.date().nullable().optional(),
  arrival: yup.date().nullable().optional(),
});
