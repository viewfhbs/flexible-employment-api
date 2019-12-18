export default (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activity_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false
    }
  );

  return Activity;
};
