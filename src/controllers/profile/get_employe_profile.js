import database from "../../models";

export const get_employe_current_profile = async (req, res) => {
  try {
    await database.Employer_Profile.findOne({
      raw: true,
      where: { userid: req.user.id }
    }).then(async employe_profile => {
      await database.Activity.findAll({
        raw: true,
        where: { username: req.user.username }
      }).then(activity => {
        if (employe_profile) {
          return res.status(200).json({ employe_profile, activity });
        }
        res.status(200).json({});
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const get_all_employe_profile = async (req, res) => {
  try {
    await database.Employer_Profile.findAll({
      raw: true
    }).then(all_employe_profile => {
      res.status(200).json(all_employe_profile);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
