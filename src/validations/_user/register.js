import { isEmail, isEmpty, isLength } from "validator";

export default function({ role, username, email, password }) {
  const errors = {};

  if (role === undefined || role === null || isEmpty(role))
    errors.role = {
      message: "Role is must required"
    };

  if (
    username === undefined ||
    username === null ||
    !isLength(username, { max: 20, min: 4 })
  )
    errors.username = {
      message: "Username is must required and it should be 4 to 10 characters"
    };

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
      messsage: "Password is requierd and it should be 5 to 100 characters"
    };

  if (Object.entries(errors).length === 0)
    return { validationStatus: true, errors: null };
  else return { validationStatus: false, errors };
}
