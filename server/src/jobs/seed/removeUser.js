const logger = require("../../common/logger");
const { Questionnaire } = require("../../common/model");

module.exports = async () => {
  logger.info(`-- START - Remove questionnaire in DB --`);

  await Questionnaire.findOneAndDelete({ questionnaire_id: "8f4d05b2-068a-4042-8a43-5a933075f025" });

  logger.info("-- END - Remove questionnaire in DB --");
};
