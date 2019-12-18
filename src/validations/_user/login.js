import { isEmail, isLength } from "validator";

export default function({ email, password }) {
  const errors = {};

  if (email === undefined || email === null || !isEmail(email))
    errors.email = {
      message: "A valid email is required"
    };

  if (
    password === undefined ||
    password === null ||
    !isLength(password, { min: 5, max: 100 })
  )
    errors.password = {
      messsage: "Please enter the correct password."
    };

  if (Object.entries(errors).length === 0)
    return { validationStatus: true, errors: null };
  else return { validationStatus: false, errors };
}
