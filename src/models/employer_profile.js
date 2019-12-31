export default (sequelize, DataTypes) => {
  const Employer_Profile = sequelize.define("Employer_Profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING
    },
    companeylogolink: {
      type: DataTypes.STRING
    },
    companeyname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companeyemail: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companeytype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutcompaney: {
      type: DataTypes.TEXT("long"),
      allowNull: false
    },
    introvideolink: {
      type: DataTypes.STRING
    },
    facebooklink: {
      type: DataTypes.STRING
    },
    twitterlink: {
      type: DataTypes.STRING
    },
    lnkedinlink: {
      type: DataTypes.STRING
    },
    totaljobposted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalapplicationsubmit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    callforinterview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    companeysize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING
    },
    openposition: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Employer_Profile;
};
