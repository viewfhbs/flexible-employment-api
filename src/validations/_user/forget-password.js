import { isLength } from "validator";

export default function({ new_password, confirm_new_password }) {
  const errors = {};

  if (
    new_password === undefined ||
    new_password === null ||
    !isLength(new_password, { min: 5, max: 100 })
  )
    errors.new_password = {
      messsage: "Please enter a new password."
    };

  if (
    confirm_new_password === undefined ||
    confirm_new_password === null ||
    !isLength(confirm_new_password, { min: 5, max: 100 })
  )
    errors.confirm_new_password = {
      messsage: "Please enter a confirm password."
    };

  if (new_password !== confirm_new_password)
    errors.compare_password = {
      messsage: "Password not matched"
    };

  if (Object.entries(errors).length === 0)
    return { validationStatus: true, errors: null };
  else return { validationStatus: false, errors };
}
