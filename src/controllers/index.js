import login from "./user/login";
import register from "./user/register";
import verify_email from "./user/verify_email";
import forgot_password from "./user/forgot_password";
import update_forgot_password from "./user/update_forgot_password";
import create_employe_profile from "./profile/create_employe_profile";
import {
  get_employe_current_profile,
  get_all_employe_profile
} from "./profile/get_employe_profile";

const controller = {
  login,
  register,
  verify_email,
  forgot_password,
  update_forgot_password,
  create_employe_profile,
  get_employe_current_profile,
  get_all_employe_profile
};

export default controller;
