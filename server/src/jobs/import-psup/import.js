const logger = require("../../common/logger");
const { Questionnaire, User } = require("../../common/model");

module.exports = async (db) => {
  await Questionnaire.deleteMany({});
  await User.deleteMany({});
  logger.info(`Questionnaires & Users successfully cleared in db ${db.name}`);
};
