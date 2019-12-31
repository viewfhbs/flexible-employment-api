import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import randomToken from "rand-token";
import database from "../../models";
import smtp_config from "../../config/smtp";
import validate from "../../validations/index";

export default async (req, res) => {
  const { role, username, email, password } = req.body;
  const { validationStatus, errors } = validate.register(req.body);
  if (!validationStatus) return res.status(422).json({ status: false, errors });

  try {
    const existingUser = await database.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (existingUser)
      return res.status(404).json({
        status: false,
        errors: { email_already_exists: "This email is already registered" }
      });

    await bcrypt.genSalt(7).then(async salt => {
      await bcrypt.hash(password, salt).then(async hash => {
        const email_verify_token = randomToken.generate(16);
        const newUser = {
          role,
          username: `$${username.toLowerCase()}`,
          email: email.toLowerCase(),
          password: hash,
          email_verify_token
        };

        await database.User.create(newUser)
          .then(async user => {
            await nodemailer
              .createTransport(smtp_config)
              .sendMail({
                from: smtp_config.auth.user,
                to: email,
                subject: "Smart Career BD Account Activation",
                html: `<h1 style="text-align:left; color:#00b9ee;">Welcome To Digital Career.Bangladesh</h1>
                      <div></div>
                      <br><p style="text-align:left;color:#000; font-size:20px;">
                      <b>Hello, there!</b></p>
                      <p style="text-align:left;color:#000;font-size: 14px;">
                      <b>Thanks for creating a Smart Career BD account. To continue please confirm your email address by clicking the button below.</b> 
                      </p>
                      <br>
                      <div style="display:inline-block;background:#00b9ee; padding:10px;-webkit-border-radius: 10px; -moz-border-radius: 4px; border-radius: 4px;">
                      <a style="text-decoration:none;color:#fff;font-size:15px;"href="${process.env.CLIENT_URL}/account-verify/${email_verify_token}">Activate Your Account</a>
                      </div>`
              })
              .then(async info => {
                await database.Activity.create({
                  activity_name: "Account created succesfully.",
                  username: user.get({ plain: true }).username
                }).then(() => {
                  res.status(200).json({
                    status: true,
                    message:
                      "Account created successfully. Please Activate your email address"
                  });
                });
              });
          })
          .catch(err => {
            if (err.fields.username) {
              let existingUsername = err.fields.username;
              res.status(404).json({
                status: false,
                errors: {
                  user_name_exists: `Username ${existingUsername.slice(
                    1
                  )} is already taken.`
                }
              });
            } else {
              res.status(404).json({
                status: false,
                errors: { faild: "Account creation faild" }
              });
            }
          });
      });
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      errors: {
        bad_happend: "Something bad happend on the server",
        ...error.fields
      }
    });
  }
};
