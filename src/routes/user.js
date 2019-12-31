const user = require("express").Router();
import controller from "../controllers/index";

/*
   Route [POST] for register user
*/
user.post("/register", controller.register);

/*
   Route [POST] for login user
*/
user.post("/login", controller.login);

/*
   Route [GET] for user account activation
*/
user.post("/verify-email/:token", controller.verify_email);

/*
   Route [POST] for user forgot password
*/
user.post("/forgot-password", controller.forgot_password);

/*
   Route [POST] for user updating forgot password
*/
user.post("/update-forgot-password/:token", controller.update_forgot_password);

export default user;
