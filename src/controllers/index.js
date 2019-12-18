import login from "./user/login";
import register from "./user/register";
import verify_email from "./user/verify_email";
import forgot_password from "./user/forgot_password";
import update_forgot_password from "./user/update_forgot_password";

const controller = {
  login,
  register,
  verify_email,
  forgot_password,
  update_forgot_password
};

export default controller;
