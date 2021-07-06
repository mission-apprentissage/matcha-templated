const logger = require("../../common/logger");
const { User, Formulaire } = require("../../common/model");

module.exports = async (db) => {
  await Formulaire.deleteMany({});
  await User.deleteMany({});
  logger.info(`Formulaires & Users successfully cleared in db ${db.name}`);
};
