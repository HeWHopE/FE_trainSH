import * as Yup from "yup";

export const trainValidationSchema = Yup.object().shape({
  name: Yup.string().required("Train name is required"),
  origin: Yup.string().required("Origin is required"),
  destination: Yup.string().required("Destination is required"),
  departure: Yup.date()
    .required("Departure date is required")
    .min(new Date(), "Departure must be in the future"),
  arrival: Yup.date()
    .required("Arrival date is required")
    .min(new Date(), "Arrival must be in the future"),
});
