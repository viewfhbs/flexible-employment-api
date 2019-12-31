import database from "../../models";

export default async (req, res) => {
  const token = req.params.token;

  try {
    const user = await database.User.findOne({
      raw: true,
      where: { email_verify_token: token }
    });

    if (user.email_verified === 1)
      return res
        .status(200)
        .json({ status: true, message: "This email is already verified." });

    await database.User.update(
      { email_verified: true },
      { where: { email_verify_token: token } }
    ).then(async () => {
      await database.Activity.create({
        activity_name: "Verified email address",
        username: user.username
      }).then(() => {
        res.status(200).json({
          status: true,
          message: "Your email is verified now."
        });
      });
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something bad happend on the server",
      error
    });
  }
};
