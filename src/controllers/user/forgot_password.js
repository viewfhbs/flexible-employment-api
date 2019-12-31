import { isEmail } from "validator";
import nodemailer from "nodemailer";
import randomToken from "rand-token";
import smtp_config from "../../config/smtp";
import database from "../../models";

export default async (req, res) => {
  const { email } = req.body;

  if (email === undefined || !isEmail(email))
    return res
      .status(422)
      .json({ status: false, message: "Enter a valid email" });

  const user = await database.User.findOne({
    raw: true,
    where: { email: email.toLowerCase() }
  });

  if (!user)
    return res.status(401).json({ message: "Please enter the correct email" });

  let reset_password_token = randomToken.generate(8);

  try {
    await database.User.update(
      { reset_password_token, reset_password_expired: false },
      { where: { email: email.toLowerCase() } }
    ).then(async () => {
      await nodemailer.createTransport(smtp_config).sendMail(
        {
          from: smtp_config.auth.user,
          to: email,
          subject: "Smart Career BD Account Activation",
          html: `<h1 style="text-align:left; color:#00b9ee;">Welcome To Digital Career.Bangladesh</h1>
              <div></div>
              <br><p style="text-align:left;color:#000; font-size:20px;">
              <b>Hello, there!</b></p>
              <p style="text-align:left;color:#000;font-size: 14px;">
              <b>We are sorry that you forgot your Password.</b> 
              <p style="text-align:left;color:#000; font-size: 14px;>But Don't worry you can reset by using the following Link</p>
              </p>
              <br>
              <div style="display:inline-block;background:#00b9ee; padding:10px;-webkit-border-radius: 10px; -moz-border-radius: 4px; border-radius: 4px;">
              <a style="text-decoration:none;color:#fff;font-size:15px;"href="${process.env.CLIENT_URL}/reset-password/${reset_password_token}">Reset Password</a>
              </div>`
        },
        async (err, info) => {
          if (err)
            return res
              .status(400)
              .json({ status: false, message: "Error on sending email", err });

          await database.Activity.create({
            activity_name: "Reset password link is sent to your email",
            username: user.username
          }).then(() => {
            res.status(201).json({
              message: "Reset password link is sent to your email.",
              status: true
            });
          });
        }
      );
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something bad happend on the server",
      error
    });
  }
};
