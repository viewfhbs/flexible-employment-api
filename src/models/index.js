import Sequelize from "sequelize";

const sequelize = new Sequelize("smart-career-bd", "root", "root", {
  dialect: "mysql"
});

const database = {
  User: sequelize.import("./user"),
  Activity: sequelize.import("./activity"),
  Job: sequelize.import("./job"),
  Employer_Profile: sequelize.import("./employer_profile"),
  Candidate_Profile: sequelize.import("./candidate_profile")
};

// Object.keys(database).forEach(model_name => {
//   if ("associate" in database[model_name]) {
//     database[model_name].associate(database);
//   }
// });

database.sequelize = sequelize;

export default database;
