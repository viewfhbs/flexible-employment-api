const employe = require("express").Router();
import multer from "../config/cloudnary";
import authorization from "../middleware/authorization";
import controller from "../controllers";

/*
   Route [POST] for creating employer profile
*/
employe.post(
  "/create-employe-profile",
  authorization,
  multer.single("companeylogo"),
  controller.create_employe_profile
);

/*
   Route [GET] for geting current employe profile
*/
employe.get(
  "/employe-profile",
  authorization,
  controller.get_employe_current_profile
);

/*
   Route [GET] for geting all employe profile
*/
employe.get("/all-employe-profile", controller.get_all_employe_profile);

export default employe;
