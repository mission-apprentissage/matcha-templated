const logger = require("../../common/logger");
const { Questionnaire } = require("../../common/model");
const { asyncForEach } = require("../../common/utils/asyncUtils");

const data = require("../../../data/missingProfiles.json");

module.exports = async () => {
  logger.info(`-- Uploading missing data into the database`);

  await asyncForEach(data, async (user) => {
    await Questionnaire.create(user);
  });

  logger.info(` --- Missing data has been successfully uploaded`);
};
