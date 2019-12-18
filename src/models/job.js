export default (sequelize, DataTypes) => {
  const Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    }
  });
  return Job;
};
