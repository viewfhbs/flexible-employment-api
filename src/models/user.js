export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      email_verify_token: {
        type: DataTypes.STRING
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      reset_password_token: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      reset_password_expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
      }
    },
    {
      timestamps: true
    }
  );

  return User;
};
