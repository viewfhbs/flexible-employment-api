import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../../models";
import validate from "../../validations/index";

export default async (req, res) => {
  const { email, password } = req.body;
  const { validationStatus, errors } = validate.login(req.body);
  if (!validationStatus) return res.status(422).json({ status: false, errors });

  try {
    const user = await database.User.findOne({
      raw: true,
      where: { email: email.toLowerCase() }
    });

    if (!user)
      return res.status(401).json({
        status: false,
        message: "Authentication failed"
      });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch || err)
        return res.status(422).json({
          status: false,
          message: "Wrong Password"
        });

      if (isMatch && user.email_verified === 0)
        res.status(200).json({
          success: false,
          message: "Your Email is not verified yet..!!!"
        });

      if (isMatch && user.email_verified === 1 && !err === true) {
        let token = jwt.sign(
          {
            id: user.id,
            role: user.role,
            username: user.username,
            email: user.email
          },
          process.env.auth_secret,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          success: true,
          status: true,
          message: "Authentication successfull",
          verified: user.email_verified === 1 ? true : false,
          token
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Something bad happend on the server",
      error
    });
  }
};
