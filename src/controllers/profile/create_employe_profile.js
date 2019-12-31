import database from "../../models";
import validate from "../../validations";
import { isEmail, isURL } from "validator";

export default async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const { validationStatus, errors } = validate.employe_profile(req.body);
  if (!validationStatus) return res.status(422).json({ status: false, errors });

  const new_profile = {
    userid: req.user.id,
    companeylogolink: process.env.no_image,
    companeyname: req.body.companeyname,
    companeyemail: req.user.email,
    phone: req.body.phone,
    location: req.body.location,
    companeytype: req.body.companeytype,
    aboutcompaney: req.body.aboutcompaney,
    introvideolink: "",
    facebooklink: "",
    twitterlink: "",
    linkedinlink: "",
    companeysize: req.body.companeysize,
    website: req.body.website
  };

  if (req.file) new_profile.companeylogolink = req.file.secure_url;

  if (req.body.introvideolink) {
    if (!isURL(req.body.introvideolink))
      return res.status(422).json({
        status: false,
        errors: { introvideolink: "Intro link should be valid" }
      });

    new_profile.introvideolink = req.body.introvideolink;
  }

  if (req.body.facebooklink) {
    if (!isURL(req.body.facebooklink))
      return res.status(422).json({
        status: false,
        errors: { facebooklink: "Facebook link should be valid" }
      });
    new_profile.facebooklink = req.body.facebooklink;
  }

  if (req.body.twitterlink) {
    if (!isURL(req.body.twitterlink))
      return res.status(422).json({
        status: false,
        errors: { twitterlink: "Twitter link should be valid" }
      });
    new_profile.twitterlink = req.body.twitterlink;
  }

  if (req.body.linkedinlink) {
    if (!isURL(req.body.linkedinlink))
      return res.status(422).json({
        status: false,
        errors: { linkedinlink: "Linkedin link should be valid" }
      });
    new_profile.linkedinlink = req.body.linkedinlink;
  }

  if (req.body.companeyemail) {
    if (!isEmail(req.body.companeyemail))
      return res.status(422).json({
        status: false,
        errors: { companeyemail: "Email should be valid" }
      });
    new_profile.companeyemail = req.body.companeyemail;
  }

  try {
    await database.Employer_Profile.create(new_profile).then(async () => {
      database.Activity.create({
        activity_name: "Profile created succesfully.",
        username: req.user.username
      }).then(() => {
        res.status(200).json({
          status: true,
          message: "New Profile is created"
        });
      });
    });
  } catch (error) {
    res.status(422).json(error);
  }
};
