const { connectToMongo } = require("../mongodb");
const createUsers = require("./users");
const createMail = require("./mail");

module.exports = async (options = {}) => {
  const users = options.users || (await createUsers());
  const mail = options.mail || (await createMail());

  return {
    mail,
    users,
    db: options.db || (await connectToMongo()).db,
  };
};
