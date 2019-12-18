export default (sequelize, DataTypes) => {
  const Employer_Profile = sequelize.define("Employer_Profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    }
  });

  return Employer_Profile;
};
