const Work = require("./work");
const User = require("./user");

User.hasMany(Work);
Work.belongsTo(User);
Work.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Work,
  User,
};
