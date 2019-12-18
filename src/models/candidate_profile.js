export default (sequelize, DataTypes) => {
  const Candidate_Profile = sequelize.define("Candidate_Profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    }
  });

  return Candidate_Profile;
};
