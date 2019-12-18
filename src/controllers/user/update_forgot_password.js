import bcrypt from "bcryptjs";
import database from "../../models";
import validate from "../../validations";

export default async (req, res) => {
  const reset_password_token = req.params.token;

  const { new_password } = req.body;

  const { validationStatus, errors } = validate.forget_password(req.body);
  if (!validationStatus) return res.status(400).json(errors);

  try {
    const user = await database.User.findOne({
      raw: true,
      where: { reset_password_token }
    });

    if (!user || user.reset_password_expired)
      return res.status(200).json({ message: "Invalid Token", status: false });

    await bcrypt.genSalt(7).then(async salt => {
      await bcrypt.hash(new_password, salt).then(async hashedPassword => {
        await database.User.update(
          { password: hashedPassword, reset_password_expired: true },
          { where: { reset_password_token } }
        ).then(async () => {
          await database.Activity.create({
            activity_name: "Password reset successful",
            username: user.username
          }).then(() => {
            res.status(201).json({
              message: "Password reset successful",
              status: true
            });
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something bad happen on server", error });
  }
};
